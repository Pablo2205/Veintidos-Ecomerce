import { Link } from 'react-router-dom'
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
      'veintidós es un estudio dedicado al diseño y desarrollo de invitaciones digitales web para bodas, fiestas de XV años y baby showers en Argentina. Al tratarse de un producto 100% digital, trabajamos con clientes de cualquier país.',
      `Ante cualquier consulta sobre estos términos, podés escribirnos por WhatsApp o a ${CONTACT_EMAIL}.`,
    ],
  },
  {
    title: '2. Qué es lo que comprás',
    body: [
      'Ofrecemos invitaciones digitales: una página web personalizada (fecha, lugar, cronograma, fotos, confirmación de asistencia, entre otros elementos) desarrollada a medida a partir de un diseño del catálogo y de los datos que completás en el formulario posterior a la compra.',
      'No se trata de un producto físico ni de una aplicación para descargar, sino de un enlace que podés compartir con tus invitados por WhatsApp, redes sociales o el medio que prefieras.',
    ],
  },
  {
    title: '3. Precios y planes',
    body: [
      'Los precios publicados en el sitio están expresados en pesos argentinos (ARS), incluyen todo lo detallado en cada plan (Essential, Standard, Premium) y pueden actualizarse sin previo aviso. El precio válido para tu compra es el que figura en el sitio al momento de confirmarla.',
      'El precio de lista ya incluye la promoción vigente; al pagar por transferencia bancaria se aplica un descuento adicional sobre ese precio, según se indica en el Carrito y el Checkout.',
    ],
  },
  {
    title: '4. Proceso de compra y armado',
    body: [
      'Al elegir un plan y un estilo de diseño, confirmás tu compra y completás el formulario de personalización con los datos reales de tu evento. Una vez recibidos todos los datos completos, desarrollamos tu invitación y te la entregamos por WhatsApp dentro de un plazo estimado de 3 a 5 días hábiles (podés consultarnos si necesitás una entrega express).',
      'Antes de considerarla entregada, te enviamos la demo para que la revises: si detectás algún error o querés un ajuste menor dentro de lo que incluye tu plan, lo corregimos antes de la entrega final.',
    ],
  },
  {
    title: '5. Medios de pago',
    body: [
      'Aceptamos transferencia bancaria (con los datos que se muestran en el Checkout) y Mercado Pago mediante enlaces de pago de monto fijo. En ambos casos, el trabajo comienza una vez confirmado el pago o el comprobante correspondiente.',
    ],
  },
  {
    title: '6. Vigencia del servicio',
    body: [
      'La invitación permanece publicada en línea durante 12 meses desde su entrega. Vencido ese período, si necesitás mantenerla activa por más tiempo, podés escribirnos para coordinar la renovación.',
    ],
  },
  {
    title: '7. Cambios, cancelaciones y reembolsos',
    body: [
      'Podés cancelar tu compra y solicitar el reembolso completo en cualquier momento antes de que comencemos a desarrollar tu invitación, es decir, antes de que confirmemos la recepción de tus datos e iniciemos el trabajo.',
      'Al tratarse de un producto digital confeccionado a medida según los datos que vos nos proporcionás (no de un producto en stock), una vez iniciado el armado no resulta aplicable el derecho de arrepentimiento de compras a distancia previsto en el art. 34 de la Ley 24.240, que exceptúa justamente a los bienes elaborados a pedido del consumidor. De todos modos, ante cualquier inconveniente con lo entregado, podés escribirnos y buscaremos la manera de resolverlo.',
    ],
  },
  {
    title: '8. Propiedad intelectual',
    body: [
      'El diseño, el código y las plantillas de cada invitación son propiedad de veintidós. Al concretar la compra, otorgamos una licencia de uso sobre tu invitación personalizada para tu evento, que no incluye el derecho a revenderla, redistribuirla ni reutilizarla como plantilla para desarrollar invitaciones de terceros.',
      <>
        El detalle completo (qué podés y no podés hacer con el diseño, y qué ocurre ante
        una copia no autorizada de una demo) está disponible en{' '}
        <Link to="/propiedad-intelectual" className="text-primary underline underline-offset-2">
          Propiedad intelectual
        </Link>
        .
      </>,
    ],
  },
  {
    title: '9. Tus datos y privacidad',
    body: [
      'Los datos que cargás en el formulario posterior a la compra (nombres, fecha, lugar, fotos, comprobante de pago, entre otros) se utilizan exclusivamente para desarrollar tu invitación y contactarte respecto de su estado; no se venden ni se ceden a terceros. Se almacenan en una planilla y una carpeta de Drive privadas de veintidós, con acceso restringido.',
      <>
        El detalle completo (qué datos solicitamos y tus derechos según la Ley 25.326)
        está disponible en{' '}
        <Link to="/privacidad" className="text-primary underline underline-offset-2">
          Política de privacidad
        </Link>
        .
      </>,
    ],
  },
  {
    title: '10. Responsabilidad',
    body: [
      'Hacemos lo posible para que tu invitación funcione correctamente, pero no somos responsables por interrupciones o cambios en WhatsApp, Mercado Pago, Google u otros servicios de terceros que utilizamos para operar, ni por errores en la información final originados en datos incorrectos que vos nos hayas proporcionado.',
    ],
  },
  {
    title: '11. Cambios a estos términos',
    body: [
      'Podemos actualizar estos términos en cualquier momento; la versión vigente es siempre la publicada en esta página. Los cambios no afectan a las compras ya confirmadas.',
    ],
  },
  {
    title: '12. Ley aplicable',
    body: [
      'Estos términos se rigen por las leyes de la República Argentina. Ante cualquier duda o reclamo, preferimos que te comuniques directamente con nosotros para resolverlo: somos un estudio de tamaño reducido y respondemos con rapidez.',
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
          Última actualización: agosto de 2026. Te recomendamos leer estos términos antes
          de comprar tu invitación — están redactados de forma clara y accesible.
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
          ¿Tenés alguna duda sobre esto? Escribinos y lo resolvemos por WhatsApp.
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
