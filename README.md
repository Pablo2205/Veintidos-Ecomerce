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
```

Genera `dist/` listo para Vercel (framework preset: Vite).

## Páginas

- `/` — Home: hero, categorías de evento, cómo funciona, features, planes, FAQ, CTA final
- `/catalogo` — catálogo con filtros por tipo de evento y plan, agregar al carrito
- `/carrito` — carrito con cantidad editable, código de promo, resumen
- `/checkout` — datos personales, info del evento, método de pago, resumen final
- `/personalizar` — formulario multi-paso (anfitriones → evento → contenido especial) que arma un mensaje de WhatsApp con todos los datos cargados

## Estructura

- `src/data/site.js` — **todo el contenido editable**: número de WhatsApp, categorías, features, planes, pasos, FAQs y productos de catálogo. Cambiás acá y se actualiza el sitio entero.
- `src/context/CartContext.jsx` — estado del carrito compartido entre Catálogo, Carrito y Checkout (en memoria — no persiste al recargar; para eso habría que sumar localStorage o Supabase).
- `src/components/` — piezas reutilizables (Hero, Categories, Plans, Faq, etc.)
- `tailwind.config.js` — paleta exacta del sistema de diseño (verde salvia, dorado promo, crema) y tipografías (Playfair Display + Montserrat).

## Pendiente / próximos pasos sugeridos

- Conectar el catálogo a datos reales (imágenes de las invitaciones, precios finales)
- Persistir el carrito (localStorage o backend)
- Conectar el checkout a Mercado Pago / transferencia real
- Guardar los datos del formulario de personalización en una base (Supabase, como en tu app de RSVP) en vez de solo mandarlos por WhatsApp
