import { motion } from 'framer-motion'
import Reveal, { Stagger, staggerItem } from './Reveal.jsx'
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

        <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" gap={0.08}>
          {steps.map(([, caption], i) => (
            <motion.div
              key={caption}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-6 flex flex-col items-center text-center gap-4 border border-transparent hover:border-white/50 transition-colors"
              style={{ backgroundColor: '#9F8471' }}
            >
              <div className="w-11 h-11 rounded-full border-2 border-white/85 flex items-center justify-center flex-shrink-0">
                <span className="font-serif text-lg text-white">{i + 1}</span>
              </div>
              <p className="font-sans text-xs font-bold uppercase tracking-wide text-white leading-snug">
                <span className="mr-1">→</span>
                {caption}
              </p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
