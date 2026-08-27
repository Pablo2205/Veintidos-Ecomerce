// PLAN_PRICING y el cupón viven en shared/pricing.js — ver nota más abajo,
// junto al re-export, sobre por qué está separado de este archivo.
import { PLAN_PRICING, TRANSFER_DISCOUNT_PERCENT, DISCOUNT_CODE, DISCOUNT_CODE_PERCENT } from '../../shared/pricing.js'

export const WA_NUMBER = '5491151067238'
export const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
export const CONTACT_EMAIL = 'veintidos.invitaciones@gmail.com'
export const CONTACT_LOCATION = 'Buenos Aires, Argentina'

// --- Redes sociales --------------------------------------------------------
// Solo Instagram (real). Facebook y TikTok se sacaron del sitio (no había
// cuentas reales todavía) — si en algún momento se abren, agregar de nuevo
// acá y los íconos correspondientes en Footer.jsx/Contact.jsx.
export const INSTAGRAM_URL = 'https://instagram.com/veintidos_invitaciones'

// --- Datos de pago (transferencia) -------------------------------------
// Datos reales — se muestran tal cual en el checkout, con botón de copiar.
export const BANK_DATA = {
  alias: 'VEINTIDOS.INVITACION',
  cbu: '0140198703507950254279',
  titular: 'Pablo Daniel Coria',
}

// --- Datos de pago (Mercado Pago) ---------------------------------------
// Links de pago fijos generados desde el panel de Mercado Pago, uno por
// plan (cada link tiene un monto fijo, no soporta cantidad ni combinar
// planes). El checkout solo ofrece Mercado Pago cuando el carrito tiene
// un único ítem con cantidad 1 — ver `Checkout.jsx`. El monto configurado
// en cada link en el panel de Mercado Pago tiene que coincidir con
// `PLAN_PRICING[plan].price` de acá abajo.
//
// ⚠️ TODO: estos 3 links tienen el monto de una ronda de precios anterior
// grabado del lado de Mercado Pago (no del código). No es urgente porque hoy
// el checkout usa la API real de Checkout Pro (`MERCADOPAGO_ACCESS_TOKEN` ya
// configurado en Vercel) y estos links quedaron como fallback muerto — pero
// conviene regenerarlos en cuenta.mercadopago.com para que la red de
// seguridad esté al día. Montos actuales a configurar (ago 2026): Essential
// $36.221 · Standard $65.585 · Premium $88.540.
export const MP_LINKS = {
  Essential: 'https://mpago.la/1tCkbgb',
  Standard: 'https://mpago.la/2YhQAwA',
  Premium: 'https://mpago.la/1JqVsJL',
}

// --- Google Sheets (formulario post-compra) ---------------------------
// URL del Web App de Google Apps Script (Implementar > Nueva implementación >
// Aplicación web, acceso "Cualquier usuario"). Ver GOOGLE_APPS_SCRIPT.md en
// la raíz del proyecto para el código listo para pegar en script.google.com.
export const GOOGLE_SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbwFETRaVmLso9lF6Sbe5l7tg7tMG-XQeu47n-jmRBUneernqXbN9CHjiR47WSWvdpw/exec'

// Tamaño máximo aceptado para el comprobante (en MB) antes de convertir a base64.
export const MAX_COMPROBANTE_MB = 5

// --- Google reCAPTCHA v3 (anti-spam del formulario post-compra) -----------
// Site key pública (no es secreta, viaja igual en el bundle del cliente).
// La secret key vive únicamente en el script de Google Apps Script, nunca
// acá — ver GOOGLE_APPS_SCRIPT.md. Si no está configurada (falta el .env),
// Personalize.jsx simplemente no la pide y el formulario sigue funcionando
// sin esa capa extra, igual que pasa con GOOGLE_SHEETS_URL.
export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''

// --- Promo del banner superior -------------------------------------------
export const PROMO_PERCENT = 30
export const currentMonthLabel = () => {
  const mes = new Date().toLocaleDateString('es-AR', { month: 'long' })
  return mes.charAt(0).toUpperCase() + mes.slice(1)
}

