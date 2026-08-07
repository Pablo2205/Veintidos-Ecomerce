# veintidós — Contexto completo del proyecto

> Este documento es un resumen completo de todo lo construido, para que cualquiera (o
> cualquier IA, como Claude Code) pueda entender el proyecto de punta a punta sin
> necesitar el historial de la conversación donde se armó. Pegalo como prompt inicial
> o dejalo en la raíz del repo para que lo lea antes de tocar código.

---

## 1. El negocio

**veintidós** es un estudio que vende **invitaciones digitales web** para casamientos,
fiestas de 15 años y baby showers en Argentina. El dueño es Pablo Coria (también corre
`cr.studio`, su estudio de desarrollo web, y trabaja como Systems Engineer en
TIVIT/Edenor). veintidós es un negocio propio, independiente.

**Modelo de negocio:** el cliente elige un plan (Essential / Standard / Premium), paga por
transferencia bancaria, y completa un formulario con los datos de su evento (fecha, lugar,
dress code, etc.). El equipo arma la invitación a medida en base a esos datos y a un diseño
elegido del catálogo. Es un negocio de **productos configurables**, no de invitaciones 100%
automáticas — cada compra dispara un proceso manual de armado del lado de Pablo.

**Eventos que cubre:** **Boda**, **Cumple XV** y **Baby Shower** (con catálogo propio en
cada uno). Cualquier otra celebración (cumpleaños genérico, aniversario, etc.) cae en
"Otro evento" y deriva directo a consulta por WhatsApp, sin catálogo — ver `consultOnly`
en `categories` (`site.js`).
> Nota histórica: hasta agosto 2026 el negocio cubría deliberadamente solo Boda y Cumple
> XV ("se sacaron a propósito baby showers, etc. para simplificar"). Se sumó Baby Shower
> como tercera categoría con catálogo propio a pedido de Pablo — si en algún momento se
> vuelve a acotar el alcance, esta nota queda como registro de que fue una decisión
> consciente, no un olvido.

**Contacto real del negocio:**
- WhatsApp: `+5491139126543`
- Email: `veintidos.invitaciones@gmail.com` (cuenta de Gmail creada específicamente para
  que Google Apps Script pueda mandar mails desde ahí — ver sección 8)
- Instagram: `instagram.com/veintidos.invitaciones` (real)
- Facebook y TikTok: **todavía son placeholders**, no URLs reales

---

## 2. Marca

