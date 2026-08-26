import Reveal from '../components/Reveal.jsx'
import { CONTACT_EMAIL, waLink } from '../data/site.js'

// --- Política de privacidad --------------------------------------------------
// Separada de Terms.jsx (ago 2026, a pedido de Pablo) para tener más espacio
// para detallar Ley 25.326 (Protección de Datos Personales, Argentina) sin
// inflar los términos generales. Terms.jsx mantiene un resumen corto en su
// punto 9 que linkea acá.
// TODO: al igual que Terms.jsx, es un borrador redactado a partir de cómo
// funciona el negocio hoy — conviene que un abogado lo revise antes de
// considerarlo definitivo.
const sections = [
  {
    title: '1. Quién trata tus datos',
    body: [
      'veintidós es responsable del tratamiento de los datos personales que se proporcionan a través del sitio y del formulario posterior a la compra, conforme a la Ley 25.326 de Protección de los Datos Personales (Argentina).',
    ],
  },
  {
    title: '2. Qué datos solicitamos',
    body: [
      'A través del formulario posterior a la compra: nombres de los protagonistas, WhatsApp, correo electrónico, tipo y fecha del evento, lugar y dirección, información sobre regalos (alias/CBU), dress code, música, fotografías (mediante enlace a Drive/Google Fotos), video y comprobante de pago.',
      'En el sitio, en general, no utilizamos cookies de terceros ni píxeles de seguimiento (Meta Pixel, Google Analytics, entre otros); no recolectamos datos de navegación más allá de los registros técnicos estándar que genera Vercel como proveedor de hosting, los cuales no identifican personas.',
    ],
  },
  {
    title: '3. Para qué los utilizamos',
    body: [
      'Exclusivamente para desarrollar tu invitación y comunicarnos con vos respecto de tu pedido (confirmación, avisos de estado, entrega). No utilizamos tus datos para enviarte publicidad de terceros ni para fines distintos a los de tu compra.',
    ],
  },
  {
    title: '4. Dónde se almacenan',
    body: [
      'En una planilla de Google Sheets y una carpeta de Google Drive, ambas privadas de la cuenta de veintidós, con acceso restringido a las personas encargadas de procesar los pedidos. El comprobante de pago que cargás se almacena en esa misma carpeta de Drive.',
      'El formulario está protegido mediante reCAPTCHA v3, que permite filtrar envíos automatizados o generados por bots.',
    ],
  },
  {
    title: '5. Con quién los compartimos',
    body: [
      'No vendemos ni cedemos tus datos a terceros. Los únicos terceros que acceden a tus datos son los proveedores de servicios que utilizamos para operar (Google, para el almacenamiento y el envío de correos; Mercado Pago, en caso de que optes por ese medio de pago, quien procesa el pago directamente sin que accedamos a los datos de tu tarjeta o cuenta bancaria), y únicamente en la medida estrictamente necesaria para esa función.',
    ],
  },
  {
    title: '6. Tus derechos',
    body: [
      'De acuerdo con la Ley 25.326, tenés derecho a acceder, rectificar, actualizar o solicitar la eliminación de tus datos en cualquier momento. Para ejercer cualquiera de estos derechos, podés escribirnos por WhatsApp o a ' + CONTACT_EMAIL + '; respondemos de manera directa y sin necesidad de trámites complejos.',
      'También podés presentar un reclamo ante la Agencia de Acceso a la Información Pública (autoridad de control de la Ley 25.326) si considerás que no resolvimos tu solicitud correctamente.',
    ],
  },
  {
    title: '7. Por cuánto tiempo los conservamos',
    body: [
      'Mientras tu invitación permanezca activa (12 meses desde la entrega, según los Términos y condiciones) y por un plazo razonable adicional por motivos administrativos y contables. Si solicitás la eliminación de tus datos antes de ese plazo, la llevamos a cabo, salvo que debamos conservar cierta información por una obligación legal (por ejemplo, registros de facturación).',
    ],
  },
  {
    title: '8. Cambios a esta política',
    body: [
      'Podemos actualizar esta política en cualquier momento; la versión vigente es siempre la publicada en esta página.',
    ],
  },
]

export default function Privacy() {
  return (
    <div className="wrap py-16 md:py-24">
      <Reveal>
        <p aria-hidden="true" className="ornament mb-4 text-sm justify-start">✦</p>
        <h1
          className="font-serif italic text-primary mb-4 leading-[0.95]"
          style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
        >
          Política de privacidad
        </h1>
        <p className="font-sans text-sm text-onSurfaceVariant mb-16 max-w-2xl">
          Última actualización: agosto de 2026. Qué datos solicitamos, para qué los
          utilizamos y de qué manera los protegemos.
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
          ¿Querés ejercer alguno de tus derechos sobre tus datos, o tenés alguna consulta? Escribinos.
        </p>
        <a
          href={waLink('Hola! Tengo una consulta sobre la política de privacidad de veintidós.')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-onPrimary px-6 py-3 rounded-full font-sans text-label hover:opacity-90 transition-all active:scale-95"
        >
          Consultar por WhatsApp
        </a>
        <p className="font-sans text-xs text-onSurfaceVariant opacity-60 mt-4">
          O por mail a {CONTACT_EMAIL}.
        </p>
      </Reveal>
    </div>
  )
}
