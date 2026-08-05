import Reveal from './Reveal.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import TornDivider from './TornDivider.jsx'
import { waLink } from '../data/site.js'

export default function CtaFinal() {
  return (
    <section className="relative py-section bg-primary border-t border-primaryFixed/10 overflow-hidden">
      <span
        aria-hidden="true"
        className="hidden md:block absolute -left-[4vw] -bottom-[10vw] font-serif italic font-bold text-primaryFixed/[0.04] leading-none select-none pointer-events-none"
        style={{ fontSize: '32vw' }}
      >
        22
      </span>
      <div className="wrap relative text-center">
        <Reveal>
          <p aria-hidden="true" className="ornament mb-5 text-sm">✦</p>
          <h2
            className="font-serif italic font-normal text-primaryFixed mb-6"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)', lineHeight: 0.98 }}
          >
            Tu evento merece una invitación{' '}
            <span className="text-promoGold">inolvidable</span>
          </h2>
          <p className="text-primaryFixed/45 font-sans text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Contanos qué vas a festejar y te respondemos en el día con demos,
            asesoramiento y precios. Sin compromiso.
          </p>
          <WhatsAppButton
            href={waLink('Hola! Quiero mi invitación digital. Les cuento sobre mi evento:')}
            className="px-12 py-5 text-lg"
            iconClassName="w-6 h-6"
          >
            Pedir mi invitación
          </WhatsAppButton>
        </Reveal>
      </div>
      <TornDivider className="absolute left-0 right-0 top-full -mt-px" color="fill-primary" seed={1} />
    </section>
  )
}
