import Reveal from '../components/Reveal.jsx'
import { CONTACT_EMAIL, waLink } from '../data/site.js'

// --- Propiedad intelectual --------------------------------------------------
// Separada de Terms.jsx (ago 2026, a pedido de Pablo) para poder linkearla
// directo desde donde haga falta (footer, un reclamo por copia de diseño,
// etc.) sin mandar a leer todos los términos. Terms.jsx mantiene un resumen
// corto en su punto 8 que linkea acá — este es el texto completo.
const sections = [
  {
    title: '1. Qué es de nuestra propiedad',
    body: [
      'El diseño visual, el código fuente y las plantillas de cada invitación del catálogo son propiedad de veintidós, con independencia de la tecnología con la que hayan sido desarrolladas. La titularidad no varía según la herramienta utilizada.',
      'Cada demo del catálogo (la paleta, la tipografía, el diseño, las animaciones y la estructura de secciones) constituye un trabajo de diseño original desarrollado para veintidós, aunque en algunos casos pueda tomar referencias visuales de estilo (por ejemplo, de Pinterest o sitios existentes) como punto de partida, tal como es habitual en cualquier estudio de diseño.',
    ],
  },
  {
    title: '2. Qué licencia otorgamos al comprar',
    body: [
      'Al adquirir un plan, otorgamos una licencia de uso limitada sobre tu invitación ya personalizada (con tus datos, fotos y textos) para el evento por el cual fue contratada.',
      'Dicha licencia no incluye el derecho a revender la invitación o el diseño a un tercero, redistribuir el código o las plantillas, ni reutilizar el diseño —con o sin tus datos— como base para desarrollar invitaciones destinadas a otras personas, sean estas pagas o gratuitas.',
    ],
  },
  {
    title: '3. Qué no está permitido',
    body: [
      'Copiar, clonar o adaptar el diseño de cualquier demo del catálogo (mediante su visualización, la descarga de su código o el uso de herramientas de captura o scraping) con el fin de ofrecerlo como propio, destinarlo a otro negocio, o evitar contratar nuestro servicio.',
      'Eliminar u ocultar el crédito o la marca de veintidós de una invitación entregada, o presentar una invitación nuestra como si su diseño perteneciera a otro estudio o persona.',
    ],
  },
  {
    title: '4. Contenido que vos nos proporcionás',
    body: [
      'Las fotografías, textos, nombres, canciones y demás contenido que nos proporcionás para desarrollar tu invitación continúan siendo de tu propiedad; los utilizamos únicamente para construir el producto adquirido. No los reutilizamos en otras invitaciones ni en materiales de marketing sin tu autorización previa.',
      'Sos responsable de que el contenido proporcionado (fotos, música, textos) sea de tu autoría o de que contés con derecho a utilizarlo. No asumimos responsabilidad por reclamos de terceros respecto de contenido que nos hayas provisto.',
    ],
  },
  {
    title: '5. Ante la detección de una copia',
    body: [
      'Si detectamos que un diseño del catálogo fue copiado o reutilizado sin autorización, nos reservamos el derecho de efectuar el reclamo correspondiente por los medios que correspondan. Si identificás una copia de alguna de nuestras demos, te agradecemos que nos lo informes: nos permite proteger el trabajo de todo el equipo.',
    ],
  },
]

export default function IntellectualProperty() {
  return (
    <div className="wrap py-16 md:py-24">
      <Reveal>
        <p aria-hidden="true" className="ornament mb-4 text-sm justify-start">✦</p>
        <h1
          className="font-serif italic text-primary mb-4 leading-[0.95]"
          style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
        >
          Propiedad intelectual
        </h1>
        <p className="font-sans text-sm text-onSurfaceVariant mb-16 max-w-2xl">
          Última actualización: agosto de 2026. Quién es titular de cada elemento, y qué
          usos están permitidos (y cuáles no) sobre una invitación de veintidós.
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
          ¿Identificaste una copia de un diseño nuestro, o tenés una consulta sobre el uso de contenido? Escribinos.
        </p>
        <a
          href={waLink('Hola! Tengo una consulta sobre propiedad intelectual de veintidós.')}
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
