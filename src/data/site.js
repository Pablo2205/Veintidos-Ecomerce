export const WA_NUMBER = '5491139126543'
export const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
export const CONTACT_EMAIL = 'veintidos.invitaciones@gmail.com'
export const CONTACT_LOCATION = 'Buenos Aires, Argentina'

// --- Redes sociales --------------------------------------------------------
// Instagram ya es el real (el mismo que estaba en el footer). Facebook y
// TikTok son placeholders — reemplazalos por tus URLs reales antes de publicar.
export const INSTAGRAM_URL = 'https://instagram.com/veintidos.invitaciones'
export const FACEBOOK_URL = 'https://facebook.com/veintidos.invitaciones' // TODO: reemplazar por tu página real
export const TIKTOK_URL = 'https://tiktok.com/@veintidos.invitaciones' // TODO: reemplazar por tu usuario real

// --- Datos de pago (transferencia) -------------------------------------
// Completá con tus datos reales antes de publicar. Se muestran tal cual
// en el checkout, con botón de copiar.
export const BANK_DATA = {
  alias: 'veintidos.pagos', // TODO: reemplazar por tu alias real
  cbu: '0000000000000000000000', // TODO: reemplazar por tu CBU real
  titular: 'Pablo Daniel Coria',
}

// --- Google Sheets (formulario post-compra) ---------------------------
// URL del Web App de Google Apps Script (Implementar > Nueva implementación >
// Aplicación web, acceso "Cualquier usuario"). Ver GOOGLE_APPS_SCRIPT.md en
// la raíz del proyecto para el código listo para pegar en script.google.com.
export const GOOGLE_SHEETS_URL =
  'https://script.google.com/macros/s/AKfycbwFETRaVmLso9lF6Sbe5l7tg7tMG-XQeu47n-jmRBUneernqXbN9CHjiR47WSWvdpw/exec'

// Tamaño máximo aceptado para el comprobante (en MB) antes de convertir a base64.
export const MAX_COMPROBANTE_MB = 5

// --- Promo del banner superior -------------------------------------------
// Puramente de marketing (texto del banner). No modifica ningún precio real.
export const PROMO_PERCENT = 30
export const currentMonthLabel = () => {
  const mes = new Date().toLocaleDateString('es-AR', { month: 'long' })
  return mes.charAt(0).toUpperCase() + mes.slice(1)
}

// --- Precio "tachado" ------------------------------------------------------
// Todos los precios que se muestran (planes, catálogo, carrito, checkout)
// son el precio real que se cobra. Para mostrar un precio tachado más alto
// arriba (sensación de descuento), multiplicamos por este factor SOLO para
// mostrar — nunca se usa para cobrar.
const STRIKETHROUGH_FACTOR = 1.15
export const originalPrice = (price) => Math.round((price * STRIKETHROUGH_FACTOR) / 10) * 10

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
]

// --- Ranking de planes -----------------------------------------------
// Se usa en el formulario post-compra para mostrar solo los campos que
// tienen sentido según el plan comprado (ej. "dress code" no aplica a
// Essential, "video de bienvenida" es solo de Premium).
export const PLAN_RANK = { Essential: 1, Standard: 2, Premium: 3 }

// --- Tipos de evento del FORMULARIO post-compra --------------------------
// Distinto de `categories` (que son los eventos del Home/Catálogo). Acá van
// las opciones del <select> "Tipo de evento" en Personalize.jsx.
export const eventTypeOptions = ['Boda', 'Cumple XV', 'Otro']

// Qué preguntas mostrar en el paso "Contenido especial" del formulario,
// según el plan comprado — no tiene sentido pedir dress code o playlist si
// el plan Essential no las incluye. Ver `plans` más abajo para el detalle de
// qué trae cada uno.
export const planFeatureFlags = (planName) => {
  const rank = PLAN_RANK[planName] || PLAN_RANK.Standard
  return {
    dressCode: rank >= PLAN_RANK.Standard,
    playlist: rank >= PLAN_RANK.Standard,
    gallery: rank >= PLAN_RANK.Standard,
    video: rank >= PLAN_RANK.Premium,
    customization: rank >= PLAN_RANK.Premium,
  }
}