// --- Lista de precios real por plan --------------------------------------
// Los números en sí viven en `shared/pricing.js` (no acá) porque también los
// necesitan las funciones serverless de `/api/mercadopago` para recalcular
// el monto del lado del servidor — y ese código no puede importar este
// archivo (usa `import.meta.env`, que no existe en el runtime de Node de
// las funciones). Si cambiás un precio, cambialo en `shared/pricing.js`.
//
// - `original`: precio sin ningún descuento — es el precio TACHADO en toda
//   la web (Planes, Catálogo, Carrito, Checkout). Nunca se cobra.
// - `price`: precio con el 30% OFF del mes de lanzamiento — es el precio de
//   lista real, el que se muestra sin tachar y el que se cobra por
//   Mercado Pago. `plans[].price` y `products[].price` usan este valor.
// - `transfer`: precio pagando por transferencia bancaria — con el 10% de
//   descuento adicional ya aplicado.
export { PLAN_PRICING, TRANSFER_DISCOUNT_PERCENT, DISCOUNT_CODE, DISCOUNT_CODE_PERCENT }

const pricingRowByPrice = (price) => Object.values(PLAN_PRICING).find((row) => row.price === price)

// El tachado y el precio de transferencia son fijos por plan (ver
// PLAN_PRICING arriba). Si se llama con un precio que no corresponde a
// ningún plan, se devuelve el mismo precio sin modificar en vez de inventar
// un número.
export const originalPrice = (price) => pricingRowByPrice(price)?.original ?? price
export const transferPrice = (price) => pricingRowByPrice(price)?.transfer ?? price

// --- Colores para el filtro del catálogo ---------------------------------
// Paleta de swatches seleccionables. "hex" es lo que se pinta en el círculo;
// "border" (opcional) se usa en colores muy claros (blanco, beige) para que
// el círculo no se pierda contra el fondo.
export const productColors = [
  { key: 'verde', label: 'Verde', hex: '#5C7A52' },
  { key: 'azul', label: 'Azul', hex: '#2050E0' },
  { key: 'marron', label: 'Marrón', hex: '#8A6B4F' },
  { key: 'beige', label: 'Beige', hex: '#E4D9C3', border: '#C9BA9C' },
  { key: 'rosa', label: 'Rosa', hex: '#E8A0BB' },
  { key: 'naranja', label: 'Naranja', hex: '#E2803F' },
  { key: 'amarillo', label: 'Amarillo', hex: '#E8C547' },
  { key: 'blanco', label: 'Blanco', hex: '#FFFFFF', border: '#D8D8D8' },
  { key: 'celeste', label: 'Celeste', hex: '#7FC7E8' },
  { key: 'rojo', label: 'Rojo', hex: '#6E1B26' },
  { key: 'lila', label: 'Lila', hex: '#A57FC4' },
]

// --- Ranking de planes -----------------------------------------------
// Se usa en el formulario post-compra para mostrar solo los campos que
// tienen sentido según el plan comprado (ej. "dress code" no aplica a
// Essential, "video de bienvenida" es solo de Premium).
export const PLAN_RANK = { Essential: 1, Standard: 2, Premium: 3 }

// --- Tipos de evento del FORMULARIO post-compra --------------------------
// Distinto de `categories` (que son los eventos del Home/Catálogo). Acá van
// las opciones del <select> "Tipo de evento" en Personalize.jsx.
export const eventTypeOptions = ['Boda', 'Cumple XV', 'Baby Shower', 'Otro']

// Qué preguntas mostrar en el paso "Contenido especial" del formulario,
// según el plan comprado. Ver `plans` más abajo para el detalle de qué trae
// cada uno.
//
// Redefinido ago 2026 junto con el resto del cambio de plan por producto:
// dressCode/playlist/gallery pasaron a estar incluidos DESDE Essential
// (antes eran de Standard en adelante) porque casi todas las demos HTML —
// que ahora son el tier Essential — ya las traían de fábrica; pedirlas recién
// desde Standard hubiera dejado a un cliente Essential sin poder cargar
// contenido que su propia demo sí tiene espacio para mostrar. video y
// customization se mantienen exclusivos de Premium.
export const planFeatureFlags = (planName) => {
  const rank = PLAN_RANK[planName] || PLAN_RANK.Standard
  return {
    dressCode: true,
    playlist: true,
    gallery: true,
    video: rank >= PLAN_RANK.Premium,
    customization: rank >= PLAN_RANK.Premium,
  }
}

