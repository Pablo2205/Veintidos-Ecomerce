// Función serverless — Mercado Pago llama acá cuando cambia el estado de un
// pago (notificación asíncrona). Es una red de seguridad extra para el caso
// en que el comprador cierre la pestaña de pago antes de volver al sitio: el
// "Ya pagué, continuar" de Checkout.jsx igual va a confirmarlo la próxima
// vez que lo apriete (consulta en vivo, no depende de este webhook), pero
// tener esto configurado en el panel de MP es buena práctica.
//
// TODO: por ahora solo queda logueado (ver `vercel logs` o el dashboard de
// Vercel → Functions). Si el negocio crece y hace falta un registro más
// duro, acá es donde conviene sumar una fila a la misma planilla de Sheets
// que ya usa Personalize.jsx (habría que sumar una acción nueva al
// Apps Script de GOOGLE_APPS_SCRIPT.md) o mandar una alerta propia.
//
// Configurar en: Mercado Pago Developers → Tu aplicación → Webhooks → URL:
// https://<tu-dominio>/api/mercadopago/webhook — evento "Pagos".
const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' })
    return
  }

  // Confirmamos rápido en cualquier escenario — si no respondemos 200, MP
  // reintenta la notificación en loop.
  if (!ACCESS_TOKEN) {
    res.status(200).json({ ok: true })
    return
  }

  try {
    const paymentId = req.query['data.id'] || req.body?.data?.id
    const topic = req.query.type || req.body?.type

    if (topic === 'payment' && paymentId) {
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      })
      const data = await mpRes.json()
      console.log('[MP webhook] pago', paymentId, data.status, data.external_reference)
    }
  } catch (err) {
    console.error('[MP webhook] error', err)
  }

  res.status(200).json({ ok: true })
}
