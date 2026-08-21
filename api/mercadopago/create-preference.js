// Función serverless de Vercel — crea una "preferencia de pago" de Mercado
// Pago (Checkout Pro) con el monto real del carrito, en vez de usar los
// links fijos de `MP_LINKS` (site.js). El Access Token vive SOLO acá, como
// variable de entorno de Vercel (`MERCADOPAGO_ACCESS_TOKEN`) — nunca en el
// frontend, nunca con prefijo VITE_.
//
// Mientras esa variable no esté configurada, respondemos 503 y el frontend
// (Checkout.jsx) cae solo al flujo viejo de links fijos — no rompe nada
// mientras Pablo no cargue el token real.
import { PLAN_PRICING, DISCOUNT_CODE, DISCOUNT_CODE_PERCENT } from '../../shared/pricing.js'

const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN
const SITE_URL = process.env.SITE_URL || 'https://veintidos-invitaciones.vercel.app'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' })
    return
  }
  if (!ACCESS_TOKEN) {
    res.status(503).json({ ok: false, error: 'mercadopago_not_configured' })
    return
  }

  try {
    const { items, orderRef, discountCode } = req.body || {}
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ ok: false, error: 'items_invalido' })
      return
    }

    // Nunca confiamos en el precio que venga del cliente — lo recalculamos
    // acá con la lista de precios real (misma fuente que usa el frontend
    // para mostrar precios). Si alguien manipulara el pedido desde la
    // consola del navegador, esto lo corrige antes de crear el pago.
    const mpItems = items.map((it) => {
      const row = PLAN_PRICING[it.plan]
      if (!row) throw new Error(`plan_invalido:${it.plan}`)
      const quantity = Math.max(1, Math.min(20, Number(it.quantity) || 1))
      return {
        id: String(it.id ?? it.plan),
        title: `veintidós — ${it.name || it.plan} (${it.plan})`,
        quantity,
        unit_price: row.price,
        currency_id: 'ARS',
      }
    })

    // Mismo cupón que el Carrito (Cart.jsx / CartContext) — se valida acá de
    // nuevo, nunca alcanza con el booleano `promoApplied` que manda el
    // cliente. MP no tiene un campo nativo de "descuento" en Preferences, así
    // que se aplica bajando el unit_price proporcionalmente en cada ítem.
    const validDiscount = typeof discountCode === 'string' && discountCode.trim().toUpperCase() === DISCOUNT_CODE
    if (validDiscount) {
      mpItems.forEach((it) => {
        it.unit_price = Math.round(it.unit_price * (1 - DISCOUNT_CODE_PERCENT / 100))
      })
    }

    const preference = {
      items: mpItems,
      external_reference: orderRef || '',
      back_urls: {
        success: `${SITE_URL}/checkout/retorno`,
        pending: `${SITE_URL}/checkout/retorno`,
        failure: `${SITE_URL}/checkout/retorno`,
      },
      auto_return: 'approved',
      statement_descriptor: 'VEINTIDOS',
    }

    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    })

    const data = await mpRes.json()
    if (!mpRes.ok) {
      res.status(502).json({ ok: false, error: 'mercadopago_error', detail: data })
      return
    }

    res.status(200).json({ ok: true, id: data.id, initPoint: data.init_point })
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err?.message || err) })
  }
}