// Estos son los tipos de evento habilitados en todo el sitio (Home, Catálogo,
// formulario). Para sumar uno nuevo, agregalo acá y también como opción en el
// <select> de src/pages/Personalize.jsx.
export const categories = [
  {
    slug: 'boda',
    name: 'Boda',
    desc: 'Románticas y elegantes, con cronograma del día, dress code y datos para regalos.',
    image: '/images/BODA.jpg',
  },
  {
    slug: 'xv-anos',
    name: 'Cumple XV',
    desc: 'Diseños llenos de magia y brillo para una noche que se recuerda toda la vida.',
    image: '/images/XV.jpg',
    // Pausado ago 2026 (a pedido de Pablo): se muestra la categoría pero
    // grisada y sin CTAs, como adelanto de que se viene — sin catálogo
    // disponible todavía. Ver `comingSoon` en Categories.jsx.
    comingSoon: true,
  },
  {
    slug: 'otro',
    name: 'Otro evento',
    desc: '¿Cumpleaños, aniversario u otra celebración? Contanos qué estás festejando y te asesoramos.',
    image: '/images/OTRO.jpg',
    // Sin catálogo propio (el catálogo solo tiene diseños para Boda, Cumple XV
    // y Baby Shower) — este panel siempre deriva a consulta directa por
    // WhatsApp. Ver `consultOnly` en `Categories.jsx`.
    consultOnly: true,
  },
]

export const features = [
  ['schedule', 'Cuenta regresiva', 'Días, horas y minutos hasta el gran momento, siempre a la vista.'],
  ['location_on', 'Mapa y cómo llegar', 'Ubicación con un toque directo a Google Maps.'],
  ['check_circle', 'Confirmación de asistencia', 'Tus invitados confirman con un clic, por WhatsApp o desde la misma invitación.'],
  ['music_note', 'Música de fondo', 'La canción que elijas acompaña la invitación al abrirla.'],
  ['photo_library', 'Galería de fotos', 'Tus fotos favoritas integradas al diseño.'],
  ['checkroom', 'Dress code', 'Código de vestimenta claro para que nadie tenga dudas.'],
  ['redeem', 'Sección de regalos', 'Alias y CBU con botón de copiar, o tu lista de deseos.'],
  ['event', 'Agendar la fecha', 'El invitado suma el evento a su calendario con un toque.'],
  ['queue_music', 'Sugerencia de canciones', 'Tus invitados proponen los temas que no pueden faltar.'],
  ['collections', 'Álbum compartido', 'Un QR en las mesas para que todos suban sus fotos de la fiesta.'],
  ['videocam', 'Sección de video', 'Sumá un video especial dentro de la invitación.'],
]

// --- Planes ---------------------------------------------------------------
// Precios fijos y visibles (no "a consultar"). Solo el diseño 100% a medida
// (al pie de la sección de Planes) pide consultar precio por WhatsApp.
// Redefinido ago 2026 (a pedido de Pablo, junto con la reasignación de plan
// por producto en `products`): Essential pasó a ser el tier de las demos
// HTML hechas a mano (antes eran mayoría Premium) y Standard/Premium pasaron
// a ser exclusivamente las demos armadas en Framer. Como casi todas las
// demos HTML ya traían música, galería y dress code (no eran tan "básicas"
// como decía el Essential viejo), esos ítems subieron de Standard a
// Essential para que la promesa del plan coincida con lo que se entrega.
export const plans = [
  {
    name: 'Essential',
    tagline: 'Un diseño elegante, con todo lo esencial',
    price: 36221,
    items: [
      'Diseño adaptado a tu evento',
      'Cuenta regresiva',
      'Fecha, lugar y mapa',
      'Confirmación por WhatsApp',
      'Sección de regalos',
      'Música de fondo a elección',
      'Galería de fotos',
      'Dress code',
      'Tips y notas para invitados',
      'Agendar la fecha en el calendario',
      'QR listo para imprimir',
      'Link para compartir',
    ],
    variant: 'plain',
  },
  {
    name: 'Standard',
    tagline: 'Una invitación animada y dinámica',
    highlight: 'Más elegida',
    price: 65585,
    items: [
      'Todo lo del plan Essential',
      'Invitación animada, con transiciones y microinteracciones',
      'Experiencia de navegación fluida y dinámica',
    ],
    variant: 'highlight',
  },
  {
    name: 'Premium',
    tagline: 'Nuestra propuesta más completa',
    price: 88540,
    items: [
      'Todo lo del plan Standard',
      'Sugerencia de canciones de los invitados',
      'Álbum compartido con QR para las mesas',
      'Sección de video',
      'Personalización avanzada de diseño',
      'Prioridad de entrega',
    ],
    variant: 'dark',
  },
]

