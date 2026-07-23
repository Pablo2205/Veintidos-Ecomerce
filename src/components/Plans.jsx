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

              <ul className="space-y-4 mb-10 flex-grow">
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

              {/* Precio al final, sin botón */}
              <div className={`pt-6 border-t ${p.variant === 'dark' ? 'border-white/15' : 'border-outlineVariant'}`}>
                <span className={`block font-sans text-label uppercase tracking-widest mb-1 ${p.variant === 'dark' ? 'text-primaryFixed/70' : 'text-onSurfaceVariant'}`}>
                  Precio
                </span>
                <p className={`font-serif text-4xl ${p.variant === 'dark' ? 'text-white' : 'text-primary'}`}>
                  ${p.price.toLocaleString('es-AR')}
                </p>
              </div>
            </motion.div>
          ))}
        </Stagger>

        {/* Diseño 100% a medida — destacado */}
        <Reveal delay={0.15} className="mt-14">
          <div className="max-w-3xl mx-auto rounded-2xl border-2 border-dashed border-promoGold bg-creamSurface px-8 py-10 text-center">
            <p className="font-sans text-label text-promoGold uppercase tracking-widest mb-3">
              ✦ A tu medida ✦
            </p>
            <h3 className="font-serif text-headline-md text-primary mb-3">
              ¿Querés algo que no está en ningún plan?
            </h3>
            <p className="font-sans text-onSurfaceVariant text-base max-w-xl mx-auto mb-8">
              También hacemos diseños 100% a medida, con funciones especiales creadas
              específicamente para tu evento.
            </p>
            <a
              href={waLink('Hola! Quiero cotizar un diseño 100% a medida para mi evento.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-onPrimary px-10 py-4 rounded-full font-sans font-bold hover:bg-primaryContainer transition-all"
            >
              <Icon name="chat" filled className="text-whatsapp" />
              Cotizar por WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