### Logo
El logo real (`veinti` en un tono + `dós` en itálica dorada, con tagline "INVITACIONES
DIGITALES") fue provisto por Pablo como foto (fondo verde oscuro sólido). A partir de eso
se generaron, con Python/PIL (análisis de color píxel por píxel, no a ojo), dos versiones
con fondo transparente:

- `src/assets/brand/veintidos-logo-on-light.png` — recoloreada para fondos claros:
  "veinti" en el verde primario del sitio (`#182317`), "dós" en el dorado del sitio
  (`#C5A059`). Se usa en el **Footer** (con el tagline incluido).
- `src/assets/brand/veintidos-logo-on-light-wordmark-only.png` — el mismo pero recortado
  sin el tagline (para el **Nav**, donde no entra tanto texto).
- `src/assets/brand/veintidos-logo-dark-bg.png` — colores originales (crema + dorado
  champagne) con fondo transparente, pensada para usarla algún día sobre fondos oscuros
  (todavía sin uso activo en el sitio).

El favicon (`public/favicon.svg`) es un cuadrado verde oscuro con una "v" dorada en
itálica — coherente con la paleta real del logo.

### Paleta de colores (Tailwind, ver `tailwind.config.js`)

| Token | Hex | Uso |
|---|---|---|
| `primary` | `#182317` | Verde muy oscuro — texto principal, fondo del PromoBar, botones sólidos |
| `secondary` | `#52634d` | Verde oliva — acentos, íconos, hover de links |
| `promoGold` | `#C5A059` | Dorado — badges, bordes destacados, foco de inputs, ornamentos ✦ |
| `background` | `#fbf9f4` | Crema — fondo general del sitio |
| `creamSurface` | `#F2EFE9` | Crema un poco más oscuro — secciones alternadas |
| `whatsapp` | `#25D366` | Verde de marca de WhatsApp — **solo** para botones/íconos que llevan a WhatsApp, nunca para otra cosa (para no generar confusión con el verde institucional) |
| `error` | `#ba1a1a` | Errores de formulario |

Hay más tokens (`surfaceContainer*`, `outline*`, etc.) que son variaciones de gris/crema
para bordes y fondos sutiles — ver el archivo completo.

**Regla de oro del proyecto:** cualquier elemento que dirija a WhatsApp (botón, ícono,
link) tiene que usar el color `whatsapp` (#25D366) y el logo real de WhatsApp
(`WhatsAppIcon.jsx`), **nunca** el ícono genérico de "chat" de Material Symbols ni el verde
institucional del sitio. Esto se corrigió explícitamente en una vuelta de feedback porque
generaba ambigüedad visual.

### Tipografías
- **Serif (`font-serif`):** Playfair Display — títulos, nombres de secciones, números de
  precio, monogramas.
- **Sans (`font-sans`):** Montserrat — todo el texto de cuerpo, labels, botones.
- **Íconos:** Material Symbols Outlined (vía Google Fonts), con un componente wrapper
  `Icon.jsx`. **Excepción:** WhatsApp, Instagram, Facebook y TikTok no existen en esa
  librería, así que están armados a mano como SVG propios (`WhatsAppIcon.jsx`,
  `SocialIcon.jsx`).

### Estilo visual general
Editorial/boutique, inspirado en estudios de diseño premium (referencia original:
nk.studio). Grillas punteadas de fondo sutiles, separadores con ✦ dorados, tarjetas con
`hover:border-promoGold`, bordes de foco dorados en inputs. **Sin animaciones pesadas** —
solo transiciones CSS y Framer Motion liviano (fade + slide al hacer scroll, stagger en
grids), nada de WebGL ni librerías de animación pesadas.

---

## 3. Stack técnico

```
React 18 + Vite 5 + Tailwind CSS 3 + Framer Motion 11 + React Router 6
```

Sin backend propio (ningún servidor Node/Express nuestro). Todo el "backend" real corre en
servicios de terceros administrados:
- **Google Sheets + Apps Script** — guarda pedidos, sube comprobantes a Drive, manda mails.
- **Firebase Authentication + Firestore** (agosto 2026) — login/registro con email y
  contraseña, y el carrito guardado de usuarios logueados. Ver sección 9.
- **Mercado Pago** — links de pago de monto fijo por plan (`MP_LINKS` en `site.js`), sin
  integración por API — ver sección 5. Convive con la transferencia bancaria manual como
  segunda opción de pago.
- **WhatsApp** (`wa.me` links) — canal de contacto y confirmación en casi todos los CTAs.
- **Vercel** — hosting + deploy automático desde GitHub.

### Correr en local
```bash
npm install
npm run dev       # NO "npm start" — es Vite, no Create React App
```

### Build
```bash
npm run build      # genera /dist
npm run preview    # sirve /dist localmente
```

---

## 4. Estructura del proyecto

```
veintidos/
├── index.html                  ← metadata (título, fuentes, favicon)
├── vercel.json                 ← ⚠️ ver nota abajo, es crítico
├── tailwind.config.js          ← paleta y tipografías (sección 2)
├── vite.config.js
├── GOOGLE_APPS_SCRIPT.md       ← código completo del backend en Apps Script
├── README.md                   ← guía rápida de uso (versión corta de este documento)
│
├── public/
│   ├── favicon.svg
│   ├── images/
│   │   ├── BODA.jpg            ← foto real de la categoría "Boda" en la Home
│   │   └── XV.jpg               ← foto real de la categoría "Cumple XV" en la Home
│   └── demos/                  ← ⭐ ver sección 7, el sistema de demos de invitaciones
│       ├── lucia-juan/
│       ├── olivia-ralph/
│       ├── juan-ana/
│       └── lorena-gustavo/
│
└── src/
    ├── main.jsx                 ← entry point, envuelve todo en <CartProvider>
    ├── App.jsx                  ← rutas + ErrorBoundary + ScrollManager (maneja anclas #hash)
    ├── index.css                ← utilidades compartidas (.field-input, .btn-primary, etc.)
    │
    ├── assets/
    │   ├── brand/                ← logo real (sección 2)
    │   └── demo-boda.png         ← screenshot real usado en el mockup de iPhone del Hero
    │
    ├── data/
    │   └── site.js               ← ⭐⭐⭐ FUENTE DE VERDAD DE TODO EL CONTENIDO (sección 5)
    │
    ├── context/
    │   ├── CartContext.jsx       ← carrito; se guarda en Firestore si hay sesión iniciada
    │   └── AuthContext.jsx       ← sesión de Firebase Authentication (login/registro)
    │
    ├── components/               ← piezas reutilizables (ver sección 6)
    └── pages/                    ← Home, Catalog, Cart, Checkout, Personalize, Contact
```

### ⚠️ Sobre `vercel.json` — MUY IMPORTANTE

```json
{
  "rewrites": [{ "source": "/((?!demos/).*)", "destination": "/index.html" }]
}
```

Esto NO es un rewrite genérico de SPA. Excluye explícitamente todo lo que empiece con
`/demos/` para que esas carpetas se sirvan como HTML estático real, en vez de que React
Router intente interceptarlas. **Si algún día alguien "simplifica" esto a
`"source": "/(.*)"` (el patrón típico de SPA), todas las demos van a dejar de funcionar**
— van a mostrar la Home de React en vez del HTML de la invitación. Este bug ya pasó una
vez en el proyecto (con una versión anterior del rewrite) y costó varias vueltas de
debugging encontrarlo.

---

## 5. `src/data/site.js` — la fuente de verdad

Este archivo es, con diferencia, el más importante del proyecto. Centraliza **todo** el
contenido editable: no hay textos hardcodeados sueltos en los componentes (si los hay,
es un bug a corregir). Exporta:

- `WA_NUMBER`, `waLink()` — número de WhatsApp y helper para armar links con mensaje
  prellenado
- `CONTACT_EMAIL`, `CONTACT_LOCATION` — datos de contacto
- `INSTAGRAM_URL`, `FACEBOOK_URL`, `TIKTOK_URL` — redes (FB y TikTok son placeholders,
  marcados con `// TODO`)
- `BANK_DATA` — alias/CBU/titular para el checkout (**alias y CBU son placeholders**,
  titular "Pablo Daniel Coria" es real)
- `GOOGLE_SHEETS_URL` — URL del Web App de Apps Script (real, ya conectada — ver sección 8)
- `MAX_COMPROBANTE_MB` — límite de tamaño del comprobante subido
- `PROMO_PERCENT`, `currentMonthLabel()` — el banner de "30% OFF" del PromoBar, calcula el
  mes actual dinámicamente
- `originalPrice(price)` — calcula un precio tachado (+15%) **puramente cosmético**, nunca
  se usa para cobrar. El precio real que se cobra es siempre el que ya está en `price`.
- `productColors` — paleta de swatches para el filtro de color del catálogo (verde, azul,
  marrón, beige, rosa, naranja, amarillo, blanco, celeste, rojo)
- `PLAN_RANK`, `planFeatureFlags()` — determina qué campos mostrar en el formulario
  post-compra según el plan comprado (ej. Essential no ve "dress code" ni "playlist")
- `eventTypeOptions` — opciones del `<select>` de tipo de evento en el formulario (Boda /
  Cumple XV / Otro)
- `categories` — las 2 categorías de la Home (Boda, Cumple XV), cada una con su `image`
  apuntando a `/images/BODA.jpg` / `/images/XV.jpg`
- `features`, `plans`, `steps`, `faqs` — contenido de las secciones de la Home
- `products` — el catálogo completo (ver detalle abajo)

### El array `products` en detalle

Cada producto puede ser:
1. **Un producto de catálogo genérico** (sin demo real, solo degradé de color + nombre) —
   los primeros 6 (`id: 1` a `6`), pensados como placeholder hasta tener diseños reales.
2. **Una demo real** (`id: 7` en adelante) — tiene:
   - `demoUrl` — o una URL externa completa (como la invitación real de Pablo & Lucila:
     `https://boda-rosy-alpha.vercel.app/?vip=true`), o una ruta interna
     (`/demos/lucia-juan/`)
   - `image` — foto real de esa demo, usada como miniatura de la tarjeta en vez del
     degradé (con fallback automático a degradé si la imagen no carga, vía el componente
     `ProductCover` en `Catalog.jsx`)
   - `style` — descripción corta del estilo (ej. "Editorial — papel roto", "Botánico —
     fotos difuminadas")
   - `palette` — array de 3 hex mostrados como puntitos de color debajo del nombre,
     representando la paleta específica de ESA demo (distinto del filtro general de
     `color`, que es una categoría amplia)

**El plan "Pablo & Lucila" es la invitación real de la boda del propio Pablo** (con
Lucila), construida en otro proyecto (`boda-rosy-alpha.vercel.app`, repo GitHub
`Pablo2205/Boda`). Se linkea con `?vip=true` a propósito — esa versión salta la sección de
regalos (que muestra el alias/CBU real de Pablo) y va directo a nombre + WhatsApp, para no
exponer datos bancarios reales a cualquiera navegando el catálogo.

---

## 6. Componentes clave

| Componente | Qué hace |
|---|---|
| `Nav.jsx` | Header en 2 filas: logo centrado (fila 1, con carrito a la derecha y menú hamburguesa a la izquierda en mobile — ambos en columnas separadas de un grid `1fr auto 1fr`, NO position:absolute, para evitar que se superpongan) + links de navegación (fila 2, solo desktop) |
| `PromoBar.jsx` | Banner fijo arriba de todo con el "30% OFF" — el mes se calcula solo, no hay que actualizarlo a mano |
| `ErrorBoundary.jsx` | Si algo rompe en una sección, muestra un mensaje con botón en vez de pantalla en blanco. El error real queda en la consola del navegador (F12) |
| `CartContext.jsx` | Estado del carrito compartido entre Catálogo/Carrito/Checkout. Sin sesión iniciada vive solo en memoria (se vacía al refrescar). **Con sesión iniciada se guarda en Firestore** (`carts/{uid}`, debounce de 800ms) y se restaura solo al loguearse — ver sección 9 |
| `AuthContext.jsx` | Sesión de Firebase Authentication: `user`, `signUp`, `signIn`, `logOut`, `resetPassword`, `resendVerification`. Si Firebase no está configurado (`.env` sin completar) degrada con gracia — ver `firebaseEnabled` |
| `WhatsAppButton.jsx` / `WhatsAppIcon.jsx` | Componentes reutilizables para CUALQUIER CTA que lleve a WhatsApp — ver "regla de oro" en sección 2 |
| `PriceTag.jsx` | Muestra precio tachado (+15%, cosmético) + precio real, usado en Planes/Catálogo/Carrito/Checkout |
| `DemoPreviewModal.jsx` | Modal que muestra una demo (interna o externa) en un iframe dentro de un marco de iPhone plateado dibujado en CSS, sin sacar al usuario del catálogo. Se abre desde el botón "Ver demo" de cada tarjeta |
| `Reveal.jsx` | Wrapper de animación de scroll-reveal (fade + slide), y `Stagger` para animar listas en cascada. Respeta `prefers-reduced-motion` |
| `SocialIcon.jsx` | Logos de Instagram/Facebook/TikTok dibujados a mano en SVG (no existen en Material Symbols) |

### Páginas (`src/pages/`)
- **Home.jsx** — ensambla Hero, Categories, HowItWorks, Features, Plans, Faq, CtaFinal
- **Catalog.jsx** — filtros (evento, color, plan) + grid de productos + `DemoPreviewModal`.
  El filtrado usa `AnimatePresence`/`layout` de Framer Motion en vez de `whileInView`
  (¡importante! `whileInView` con listas que cambian dinámicamente acumula
  IntersectionObservers y degrada el rendimiento con el uso — este fue un bug real que se
  encontró y corrigió)
- **Cart.jsx** — carrito con cantidad editable, código de promo (10% opcional), precio
  tachado por ítem y en el total
- **Checkout.jsx** — muestra alias/CBU con botón de copiar, sin pasarela de pago. Al
  confirmar, navega a `/completar-datos` pasando el carrito por route state
- **Personalize.jsx** — formulario de 4 pasos (Datos → Evento → Contenido especial →
  Comprobante), con campos condicionados por plan, sube el comprobante en base64 a Google
  Sheets, stepper con verde de validación (WhatsApp green, no el verde institucional) para
  pasos completados
- **Contact.jsx** — info de contacto + redes sociales (debajo del título, no al final) +
  formulario que arma un mensaje de WhatsApp prellenado

---

## 7. Sistema de demos de invitaciones (⭐ el más elaborado)

Además del e-commerce, el proyecto incluye un catálogo creciente de **invitaciones reales,
standalone**, construidas replicando referencias visuales (capturas de Pinterest, sitios
existentes) que Pablo va mandando.

### Flujo de trabajo para crear una demo nueva
1. Pablo manda una referencia (captura, link, imagen)
2. Se construye un HTML standalone (mobile-first, autocontenido, sin dependencias del
   proyecto React) que replica el diseño — colores, tipografía, layout, iconografía
3. Se muestra como preview (embebiendo las fotos en base64 temporalmente, porque el visor
   de artefactos no puede leer archivos "al lado" del HTML — eso es solo para la vista
   previa, la versión final usa rutas de archivo livianas, no base64)
4. Se itera hasta que el diseño está aprobado
5. Se pide la lista de fotos necesarias con nombres exactos (`foto-hero.jpg`, `foto-1.jpg`,
   etc.)
6. Una vez con las fotos reales, se integra a `public/demos/<slug>/` (HTML + fotos) y se
   agrega como producto en `products` (site.js) con su `demoUrl`, `image`, `style` y
   `palette`

### Demos existentes

| Carpeta | Estilo | Fotos que usa |
|---|---|---|
| `lucia-juan/` | Editorial, papel roto, verde/dorado, countdown en vivo | `foto-hero.jpg`, `foto-1.jpg`, `foto-2.jpg` |
| `olivia-ralph/` | Azul marino/crema, con cortejo nupcial completo (padrinos, velo/cordón/vela — tradición católica), galería de 9 fotos armada con **una sola imagen** recortada por `background-position` en CSS | `foto-hero.jpg` a `foto-5.jpg` + `foto-galeria.jpg` |
| `juan-ana/` | Vino/crema, juguetona, con foto de infancia como gancho principal, línea ondulada dibujada a mano conectando el cronograma | `foto-ninos.jpg`, `foto-1.jpg`, `foto-2.jpg`, `foto-lugar.jpg` |
| `lorena-gustavo/` | Botánico, verde oliva/crema/dorado, fotos con desvanecido blanco (no papel roto — otra técnica visual) | `foto-hero.jpg`, `foto-1.jpg`, `foto-2.jpg` |
| `lauren-marco/` | "Boarding pass" navy/crema — ticket de embarque, globo, timeline con línea de vuelo punteada, calendario JS con save the date | `foto-1.jpg`, `foto-2.jpg` |
| `valeria-eugenio/` | Dorado/oliva, hojas de rama dibujadas a mano, fecha grande de fondo, programa del día bilingüe (estilo minimal) | `foto-1.jpg`, `foto-2.jpg` |
| `camila-sebastian/` | Marrón/crema — hero con sobre (envelope reveal en CSS), monograma, reproductor de música, calendario JS, dress code por género, regalo con alias copiable, aviso "sin niños" | `foto-hero.jpg`, `foto-1.jpg`, `foto-2.jpg`, `foto-3.jpg`, `cancion.mp3` |
| `alexandra-nicolas/` | Verde oliva/crema — secciones con borde ondulado (SVG wave), "nuestra historia", foto hero con botón de play decorativo | `foto-hero.jpg`, `foto-1.jpg`, `foto-2.jpg`, `foto-3.jpg` |
| `sofia-tomas/` | Terracota/crema — plan **Essential**: solo hero+countdown, ceremonia/recepción con mapa, RSVP por WhatsApp y regalos. Sin dress code, música ni galería (adrede, para reflejar el plan) | `foto-hero.jpg` |
| `valentina-ignacio/` | Azul grisáceo/crema — plan **Standard**: Essential + música de fondo, galería, dress code, tips para invitados y "agendar la fecha" (.ics) | `foto-hero.jpg`, `foto-1.jpg` a `foto-4.jpg`, `cancion.mp3` |
| `renata-emiliano/` | Bordó/dorado — **carta lacrada**: intro de sobre con sello de cera animado (rotateX + perspective) que hay que tocar para abrir, papel con grano SVG sutil (`feTurbulence`), bordes deckle en la tarjeta del hero, secciones que se despliegan al hacer scroll como si la carta se fuera abriendo (`.fold-reveal`, `rotateX` + IntersectionObserver), watermark del monograma con parallax leve | `foto-hero.jpg`, `foto-1.jpg`, `foto-2.jpg` |

Estas 6 últimas (salvo `renata-emiliano`, ago 2026) replican 4 referencias de Pinterest (`azul clasico.jpg`, `dorado.jpg`,
`marron.jpg`, `verde.jpg`) igual que se hizo con las de XV — mismo criterio: paleta,
tipografía y secciones fieles a la referencia, nombres de pareja ficticios, fotos en
placeholder con fallback a degradé. `sofia-tomas` y `valentina-ignacio` no vienen de una
referencia de Pinterest — se armaron para mostrar en el catálogo cómo se ve cada plan
(antes todo el catálogo era Premium), reusando la paleta/técnica ya establecida.

Todas las de arriba viven en `public/demos/boda/`. Las de XV años viven en `public/demos/xv/`,
armadas replicando 5 referencias de Pinterest (una por paleta de color):

| Carpeta | Estilo | Fotos/assets que usa |
|---|---|---|
| `katherina-azul/` | Floral azul, papel roto, cuenta regresiva, sección de música y regalo con alias copiable | `foto-hero.jpg`, `foto-1.jpg`, `foto-2.jpg` |
| `adriana-celeste/` | Fotográfico celeste, fotos reales a pantalla completa, reproductor de música de fondo funcional (`<audio>` + toggle), regalo por QR | `foto-hero.jpg` a `foto-4.jpg`, `cancion.mp3`, `qr-transferencia.png` |
| `mariana-lila/` | Floral lavanda, fecha límite de confirmación, "lluvia de sobres" como sugerencia de regalo | `foto-hero.jpg`, `foto-1.jpg`, `cancion.mp3` |
| `ximena-rosa/` | Elegante rosa/dorado, arco floral en el hero, calendario del mes generado por JS con el día del evento marcado | `foto-hero.jpg` a `foto-3.jpg`, `cancion.mp3` |
| `marianel-rosa-marron/` | Cream/marrón con rosas, papel roto, padrinos, confirmación por WhatsApp | `foto-hero.jpg`, `foto-1.jpg`, `foto-2.jpg` |
| `delfina-esencial/` | Coral/crema — plan **Essential**: solo hero+countdown, salón con mapa, RSVP y regalo. Sin dress code, música ni galería | `foto-hero.jpg` |
| `camila-xv/` | Menta/crema — plan **Standard**: Essential + música de fondo, galería, dress code, tips y "agendar la fecha" (.ics) | `foto-hero.jpg`, `foto-1.jpg` a `foto-4.jpg`, `cancion.mp3` |
| `antonella-carta/` | Blush/dorado — misma técnica de **carta lacrada** que `renata-emiliano` (boda), adaptada a XV: sobre con sello "A" que se abre al tocarlo, monograma watermark, secciones tipo hoja de carta que se despliegan al scrollear. Suma una foto real de sobres con lacre (`foto-sello.jpg`) como callback visual en la sección de regalos | `foto-hero.jpg`, `foto-1.jpg`, `foto-2.jpg`, `foto-sello.jpg` |

Todas están registradas en `products` (`site.js`, ids 12-16, 23-24 y 30, `category: 'xv-anos'`)
— aparecen en el catálogo filtrando por "Cumple XV". El reproductor de música
(`adriana-celeste`, `mariana-lila`, `ximena-rosa`, `camila-xv`, `valentina-ignacio`) y el
calendario dinámico (`ximena-rosa`) son técnicas nuevas, no estaban en las demos de boda
originales — quedan disponibles para reusar.

Las de Baby Shower viven en `public/demos/baby-shower/`, armadas en agosto 2026 como
muestra inicial de la categoría — 2 con temática de nene y 2 de nena. A diferencia de
boda/XV (que replican una referencia de Pinterest y comparten técnicas entre sí), cada una
de estas cuatro tiene su **propio concepto de diseño, tipografía y estructura** — no son la
misma plantilla repintada:

| Carpeta | Concepto | Tipografías | Fotos (Pexels, licencia libre) |
|---|---|---|---|
| `santino-azul/` | "Bitácora de a bordo" — timeline tipo diario de navegación (`.log-entry` con línea punteada), cronómetro circular, fotos en "portholes" redondos, lista de regalos como "manifiesto de carga" | Big Shoulders Display + Karla + Space Mono (coordenadas) | `foto-hero.jpg` (ancla y velero), `foto-1.jpg`/`foto-2.jpg` (sogas y cadenas en cubierta) |
| `benjamin-celeste/` | "Carta astral" — rueda de countdown tipo planisferio, cada sección es una "constelación" con su propia mini-constelación SVG dibujada a mano, fotos en ventanas circulares tipo atlas estelar | Gloock + Nunito + Space Mono | `foto-hero.jpg` (cielo estrellado), `foto-1.jpg`/`foto-2.jpg` (vía láctea) |
| `martina-rosa/` | "Herbario botánico" — toda la página como una placa de espécimen prensado, esquinas de plaqueta, etiquetas estilo ficha de catálogo (`Courier Prime`), countdown como "floración estimada" | Cormorant Garamond italic + Karla + Courier Prime | `foto-hero.jpg`/`foto-1.jpg` (peonías rosas) |
| `isabella-amarillo/` | "Afiche de cosecha" — hero con sol giratorio (`repeating-conic-gradient`) y la foto real recortada como disco solar, secciones numeradas como programa de festival, fotos en "postales" con washi tape | Yeseva One + Mulish | `foto-hero.jpg` (campo de girasoles aéreo), `foto-1.jpg`/`foto-2.jpg` (girasoles en flor) |

Ningún adjetivo de marca compartido entre las 4 — a propósito, para que cada una se sienta
diseñada a medida y no como reskin de color de una sola plantilla (ver skill
`frontend-design`). Fotos bajadas de Pexels (licencia gratuita, uso comercial permitido sin
atribución) con `curl`, sin personas identificables como sujeto — son de attrezzo (ancla,
cielo, flores, campo), no de la pareja/bebé real, ya que son demos de muestra sin cliente
real todavía.

Todas registradas en `products` (ids 25-28, `category: 'baby-shower'`), plan Premium,
sección "¿Qué le regalamos?" con lista de artículos sugeridos (pañales, ropita, etc.) en
vez del clásico dress code de boda/XV — no aplica a este tipo de evento.

### Catálogo por plan

Antes de esta ronda, **todo** el catálogo (14 demos) era plan Premium — no había forma de
mostrarle a un cliente cómo se veía Essential o Standard. Se agregaron 4 demos puntuales
para cubrir eso (`sofia-tomas` y `delfina-esencial` en Essential, `valentina-ignacio` y
`camila-xv` en Standard), armadas quitando/agregando secciones según `planFeatureFlags`
en `site.js` y lo documentado en `docs/PLANES-Y-FEATURES.md`. El resto de los productos
(ids 7-11, 17-20, 29 boda; 12-16, 30 xv) siguen siendo Premium — si se agregan clientes reales con
otros planes, más adelante conviene sumar más ejemplos de Essential/Standard para variar
la paleta que ve cada visitante del catálogo.

**Cada demo tiene su propia paleta y su propia técnica visual** — no son variaciones de una
misma plantilla, son diseños distintos hechos a medida por referencia. Técnicas reutilizadas
entre demos: bordes de "papel roto" vía `clip-path: polygon()` con amplitud sutil (ojo:
amplitudes grandes generan efecto sierra/montaña, no papel — hay que usar variación de
±3-4% máximo, no ±10%), líneas onduladas a mano vía SVG `<path>` con curvas, ramilletes
florales reutilizables vía `<symbol>` + `<use>`.

### Convención de nombres de fotos
Siempre `foto-hero.jpg`, `foto-1.jpg`, `foto-2.jpg`, etc. — nunca nombres descriptivos
largos, para que Pablo pueda simplemente arrastrar archivos con esos nombres exactos sin
tener que editar código. Los `<img>` siempre llevan `onerror="this.style.display='none'"`
para degradar con gracia (mostrando el degradé de color de fondo) si una foto todavía no
fue subida.

---

## 8. Google Sheets + Apps Script (el "backend")

Cuenta dedicada: **`veintidos.invitaciones@gmail.com`** (Gmail creado específicamente para
esto — reemplazó a `hola@veintidos.ar`, que no era una cuenta de Google real y por lo tanto
no podía ejecutar el script ni enviar mails).

El script (código completo en `GOOGLE_APPS_SCRIPT.md`) hace, en un solo `doPost`:
1. Agrega una fila a la planilla con todos los datos del pedido
2. Si hay comprobante adjunto (base64), lo guarda en una carpeta de Drive y linkea la URL
   en la planilla
3. Manda un mail de confirmación al cliente (con firma de marca) — con `replyTo` apuntando
   a la casilla de contacto real
4. Manda un mail de notificación a Pablo avisando que entró un pedido nuevo, con todos los
   datos

**Endurecido en agosto 2026** (era un webhook público sin ninguna validación — cualquiera
podía postearle datos falsos o usarlo para mandar el mail de "recibimos tu pedido" a un
tercero): ahora valida el token de **reCAPTCHA v3** contra la API de Google
(`RECAPTCHA_SECRET_KEY`, ver `GOOGLE_APPS_SCRIPT.md` sección 5), rechaza si faltan campos
obligatorios o el email tiene formato inválido, y trunca strings a un largo razonable antes
de guardarlos. El frontend manda el token (`recaptchaToken`) generado con
`VITE_RECAPTCHA_SITE_KEY` desde `Personalize.jsx`. Mientras `RECAPTCHA_SECRET_KEY` no esté
configurada en el script, la verificación se salta (no bloquea pedidos reales) — es una
ventana de riesgo a cerrar cuanto antes, no un estado final.

### Gotchas ya resueltos (para no repetir)
- **Guardar el código en Apps Script NO lo publica.** Hay que ir a Implementar → Gestionar
  implementaciones → editar → "Nueva versión" → Implementar, cada vez. Si no, sigue
  corriendo la versión vieja aunque el editor muestre el código nuevo.
- **"Nueva implementación" ≠ "Gestionar implementaciones".** Crear una implementación nueva
  desde cero genera una URL `/exec` completamente distinta — hay que actualizar
  `GOOGLE_SHEETS_URL` en `site.js` si eso pasa. Para actualizar el código sin cambiar la
  URL, siempre usar "Gestionar implementaciones" → editar → nueva versión.
- El mail no llegaba en un momento porque `OWNER_EMAIL` tenía un typo (`.com.ar` en vez de
  `.com`) — MailApp no tira error si el dominio no existe, simplemente no llega. Si un mail
  "no llega" pero la ejecución en el log dice "Completada" sin error, sospechar de un typo
  en la dirección antes que de un bug de código.

---

## 9. Login y cuentas (Firebase Authentication + Firestore)

Agregado en agosto 2026 a pedido de Pablo, con dos objetivos: que el sitio se vea más
profesional (cuenta de usuario real, no solo un carrito anónimo) y no perder los datos de
alguien que agrega una invitación al carrito pero no llega a completar la compra.

**Decisión de arquitectura:** el sitio no tiene backend propio (sección 3), así que manejar
contraseñas "a mano" (guardarlas, hashearlas, validarlas) hubiera sido tanto mucho trabajo
como un riesgo de seguridad real si algo salía mal. Se usa **Firebase Authentication** en su
lugar — las contraseñas nunca tocan nuestro código, las maneja Google. Setup completo paso a
paso en `docs/FIREBASE-SETUP.md`.

- **`src/lib/firebase.js`** — inicializa Firebase a partir de variables de entorno
  (`VITE_FIREBASE_*`, ver `.env.example`). Expone `firebaseEnabled`: si el `.env` no está
  cargado, queda en `false` y toda la app degrada con gracia en vez de romperse (`Login.jsx`
  muestra un aviso en vez de un formulario roto).
- **`AuthContext.jsx`** — `user`, `signUp`, `signIn`, `logOut`, `resetPassword`,
  `resendVerification`. Mensajes de error traducidos (Firebase tira cosas como
  `auth/email-already-in-use` en inglés técnico; acá se mapean a texto en español para el
  cliente). Contraseña mínima 8 caracteres (más estricto que el mínimo de 6 de Firebase).
  Email de verificación se manda solo al registrarse (`sendEmailVerification`).
- **`Login.jsx`** (ruta `/cuenta`, lazy-loaded — ver nota de performance abajo) — login,
  registro y "olvidé mi contraseña" en una sola pantalla con tabs. Si ya hay sesión, muestra
  un panel de cuenta (nombre, verificación de email, cerrar sesión) en vez del formulario.
- **Carrito guardado (`CartContext.jsx`):** con sesión iniciada, cada cambio al carrito se
  guarda (debounce 800ms) en Firestore, colección `carts/{uid}`. Al iniciar sesión, si el
  carrito local está vacío, se restaura el guardado. `Cart.jsx` muestra un banner invitando a
  loguearse si hay ítems en el carrito y no hay sesión.
- **`firestore.rules`** (raíz del repo) — cada usuario solo puede leer/escribir su propio
  documento (`request.auth.uid == uid`). Hay que pegarlo a mano en Firebase Console →
  Firestore → Reglas (no hay CI que lo despliegue automático todavía). **Nunca** dejar la
  base en "modo de prueba" (Firestore abierto a cualquiera sin login).
- **Ícono de cuenta en el Nav** — al lado del carrito, con un punto verde cuando hay sesión
  iniciada.

### Performance

El SDK de Firebase pesa bastante (~670KB sin comprimir). Dos mitigaciones en
`vite.config.js`/`App.jsx`:
1. `manualChunks` separa Firebase en su propio archivo JS — no infla el bundle principal que
   descarga cualquiera que visite Home/Catálogo sin loguearse.
2. `Login.jsx` se carga con `React.lazy` — su código (y el de Firebase que importa) recién se
   pide cuando alguien navega a `/cuenta`.

`AuthContext` y `CartContext` sí importan Firebase de forma estática porque necesitan saber
si hay sesión iniciada en toda la app (para el punto verde del Nav y la persistencia del
carrito) — es un costo inherente a que el estado de login sea visible en cualquier página, no
un descuido.

---

## 10. Deploy

- **Hosting:** Vercel, deploy automático desde GitHub (push a la rama principal → deploy a
  producción)
- **Para probar cambios sin afectar producción:** crear una rama nueva y pushearla — Vercel
  genera automáticamente una Preview Deployment con URL propia. También se puede usar
  `vercel` (CLI, sin `--prod`) desde la carpeta del proyecto para un preview instantáneo.
- **Importante:** reemplazar el repo completo al aplicar cambios grandes, no ir pegando
  archivo por archivo — en este proyecto aparecieron más de una vez restos de código viejo
  (integraciones abandonadas, archivos duplicados) por mezclar versiones a mano. Si hay que
  aplicar pocos archivos sueltos está bien, pero ante la duda, reemplazar todo.

---

## 11. Pendientes conocidos (buscar `// TODO` en el código)

- `BANK_DATA.alias` y `BANK_DATA.cbu` — todavía placeholders, Pablo los completa a mano
- `FACEBOOK_URL` y `TIKTOK_URL` — URLs inventadas, no llevan a ningún lado real
- Productos `id: 1` a `6` del catálogo — sin fotos reales ni demo, solo degradé de color
- **Firebase todavía sin configurar** (`.env` vacío) — `/cuenta` funciona visualmente pero
  avisa que el login no está activo hasta completar `docs/FIREBASE-SETUP.md`
- **`RECAPTCHA_SECRET_KEY` sin configurar** en el script de Apps Script — la verificación
  anti-spam del formulario está en modo "dejar pasar todo" hasta completarla (sección 5 de
  `GOOGLE_APPS_SCRIPT.md`)
- **`MP_LINKS` (Mercado Pago) desactualizados tras la baja de precios de agosto 2026** — son
  links de monto fijo generados en el panel de Mercado Pago; hay que regenerarlos con los
  montos nuevos de `PLAN_PRICING` antes de que alguien pague por ese medio, si no cobra el
  precio viejo
- `react-router-dom` tiene 2 CVEs moderados sin parche disponible dentro del rango `^6.27.0`
  (arreglo real requiere migrar a v7, un cambio de mayor de versión no trivial) — evaluar
  la migración como tarea aparte
- Sin CSP (Content-Security-Policy) en `vercel.json` — se evaluó agregarlo pero se dejó
  pendiente por el riesgo de romper Google Fonts/Framer Motion sin poder probarlo en un
  browser real antes de publicar; si se agrega, probar exhaustivo en preview antes de `main`
- La galería de fotos del formulario post-compra (`Personalize.jsx`) pide un link a Drive/
  Google Fotos en vez de subir archivos directo — está bien para el volumen actual, pero es
  candidato a mejorar si crece el negocio

---

## 12. Cómo pedirle cambios a este proyecto (para Claude Code)

- Siempre correr `npm run build` antes de dar algo por terminado — varias veces apareció
  contenido duplicado o desincronizado entre lo que el asistente tenía en memoria y lo que
  realmente estaba en el repo. **Ver el archivo real antes de editarlo, no asumir el estado
  por el historial de chat.**
- Si se toca `site.js`, revisar que no haya bloques duplicados (pasó más de una vez:
  variables con el mismo propósito pero nombres distintos, como `hola@veintidos.ar` vs.
  `GAS_WEBHOOK_URL` conviviendo con `GOOGLE_SHEETS_URL`).
- Cualquier cambio a `vercel.json` tiene que preservar la exclusión de `/demos/` (sección 4).
- Las demos (`public/demos/`) son HTML autocontenido — no importan nada de React ni de
  Tailwind, tienen su propio `<style>` inline. No intentar "integrarlas" al sistema de
  componentes de React, son intencionalmente independientes.
