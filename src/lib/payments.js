// Crea una preferencia de pago en Mercado Pago llamando a la función
// serverless /api/create-preference y devuelve la URL a la que redirigir.
export async function createMpPreference({ items, payer, orderId }) {
  const res = await fetch('/api/create-preference', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items, payer, orderId }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data?.error || 'No pudimos iniciar el pago con Mercado Pago.')
  }
  return data // { init_point, id }
}
