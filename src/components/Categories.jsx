import { useState } from 'react'
import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal, { Stagger, staggerItem } from './Reveal.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import { categories, waLink } from '../data/site.js'

const panelGradients = [
  'from-[#8FB996] to-[#1F2E1C]',
  'from-[#D9C98A] to-[#3C2E10]',
  'from-[#C5A059] to-[#182317]',
]

function CategoryPanel({ category: c, gradient, weight }) {
  const [broken, setBroken] = useState(false)
  const showImage = c.image && !broken
  const reduce = useReducedMotion()

  // Spotlight de cursor: un resplandor dorado que sigue al mouse dentro del
  // panel, como si el visitante "iluminara" la foto con una linterna. Se
  // desactiva en "próximamente" (comingSoon) porque el panel no es interactivo.
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotlightBg = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(197,160,89,0.35), transparent 70%)`
  const handleMouseMove = (e) => {
    if (reduce || c.comingSoon) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      variants={staggerItem}
      style={{ flexGrow: weight }}
      onMouseMove={handleMouseMove}
      className={`relative flex-1 min-h-[480px] lg:min-h-[600px] overflow-hidden group ${
        c.comingSoon ? 'grayscale' : ''
      }`}
    >
      {/* Background image or gradient */}
      <div
        className={`absolute inset-0 transition-transform duration-700 ${
          c.comingSoon ? '' : 'group-hover:scale-[1.04]'
        } ${showImage ? '' : `bg-gradient-to-br ${gradient}`}`}
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
      <div
        className={`absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent transition-opacity duration-500 ${
          c.comingSoon ? '' : 'group-hover:from-primary/75'
        }`}
      />

      {/* Spotlight de cursor — solo visible en hover, desktop (mouse real), nunca en comingSoon */}
      {!reduce && !c.comingSoon && (
        <motion.div
          aria-hidden="true"
          style={{ background: spotlightBg }}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-soft-light"
        />
      )}

      {/* Thin divider line between panels on desktop */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-primaryFixed/10 z-10" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
        {c.comingSoon && (
          <span className="inline-flex items-center gap-2 self-start bg-white/15 border border-white/30 text-white text-[11px] font-sans font-semibold uppercase tracking-[0.15em] px-4 py-1.5 rounded-full mb-4">
            ✦ Próximamente
          </span>
        )}
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-promoGold mb-3">
          {c.name}
        </p>
        <h3
          className="font-serif italic font-normal text-white leading-[0.95] mb-4"
          style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.25rem)' }}
        >
          {c.name}
        </h3>
        <p className="font-sans text-white/60 text-sm leading-relaxed max-w-xs mb-8">
          {c.desc}
        </p>
        {!c.comingSoon && (
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton
              href={waLink(
                c.consultOnly
                  ? 'Hola! Quiero consultar por una invitación digital para mi evento (no es boda). ¿Me cuentan qué pueden armar?'
                  : `Hola! Quiero una invitación digital para ${c.name}. ¿Me pasan info y precios?`
              )}
              className="py-3 px-6 text-sm"
              iconClassName="w-4 h-4"
            >
              Consultar
            </WhatsAppButton>
            {!c.consultOnly && (
              <Link
                to="/catalogo"
                className="border border-white/35 text-white py-3 px-6 rounded-full font-sans text-xs font-semibold tracking-wide hover:bg-white/10 hover:border-white/60 transition-all text-center"
              >
                Ver demos
              </Link>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Categories() {
  return (
    <section id="eventos" className="bg-background">
      <div className="wrap">
        <Reveal className="text-center pt-16 pb-12">
          <p aria-hidden="true" className="ornament mb-4 text-sm">✦</p>
          <p className="font-mono text-label text-secondary uppercase tracking-widest mb-4">¿Qué vas a festejar?</p>
          <h2
            className="font-serif italic font-normal text-primary"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            Invitaciones para <span className="text-secondary">cada momento</span>
          </h2>
        </Reveal>
      </div>

      {/* Asimétrico a propósito: Boda (única con catálogo activo) pesa más que
          Cumple XV (comingSoon, grisada) y "Otro evento" (solo deriva a
          consulta) — la jerarquía visual refleja la jerarquía real del
          negocio hoy. */}
      <Stagger className="flex flex-col lg:flex-row">
        {categories.map((c, i) => (
          <CategoryPanel
            key={c.slug}
            category={c}
            gradient={panelGradients[i % panelGradients.length]}
            weight={c.consultOnly || c.comingSoon ? 0.7 : 1.3}
          />
        ))}
      </Stagger>
    </section>
  )
}
