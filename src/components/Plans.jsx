import { motion } from 'framer-motion'
import Reveal, { Stagger, staggerItem } from './Reveal.jsx'
import Icon from './Icon.jsx'
import { plans, waLink } from '../data/site.js'

export default function Plans() {
  return (
    <section id="planes" className="py-section bg-background overflow-hidden relative">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primaryFixed/20 rounded-full blur-3xl" />
      <div className="wrap relative z-10">
        <Reveal className="text-center mb-20">
          <p className="font-sans text-label text-secondary uppercase tracking-widest mb-4">Nuestros Planes</p>
          <h2 className="font-serif text-headline-lg text-primary">
            Tu entrada a una invitación <em className="italic font-normal">inolvidable</em>
          </h2>
        </Reveal>

        <Stagger className="grid grid-cols-1 lg:grid-cols-3 gap-8" gap={0.12}>
          {plans.map((p) => (
            <motion.div
              key={p.name}
              variants={staggerItem}
              className={`rounded-2xl p-8 flex flex-col relative transition-all ${
                p.variant === 'highlight'
                  ? 'bg-white border-2 border-secondary scale-105 z-20 shadow-xl'
                  : p.variant === 'dark'
                  ? 'bg-primaryContainer text-white border border-primary'
                  : 'bg-white border border-outlineVariant hover:border-secondary'
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase font-sans">
                  {p.highlight}
                </div>
              )}
              <div className="mb-8">
                <span className={`font-sans text-label uppercase tracking-widest ${p.variant === 'dark' ? 'text-secondaryFixed' : 'text-secondary'}`}>
                  Plan
                </span>
                <h3 className={`font-serif text-headline-lg mt-2 ${p.variant === 'dark' ? 'text-white' : 'text-primary'}`}>
                  {p.name}
                </h3>
                <p className={`font-sans mt-2 italic ${p.variant === 'dark' ? 'text-primaryFixed/70' : 'text-onSurfaceVariant'}`}>
                  {p.tagline}
                </p>
              </div>
              <ul className="space-y-4 mb-12 flex-grow">
                {p.items.map((it, i) => (
                  <li
                    key={it}
                    className={`flex items-center gap-3 font-sans text-sm ${
                      p.variant === 'dark' ? (i === 0 ? 'text-primaryFixed/70 font-semibold' : 'text-white') : 'text-onSurfaceVariant'
                    } ${i === 0 && p.variant !== 'plain' ? 'font-semibold' : ''}`}
                  >
                    <Icon name={i === 0 && p.variant !== 'plain' ? 'add' : 'check'} className="scale-75 text-secondary" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <a
                href={waLink(`Hola! Quiero consultar el precio del plan ${p.name.toUpperCase()} para mi evento.`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 rounded-full text-center font-bold font-sans transition-all ${
                  p.variant === 'dark'
                    ? 'bg-promoGold text-primary hover:opacity-90'
                    : p.variant === 'highlight'
                    ? 'bg-primary text-onPrimary hover:bg-primaryContainer'
                    : 'border border-outline text-primary hover:bg-surfaceContainer'
                }`}
              >
                Consultar precio
              </a>
            </motion.div>
          ))}
        </Stagger>

        <Reveal delay={0.15} className="text-center mt-12">
          <p className="font-sans text-onSurfaceVariant text-sm">
            ¿Querés algo que no está en ningún plan? También hacemos{' '}
            <a
              href={waLink('Hola! Quiero cotizar una invitación 100% a medida.')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline font-semibold"
            >
              diseños 100% a medida
            </a>
            , con funciones especiales creadas para tu evento.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
