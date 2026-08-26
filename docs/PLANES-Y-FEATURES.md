# Qué incluye cada plan y cómo se implementa

Este documento junta dos cosas: (1) qué le prometemos al cliente en cada plan (según
`plans` en `src/data/site.js`) y (2) cómo se construye técnicamente cada feature cuando
armamos la invitación real en `public/demos/<evento>/<slug>/index.html`. Es la referencia
para no vender algo que después no sabemos cómo construir, y para no olvidarnos de
implementar algo que sí vendimos.

Las demos existentes (`lucia-juan`, `lorena-gustavo`, `juan-ana`, `olivia-ralph`) ya tienen
varias de estas técnicas resueltas — están citadas abajo con archivo y línea aproximada
para copiarlas directo.

---

> **Precios:** viven únicamente en `shared/pricing.js` (`PLAN_PRICING`), no acá — no
> repetir montos en este doc para no desincronizarlos. Los que había antes (Essential
> $56.000 / Standard $78.000 / Premium $88.000) ya no son los reales.

> **Redefinido ago 2026** (a pedido de Pablo): Essential pasó a ser el tier de las demos
> HTML hechas a mano — como casi todas ya traían música, galería y dress code, esas tres
> features se movieron de "Standard en adelante" a Essential, para que la promesa del plan
> coincida con lo que las demos existentes ya muestran. Standard y Premium pasaron a ser
> exclusivamente las demos armadas en Framer; lo que las distingue entre sí ya no es texto
> de HTML (Framer no se arma con este flujo) sino el trabajo de diseño/animación en Framer
> mismo (Standard) más las features de Premium de abajo (sugerencia de canciones, video, etc.)
>
> **Sacado ago 2026** (a pedido de Pablo): "Panel de confirmaciones en tiempo real" salió
> de la oferta de Premium — era la única feature que de verdad necesitaba backend propio
> (no algo que Framer resuelva con un componente), así que no valía la pena sostenerla
> como promesa de venta. Si en algún momento se retoma, es un desarrollo aparte a
> presupuestar, no algo que ya esté incluido en ningún plan.

## 1. Essential — demos HTML hechas a mano

| Incluye | Cómo se implementa |
|---|---|
| Diseño adaptado a tu evento | HTML standalone a medida, ver `docs/PROMPT-PERSONALIZACION.md` |
| Cuenta regresiva | `setInterval` recalculando la diferencia contra un `new Date('YYYY-MM-DDTHH:MM:SS')` fijo, actualiza `#cd-days/#cd-hours/#cd-min/#cd-sec` cada 1000ms. Ejemplo real: `lucia-juan/index.html:291-318`. |
| Fecha, lugar y mapa | Texto con fecha/hora/lugar + botón que linkea a `https://www.google.com/maps/search/?api=1&query=<lugar codificado>` (no es un iframe embebido, es un link que abre Google Maps). Ejemplo: `lucia-juan/index.html:202-205`. |
| Confirmación por WhatsApp | ⚠️ **Pendiente de corregir en las demos existentes.** El botón de RSVP en `juan-ana/index.html:329-413` hoy es solo un efecto visual (lluvia de corazones) — **no manda nada a ningún lado**. Para una invitación real hay que reemplazarlo por un link `https://wa.me/<WhatsApp del cliente>?text=<mensaje precargado con el nombre>`, así la confirmación le llega de verdad al anfitrión (no a nosotros). |
| Sección de regalos | Texto + alias/CBU del cliente con botón "copiar" (`navigator.clipboard.writeText`). Hay un patrón de copiado ya armado y funcionando para un hashtag en `olivia-ralph/index.html:340-341` y `:414-415` — reusar la misma lógica para el alias/CBU. |
| Música de fondo a elección | ⚠️ **No implementado todavía en ninguna demo actual.** Se arma con `<audio autoplay loop>` + un botón flotante de mute/unmute (los navegadores bloquean el autoplay con sonido, así que hace falta un toggle visible para que el usuario lo active con un tap). El archivo de audio lo sube el cliente o se linkea desde una fuente que permita hotlink. |
| Galería de fotos | Dos técnicas ya usadas, elegir según las fotos que mande el cliente: (a) grid real de `<img>` (`olivia-ralph/index.html`, sección `.gallery` ~línea 307-315), o (b) una sola imagen recortada con `background-position` en CSS para simular varias fotos (técnica documentada en `CLAUDE.md` sección 7, usada en `olivia-ralph` para el cortejo). |
| Dress code | Texto + swatches de color (`<span class="swatch" style="background:#HEX">`), sin JS. Ejemplo: `lucia-juan/index.html:258-272`. |
| Tips y notas para invitados | Texto libre, sin implementación especial. |
| Agendar la fecha en el calendario | Botón "Agregar al calendario" que genera un archivo `.ics` en el momento (string armado en JS, convertido a `data:text/calendar;charset=utf8,...` y ofrecido para descargar). Ejemplo completo y funcionando: `olivia-ralph/index.html:329-331` (botón) y `:414-431` (generación del `.ics`). |
| QR listo para imprimir | Se genera **una sola vez**, afuera del HTML de la invitación (no hace falta una librería de QR corriendo en el navegador del invitado) — cualquier generador de QR apuntando a la URL pública de la demo, se exporta como PNG y se le manda al cliente para imprimir. |
| Link para compartir | Es simplemente la URL pública de la demo una vez publicada (`veintidos.ar/demos/... o el dominio que uses`) — no requiere código extra. |

