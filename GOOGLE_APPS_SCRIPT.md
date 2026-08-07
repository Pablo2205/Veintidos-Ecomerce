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
const OWNER_EMAIL = 'veintidos.invitaciones@gmail.com'
// Casilla real de contacto — se usa como "Responder a" en el mail al cliente,
// para que si contesta el mail te llegue a vos.
const CONTACT_EMAIL = 'veintidos.invitaciones@gmail.com'
const WHATSAPP_LINK = 'https://wa.me/5491139126543'
// Nombre de marca que ve el destinatario en el "De:" del mail (en vez de la
// cuenta de Gmail cruda) — esto es lo que hace que se vea más profesional.
const BRAND_NAME = 'veintidós — Invitaciones Digitales'
// Secret key de reCAPTCHA v3 (console.google.com/recaptcha, no
// google.com/recaptcha/admin viejo). A diferencia del site key (que sí va
// en el frontend, en VITE_RECAPTCHA_SITE_KEY), esta NUNCA se comparte, no
// se sube a ningún repo — se pega directo acá, en un script que solo vos
// podés editar.
const RECAPTCHA_SECRET_KEY = 'PEGAR_SECRET_KEY_ACA'
// Puntaje mínimo de reCAPTCHA v3 (0 = seguro que es un bot, 1 = seguro que
// es una persona). 0.5 es el default recomendado por Google.
const RECAPTCHA_SCORE_MIN = 0.5
// Logo en base64 (recorte "wordmark" sin tagline, fondo transparente — el
// mismo que usa el Nav del sitio). Se manda como imagen embebida (inline),
// no como link a una imagen externa, para que se vea siempre aunque el
// hosting cambie o el cliente bloquee imágenes remotas.
const LOGO_BASE64 = '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'
// Se construye una sola vez y se reutiliza en los dos mails.
function logoBlob() {
  return Utilities.newBlob(Utilities.base64Decode(LOGO_BASE64), 'image/png', 'logo.png')
}
function formatMoney(n) {
  const num = Number(n)
  if (!n || isNaN(num)) return ''
  const digits = String(Math.round(num))
  let out = ''
  for (let i = 0; i < digits.length; i++) {
    const posFromEnd = digits.length - i
    out += digits[i]
    if (posFromEnd > 1 && posFromEnd % 3 === 1) out += '.'
  }
  return '$' + out
}

// --- Validación anti-spam / anti-abuso -------------------------------
// Este Web App es, por naturaleza, un endpoint público sin login (lo tiene
// que poder llamar cualquier visitante del sitio). Sin estas validaciones,
// cualquiera podría mandarle datos falsos a la planilla o usarlo para
// disparar el mail de "recibimos tu pedido" hacia el email de un tercero.
function verificarRecaptcha(token) {
  if (!RECAPTCHA_SECRET_KEY || RECAPTCHA_SECRET_KEY === 'PEGAR_SECRET_KEY_ACA') {
    // Todavía no configuraste la secret key — no bloqueamos pedidos reales
    // por accidente, pero esta es justamente la ventana de riesgo que se
    // cierra al completarla. Ver GOOGLE_APPS_SCRIPT.md, sección reCAPTCHA.
    return true
  }
  if (!token) return false
  try {
    const resp = UrlFetchApp.fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'post',
      payload: { secret: RECAPTCHA_SECRET_KEY, response: token },
      muteHttpExceptions: true,
    })
    const result = JSON.parse(resp.getContentText())
    return result.success === true && (typeof result.score !== 'number' || result.score >= RECAPTCHA_SCORE_MIN)
  } catch (err) {
    // Si el servicio de Google no responde, no le hacemos perder un pedido
    // real a alguien por un problema de red ajeno — se deja pasar.
    return true
  }
}

function esEmailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Corta strings a un largo razonable antes de guardarlos — evita que un
// payload malicioso o corrupto infle una celda de la planilla o el cuerpo
// de un mail con megabytes de texto.
function limitar(valor, maxLargo) {
  return typeof valor === 'string' ? valor.slice(0, maxLargo) : valor
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)

    if (!verificarRecaptcha(data.recaptchaToken)) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'recaptcha' })).setMimeType(
        ContentService.MimeType.JSON
      )
    }
    if (!data.names || !data.whatsapp) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: 'faltan_campos_obligatorios' })
      ).setMimeType(ContentService.MimeType.JSON)
    }
    if (data.email && !esEmailValido(data.email)) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'email_invalido' })).setMimeType(
        ContentService.MimeType.JSON
      )
    }
    // Largos generosos para no molestar a nadie real, pero acotados.
    data.names = limitar(data.names, 200)
    data.whatsapp = limitar(data.whatsapp, 60)
    data.email = limitar(data.email, 200)
    data.venue = limitar(data.venue, 300)
    data.address = limitar(data.address, 300)
    data.gifts = limitar(data.gifts, 2000)
    data.dressCode = limitar(data.dressCode, 500)
    data.playlist = limitar(data.playlist, 500)
    data.customization = limitar(data.customization, 2000)

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)

    let comprobanteLink = ''
    if (data.comprobanteBase64) {
      comprobanteLink = guardarComprobante(data.comprobanteBase64, data.comprobanteNombre, data.orderRef)
    }

    // Incluye el código de referencia del diseño (ej. "BOD-EDI-01") cuando
    // viene en el pedido, para poder identificar exactamente qué invitación
    // se compró sin tener que abrir el link del catálogo.
    const pedidoResumen = (data.cartSummary || [])
      .map((it) => `${it.code ? it.code + ' — ' : ''}${it.name} (${it.plan}) x${it.qty}`)
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

## 5. Activar reCAPTCHA v3 (recomendado, cierra el hueco de spam)

Sin esto, el Web App sigue funcionando (`verificarRecaptcha` deja pasar todo mientras
`RECAPTCHA_SECRET_KEY` no esté configurada) pero queda expuesto a que alguien lo llame
directamente con datos falsos. Son 5 minutos:

1. Andá a [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin) con tu cuenta
   de Google → **+** (crear sitio nuevo).
2. Elegí **reCAPTCHA v3**, cargá el dominio real del sitio (ej. `veintidos.ar` o el que uses en
   Vercel) y aceptá los términos.
3. Te da dos claves:
   - **Site key** (pública) → pegala en `.env` como `VITE_RECAPTCHA_SITE_KEY` (y en las
     Environment Variables de Vercel, si no el login funciona local pero no en producción).
   - **Secret key** (privada) → pegala en el script de Apps Script, en `RECAPTCHA_SECRET_KEY`
     (arriba de todo del script, sección 2 de esta guía).
4. Con el script ya actualizado: **Implementar → Gestionar implementaciones → editar → Nueva
   versión** (si no, sigue corriendo la versión vieja sin la verificación).
5. Rebuild/deploy del frontend para que tome el nuevo `VITE_RECAPTCHA_SITE_KEY`.

No hace falta ningún checkbox ni desafío visual para quien completa el formulario — reCAPTCHA
v3 es invisible, solo le pone un puntaje a la interacción y el script lo rechaza si parece un
bot (`RECAPTCHA_SCORE_MIN`, default 0.5).

## Notas

- **Cambio reciente (código de referencia por diseño):** el frontend ahora manda `id` y
  `code` de cada producto dentro de `cartSummary`, y la línea de `pedidoResumen` de este
  script ya los incluye. Si tu Web App en script.google.com todavía tiene la versión
  vieja de `pedidoResumen`, pegá el bloque de código actualizado de este documento y
  hacé **Implementar → Gestionar implementaciones → editar → Nueva versión** — si no,
  el "Pedido (resumen)" de la planilla va a seguir mostrando solo nombre/plan, sin el
  código.
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
