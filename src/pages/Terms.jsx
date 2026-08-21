import Reveal from '../components/Reveal.jsx'
import { CONTACT_EMAIL, waLink } from '../data/site.js'

// --- Términos y condiciones -------------------------------------------------
// TODO: este es un primer borrador redactado a partir de la info real del
// negocio (planes, precios, plazo de entrega de 3-5 días hábiles, vigencia de
// 12 meses — ver `faqs` en site.js). Cubre lo esencial de un negocio de
// productos digitales a medida en Argentina (Ley 24.240 de Defensa del
// Consumidor), pero conviene que un abogado lo revise antes de considerarlo
// definitivo, sobre todo la sección de cancelaciones/reembolsos.
const sections = [
  {
    title: '1. Quiénes somos',
    body: [
      'veintidós es un estudio que diseña y arma invitaciones digitales web para bodas, cumpleaños de XV y baby showers en Argentina, aunque trabajamos con clientes de cualquier país porque el producto es 100% digital.',
      `Para cualquier consulta sobre estos términos podés escribirnos por WhatsApp o a ${CONTACT_EMAIL}.`,
    ],
  },
  {
    title: '2. Qué es lo que comprás',
    body: [
      'Vendemos invitaciones digitales: una página web personalizada (fecha, lugar, cronograma, fotos, confirmación de asistencia, etc.) que armamos a medida en base a un diseño del catálogo y a los datos que nos completás en el formulario post-compra.',
      'No es un producto físico ni una app para descargar — es un link que compartís con tus invitados por WhatsApp, redes o donde prefieras.',
    ],
  },
  {
    title: '3. Precios y planes',
    body: [
      'Los precios publicados en el sitio están en pesos argentinos (ARS), incluyen todo lo detallado en cada plan (Essential, Standard, Premium) y pueden actualizarse sin previo aviso — el precio válido para tu compra es el que figura en el sitio al momento de confirmarla.',
      'El precio de lista ya incluye la promo vigente; pagando por transferencia bancaria se aplica un descuento adicional sobre ese precio, según se muestra en el Carrito y el Checkout.',
    ],
  },
  {
    title: '4. Proceso de compra y armado',
    body: [
      'Elegís un plan y un estilo de diseño, confirmás tu compra y completás el formulario de personalización con los datos reales de tu evento. A partir de que recibimos todos los datos completos, armamos tu invitación y te la entregamos por WhatsApp en un plazo estimado de 3 a 5 días hábiles (consultanos si necesitás entrega express).',
      'Antes de darla por entregada, te mandamos la demo para que la revises — si algo está mal escrito o querés algún ajuste menor dentro de lo que incluye tu plan, lo corregimos antes de la entrega final.',
    ],
  },
  {
    title: '5. Medios de pago',
    body: [
      'Aceptamos transferencia bancaria (con los datos que te mostramos en el Checkout) y Mercado Pago mediante links de pago de monto fijo. En ambos casos el trabajo arranca una vez que confirmamos el pago o el comprobante.',
    ],
  },
  {
    title: '6. Vigencia del servicio',
    body: [
      'La invitación queda publicada online durante 12 meses desde la entrega. Pasado ese período, si necesitás mantenerla activa más tiempo, escribinos para coordinar la renovación.',
    ],
  },
  {
    title: '7. Cambios, cancelaciones y reembolsos',
    body: [
      'Podés cancelar tu compra y pedir el reembolso completo en cualquier momento antes de que empecemos a armar tu invitación (es decir, antes de que confirmemos recepción de tus datos y arranquemos el trabajo).',
      'Como se trata de un producto digital confeccionado a medida según los datos que vos nos das (no un producto en stock), una vez que el armado ya empezó no aplica el derecho de arrepentimiento de compras a distancia previsto en el art. 34 de la Ley 24.240, que exceptúa justamente a los bienes hechos a pedido del consumidor. Igual, si hay un problema con lo que te entregamos, escribinos — vamos a buscar la forma de solucionarlo.',
    ],
  },
  {
    title: '8. Propiedad intelectual',
    body: [
      'El diseño, el código y las plantillas de cada invitación son propiedad de veintidós. Al comprar, te damos una licencia de uso sobre tu invitación personalizada para tu evento — no para revenderla, redistribuirla ni reutilizarla como plantilla para armar invitaciones de terceros.',
    ],
  },
  {
    title: '9. Tus datos y privacidad',
    body: [
      'Los datos que cargás en el formulario post-compra (nombres, fecha, lugar, fotos, comprobante de pago, etc.) los usamos únicamente para armar tu invitación y contactarte por su estado — no los vendemos ni se los cedemos a terceros.',
      'Se guardan en una planilla y una carpeta de Drive privadas de veintidós, con acceso restringido. Si en algún momento querés que eliminemos tus datos, pedilo por WhatsApp o email y lo hacemos.',
    ],
  },
  {
    title: '10. Responsabilidad',
    body: [
      'Hacemos lo posible para que tu invitación funcione correctamente, pero no somos responsables por caídas o cambios de WhatsApp, Mercado Pago, Google u otros servicios de terceros que usamos para operar, ni por errores en la información final que se originen en datos incorrectos que vos nos hayas pasado.',
    ],
  },
  {
    title: '11. Cambios a estos términos',
    body: [
      'Podemos actualizar estos términos en cualquier momento; la versión vigente es siempre la que está publicada en esta página. Los cambios no afectan compras ya confirmadas.',
    ],
  },
  {
    title: '12. Ley aplicable',
    body: [
      'Estos términos se rigen por las leyes de la República Argentina. Ante cualquier duda o reclamo, preferimos que nos escribas directamente para resolverlo — somos un estudio chico y respondemos rápido.',
    ],
  },
]

export default function Terms() {
  return (
    <div className="wrap py-16 md:py-24">
      <Reveal>
        <p aria-hidden="true" className="ornament mb-4 text-sm justify-start">✦</p>
        <h1
          className="font-serif italic text-primary mb-4 leading-[0.95]"
          style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
        >
          Términos y condiciones
        </h1>
        <p className="font-sans text-sm text-onSurfaceVariant mb-16 max-w-2xl">
          Última actualización: agosto de 2026. Leé esto antes de comprar tu invitación — es
          corto y está escrito en criollo, no en legalés.
        </p>
      </Reveal>

      <div className="max-w-3xl space-y-12">
        {sections.map((s) => (
          <Reveal key={s.title}>
            <h2 className="font-serif text-headline-md text-primary text-xl md:text-2xl mb-4">
              {s.title}
            </h2>
            <div className="space-y-3">
              {s.body.map((p, i) => (
                <p key={i} className="font-sans text-onSurfaceVariant leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.05} className="max-w-3xl mt-16 pt-8 border-t border-outlineVariant/20">
        <p className="font-sans text-onSurfaceVariant leading-relaxed mb-4">
          ¿Te queda alguna duda sobre esto? Escribinos, lo resolvemos por WhatsApp.
        </p>
        <a
          href={waLink('Hola! Tengo una consulta sobre los términos y condiciones de veintidós.')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-onPrimary px-6 py-3 rounded-full font-sans text-label hover:opacity-90 transition-all active:scale-95"
        >
          Consultar por WhatsApp
        </a>
      </Reveal>
    </div>
  )
}