## 2. Standard — demos armadas en Framer

Todo lo de Essential (el cliente elige un diseño de Framer en vez de HTML a mano), más
diseño con transiciones y microinteracciones armadas en el editor visual de Framer — no
hay "cómo se implementa" en código acá, es trabajo de diseño en la plataforma, no en este
repo. Ver conversación pendiente sobre marca de agua/redirect de Framer (`DemoPreviewModal.jsx`).

## 3. Premium — demos armadas en Framer + features de backend

| Incluye | Cómo se implementa |
|---|---|
| Sugerencia de canciones de los invitados | Botón/link a una playlist colaborativa real de Spotify, o a un Google Form. **Ojo:** en `lucia-juan/index.html:279` el botón "Agregar canción" hoy apunta a `href="#"` (placeholder) — para el cliente real hay que reemplazarlo por el link real antes de entregar. |
| Álbum compartido con QR para las mesas | Mismo mecanismo de QR que en Standard, pero apuntando a un destino de carga (carpeta de Google Drive/Fotos compartida con permiso de "cualquiera con el link puede subir", o un form simple) en vez de a la invitación. |
| Sección de video | `<video>` con el archivo, o `<iframe>` embebiendo YouTube/Vimeo — la fuente sale del campo `videoLink` que se carga en el formulario post-compra (`Personalize.jsx`). |
| Personalización avanzada de diseño | A medida, según lo que el cliente escriba en el campo `customization` del formulario — no hay una técnica fija, es trabajo de diseño caso a caso. |
| Prioridad de entrega | No es una feature de código — es una prioridad operativa: el pedido Premium se arma antes que los Essential/Standard en la cola de trabajo. |

---

## Qué campos del formulario alimentan cada feature

`Personalize.jsx` ya junta todo lo necesario. Mapa rápido campo → feature:

| Campo del formulario | Feature que alimenta |
|---|---|
| `names` | Nombres en el hero, monogramas, footer |
| `whatsapp` | Link de RSVP (`wa.me`) y contacto |
| `email` | Mail de confirmación (no se usa en la invitación en sí) |
| `eventType`, `date`, `time` | Cuenta regresiva, fecha mostrada |
| `venue`, `address`, `mapsLink` | Sección de lugar + botón de mapa |
| `gifts` | Sección de regalos (alias/CBU o lista de deseos) |
| `dressCode` (todos los planes) | Sección de vestimenta |
| `playlist` (todos los planes) | Audio de fondo o link de sugerencia de canciones, según plan |
| `galleryLink` (todos los planes) | Fuente de las fotos de la galería |
| `videoLink` (solo Premium) | Sección de video |
| `customization` (solo Premium) | Notas de personalización avanzada |

`planFeatureFlags(plan)` en `site.js` ya calcula qué de esto corresponde mostrar según el
plan — no hace falta reinventar esa lógica al armar la demo, solo replicarla en HTML.

## Pendientes detectados al revisar las demos actuales

Tres gaps reales entre "lo que vendemos" y "lo que hoy hacen las demos de ejemplo" —
no bloquean vender, pero hay que resolverlos **antes de reusar esas demos tal cual para
un cliente real**:

1. El botón de RSVP en `juan-ana` no manda nada a ningún lado (solo animación).
2. El botón "Agregar canción" en `lucia-juan` apunta a `href="#"`.
3. "Música de fondo" (Standard) no tiene ninguna demo que la implemente todavía — la
   primera vez que se venda, va a llevar más tiempo de armado de lo habitual.
