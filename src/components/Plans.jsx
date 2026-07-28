import { motion } from 'framer-motion'
import Reveal, { Stagger, staggerItem } from './Reveal.jsx'
import Icon from './Icon.jsx'
import PriceTag from './PriceTag.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import { plans, waLink } from '../data/site.js'

export default function Plans() {
  return (
    <section id="planes" className="py-section bg-background overflow-hidden relative">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondaryContainer/20 rounded-full blur-3xl pointer-events-none" />
      <div className="wrap relative z-10">
        <Reveal className="text-center mb-16">
          <p className="font-sans text-label text-secondary uppercase tracking-widest mb-4">Nuestros Planes</p>
          <h2
            className="font-serif italic font-normal text-primary"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            Tu entrada a una invitación <span className="text-secondary">inolvidable</span>
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 lg:grid-cols-3 gap-6" gap={0.12}>
          {plans.map((p) => {
            const isHighlight = p.variant === 'highlight'
            const isDark = p.variant === 'dark'
            const isPlain = p.variant === 'plain'
            const isDarkCard = isHighlight || isDark

            return (
              <motion.div
                key={p.name}
                variants={staggerItem}
                className={`rounded-2xl p-8 flex flex-col relative transition-all ${
                  isHighlight
                    ? 'bg-primary border border-promoGold/25'
                    : isDark
                    ? 'bg-primaryContainer border border-primaryContainer hover:border-primaryFixed/20'
                    : 'bg-white border border-outlineVariant hover:border-secondary/40'
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-promoGold text-primary px-5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase font-sans whitespace-nowrap">
                    {p.highlight}
                  </div>
                )}

                <div className="mb-8">
                  <span className={`font-sans text-label uppercase tracking-widest ${isPlain ? 'text-secondary' : 'text-promoGold/70'}`}>
                    Plan
                  </span>
                  <h3
                    className={`font-serif italic font-normal mt-2 ${isPlain ? 'text-primary' : 'text-primaryFixed'}`}
                    style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
                  >
                    {p.name}
                  </h3>
                  <p className={`font-sans mt-1.5 text-sm ${isPlain ? 'text-onSurfaceVariant' : 'text-primaryFixed/50'}`}>
                    {p.tagline}
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-grow">
                  {p.items.map((it, i) => (
                    <li
                      key={it}
                      className={`flex items-center gap-3 font-sans text-sm ${
                        isPlain
                          ? 'text-onSurfaceVariant'
                          : i === 0
                          ? 'text-promoGold/85 font-semibold'
                          : 'text-primaryFixed/75'
                      }`}
                    >
                      <Icon
                        name={i === 0 && !isPlain ? 'add' : 'check'}
                        className={`scale-75 flex-shrink-0 ${isPlain ? 'text-secondary' : 'text-promoGold/50'}`}
                      />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>

                <div className={`pt-6 border-t ${isPlain ? 'border-outlineVariant' : 'border-primaryFixed/10'}`}>
                  <PriceTag price={p.price} dark={isDarkCard} />
                </div>
              </motion.div>
            )
          })}
        </Stagger>

        <Reveal delay={0.15} className="mt-14">
          <div className="max-w-3xl mx-auto rounded-2xl border-2 border-dashed border-promoGold/50 bg-creamSurface px-8 py-10 text-center">
            <p className="font-sans text-label text-promoGold uppercase tracking-widest mb-3">
              ✦ A tu medida ✦
            </p>
            <h3
              className="font-serif italic font-normal text-primary mb-3"
              style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)' }}
            >
              ¿Querés algo que no está en ningún plan?
            </h3>
            <p className="font-sans text-onSurfaceVariant text-base max-w-xl mx-auto mb-8">
              También hacemos diseños 100% a medida, con funciones especiales creadas
              específicamente para tu evento.
            </p>
            <WhatsAppButton
              href={waLink('Hola! Quiero cotizar un diseño 100% a medida para mi evento.')}
              className="px-10 py-4 text-base"
            >
              Cotizar por WhatsApp
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
