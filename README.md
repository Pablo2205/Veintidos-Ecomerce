# veintidós — Invitaciones digitales de autor

Sitio de e-commerce para vender invitaciones digitales (Boda y Cumple XV), con catálogo,
carrito, checkout por transferencia y un formulario post-compra que sube el comprobante y
carga los datos del evento a una Google Sheet.

Stack: **React 18 + Vite + Tailwind CSS + Framer Motion + React Router**. Sin backend propio:
todo corre en el navegador salvo el guardado en Sheets, que usa Google Apps Script (gratis,
de tu cuenta de Google).

---

## 1. Cómo correrlo

```bash
npm install
npm run dev        # http://localhost:5173 — hot reload, para desarrollar
```

```bash
npm run build       # genera /dist optimizado para producción
npm run preview      # sirve /dist localmente, para probar el build final
```

**Importante:** el comando es `npm run dev`, no `npm start` (ese es de Create React App, no de
Vite).

### Deploy en Vercel

1. Subí este repo completo a GitHub (reemplazando el anterior por completo — ver sección
   "Si algo se rompe" más abajo, es importante no mezclar código viejo con este).
2. En Vercel: **Import Project** → elegí el repo. Framework preset: **Vite** (lo detecta solo).
3. No hace falta configurar nada más — no hay variables de entorno obligatorias.

---

## 2. Estructura del proyecto

```
veintidos/
├── index.html                     ← metadata del sitio (título, fuentes)
├── vercel.json                    ← hace que /catalogo, /checkout, etc. funcionen
│                                     al entrar directo por URL (no solo navegando)
├── tailwind.config.js             ← paleta de colores y tipografías
├── GOOGLE_APPS_SCRIPT.md          ← cómo conectar el formulario a Google Sheets
└── src/
    ├── data/site.js                ← ⭐ TODO EL CONTENIDO EDITABLE VIVE ACÁ
    ├── context/CartContext.jsx     ← estado del carrito (compartido entre páginas)
    ├── components/                 ← piezas reutilizables (Nav, Hero, Plans, etc.)
    └── pages/                      ← una página por ruta
        ├── Home.jsx                 → /
        ├── Catalog.jsx               → /catalogo
        ├── Cart.jsx                  → /carrito
        ├── Checkout.jsx               → /checkout
        └── Personalize.jsx            → /personalizar y /completar-datos
```

---

## 3. Dónde modificar cada cosa

Casi todo el contenido del sitio (textos, precios, WhatsApp, datos bancarios) está
centralizado en **`src/data/site.js`**. Modificás ese archivo y se actualiza en todas las
páginas que lo usan — no hay que tocar los componentes para cambios de contenido.

| Querés cambiar... | Editá esto |
|---|---|
| Número de WhatsApp | `WA_NUMBER` en `src/data/site.js` |
| Alias / CBU / titular (checkout) | `BANK_DATA` en `src/data/site.js` |
| Link de Google Sheets | `GOOGLE_SHEETS_URL` en `src/data/site.js` (ver `GOOGLE_APPS_SCRIPT.md`) |
| Tamaño máximo del comprobante | `MAX_COMPROBANTE_MB` en `src/data/site.js` |
| Qué tipos de evento existen | `categories` en `src/data/site.js` — hoy son solo Boda y Cumple XV |
| Textos de "qué incluye la invitación" | `features` en `src/data/site.js` |
| Planes y precios | `plans` en `src/data/site.js` — `price` es el número en pesos |
| Pasos de "cómo pedir" | `steps` en `src/data/site.js` |
| Preguntas frecuentes | `faqs` en `src/data/site.js` |
| Productos del catálogo (demos) | `products` en `src/data/site.js` |
| Colores del sitio | `tailwind.config.js` → sección `colors` |
| Tipografías | `tailwind.config.js` → `fontFamily`, se cargan desde Google Fonts en `index.html` |

### Agregar un evento nuevo (por ejemplo "Bautismo")

1. En `src/data/site.js`, agregá un objeto a `categories`:
   ```js
   { slug: 'bautismo', name: 'Bautismo', desc: 'Descripción corta...' }
   ```
2. Agregalo también como `<option>` en el selector de tipo de evento, en
   `src/pages/Personalize.jsx` (buscá `<select className="field-input-boxed" value={data.eventType}`).
