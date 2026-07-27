import { motion } from 'framer-motion'
import Reveal, { Stagger, staggerItem } from './Reveal.jsx'
import Icon from './Icon.jsx'
import WhatsAppIcon from './WhatsAppIcon.jsx'
import { steps } from '../data/site.js'

export default function HowItWorks() {
  return (
    <section className="py-section bg-creamSurface/30">
      <div className="wrap">
        <Reveal className="text-center mb-16">
          <p className="font-sans text-label text-secondary uppercase tracking-widest mb-4">Paso a paso</p>
          <h2 className="font-serif text-headline-lg text-primary">
            ¿Cómo pedir <em className="italic font-normal">una invitación?</em>
          </h2>
          <div className="ornament mt-6 text-sm">
            <span className="opacity-40">✦</span><span className="opacity-70">✦</span><span className="opacity-40">✦</span>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" gap={0.08}>
          {steps.map(([icon, caption], i) => (
            <motion.div
              key={caption}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="bg-primaryContainer rounded-2xl p-7 flex flex-col items-center text-center gap-4 border border-transparent hover:border-promoGold transition-colors"
            >
              <div className="w-14 h-14 rounded-full border-2 border-promoGold flex items-center justify-center flex-shrink-0">
                <span className="font-serif text-lg text-promoGold">{i + 1}</span>
              </div>
              <div className="w-9 h-9 flex items-center justify-center text-white/80">
                {icon === 'whatsapp' ? <WhatsAppIcon className="w-7 h-7" /> : <Icon name={icon} className="text-2xl" />}
              </div>
              <p className="font-sans text-sm font-semibold uppercase tracking-wide text-white leading-snug">
                <span className="text-promoGold mr-1">→</span>
                {caption}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
