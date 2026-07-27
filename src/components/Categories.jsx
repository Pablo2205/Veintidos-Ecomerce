import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal, { Stagger, staggerItem } from './Reveal.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import { categories, waLink } from '../data/site.js'

const gradients = [
  'from-[#8FB996] to-[#3C5F41]',
  'from-[#D9C98A] to-[#8A6F2A]',
  'from-[#E3B0A8] to-[#B05B4E]',
  'from-[#C7D9CE] to-[#6E9482]',
  'from-[#C9B7DE] to-[#6E4E97]',
  'from-[#D7CBB0] to-[#8F7A52]',
]

// Portada de cada categoría: si `image` todavía no existe en /public/images
// (por ejemplo, BODA.jpeg o XV.jpeg no fueron subidas todavía), el <img>
// dispara onError y volvemos automáticamente al degradé de color — así la
// Home nunca muestra un ícono de imagen rota mientras tanto.
function CategoryCover({ image, name, gradient }) {
  const [broken, setBroken] = useState(false)
  const showImage = image && !broken

  return (
    <div
      className={`relative aspect-[4/5] overflow-hidden rounded-lg mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03] ${
        showImage ? '' : `bg-gradient-to-br ${gradient}`
      }`}
    >
      {showImage ? (
        <>
          <img
            src={image}
            alt={name}
            onError={() => setBroken(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0" />
          <span className="relative font-serif italic text-2xl text-white px-6 text-center">{name}</span>
        </>
      ) : (
        <span className="font-serif italic text-2xl text-white/90 px-6 text-center">{name}</span>
      )}
    </div>
  )
}

export default function Categories() {
  return (
    <section id="eventos" className="py-section bg-background">
      <div className="wrap">
        <Reveal className="text-center mb-16">
          <p className="font-sans text-label text-secondary uppercase tracking-widest mb-4">¿Qué vas a festejar?</p>
          <h2 className="font-serif text-headline-lg text-primary">
            Invitaciones para <em className="italic font-normal">cada momento</em>
          </h2>
          <div className="ornament mt-6 text-sm">
            <span className="opacity-40">✦</span><span className="opacity-70">✦</span><span className="opacity-40">✦</span>
          </div>
        </Reveal>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {categories.map((c, i) => (
            <motion.div
              key={c.slug}
              variants={staggerItem}
              className="group relative overflow-hidden rounded-xl bg-surfaceContainerLow p-2 border border-transparent transition-all hover:bg-surfaceContainer hover:border-promoGold/40"
            >
              <CategoryCover image={c.image} name={c.name} gradient={gradients[i % gradients.length]} />
              <div className="px-4 pb-6">
                <h3 className="font-serif text-headline-md text-primary mb-2">{c.name}</h3>
                <p className="text-onSurfaceVariant font-sans text-sm mb-6 leading-relaxed">{c.desc}</p>
                <div className="flex gap-4">
                  <WhatsAppButton
                    href={waLink(`Hola! Quiero una invitación digital para ${c.name}. ¿Me pasan info y precios?`)}
                    className="flex-1 py-3 text-sm"
                    iconClassName="w-4 h-4"
                  >
                    WhatsApp
                  </WhatsAppButton>
                  <Link
                    to="/catalogo"
                    className="flex-1 border border-outline py-3 rounded-full text-center text-label font-sans font-semibold hover:bg-white transition-colors"
                  >
                    Ver demo
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