// Solo estos dos tipos de evento están habilitados en todo el sitio
// (Home, Catálogo, formulario). Para sumar uno nuevo, agregalo acá y
// también como opción en el <select> de src/pages/Personalize.jsx.
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
  ['bar_chart', 'Panel de confirmaciones', 'Mirá quién confirmó en tiempo real, desde tu celular.'],
  ['collections', 'Álbum compartido', 'Un QR en las mesas para que todos suban sus fotos de la fiesta.'],
  ['videocam', 'Sección de video', 'Sumá un video especial dentro de la invitación.'],
]

// --- Planes ---------------------------------------------------------------
// Precios fijos y visibles (no "a consultar"). Solo el diseño 100% a medida
// (al pie de la sección de Planes) pide consultar precio por WhatsApp.
export const plans = [
  {
    name: 'Essential',
    tagline: 'Lo esencial, con estilo',
    price: 56000,
    items: [
      'Diseño adaptado a tu evento',
      'Cuenta regresiva',
      'Fecha, lugar y mapa',
      'Confirmación por WhatsApp',
      'Sección de regalos',
      'Link para compartir',
    ],
    variant: 'plain',
  },
  {
    name: 'Standard',
    tagline: 'La experiencia completa',
    highlight: 'Más elegida',
    price: 78000,
    items: [
      'Todo lo del plan Essential',
      'Música de fondo a elección',
      'Galería de fotos',
      'Dress code',
      'Tips y notas para invitados',
      'Agendar la fecha en el calendario',
      'QR listo para imprimir',
    ],
    variant: 'highlight',
  },
  {
    name: 'Premium',
    tagline: 'Para que no falte nada',
    price: 88000,
    items: [
      'Todo lo del plan Standard',
      'Panel de confirmaciones en tiempo real',
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
    a: 'Essential: lo esencial — cuenta regresiva, fecha, lugar, mapa, confirmación por WhatsApp y sección de regalos. Standard: suma música, galería de fotos, dress code, tips para invitados, agendar la fecha y QR para imprimir. Premium: agrega panel de confirmaciones en tiempo real, sugerencia de canciones, álbum compartido, video y personalización avanzada.',
  },
  {
    q: '¿Puedo personalizar el diseño?',
    a: 'Sí. En todos los planes adaptamos colores y estilo a tu temática. En Premium la personalización es más profunda, y si soñás con algo único también hacemos diseños 100% a medida.',
  },
  {
    q: '¿Cómo confirman asistencia mis invitados?',
    a: 'Depende del plan: por WhatsApp con un mensaje prearmado (Essential y Standard), o directamente desde la invitación con un panel privado donde ves los confirmados en tiempo real (Premium).',
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
// "category" tiene que ser "boda" o "xv-anos" (son los únicos eventos
// habilitados, ver `categories` arriba). "color" es la clave de
// `productColors` de arriba.
export const products = [
  {
    id: 7,
    name: 'Invitación Boda — Pablo & Lucila',
    category: 'boda',
    plan: 'Premium',
    price: 88000,
    color: 'verde',
    gradient: 'from-[#3C5F41] to-[#1F2E1C]',
    badge: 'Demo real',
    demoUrl: 'https://boda-rosy-alpha.vercel.app/?vip=true',
    image: '/demos/boda/pablo-lucila/foto-hero.jpg',
  },
  {
    id: 8,
    name: 'Invitación Boda — Lucía & Juan',
    category: 'boda',
    plan: 'Premium',
    price: 88000,
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
    name: 'Invitación Boda — Olivia & Ralph',
    category: 'boda',
    plan: 'Premium',
    price: 88000,
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
    name: 'Invitación Boda — Juan & Ana',
    category: 'boda',
    plan: 'Premium',
    price: 88000,
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
    name: 'Invitación Boda — Lorena & Gustavo',
    category: 'boda',
    plan: 'Premium',
    price: 88000,
    color: 'verde',
    gradient: 'from-[#8FA07A] to-[#3F4A34]',
    badge: 'Nuevo',
    demoUrl: '/demos/boda/lorena-gustavo/',
    image: '/demos/boda/lorena-gustavo/foto-hero.jpg',
    style: 'Botánico — fotos difuminadas',
    palette: ['#FAF7F0', '#3F4A34', '#C6A15B'],
  },
]