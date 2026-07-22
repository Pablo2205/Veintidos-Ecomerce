import { motion } from 'framer-motion'
import Reveal, { Stagger, staggerItem } from './Reveal.jsx'
import Icon from './Icon.jsx'
import { features } from '../data/site.js'

export default function Features() {
  return (
    <section className="py-section bg-surfaceContainerLowest">
      <div className="wrap">
        <Reveal className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <p className="font-sans text-label text-secondary uppercase tracking-widest mb-4">Todo en un solo link</p>
            <h2 className="font-serif text-headline-lg text-primary">
              ¿Qué puede incluir <em className="italic font-normal">tu invitación?</em>
            </h2>
          </div>
          <p className="text-onSurfaceVariant font-sans text-sm">
            Estas son todas las funciones disponibles. Cuáles incluye la tuya depende del plan que elijas.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(([icon, title, desc], i) => (
            <motion.div
              key={title}
              variants={staggerItem}
              className={`p-8 rounded-2xl flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1 ${
                i % 2 === 0 ? 'bg-creamSurface' : 'bg-secondaryFixed/30'
              }`}
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Icon name={icon} className="text-primary" />
              </div>
              <h3 className="font-serif text-headline-md text-primary mb-3">{title}</h3>
              <p className="text-onSurfaceVariant font-sans text-sm">{desc}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
