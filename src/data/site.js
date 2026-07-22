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


// Datos para el pago por transferencia. Reemplazar por los reales.
export const bankInfo = {
  alias: 'veintidos.pagos',
  cbu: '0000003100000000000000',
  titular: 'Pablo Daniel Coria',
  cuit: '20-00000000-0',
}

// URL del Google Apps Script (Web App) que recibe el formulario post-compra
// y lo agrega como fila a una Google Sheet. Ver /GOOGLE_SHEETS_SETUP.md
export const GAS_WEBHOOK_URL = import.meta.env.VITE_GAS_WEBHOOK_URL || ''

export const categories = [
  {
    slug: 'boda',
    name: 'Boda',
    desc: 'Románticas y elegantes, con cronograma del día, dress code y datos para regalos.',
    demo: '/demos/boda-verde/',
  },
  {
    slug: 'xv-anos',
    name: 'XV Años',
    desc: 'Diseños llenos de magia y brillo para una noche que se recuerda toda la vida.',
    demo: '/demos/xv-esmeralda/',
  },
  {
    slug: 'cumpleanos',
    name: 'Cumpleaños',
    desc: 'Del primer añito a los grandes festejos: color, alegría y toda la info en un link.',
    demo: '/demos/primer-anio/',
  },
  {
    slug: 'baby-shower',
    name: 'Baby Shower',
    desc: 'Invitaciones dulces y tiernas para dar la bienvenida al nuevo integrante de la familia.',
    demo: '/demos/baby-shower/',
  },
  {
    slug: 'revelacion',
    name: 'Revelación de género',
    desc: '¿Nene o nena? Anunciá el momento más esperado con estilo y emoción.',
    demo: null,
  },
  {
    slug: 'bautismo',
    name: 'Bautismo y Comunión',
    desc: 'Diseños delicados y serenos para celebraciones que tocan el corazón.',
    demo: null,
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

export const plans = [
  {
    name: 'Básica',
    tagline: 'Lo esencial, con estilo',
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
    a: 'Transferencia bancaria o Mercado Pago. Trabajamos con una seña para comenzar y el saldo contra entrega.',
  },
  {
    q: '¿Trabajan fuera de Argentina?',
    a: 'Sí. Como la invitación es 100% digital, trabajamos con clientes de cualquier país. Todo el proceso se hace online.',
  },
]

// Catálogo — productos de ejemplo (reemplazar por datos reales / CMS)
export const products = [
  { id: 1, name: 'Invitación Boda — Elegante', category: 'boda', plan: 'Standard', price: 52000, gradient: 'from-[#8FB996] to-[#3C5F41]' },
  { id: 2, name: 'Invitación Boda — Campo', category: 'boda', plan: 'Básico', price: 32000, gradient: 'from-[#C9BE9A] to-[#8A7B4F]' },
  { id: 3, name: 'XV Años — Boliche Disco', category: 'xv-anos', plan: 'Premium', price: 65000, gradient: 'from-[#3B2F55] to-[#1B1230]', badge: 'Nuevo' },
  { id: 4, name: 'Boda — Tela Minimalista', category: 'boda', plan: 'Standard', price: 50000, gradient: 'from-[#D9D4C4] to-[#A69C82]' },
  { id: 5, name: 'Invitación Boda — Playa', category: 'boda', plan: 'Básico', price: 32000, gradient: 'from-[#BFD8DE] to-[#6E97A0]' },
  { id: 6, name: 'Invitación Boda — Fotografía', category: 'boda', plan: 'Premium', price: 60000, gradient: 'from-[#4A2F1E] to-[#2A1810]' },
]

export const cartItems = [
  {
    id: 1,
    name: "Invitación 'Noir & Oro'",
    plan: 'Pack Premium Digital',
    price: 12500,
    gradient: 'from-[#2a392e] to-[#152419]',
  },
]