// Pasos del flujo real de compra (Catálogo → plan → checkout → formulario).
// "icon" es un nombre de Material Symbol, salvo 'whatsapp' que renderiza el
// logo real de WhatsApp en vez de un ícono genérico.
export const steps = [
  ['ads_click', 'Seleccioná el tipo de evento'],
  ['design_services', 'Elegí el diseño que más te guste'],
  ['celebration', 'Definí el plan que se adapte a tu celebración'],
  ['shopping_cart_checkout', 'Confirmá tu compra'],
  ['checklist', 'Cargá los datos del evento en el formulario'],
  ['whatsapp', 'Recibí tu invitación por WhatsApp en 72hs hábiles'],
]

export const faqs = [
  {
    q: '¿Cómo pido mi invitación?',
    a: 'Escribinos por WhatsApp contándonos qué evento vas a festejar. Te mostramos demos, te asesoramos sobre el plan ideal y te pasamos el precio. Si te gusta, arrancamos ese mismo día.',
  },
  {
    q: '¿Cuánto tarda la entrega?',
    a: 'Entre 3 y 5 días hábiles desde que nos pasás todos los datos. Si la necesitás antes, consultanos por la entrega express.',
  },
  {
    q: '¿Qué diferencia hay entre los planes?',
    a: 'Essential: lo esencial — cuenta regresiva, fecha, lugar, mapa, confirmación por WhatsApp y sección de regalos. Standard: suma música, galería de fotos, dress code, tips para invitados, agendar la fecha y QR para imprimir. Premium: agrega sugerencia de canciones, álbum compartido, video y personalización avanzada.',
  },
  {
    q: '¿Puedo personalizar el diseño?',
    a: 'Sí. En todos los planes adaptamos colores y estilo a tu temática. En Premium la personalización es más profunda, y si soñás con algo único también hacemos diseños 100% a medida.',
  },
  {
    q: '¿Cómo confirman asistencia mis invitados?',
    a: 'Por WhatsApp, con un mensaje prearmado que se envía directamente desde la invitación, en todos los planes.',
  },
  {
    q: '¿Cuánto tiempo queda online?',
    a: 'Doce meses desde la entrega. Si necesitás más tiempo, se puede renovar.',
  },
  {
    q: '¿Cuáles son los medios de pago?',
    a: 'Transferencia bancaria. Trabajamos con el pago del total (o una seña, a coordinar) y arrancamos apenas confirmamos el comprobante.',
  },
  {
    q: '¿Trabajan fuera de Argentina?',
    a: 'Sí. Como la invitación es 100% digital, trabajamos con clientes de cualquier país. Todo el proceso se hace online.',
  },
]

