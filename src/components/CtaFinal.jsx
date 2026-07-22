import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
import { waLink } from '../data/site.js'

export default function CtaFinal() {
  return (
    <section className="py-section bg-creamSurface/50 border-t border-b border-outlineVariant/20">
      <div className="wrap text-center">
        <Reveal>
          <h2 className="font-serif text-display-mobile md:text-headline-lg text-primary mb-6">
            Tu evento merece una invitación <em className="italic font-normal">inolvidable</em>
          </h2>
          <p className="text-onSurfaceVariant font-sans text-body-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Contanos qué vas a festejar y te respondemos en el día con demos, asesoramiento y precios. Sin
            compromiso.
          </p>
          <a
            href={waLink('Hola! Quiero mi invitación digital. Les cuento sobre mi evento:')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-primary text-onPrimary px-12 py-5 rounded-full font-sans font-bold text-lg hover:bg-primaryContainer transition-all"
          >
            <Icon name="chat" filled className="text-whatsapp text-3xl" />
            Pedir mi invitación
          </a>
        </Reveal>
      </div>
    </section>
  )
}
