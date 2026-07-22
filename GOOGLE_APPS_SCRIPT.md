# Conectar el formulario a Google Sheets

El formulario de `/completar-datos` (y `/personalizar`) manda los datos por `fetch` a un
**Web App de Google Apps Script**. Vos controlás ese script — corre en tu cuenta de Google,
no depende de este proyecto ni de Vercel.

## 1. Crear la planilla

1. Andá a [sheets.google.com](https://sheets.google.com) y creá una planilla nueva, por ejemplo
   `veintidós — Pedidos`.
2. En la primera fila (fila 1) poné estos encabezados, en este orden:

```
Fecha | Referencia | Nombres | WhatsApp | Email | Tipo de evento | Fecha del evento | Lugar | Dirección | Maps | Regalos | Dress code | Playlist | Video | Pedido (resumen) | Comprobante (link)
```

## 2. Pegar el script

1. En la misma planilla: **Extensiones → Apps Script**.
2. Borrá el contenido de `Código.gs` y pegá esto:

```javascript
// Nombre de la hoja donde se van a guardar las filas.
const SHEET_NAME = 'Hoja 1'
// ID de una carpeta de Google Drive donde guardar los comprobantes.
// Creála en drive.google.com, abrila, y copiá el ID de la URL
// (https://drive.google.com/drive/folders/ESTE_ES_EL_ID)
const DRIVE_FOLDER_ID = 'PEGAR_ID_DE_CARPETA_ACA'

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)

    let comprobanteLink = ''
    if (data.comprobanteBase64) {
      comprobanteLink = guardarComprobante(data.comprobanteBase64, data.comprobanteNombre, data.orderRef)
    }

    const pedidoResumen = (data.cartSummary || [])
      .map((it) => `${it.name} (${it.plan}) x${it.qty}`)
      .join(' | ')

    sheet.appendRow([
      new Date(),
      data.orderRef || '',
      data.names || '',
      data.whatsapp || '',
      data.email || '',
      data.eventType || '',
      data.date || '',
      data.venue || '',
      data.address || '',
      data.mapsLink || '',
      data.gifts || '',
      data.dressCode || '',
      data.playlist || '',
      data.videoLink || '',
      pedidoResumen,
      comprobanteLink,
    ])

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    )
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(
      ContentService.MimeType.JSON
    )
  }
}

function guardarComprobante(base64, nombreArchivo, orderRef) {
  // base64 viene como "data:image/png;base64,AAAA..." — separamos el mime type del contenido.
  const match = base64.match(/^data:(.+);base64,(.*)$/)
  if (!match) return ''
  const mimeType = match[1]
  const contenido = match[2]

  const blob = Utilities.newBlob(Utilities.base64Decode(contenido), mimeType, `${orderRef}-${nombreArchivo || 'comprobante'}`)
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID)
  const file = folder.createFile(blob)
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)
  return file.getUrl()
}
```

3. Reemplazá `PEGAR_ID_DE_CARPETA_ACA` por el ID real de una carpeta de Drive (creála antes).

## 3. Publicar como Web App

1. Arriba a la derecha: **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. "Ejecutar como": vos (tu cuenta).
4. "Quién tiene acceso": **Cualquier usuario** (si no, el formulario no va a poder llamarlo desde el navegador del cliente).
5. Implementar → autorizá los permisos que pida (acceso a Sheets y Drive) → copiá la URL que te da,
   termina en `/exec`.

## 4. Conectarlo al proyecto

Pegá esa URL en `src/data/site.js`:

```javascript
export const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycb.../exec'
```

Volvé a hacer build/deploy y listo — cada envío del formulario agrega una fila a tu planilla,
con el comprobante guardado en Drive y linkeado.

## Notas

- El `fetch` desde el navegador usa `mode: 'no-cors'`, así que el frontend nunca sabe si el envío
  falló del lado de Google (Apps Script no siempre expone headers CORS legibles). Por eso el
  formulario **siempre** te ofrece confirmar por WhatsApp al final, como red de seguridad — aunque
  el envío a Sheets falle silenciosamente, el pedido no se pierde.
- Cada vez que edites el script en Apps Script tenés que hacer **Implementar → Gestionar
  implementaciones → editar (ícono de lápiz) → Nueva versión**, si no los cambios no se publican.
- Los comprobantes pesados (fotos de alta resolución) pueden tardar unos segundos en subir — es
  esperable, no es un error.
