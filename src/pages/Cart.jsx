import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { useCart } from '../context/CartContext.jsx'
import { originalPrice } from '../data/site.js'

const money = (n) => `$${n.toLocaleString('es-AR')}`

export default function Cart() {
  const { items, remove, setQty, subtotal } = useCart()
  const [promo, setPromo] = useState('')
  const [applied, setApplied] = useState(false)

  const originalSubtotal = useMemo(
    () => items.reduce((sum, i) => sum + originalPrice(i.price) * (i.qty || 1), 0),
    [items]
  )

  const promoDiscount = applied ? Math.round(subtotal * 0.1) : 0
  const total = subtotal - promoDiscount

  return (
    <div className="wrap py-12 md:py-20 flex flex-col md:flex-row gap-gutter">
      <div className="flex-grow">
        <Reveal>
          <h1 className="font-serif text-headline-lg mb-2">Tu Carrito</h1>
          <p className="text-onSurfaceVariant font-sans">Revisá tus invitaciones seleccionadas antes de proceder al pago.</p>
          <div className="mt-6 flex items-center text-secondary">
            <span className="text-xl">✦</span>
            <div className="h-px flex-grow bg-outlineVariant/30 ml-4" />
          </div>
        </Reveal>

        <div className="space-y-6 mt-10">
          <AnimatePresence initial={false}>
            {items.map((item) => {
              const qty = item.qty || 1
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                  className="flex flex-col md:flex-row gap-6 p-6 bg-surfaceContainerLow rounded-xl border border-outlineVariant/20"
                >
                  <div className={`w-full md:w-28 h-36 rounded-lg flex-shrink-0 bg-gradient-to-br ${item.gradient || 'from-secondaryContainer to-primaryContainer'}`} />
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-headline-md text-primary">{item.name}</h3>
                        <p className="text-label font-sans text-secondary uppercase tracking-widest mt-1">{item.plan}</p>
                      </div>
                      <button onClick={() => remove(item.id)} className="text-onSurfaceVariant hover:text-error transition-colors" aria-label="Quitar">
                        <Icon name="delete" />
                      </button>
                    </div>
                    <div className="mt-4 md:mt-0 flex justify-between items-end">
                      <div className="flex items-center border border-outlineVariant rounded-full px-3 py-1">
                        <button onClick={() => setQty(item.id, qty - 1)} className="text-onSurfaceVariant hover:text-primary px-1">
                          −
                        </button>
                        <span className="mx-4 font-bold text-primary font-sans">{qty}</span>
                        <button onClick={() => setQty(item.id, qty + 1)} className="text-onSurfaceVariant hover:text-primary px-1">
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <span className="block text-xs font-sans line-through text-onSurfaceVariant/60">
                          {money(originalPrice(item.price) * qty)}
                        </span>
                        <span className="font-serif text-headline-md text-primary">{money(item.price * qty)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {items.length === 0 && (
            <div className="text-center py-16">
              <p className="text-onSurfaceVariant font-sans mb-6">Tu carrito está vacío por ahora.</p>
              <Link to="/catalogo" className="btn-primary px-8 py-3 inline-block">
                Ver catálogo
              </Link>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <Reveal delay={0.1} className="mt-12 p-8 border border-dashed border-outlineVariant rounded-xl flex flex-col md:flex-row items-center gap-6">
            <div className="flex-grow">
              <h4 className="font-bold text-primary mb-1 font-sans">¿Tenés un código de descuento?</h4>
              <p className="text-onSurfaceVariant text-sm font-sans">Aplicalo ahora para actualizar tu resumen.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="bg-transparent border-b border-outline focus:border-primary px-4 py-2 w-full md:w-48 outline-none font-sans text-sm"
                placeholder="Código"
              />
              <button
                onClick={() => setApplied(true)}
                className="ml-4 px-6 py-2 bg-primary text-onPrimary rounded-full font-sans text-label hover:opacity-90 transition-all"
              >
                Aplicar
              </button>
            </div>
          </Reveal>
        )}
      </div>

      {/* Resumen */}
      {items.length > 0 && (
        <aside className="w-full md:w-96 flex-shrink-0">
          <Reveal delay={0.15}>
            <div className="bg-creamSurface rounded-2xl shadow-xl p-8 sticky top-32 flex flex-col space-y-8 border border-outlineVariant/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-onPrimary">
                  <Icon name="shopping_bag" />
                </div>
                <div>
                  <h2 className="font-serif text-headline-md text-primary">Tu carrito</h2>
                  <p className="text-label text-onSurfaceVariant font-sans">Digital Invitations Boutique</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-outlineVariant/30 font-sans">
                <div className="flex justify-between text-onSurfaceVariant">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="flex items-center gap-2">
                    <span className="line-through text-onSurfaceVariant/50 text-xs">{money(originalSubtotal)}</span>
                    {money(subtotal)}
                  </span>
                </div>
                {applied && (
                  <div className="flex justify-between text-onSurfaceVariant">
                    <span>Código de descuento</span>
                    <span className="text-secondary">-{money(promoDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-4 border-t border-outlineVariant/30">
                  <span className="font-bold text-primary">Total</span>
                  <div className="text-right">
                    <span className="block text-xs font-sans line-through text-onSurfaceVariant/50">
                      {money(originalSubtotal - promoDiscount)}
                    </span>
                    <span className="font-serif text-headline-md text-primary">{money(total)}</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full py-4 bg-primary text-onPrimary font-bold rounded-full text-center hover:opacity-90 transition-all shadow-lg block font-sans"
              >
                Finalizar compra
              </Link>
              <div className="flex justify-center gap-2 text-onSurfaceVariant text-[10px] uppercase tracking-[0.2em] font-sans">
                <span>Seguro</span><span>•</span><span>Encriptado</span><span>•</span><span>Rápido</span>
              </div>
            </div>
          </Reveal>
        </aside>
      )}
    </div>
  )
}
