# veintidós — Invitaciones digitales de autor

Stack: **React 18 + Vite + Tailwind CSS + Framer Motion + React Router**

## Correr en local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview   # para probar el build ya compilado, como en producción
```

## Antes de publicar — completar estos datos

En `src/data/site.js`:

- `BANK_DATA` → tu alias, CBU y titular reales (se muestran en el checkout).
- `GOOGLE_SHEETS_URL` → la URL de tu Web App de Google Apps Script. Instrucciones paso a
  paso en **`GOOGLE_APPS_SCRIPT.md`**. Mientras no la configures, el formulario simplemente
  no intenta el envío automático — el flujo de WhatsApp sigue funcionando igual.

## Flujo de compra

1. `/catalogo` — el cliente arma su pedido y lo agrega al carrito (`CartContext`, compartido
   entre páginas).
2. `/carrito` → `/checkout` — ve el alias/CBU para transferir, con botón de copiar.
3. Al tocar **"Ya transferí, continuar"**, pasa a `/completar-datos` con la referencia del
   pedido en el estado de la ruta.
4. Formulario de 4 pasos: Datos del anfitrión → Evento → Contenido especial → Comprobante
   (sube foto/PDF de la transferencia). Al enviar:
   - Se manda todo (datos + comprobante en base64) al Web App de Google Sheets.
   - Se muestra un botón para **confirmar por WhatsApp** como respaldo — así el pedido nunca
     se pierde, incluso si el envío a Sheets falla silenciosamente (Apps Script no siempre
     expone una respuesta legible desde el navegador).

También queda accesible en `/personalizar` para quien quiera cargar los datos sin pasar por
el carrito (por ejemplo, si prefiere coordinar todo directo por WhatsApp).

## Estructura

- `src/data/site.js` — contenido editable: WhatsApp, categorías, features, planes, FAQs,
  productos del catálogo, datos bancarios y URL de Google Sheets.
- `src/context/CartContext.jsx` — estado del carrito compartido (en memoria — no persiste
  al recargar la página).
- `src/components/ErrorBoundary.jsx` — si algo se rompe en una sección, se muestra un mensaje
  con botón de volver al inicio en vez de quedar la pantalla en blanco. El error exacto queda
  logueado en la consola del navegador (F12 → Console).
- `vercel.json` — rewrite para que las rutas de React Router (`/catalogo`, `/checkout`, etc.)
  funcionen al entrar directo por URL o al refrescar la página, no solo navegando desde adentro.

## Si la página se traba o queda en blanco al navegar

1. Abrí la consola del navegador (F12 → Console) y fijate si hay un error en rojo — con el
   `ErrorBoundary` ahora debería aparecer también un mensaje en pantalla en vez de congelarse.
2. Verificá que el deploy en Vercel sea el build más reciente (a veces queda cacheada una
   versión vieja del `index.html`).
3. Si el error menciona algún paquete que no está en `package.json` (por ejemplo si se llegó
   a instalar algo relacionado a Mercado Pago en un intento anterior), sacalo — este proyecto
   ya no usa ninguna dependencia de pago, solo transferencia manual.

## Pendiente / próximos pasos sugeridos

- Persistir el carrito (localStorage) para que sobreviva a un refresh.
- Reemplazar los gradientes del catálogo por fotos reales de las invitaciones.
- Si el volumen de pedidos crece, migrar de Google Sheets a Supabase (como en tu app de RSVP)
  para tener validación automática del comprobante con IA, igual que ahí.
