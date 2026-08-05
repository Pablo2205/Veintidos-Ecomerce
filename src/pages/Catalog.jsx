import { useMemo, useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import DemoPreviewModal from '../components/DemoPreviewModal.jsx'
import ProductCover from '../components/ProductCover.jsx'
import { products, productColors, originalPrice, waLink } from '../data/site.js'
import { useCart } from '../context/CartContext.jsx'

const categoryLabels = {
  boda: 'Boda',
  'xv-anos': 'Cumple XV',
}

const planOptions = ['Todos', 'Essential', 'Standard', 'Premium']

// Colores donde el ✓ tiene que verse oscuro por el contraste del swatch.
const LIGHT_SWATCHES = new Set(['blanco', 'beige', 'amarillo', 'celeste'])

const money = (n) => `$${n.toLocaleString('es-AR')}`

// Grupos de filtro factorizados para no duplicar el JSX entre la versión
// siempre visible de desktop y la colapsable de mobile (ver <Catalog>).
function FilterGroups({ activeCats, toggleCat, activeColors, toggleColor, activePlan, setActivePlan }) {
  return (
    <>
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
        <h3 className="font-sans text-label text-primary mb-4 uppercase tracking-widest">Color</h3>
        <div className="flex flex-wrap gap-3">
          {productColors.map((c) => {
            const active = activeColors.includes(c.key)
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => toggleColor(c.key)}
                aria-label={c.label}
                aria-pressed={active}
                title={c.label}
                className={`relative w-8 h-8 rounded-full transition-transform ${
                  active ? 'scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: c.hex,
                  border: c.border ? `1.5px solid ${c.border}` : '1px solid rgba(0,0,0,0.08)',
                }}
              >
                {active && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Icon
                      name="check"
                      className={`text-sm ${LIGHT_SWATCHES.has(c.key) ? 'text-primary' : 'text-white'}`}
                    />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="font-sans text-label text-primary mb-4 uppercase tracking-widest">Plan</h3>
        <div className="space-y-2">
          {planOptions.map((plan) => (
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
        <WhatsAppButton
          href={waLink('Hola! Quiero cotizar un diseño personalizado.')}
          className="w-full py-3 text-sm"
          iconClassName="w-4 h-4"
        >
          Diseño personalizado
        </WhatsAppButton>
      </div>
    </>
  )
}

export default function Catalog() {
  const [searchParams] = useSearchParams()
  // Si se llegó desde "Ver demos" de una categoría puntual en la Home
  // (?evento=boda o ?evento=xv-anos), arrancar el filtro solo con esa
  // categoría marcada. Si no, mostrar todo como siempre.
  const [activeCats, setActiveCats] = useState(() => {
    const evento = searchParams.get('evento')
    return evento === 'boda' || evento === 'xv-anos' ? [evento] : ['boda', 'xv-anos']
  })
  const [activeColors, setActiveColors] = useState([])
  const [activePlan, setActivePlan] = useState('Todos')
  // Filtros escondidos por default en mobile/tablet — se expanden al tocar
  // el botón "Filtros". En desktop (lg+) el panel sigue siempre visible,
  // como antes, así no se pierde el patrón de sidebar sticky que ya andaba
  // bien ahí.
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { add } = useCart()
  const [added, setAdded] = useState(null)
  const [previewDemo, setPreviewDemo] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const toggleCat = (cat) =>
    setActiveCats((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]))

  const toggleColor = (color) =>
    setActiveColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))

  // Filtro corregido: categoría y color son "cualquiera de los marcados"
  // (si no hay ninguno marcado, no filtra por esa dimensión salvo categoría,
  // que si se desmarcan todas no debería mostrar nada). El plan ahora sí
  // filtra de verdad — antes el radio no hacía nada.
  const filtered = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch = activeCats.includes(p.category)
      const colorMatch = activeColors.length === 0 || activeColors.includes(p.color)
      const planMatch = activePlan === 'Todos' || p.plan === activePlan
      return categoryMatch && colorMatch && planMatch
    })
  }, [activeCats, activeColors, activePlan])

  // Cuántos filtros no-default hay activos, para el badge del botón mobile.
  const activeFilterCount =
    activeColors.length + (activePlan !== 'Todos' ? 1 : 0) + (activeCats.length < 2 ? 1 : 0)

  const handleAdd = (p) => {
    add(p)
    setAdded(p.id)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setAdded(null), 1400)
  }

  return (
    <div className="wrap py-20">
      <section className="text-center mb-12">
        <h1
          className="font-serif text-primary mb-6 leading-[0.95]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
        >
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
        <aside className="w-full lg:w-64 mb-6 lg:mb-0 lg:sticky lg:top-32 lg:self-start">
          {/* Botón "Filtros" — solo mobile/tablet. En desktop el panel de
              abajo ya queda siempre visible, no hace falta el botón. */}
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
            className="lg:hidden w-full flex items-center justify-between gap-2 bg-creamSurface border border-outlineVariant/30 rounded-xl px-5 py-3.5"
          >
            <span className="flex items-center gap-2 font-sans text-label text-primary uppercase tracking-widest">
              <Icon name="tune" className="text-secondary text-lg" />
              Filtros
              {activeFilterCount > 0 && (
                <span className="bg-promoGold text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center normal-case tracking-normal">
                  {activeFilterCount}
                </span>
              )}
            </span>
            <Icon name={filtersOpen ? 'expand_less' : 'expand_more'} className="text-onSurfaceVariant" />
          </button>

          {/* Mobile/tablet: colapsable, arranca escondido */}
          <AnimatePresence initial={false}>
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="lg:hidden overflow-hidden"
              >
                <div className="space-y-8 bg-creamSurface/50 rounded-xl border border-outlineVariant/30 p-6 mt-3">
                  <FilterGroups
                    activeCats={activeCats}
                    toggleCat={toggleCat}
                    activeColors={activeColors}
                    toggleColor={toggleColor}
                    activePlan={activePlan}
                    setActivePlan={setActivePlan}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop: siempre visible, como antes */}
          <div className="hidden lg:block space-y-8 lg:bg-creamSurface/50 lg:rounded-2xl lg:p-6 lg:border lg:border-outlineVariant/30">
            <FilterGroups
              activeCats={activeCats}
              toggleCat={toggleCat}
              activeColors={activeColors}
              toggleColor={toggleColor}
              activePlan={activePlan}
              setActivePlan={setActivePlan}
            />
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-grow">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12 gap-x-gutter">
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <div className="bg-creamSurface rounded-2xl shadow-xl border border-outlineVariant/20 p-5 flex flex-col h-full transition-shadow hover:shadow-2xl">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4 flex items-center justify-center ring-1 ring-transparent group-hover:ring-2 group-hover:ring-promoGold transition-all">
                      <ProductCover image={p.image} gradient={p.gradient} name={p.name} className="absolute inset-0" />
                      {p.demoUrl ? (
                        <button
                          onClick={() => setPreviewDemo({ url: p.demoUrl, name: p.name })}
                          className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-primary py-3 rounded-full font-sans text-label uppercase tracking-widest text-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-white z-10"
                        >
                          Ver demo
                        </button>
                      ) : (
                        <span className="absolute bottom-4 left-4 right-4 bg-white/70 backdrop-blur-sm text-onSurfaceVariant py-3 rounded-full font-sans text-label uppercase tracking-widest text-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
                          Demo próximamente
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-sans text-label text-primary uppercase">{p.name}</h3>
                        <p className="font-sans text-xs text-onSurfaceVariant mt-1">Sugerido: Plan {p.plan}</p>
                        {p.style && (
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="font-sans text-[11px] italic text-onSurfaceVariant/80">{p.style}</span>
                            {p.palette && (
                              <div className="flex gap-1">
                                {p.palette.map((c, i) => (
                                  <span
                                    key={i}
                                    className="w-2.5 h-2.5 rounded-full border border-black/10"
                                    style={{ backgroundColor: c }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="block text-[11px] font-sans line-through text-onSurfaceVariant/60">
                          {money(originalPrice(p.price))}
                        </span>
                        <span className="font-sans text-label text-primary">{money(p.price)}</span>
                      </div>
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
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <Reveal className="text-center py-20">
              <p className="text-onSurfaceVariant font-sans mb-6">
                No hay demos para esta combinación de filtros todavía.
              </p>
              <WhatsAppButton
                href={waLink('Hola! Estaba buscando una invitación con un filtro específico y no encontré demos. ¿Me ayudan?')}
                className="mx-auto px-8 py-3 text-sm"
                iconClassName="w-4 h-4"
              >
                Consultar por WhatsApp
              </WhatsAppButton>
            </Reveal>
          )}
        </div>
      </div>

      <AnimatePresence>
        {previewDemo && (
          <DemoPreviewModal
            url={previewDemo.url}
            name={previewDemo.name}
            onClose={() => setPreviewDemo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
