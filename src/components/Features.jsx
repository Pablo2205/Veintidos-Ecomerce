import { motion } from 'framer-motion'
import Reveal, { Stagger, staggerItem } from './Reveal.jsx'
import Icon from './Icon.jsx'
import TornDivider from './TornDivider.jsx'
import { features } from '../data/site.js'

export default function Features() {
  return (
    <section className="relative py-section bg-primary">
      <div className="wrap">
        <Reveal className="flex flex-col lg:flex-row justify-between items-end mb-14 gap-8">
          <div className="max-w-2xl">
            <p className="font-sans text-label text-promoGold uppercase tracking-widest mb-4">Todo en un solo link</p>
            <h2
              className="font-serif italic font-normal text-primaryFixed leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
            >
              ¿Qué puede incluir <span className="text-promoGold/80">tu invitación?</span>
            </h2>
          </div>
          <p className="text-primaryFixed/40 font-sans text-sm max-w-xs leading-relaxed flex-shrink-0">
            Estas son todas las funciones disponibles. Cuáles incluye la tuya depende del plan que elijas.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(([icon, title, desc]) => (
            <motion.div
              key={title}
              variants={staggerItem}
              className="p-6 rounded-xl border border-white/5 bg-primaryContainer/50 hover:bg-primaryContainer hover:border-promoGold/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-full bg-promoGold/10 border border-promoGold/15 flex items-center justify-center flex-shrink-0">
                  <Icon name={icon} className="text-promoGold" />
                </div>
                <h3 className="font-serif italic font-normal text-primaryFixed text-base">{title}</h3>
              </div>
              <p className="text-primaryFixed/40 font-sans text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
      <TornDivider className="absolute left-0 right-0 top-full -mt-px" color="fill-primary" seed={0} />
    </section>
  )
}
