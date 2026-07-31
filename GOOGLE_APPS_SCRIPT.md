# Conectar el formulario a Google Sheets (+ mails de confirmación)

El formulario de `/completar-datos` (y `/personalizar`) manda los datos por `fetch` a un
**Web App de Google Apps Script**. Vos controlás ese script — corre en tu cuenta de Google,
no depende de este proyecto ni de Vercel. Además de guardar la fila, el script manda dos
mails automáticos: uno al cliente confirmando el pedido, y otro a vos avisándote que entró
uno nuevo.

## 1. Crear la planilla

1. Andá a [sheets.google.com](https://sheets.google.com) y creá una planilla nueva, por ejemplo
   `veintidós — Pedidos`.
2. En la primera fila (fila 1) poné estos encabezados, en este orden:

```
Fecha | Referencia | Método de pago | Total pagado | Plan | Nombres | WhatsApp | Email | Tipo de evento | Fecha del evento | Lugar | Dirección | Maps | Regalos | Dress code | Música | Galería (link) | Video | Personalización | Pedido (resumen) | Comprobante (link)
```

> Si ya tenías la planilla creada con los encabezados viejos (sin "Método de pago" ni "Total
> pagado"), insertá esas dos columnas nuevas después de "Referencia" y antes de "Plan" — el
> orden tiene que coincidir con el `appendRow` del script de abajo.

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
// Tu email — acá llega la notificación de "pedido nuevo".
const OWNER_EMAIL = 'hola@veintidos.ar'

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
      data.paymentMethod === 'mercadopago' ? 'Mercado Pago' : 'Transferencia',
      data.totalPaid || '',
      data.plan || '',
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
      data.galleryLink || '',
      data.videoLink || '',
      data.customization || '',
      pedidoResumen,
      comprobanteLink,
    ])

    enviarMails(data, pedidoResumen, comprobanteLink)

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

function enviarMails(data, pedidoResumen, comprobanteLink) {
  // Mail al cliente, solo si dejó un email cargado.
  if (data.email) {
    const cuerpoCliente = `Hola ${data.names || ''}!

Recibimos tu pedido (referencia ${data.orderRef || 'sin referencia'}) correctamente.

Plan: ${data.plan || '-'}
Evento: ${data.eventType || '-'} — ${data.date || 'fecha a definir'}
Lugar: ${data.venue || '-'}

En breve nos vamos a comunicar con vos por WhatsApp o email para coordinar los
próximos pasos y arrancar con el diseño.

Gracias por elegir veintidós ✦
`
    MailApp.sendEmail({
      to: data.email,
      subject: `veintidós — Recibimos tu pedido (${data.orderRef || 'sin referencia'})`,
      body: cuerpoCliente,
    })
  }

  // Notificación para vos, con todos los datos + links.
  const cuerpoDueno = `Nuevo pedido recibido.

Referencia: ${data.orderRef || '-'}
Método de pago: ${data.paymentMethod === 'mercadopago' ? 'Mercado Pago' : 'Transferencia'}
Total pagado: ${data.totalPaid || '-'}
Plan: ${data.plan || '-'}
Nombres: ${data.names || '-'}
WhatsApp: ${data.whatsapp || '-'}
Email: ${data.email || '-'}
Evento: ${data.eventType || '-'} — ${data.date || 'fecha a definir'}
Lugar: ${data.venue || '-'} (${data.address || '-'})
Maps: ${data.mapsLink || '-'}
Regalos: ${data.gifts || '-'}
Dress code: ${data.dressCode || '-'}
Música: ${data.playlist || '-'}
Galería: ${data.galleryLink || '-'}
Video: ${data.videoLink || '-'}
Personalización: ${data.customization || '-'}
Pedido: ${pedidoResumen || '-'}
Comprobante: ${comprobanteLink || 'no adjuntó, revisar WhatsApp'}
`
  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: `Nuevo pedido veintidós — ${data.names || data.orderRef || ''}`,
    body: cuerpoDueno,
  })
}
```

3. Reemplazá `PEGAR_ID_DE_CARPETA_ACA` por el ID real de una carpeta de Drive (creála antes),
   y `OWNER_EMAIL` por el mail donde querés recibir el aviso de pedido nuevo.

## 3. Publicar como Web App

1. Arriba a la derecha: **Implementar → Nueva implementación**.
2. Tipo: **Aplicación web**.
3. "Ejecutar como": vos (tu cuenta).
4. "Quién tiene acceso": **Cualquier usuario** (si no, el formulario no va a poder llamarlo desde el navegador del cliente).
5. Implementar → autorizá los permisos que pida (acceso a Sheets, Drive **y Gmail**, por el
   envío de mails) → copiá la URL que te da, termina en `/exec`.

## 4. Conectarlo al proyecto

Pegá esa URL en `src/data/site.js`:

```javascript
export const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycb.../exec'
```

Volvé a hacer build/deploy y listo — cada envío del formulario agrega una fila a tu planilla,
con el comprobante guardado en Drive y linkeado, y salen los dos mails automáticos.

## Notas

- El `fetch` desde el navegador usa `mode: 'no-cors'`, así que el frontend nunca sabe si el envío
  falló del lado de Google (Apps Script no siempre expone headers CORS legibles). Por eso el
  formulario **siempre** te ofrece confirmar por WhatsApp al final, como red de seguridad — aunque
  el envío a Sheets falle silenciosamente, el pedido no se pierde.
- Cada vez que edites el script en Apps Script tenés que hacer **Implementar → Gestionar
  implementaciones → editar (ícono de lápiz) → Nueva versión**, si no los cambios no se publican.
- `MailApp.sendEmail` tiene una cuota diaria gratuita (~100 mails/día en una cuenta Gmail normal,
  más si es Google Workspace) — de sobra para el volumen de un negocio como este.
- Si el cliente no cargó email, simplemente no se manda el mail de confirmación a él (el aviso a
  vos sí llega siempre).
- **Cruzar pagos con pedidos:** para transferencias, cada fila tiene la "Referencia" (`orderRef`,
  ej. `VD-123456`) y el checkout le pide al cliente que la use como concepto de la transferencia —
  buscala en el resumen del banco. Para Mercado Pago no hay forma de inyectar esa referencia en el
  link de pago (es un link de monto fijo, no una integración con API), así que ahí el cruce es
  manual: como cada plan tiene un precio distinto, y el detalle del pago en tu cuenta de Mercado
  Pago muestra nombre/email del pagador, alcanza con comparar monto + nombre/email contra la fila
  de la planilla con "Método de pago" = Mercado Pago y sin comprobante (no se pide, porque el
  formulario no muestra ese paso cuando se pagó por Mercado Pago).
- Los comprobantes pesados (fotos de alta resolución) pueden tardar unos segundos en subir — es
  esperable, no es un error.
