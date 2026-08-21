import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import ProductCover from '../components/ProductCover.jsx'
import { useCart } from '../context/CartContext.jsx'
import { originalPrice, transferPrice, DISCOUNT_CODE_PERCENT } from '../data/site.js'

const money = (n) => `$${n.toLocaleString('es-AR')}`
const savingsPercent = (price) => Math.round(100 - (price / originalPrice(price)) * 100)

export default function Cart() {
  const {
    items,
    remove,
    setQty,
    subtotal,
    promoCode,
    promoApplied: applied,
    promoError: codeError,
    applyPromo: handleApplyPromo,
    updatePromoCode,
    applyPromoToTotal,
  } = useCart()

  const originalSubtotal = useMemo(
    () => items.reduce((sum, i) => sum + originalPrice(i.price) * (i.qty || 1), 0),
    [items]
  )

  // Mismo cálculo que usa Checkout.jsx: se suma por ítem (no
  // transferPrice(subtotal) directo) porque cada plan tiene su propio valor
  // de transferencia fijo, no es un % parejo sobre el total.
  const transferSubtotal = useMemo(
    () => items.reduce((sum, i) => sum + transferPrice(i.price) * (i.qty || 1), 0),
    [items]
  )

  const promoDiscount = applyPromoToTotal(subtotal)
  const total = subtotal - promoDiscount
  const transferTotal = transferSubtotal - applyPromoToTotal(transferSubtotal)

  return (
    <div className="wrap py-12 md:py-20 flex flex-col md:flex-row gap-gutter">
      <div className="flex-grow">
        <Reveal>
          <h1
            className="font-serif italic text-primary mb-2 leading-[0.95]"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
          >
            Tu Carrito
          </h1>
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
                  <ProductCover
                    image={item.image}
                    gradient={item.gradient}
                    name={item.name}
                    className="relative w-full md:w-28 h-36 rounded-lg flex-shrink-0"
                  />
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-serif text-headline-md text-primary">{item.name}</h3>
                          {item.code && (
                            <span className="font-sans text-[10px] text-promoGold border border-promoGold/40 rounded px-1.5 py-0.5 tracking-wide">
                              {item.code}
                            </span>
                          )}
                        </div>
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
                        <span className="flex items-center justify-end gap-2">
                          <span className="text-sm font-sans line-through text-onSurfaceVariant/70">
                            {money(originalPrice(item.price) * qty)}
                          </span>
                          <span className="text-discount text-xs font-bold">
                            -{savingsPercent(item.price)}%
                          </span>
                        </span>
                        <span className="font-serif text-headline-md font-bold text-primary">{money(item.price * qty)}</span>
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
          <Reveal delay={0.1} className="mt-12 p-8 border border-dashed border-outlineVariant rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-grow">
                <h4 className="font-bold text-primary mb-1 font-sans">¿Tenés un código de descuento?</h4>
                <p className="text-onSurfaceVariant text-sm font-sans">Aplicalo ahora para actualizar tu resumen.</p>
              </div>
              <div className="flex w-full md:w-auto">
                <input
                  value={promoCode}
                  onChange={(e) => updatePromoCode(e.target.value)}
                  className={`bg-transparent border-b px-4 py-2 w-full md:w-48 outline-none font-sans text-sm transition-colors ${
                    codeError ? 'border-error text-error' : 'border-outline focus:border-primary'
                  }`}
                  placeholder="Código"
                />
                <button
                  onClick={handleApplyPromo}
                  className="ml-4 px-6 py-2 bg-primary text-onPrimary rounded-full font-sans text-label hover:opacity-90 transition-all"
                >
                  Aplicar
                </button>
              </div>
            </div>
            {applied && (
              <p className="mt-3 text-discount text-sm font-sans flex items-center gap-1.5">
                <Icon name="check_circle" className="text-base" /> Código aplicado — {DISCOUNT_CODE_PERCENT}% adicional
              </p>
            )}
            {codeError && (
              <p className="mt-3 text-error text-sm font-sans">
                Ese código no existe. Revisá que esté bien escrito.
              </p>
            )}
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
                    <span className="text-discount">-{money(promoDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-4 border-t border-outlineVariant/30">
                  <span className="font-bold text-primary">Total</span>
                  <div className="text-right">
                    <span className="block text-sm font-sans line-through text-onSurfaceVariant/70">
                      {money(originalSubtotal - promoDiscount)}
                    </span>
                    <span className="font-serif text-headline-lg font-bold text-primary">{money(total)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 bg-discount/10 border border-discount/30 rounded-xl px-4 py-3">
                <p className="font-sans text-xs text-onSurfaceVariant flex items-center gap-2">
                  <Icon name="local_offer" className="text-discount flex-shrink-0" />
                  Precio con transferencia
                </p>
                <p className="font-sans text-sm font-bold text-discount whitespace-nowrap">{money(transferTotal)}</p>
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
