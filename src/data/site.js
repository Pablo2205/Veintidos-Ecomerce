export const WA_NUMBER = '5491139126543'
export const waLink = (msg) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`

// --- Datos de pago (transferencia) -------------------------------------
// Completá con tus datos reales antes de publicar. Se muestran tal cual
// en el checkout, con botón de copiar.
export const BANK_DATA = {
  alias: 'veintidos.pagos', // TODO: reemplazar por tu alias real
  cbu: '0000000000000000000000', // TODO: reemplazar por tu CBU real
  titular: 'Nombre Apellido', // TODO: titular de la cuenta
}

// --- Google Sheets (formulario post-compra) ---------------------------
// URL del Web App de Google Apps Script (Implementar > Nueva implementación >
// Aplicación web, acceso "Cualquier usuario"). Ver GOOGLE_APPS_SCRIPT.md en
// la raíz del proyecto para el código listo para pegar en script.google.com.
export const GOOGLE_SHEETS_URL =
  'https://script.google.com/macros/s/TU_SCRIPT_ID_ACA/exec' // TODO: reemplazar

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
]


// --- Eventos disponibles -------------------------------------------------
// Solo estos dos tipos de evento están habilitados en todo el sitio
// (Home, Catálogo, formulario). Para sumar uno nuevo, agregalo acá y
// también como opción en el <select> de src/pages/Personalize.jsx.
export const categories = [
  {
    slug: 'boda',
    name: 'Boda',
    desc: 'Románticas y elegantes, con cronograma del día, dress code y datos para regalos.',
  },
  {
    slug: 'xv-anos',
    name: 'Cumple XV',
    desc: 'Diseños llenos de magia y brillo para una noche que se recuerda toda la vida.',
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
    name: 'Básica',
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
      'Todo lo del plan Básica',
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

export const steps = [
  ['Escribinos', 'Mandanos un WhatsApp contándonos tu evento. Te asesoramos y te pasamos precios.'],
  ['Elegís tu plan', 'Básica, Standard o Premium. Definimos juntos estilo, colores y funciones.'],
  ['Nos pasás los datos', 'Nombres, fecha, lugar, fotos y textos. Con un formulario simple te guiamos en todo.'],
  ['Recibís tu invitación', 'Link + QR listos para compartir por WhatsApp, redes o imprimir en tus tarjetas.'],
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
    a: 'Básica: lo esencial — cuenta regresiva, fecha, lugar, mapa, confirmación por WhatsApp y sección de regalos. Standard: suma música, galería de fotos, dress code, tips para invitados, agendar la fecha y QR para imprimir. Premium: agrega panel de confirmaciones en tiempo real, sugerencia de canciones, álbum compartido, video y personalización avanzada.',
  },
  {
    q: '¿Puedo personalizar el diseño?',
    a: 'Sí. En todos los planes adaptamos colores y estilo a tu temática. En Premium la personalización es más profunda, y si soñás con algo único también hacemos diseños 100% a medida.',
  },
  {
    q: '¿Cómo confirman asistencia mis invitados?',
    a: 'Depende del plan: por WhatsApp con un mensaje prearmado (Básica y Standard), o directamente desde la invitación con un panel privado donde ves los confirmados en tiempo real (Premium).',
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

// --- Catálogo — productos de ejemplo ---------------------------------
// Reemplazar por tus diseños reales. "category" tiene que ser "boda" o
// "xv-anos" (son los únicos eventos habilitados, ver `categories` arriba).
// "color" es la clave de `productColors` de arriba — placeholder por ahora,
// se van a redefinir cuando llegue el detalle real de cada demo.
export const products = [
  { id: 1, name: 'Invitación Boda — Elegante', category: 'boda', plan: 'Standard', price: 78000, color: 'verde', gradient: 'from-[#8FB996] to-[#3C5F41]' },
  { id: 2, name: 'Invitación Boda — Campo', category: 'boda', plan: 'Básica', price: 56000, color: 'marron', gradient: 'from-[#C9BE9A] to-[#8A7B4F]' },
  { id: 3, name: 'XV Años — Boliche Disco', category: 'xv-anos', plan: 'Premium', price: 88000, color: 'rosa', gradient: 'from-[#3B2F55] to-[#1B1230]', badge: 'Nuevo' },
  { id: 4, name: 'Boda — Tela Minimalista', category: 'boda', plan: 'Standard', price: 78000, color: 'beige', gradient: 'from-[#D9D4C4] to-[#A69C82]' },
  { id: 5, name: 'XV Años — Noche Esmeralda', category: 'xv-anos', plan: 'Standard', price: 78000, color: 'verde', gradient: 'from-[#1F3D2C] to-[#0D1F16]' },
  { id: 6, name: 'Invitación Boda — Fotografía', category: 'boda', plan: 'Premium', price: 88000, color: 'marron', gradient: 'from-[#4A2F1E] to-[#2A1810]' },
]
