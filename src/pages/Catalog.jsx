import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal, { Stagger, staggerItem } from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { products } from '../data/site.js'
import { useCart } from '../context/CartContext.jsx'

const categoryLabels = {
  boda: 'Casamientos',
  'xv-anos': 'Quince Años',
  bautismo: 'Bautismos',
  cumpleanos: 'Cumpleaños',
}

const money = (n) => `$${n.toLocaleString('es-AR')}`

export default function Catalog() {
  const [activeCats, setActiveCats] = useState(['boda'])
  const [activePlan, setActivePlan] = useState('Standard')
  const { add } = useCart()
  const [added, setAdded] = useState(null)

  const toggleCat = (cat) =>
    setActiveCats((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))

  const filtered = useMemo(
    () => products.filter((p) => (activeCats.length ? activeCats.includes(p.category) : true)),
    [activeCats]
  )

  const handleAdd = (p) => {
    add(p)
    setAdded(p.id)
    setTimeout(() => setAdded(null), 1400)
  }

  return (
    <div className="wrap py-20">
      <section className="text-center mb-12">
        <h1 className="font-serif text-display-mobile md:text-display text-primary mb-6">
          Encontrá tu invitación <br className="hidden md:block" />
          <span className="italic text-secondary">perfecta</span>
        </h1>
        <div className="ornament mb-12">
          <span className="h-px w-12 bg-outlineVariant" />
          <span className="text-promoGold">✦ ✦ ✦</span>
          <span className="h-px w-12 bg-outlineVariant" />
        </div>
      </section>

      <div className="flex flex-col lg:flex-row gap-gutter">
        {/* Filtros */}
        <aside className="w-full lg:w-64 space-y-8 mb-12 lg:mb-0">
          <div>
            <h3 className="font-sans text-label text-primary mb-4 uppercase tracking-widest">Tipo de evento</h3>
            <div className="space-y-2">
              {Object.entries(categoryLabels).map(([slug, label]) => (
                <label key={slug} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={activeCats.includes(slug)}
                    onChange={() => toggleCat(slug)}
                    className="rounded border-outline text-primary focus:ring-primary w-4 h-4"
                  />
                  <span className="font-sans text-onSurfaceVariant group-hover:text-primary transition-colors">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-sans text-label text-primary mb-4 uppercase tracking-widest">Plan</h3>
            <div className="space-y-2">
              {['Básico', 'Standard', 'Premium'].map((plan) => (
                <label key={plan} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="plan"
                    checked={activePlan === plan}
                    onChange={() => setActivePlan(plan)}
                    className="rounded-full border-outline text-primary focus:ring-primary w-4 h-4"
                  />
                  <span className="font-sans text-onSurfaceVariant group-hover:text-primary transition-colors">
                    {plan}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-outlineVariant/30">
            <p className="font-sans text-label text-primary mb-4 uppercase tracking-widest">¿Buscás algo único?</p>
            <a
              href="https://wa.me/5491139126543?text=Hola!%20Quiero%20cotizar%20un%20dise%C3%B1o%20personalizado."
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center border border-secondary text-secondary py-3 rounded-full font-sans text-label uppercase hover:bg-secondary hover:text-white transition-all"
            >
              Diseño personalizado
            </a>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-grow">
          <Stagger className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-gutter" gap={0.06}>
            {filtered.map((p) => (
              <motion.div key={p.id} variants={staggerItem} className="group">
                <div className={`relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br ${p.gradient} mb-4 flex items-center justify-center`}>
                  <span className="font-serif italic text-white/90 text-lg px-4 text-center">{p.name}</span>
                  {p.badge && (
                    <span className="absolute top-4 left-4 bg-promoGold text-white font-sans text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">
                      {p.badge}
                    </span>
                  )}
                  <span className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-primary py-3 rounded-full font-sans text-label uppercase tracking-widest text-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Ver demo
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-sans text-label text-primary uppercase">{p.name}</h3>
                    <p className="font-sans text-xs text-onSurfaceVariant mt-1">Sugerido: Plan {p.plan}</p>
                  </div>
                  <p className="font-sans text-label text-primary">{money(p.price)}</p>
                </div>
                <button
                  onClick={() => handleAdd(p)}
                  className="w-full mt-4 flex items-center justify-center gap-2 border border-outlineVariant py-2 rounded-full font-sans text-label uppercase text-onSurfaceVariant hover:border-primary hover:text-primary transition-all"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {added === p.id ? (
                      <motion.span
                        key="ok"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-secondary"
                      >
                        <Icon name="check" className="text-sm" /> Agregado
                      </motion.span>
                    ) : (
                      <motion.span key="add" className="flex items-center gap-2" exit={{ opacity: 0 }}>
                        <Icon name="shopping_cart" className="text-sm" /> Agregar al carrito
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </Stagger>

          {filtered.length === 0 && (
            <p className="text-center text-onSurfaceVariant font-sans py-20">
              No hay demos para esta combinación de filtros todavía — consultanos por WhatsApp.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
