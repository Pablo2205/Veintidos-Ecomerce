// Envía el formulario post-compra / de personalización a una Google Sheet
// a través de un Google Apps Script Web App. Ver GOOGLE_SHEETS_SETUP.md
// para el script exacto que hay que pegar en Apps Script.
import { GAS_WEBHOOK_URL } from '../data/site.js'

export async function submitToSheet(payload) {
  if (!GAS_WEBHOOK_URL) {
    console.warn('VITE_GAS_WEBHOOK_URL no está configurada — no se guardó en Sheets.')
    return { ok: false, skipped: true }
  }

  try {
    // Los Web Apps de Apps Script no devuelven headers CORS legibles desde
    // el cliente, así que usamos 'no-cors': el POST se envía igual y la
    // fila se agrega, pero no podemos leer la respuesta de vuelta.
    await fetch(GAS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    })
    return { ok: true }
  } catch (err) {
    console.error('Error enviando a Google Sheets:', err)
    return { ok: false, error: err }
  }
}
