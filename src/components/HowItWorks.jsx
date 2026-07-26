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

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {steps.map(([title, desc], i) => (
            <motion.div
              key={title}
              variants={staggerItem}
              className="flex gap-6 p-4 -m-4 rounded-2xl transition-colors hover:bg-secondaryContainer/20 group"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-primary text-onPrimary rounded-full flex items-center justify-center font-serif text-xl ring-2 ring-transparent group-hover:ring-promoGold transition-all">
                {i + 1}
              </div>
              <div>
                <h3 className="font-serif text-headline-md text-primary mb-3">{title}</h3>
                <p className="text-onSurfaceVariant font-sans">{desc}</p>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