3. Sumá productos de catálogo con `category: 'bautismo'` en el array `products`.
4. En `src/pages/Catalog.jsx`, agregá la entrada al objeto `categoryLabels` al principio del
   archivo.

### Cambiar/agregar productos del catálogo

En `products` (dentro de `src/data/site.js`), cada producto es:
```js
{ id: 7, name: 'Nombre visible', category: 'boda', plan: 'Standard', price: 78000, gradient: 'from-[#COLOR1] to-[#COLOR2]' }
```
Hoy las tarjetas usan un degradé de color en vez de foto real. Para usar fotos reales hay que
cambiar el bloque de la tarjeta en `src/pages/Catalog.jsx` (el `<div className="... bg-gradient-to-br ...">`)
por una etiqueta `<img src={p.image} />`, y agregar el campo `image` a cada producto.

---

## 4. Cómo funciona el flujo de compra

```
Catálogo (/catalogo)
   │  el cliente agrega productos → CartContext (estado compartido)
   ▼
Carrito (/carrito)
   │  revisa cantidades, "Finalizar compra"
   ▼
Checkout (/checkout)
   │  ve alias/CBU con botón de copiar
   │  "Ya transferí, continuar"
   ▼
Formulario (/completar-datos)
   │  4 pasos: Datos del anfitrión → Evento → Contenido especial → Comprobante
   │  al enviar: sube el comprobante + todos los datos a Google Sheets
   ▼
Confirmación
      botón para confirmar por WhatsApp (siempre visible, como respaldo)
```

- El **carrito** (`src/context/CartContext.jsx`) vive en memoria de React — se comparte entre
  Catálogo, Carrito y Checkout mientras navegás, pero **se vacía si recargás la página**. Si
  más adelante querés que sobreviva a un refresh, se puede guardar en `localStorage` (avisame
  y lo agrego).
- El ícono del carrito en el menú (arriba a la derecha) muestra la cantidad de productos en
  tiempo real — se actualiza solo, no hay que tocar nada para que funcione.
- `/personalizar` y `/completar-datos` son la **misma página** (mismo componente
  `Personalize.jsx`). La diferencia es que `/completar-datos` llega con la referencia del
  pedido y el resumen del carrito ya cargados (te los pasa el Checkout automáticamente);
  `/personalizar` se usa cuando alguien quiere cargar sus datos sin pasar por el carrito.

### El formulario y Google Sheets

El formulario manda los datos a un **Google Apps Script** que vos controlás (no depende de
este código ni de Vercel). Mientras no configures `GOOGLE_SHEETS_URL` en `src/data/site.js`,
el formulario simplemente no intenta el envío automático, pero el botón de WhatsApp al final
sigue funcionando igual — así nunca se pierde un pedido. Instrucciones completas, con el
código para pegar en Google Apps Script, en **`GOOGLE_APPS_SCRIPT.md`**.

---

## 5. Si la página se rompe o queda en blanco

Desde esta iteración, si algo falla en una sección **ya no se congela la pantalla**: hay un
`ErrorBoundary` (`src/components/ErrorBoundary.jsx`) que muestra un mensaje con botón
"Volver al inicio", y el error real queda en la consola del navegador.

Pasos para diagnosticar:

1. Abrí el sitio, apretá **F12** (o clic derecho → Inspeccionar) y andá a la pestaña
   **Console**.
2. Navegá hasta reproducir el problema. Va a aparecer un error en rojo — copiá el texto
   completo.
3. Si el error menciona algo que no reconocés (un paquete, una variable), es señal de que hay
   código de una versión anterior mezclado con este. **La forma más segura de evitar esto es
   reemplazar el repo entero por este ZIP, no ir pegando archivo por archivo** — así no quedan
   restos de intentos anteriores (por ejemplo, en una versión previa había código duplicado de
   Mercado Pago que ya no se usa).
4. Si seguís sin poder ubicar el error, pasámelo tal cual aparece en la consola y lo reviso
   puntual.

---

## 6. Pendientes / próximos pasos sugeridos

- Persistir el carrito en `localStorage` para que no se vacíe al refrescar.
- Reemplazar los degradés de color del catálogo por fotos reales de las invitaciones.
- Si el volumen de pedidos crece, migrar de Google Sheets a Supabase (como en tu app de RSVP
  de la boda) para tener validación automática del comprobante con IA, igual que ahí.