// --- Catálogo — solo productos con demo real disponible ---------------
// "category" tiene que ser "boda", "xv-anos" o "baby-shower" (son los únicos
// eventos con catálogo propio, ver `categories` arriba — "otro" siempre deriva
// a consulta). "color" es la clave de `productColors` de arriba.
//
// "code" = código de referencia del diseño, para trazabilidad de pedidos.
// Formato: {categoría}-{abreviatura del estilo}-{secuencial}. Viaja con el
// producto en el carrito y se manda en el pedido a Sheets (ver
// `submitToSheets` en Personalize.jsx y GOOGLE_APPS_SCRIPT.md) — así se sabe
// exactamente qué diseño compró cada cliente sin tener que abrir el link.
export const products = [
  {
    id: 8,
    code: 'BOD-EDI-01',
    name: 'Invitación Boda — Lucía & Juan',
    category: 'boda',
    plan: 'Essential',
    price: 36221,
    color: 'marron',
    gradient: 'from-[#C79A6B] to-[#8A7A5E]',
    badge: 'Nuevo',
    demoUrl: '/demos/boda/lucia-juan/',
    image: '/demos/boda/lucia-juan/foto-hero.jpg',
    style: 'Editorial — papel roto',
    palette: ['#F8F3E9', '#748158', '#C79A6B'],
  },
  {
    id: 9,
    code: 'BOD-CLA-01',
    name: 'Invitación Boda — Olivia & Ralph',
    category: 'boda',
    plan: 'Essential',
    price: 36221,
    color: 'azul',
    gradient: 'from-[#5B7FA6] to-[#20375C]',
    badge: 'Nuevo',
    demoUrl: '/demos/boda/olivia-ralph/',
    image: '/demos/boda/olivia-ralph/foto-hero.jpg',
    style: 'Clásico — con cortejo',
    palette: ['#F7F3E9', '#5B7FA6', '#20375C'],
  },
  {
    id: 10,
    code: 'BOD-JUG-01',
    name: 'Invitación Boda — Juan & Ana',
    category: 'boda',
    plan: 'Essential',
    price: 36221,
    color: 'rojo',
    gradient: 'from-[#6E1B26] to-[#4E1119]',
    badge: 'Nuevo',
    demoUrl: '/demos/boda/juan-ana/',
    image: '/demos/boda/juan-ana/foto-ninos.jpg',
    style: 'Juguetón — foto de infancia',
    palette: ['#F5EFE3', '#6E1B26', '#3A2A2A'],
  },
  {
    id: 11,
    code: 'BOD-BOT-01',
    name: 'Invitación Boda — Lorena & Gustavo',
    category: 'boda',
    plan: 'Essential',
    price: 36221,
    color: 'verde',
    gradient: 'from-[#8FA07A] to-[#3F4A34]',
    badge: 'Nuevo',
    demoUrl: '/demos/boda/lorena-gustavo/',
    image: '/demos/boda/lorena-gustavo/foto-hero.jpg',
    style: 'Botánico — fotos difuminadas',
    palette: ['#FAF7F0', '#3F4A34', '#C6A15B'],
  },
  {
    id: 12,
    code: 'XV-FLO-01',
    name: 'Invitación XV — Katherina',
    category: 'xv-anos',
    plan: 'Essential',
    price: 36221,
    color: 'azul',
    gradient: 'from-[#8FAEC9] to-[#3E5C76]',
    badge: 'Nuevo',
    demoUrl: '/demos/xv/katherina-azul/',
    image: '/demos/xv/katherina-azul/foto-hero.jpg',
    style: 'Floral azul — papel roto',
    palette: ['#F8FAFC', '#5D82A8', '#3E5C76'],
  },
  {
    id: 31,
    code: 'BOD-CEL-01',
    name: 'Invitación Boda — Walter & Rocío',
    category: 'boda',
    plan: 'Standard',
    price: 65585,
    color: 'celeste',
    gradient: 'from-[#4A8BB8] to-[#0F1B24]',
    badge: 'Nuevo',
    demoUrl: 'https://fulfilled-evidence-117714.framer.app',
    image: '/demos/boda/walter-rocio/foto-hero.png',
    style: 'Fotográfico celeste — línea de tiempo y RSVP interactivo',
    palette: ['#F2F4F7', '#4A8BB8', '#0F1B24'],
  },
  {
    id: 32,
    code: 'BOD-POL-01',
    name: 'Invitación Boda — Ornella & Diego',
    category: 'boda',
    plan: 'Premium',
    price: 88540,
    color: 'verde',
    gradient: 'from-[#8C9B7C] to-[#404B37]',
    badge: 'Nuevo',
    demoUrl: 'https://easy-places-427923.framer.app',
    image: '/demos/boda/ornella-diego/foto-hero.png',
    style: 'Editorial floral — polaroids de la historia, cronograma y RSVP en varios pasos',
    palette: ['#F2EFE7', '#6F7E62', '#606E54'],
  },
  {
    id: 33,
    code: 'BOD-EST-01',
    name: 'Invitación Boda — Agustina & Bruno',
    category: 'boda',
    plan: 'Standard',
    price: 65585,
    color: 'verde',
    gradient: 'from-[#6B7A5E] to-[#2F231A]',
    badge: 'Nuevo',
    demoUrl: 'https://concerned-decisions-547010.framer.app',
    image: '/demos/boda/agustina-bruno/foto-hero.jpg',
    style: 'Estancia de campo — cronograma del día, hoteles y RSVP con cuenta regresiva',
    palette: ['#F3EEDF', '#6B7A5E', '#2F231A'],
  },
  {
    id: 34,
    code: 'BOD-MDZ-01',
    name: 'Invitación Boda — Milagros & Tomás',
    category: 'boda',
    plan: 'Premium',
    price: 88540,
    color: 'marrón',
    gradient: 'from-[#B5613F] to-[#5C2A1A]',
    badge: 'Nuevo',
    demoUrl: 'https://ivory-ability-549032.framer.app',
    image: '/demos/boda/milagros-tomas/foto-hero.jpg',
    style: 'Editorial cálido — nuestra historia, cronograma del día y hoteles recomendados',
    palette: ['#FBEADF', '#B5613F', '#5C2A1A'],
  },
  {
    id: 35,
    code: 'BOD-PDE-01',
    name: 'Invitación Boda — Valentina & Franco',
    category: 'boda',
    plan: 'Standard',
    price: 65585,
    color: 'verde',
    gradient: 'from-[#4B5A3E] to-[#F3EBDD]',
    badge: 'Nuevo',
    demoUrl: 'https://blue-melon-453845.framer.app',
    image: '/demos/boda/valentina-franco/foto-hero.jpg',
    style: 'Destino de viaje — cronograma del día, qué hacer en la zona y RSVP',
    palette: ['#F3EBDD', '#4B5A3E', '#26301E'],
  },
  {
    id: 36,
    code: 'BOD-CAF-01',
    name: 'Invitación Boda — Camila & Rodrigo',
    category: 'boda',
    plan: 'Premium',
    price: 88540,
    color: 'beige',
    gradient: 'from-[#D9C7A8] to-[#3A332A]',
    badge: 'Nuevo',
    demoUrl: 'https://renewed-screenshot-050305.framer.app',
    image: '/demos/boda/camila-rodrigo/foto-hero.jpg',
    style: 'Resort de médanos — cronograma del día, alojamiento y RSVP con acompañantes',
    palette: ['#EFE6D6', '#B99B6B', '#3A332A'],
  },
  {
    id: 37,
    code: 'BOD-UCO-01',
    name: 'Invitación Boda — Josefina & Ignacio',
    category: 'boda',
    plan: 'Standard',
    price: 65585,
    color: 'azul',
    gradient: 'from-[#0F2A4A] to-[#EFE7DC]',
    badge: 'Nuevo',
    demoUrl: 'https://magnificent-apartment-489186.framer.app',
    image: '/demos/boda/josefina-ignacio/foto-hero.jpg',
    style: 'Estampillas de viaje — nuestra historia, cronograma del día y FAQ',
    palette: ['#EFE7DC', '#0F2A4A', '#8A7A63'],
  },
  {
    id: 38,
    code: 'BOD-BEL-01',
    name: 'Invitación Boda — Delfina & Lautaro',
    category: 'boda',
    plan: 'Premium',
    price: 88540,
    color: 'verde',
    gradient: 'from-[#2C3329] to-[#F7F6F2]',
    badge: 'Nuevo',
    demoUrl: 'https://intuitive-forms-718230.framer.app',
    image: '/demos/boda/delfina-lautaro/foto-hero.jpg',
    style: 'Alta gama — cronograma de la celebración, regalos y RSVP',
    palette: ['#F7F6F2', '#2C3329', '#8A9080'],
  },
]