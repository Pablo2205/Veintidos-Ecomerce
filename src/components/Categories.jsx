import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal, { Stagger, staggerItem } from './Reveal.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import { categories, waLink } from '../data/site.js'

const panelGradients = [
  'from-[#8FB996] to-[#1F2E1C]',
  'from-[#D9C98A] to-[#3C2E10]',
]

function CategoryPanel({ category: c, gradient }) {
  const [broken, setBroken] = useState(false)
  const showImage = c.image && !broken

  return (
    <motion.div
      variants={staggerItem}
      className="relative flex-1 min-h-[440px] lg:min-h-[520px] overflow-hidden group"
    >
      {/* Background image or gradient */}
      <div
        className={`absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04] ${
          showImage ? '' : `bg-gradient-to-br ${gradient}`
        }`}
      >
        {showImage && (
          <img
            src={c.image}
            alt={c.name}
            onError={() => setBroken(true)}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent transition-opacity duration-500 group-hover:from-primary/75" />

      {/* Thin divider line between panels on desktop */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-primaryFixed/10 z-10" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-promoGold mb-3">
          {c.name}
        </p>
        <h3
          className="font-serif italic font-normal text-white leading-[1.1] mb-4"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
        >
          {c.name}
        </h3>
        <p className="font-sans text-white/60 text-sm leading-relaxed max-w-xs mb-8">
          {c.desc}
        </p>
        <div className="flex flex-wrap gap-3">
          <WhatsAppButton
            href={waLink(`Hola! Quiero una invitación digital para ${c.name}. ¿Me pasan info y precios?`)}
            className="py-3 px-6 text-sm"
            iconClassName="w-4 h-4"
          >
            Consultar
          </WhatsAppButton>
          <Link
            to={`/catalogo?evento=${c.slug}`}
            className="border border-white/35 text-white py-3 px-6 rounded-full font-sans text-xs font-semibold tracking-wide hover:bg-white/10 hover:border-white/60 transition-all text-center"
          >
            Ver demos
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function Categories() {
  return (
    <section id="eventos" className="bg-background">
      <div className="wrap">
        <Reveal className="text-center pt-16 pb-12">
          <p className="font-sans text-label text-secondary uppercase tracking-widest mb-4">¿Qué vas a festejar?</p>
          <h2
            className="font-serif italic font-normal text-primary"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            Invitaciones para <span className="text-secondary">cada momento</span>
          </h2>
        </Reveal>
      </div>

      <Stagger className="flex flex-col lg:flex-row">
        {categories.map((c, i) => (
          <CategoryPanel
            key={c.slug}
            category={c}
            gradient={panelGradients[i % panelGradients.length]}
          />
        ))}
      </Stagger>
    </section>
  )
}
