import { motion } from 'framer-motion'
import Reveal, { Stagger, staggerItem } from './Reveal.jsx'
import Icon from './Icon.jsx'
import WhatsAppIcon from './WhatsAppIcon.jsx'
import { steps } from '../data/site.js'

export default function HowItWorks() {
  return (
    <section className="py-section bg-creamSurface/40">
      <div className="wrap">
        <Reveal className="text-center mb-16">
          <p aria-hidden="true" className="ornament mb-4 text-sm">✦</p>
          <p className="font-mono text-label text-secondary uppercase tracking-widest mb-4">Paso a paso</p>
          <h2
            className="font-serif italic font-normal text-primary leading-[0.98]"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
          >
            ¿Cómo pedís <span className="text-secondary">tu invitación?</span>
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-2 sm:grid-cols-3 gap-4" gap={0.08}>
          {steps.map(([icon, caption], i) => {
            const isWa = icon === 'whatsapp'
            return (
              <motion.div
                key={caption}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className={`relative overflow-hidden rounded-2xl p-6 flex flex-col gap-5 bg-primaryFixed/70 border border-transparent transition-all duration-300 cursor-default ${
                  isWa ? 'hover:border-whatsapp/40 hover:bg-primaryFixed' : 'hover:border-promoGold/30 hover:bg-primaryFixed'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -bottom-6 font-serif italic text-primary/[0.06] leading-none select-none pointer-events-none"
                  style={{ fontSize: '7rem' }}
                >
                  {i + 1}
                </span>
                <div className="relative flex items-start justify-between">
                  <div className="w-11 h-11 rounded-full bg-white/70 border border-white/80 flex items-center justify-center flex-shrink-0">
                    {isWa ? (
                      <WhatsAppIcon className="w-5 h-5 text-whatsapp" />
                    ) : (
                      <Icon name={icon} className="text-secondary" />
                    )}
                  </div>
                  <span className="font-serif italic text-promoGold leading-none select-none" style={{ fontSize: '2.25rem' }}>
                    {i + 1}
                  </span>
                </div>
                <p className="relative font-sans text-xs font-bold uppercase tracking-wide text-primary leading-snug">
                  {caption}
                </p>
              </motion.div>
            )
          })}
        </Stagger>
      </div>
    </section>
  )
}
