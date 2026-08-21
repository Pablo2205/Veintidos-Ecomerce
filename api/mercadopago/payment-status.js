// Función serverless — consulta el estado REAL de un pago en Mercado Pago.
// Es la pieza que cierra el hueco de "honor system" del checkout viejo: en
// vez de confiar en que el cliente apretó "Ya pagué, continuar" de buena fe,
// Checkout.jsx llama acá y solo deja avanzar al formulario si MP confirma un
// pago aprobado de verdad.
//
// Acepta DOS formas de consulta:
// - ?payment_id=123          → un pago puntual (cuando MP nos lo da directo,
//   ej. al volver de un redirect con back_urls).
// - ?order_ref=VD-123456     → busca por `external_reference` (nuestro
//   orderRef) — es la que usa el botón "Ya pagué, continuar" en Checkout.jsx,
//   porque el pago se abre en una pestaña nueva y no volvemos con un
//   payment_id en la URL de esta pestaña.
const ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ ok: false, error: 'method_not_allowed' })
    return
  }
  if (!ACCESS_TOKEN) {
    res.status(503).json({ ok: false, error: 'mercadopago_not_configured' })
    return
  }

  const paymentId = req.query.payment_id
  const orderRef = req.query.order_ref

  if (!paymentId && !orderRef) {
    res.status(400).json({ ok: false, error: 'falta_payment_id_o_order_ref' })
    return
  }

  try {
    if (paymentId) {
      const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
      })
      const data = await mpRes.json()
      if (!mpRes.ok) {
        res.status(502).json({ ok: false, error: 'mercadopago_error', detail: data })
        return
      }
      res.status(200).json({
        ok: true,
        status: data.status,
        statusDetail: data.status_detail,
        externalReference: data.external_reference,
        transactionAmount: data.transaction_amount,
      })
      return
    }

    // Búsqueda por referencia — puede haber más de un intento de pago con la
    // misma referencia (ej. el cliente reintentó); nos quedamos con el más
    // reciente.
    const searchUrl = `https://api.mercadopago.com/v1/payments/search?external_reference=${encodeURIComponent(
      orderRef
    )}&sort=date_created&criteria=desc`
    const mpRes = await fetch(searchUrl, { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } })
    const data = await mpRes.json()
    if (!mpRes.ok) {
      res.status(502).json({ ok: false, error: 'mercadopago_error', detail: data })
      return
    }
    const payment = data.results?.[0]
    if (!payment) {
      res.status(200).json({ ok: true, status: 'not_found' })
      return
    }
    res.status(200).json({
      ok: true,
      status: payment.status,
      statusDetail: payment.status_detail,
      externalReference: payment.external_reference,
      transactionAmount: payment.transaction_amount,
    })
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err?.message || err) })
  }
}
