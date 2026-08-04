import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import ProductCover from '../components/ProductCover.jsx'
import { useCart } from '../context/CartContext.jsx'
import { BANK_DATA, MP_LINKS, TRANSFER_DISCOUNT_PERCENT, transferPrice, originalPrice } from '../data/site.js'

const money = (n) => `$${n.toLocaleString('es-AR')}`

function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard puede fallar en http o permisos — no rompe el flujo
    }
  }
  return (
    <div className="flex items-center justify-between gap-4 bg-white border border-outlineVariant rounded-xl px-5 py-4">
      <div>
        <p className="text-label text-onSurfaceVariant uppercase tracking-widest font-sans">{label}</p>
        <p className="font-serif text-lg text-primary break-all">{value}</p>
      </div>
      <button
        onClick={copy}
        className="flex-shrink-0 flex items-center gap-1.5 text-label font-sans font-semibold text-secondary hover:text-primary transition-colors"
      >
        <Icon name={copied ? 'check' : 'content_copy'} className="text-base" />
        {copied ? 'Copiado' : 'Copiar'}
      </button>
    </div>
  )
}

export default function Checkout() {
  const { items, subtotal } = useCart()
  const navigate = useNavigate()
  const [method, setMethod] = useState('mercadopago')
  const [mpConfirming, setMpConfirming] = useState(false)

  // Se genera una sola vez por sesión de checkout (no en cada render) para que
  // la referencia que el cliente ve y copia sea siempre la misma que viaja al
  // formulario y a la planilla — es la clave para cruzar pagos con pedidos.
  const orderRef = useMemo(() => `VD-${Date.now().toString().slice(-6)}`, [])

  if (items.length === 0) {
    return (
      <div className="wrap py-24 text-center">
        <p className="font-sans text-onSurfaceVariant mb-6">Tu carrito está vacío.</p>
        <button onClick={() => navigate('/catalogo')} className="btn-primary px-8 py-3">
          Ver catálogo
        </button>
      </div>
    )
  }

  // Los links de pago de Mercado Pago son de monto fijo por plan: no soportan
  // cantidad ni combinar varios ítems. Solo se ofrecen cuando el carrito trae
  // un único plan en cantidad 1 — para cualquier otro caso, solo transferencia.
  const singleItem = items.length === 1 ? items[0] : null
  const mpEligible = Boolean(singleItem && (singleItem.qty || 1) === 1)
  const mpLink = mpEligible ? MP_LINKS[singleItem.plan] : null
  const activeMethod = mpEligible ? method : 'transferencia'

  const mpTotal = subtotal
  // Se suma por ítem (no transferPrice(subtotal) directo) para que el
  // descuento se aplique correctamente incluso si el carrito llegara a tener
  // más de un ítem o cantidad — cada precio de plan tiene su propio valor de
  // transferencia fijo, no es un porcentaje aplicado al total.
  const transferTotal = items.reduce((sum, i) => sum + transferPrice(i.price) * (i.qty || 1), 0)

  const goToForm = (paymentMethod, totalPaid) =>
    navigate('/completar-datos', { state: { orderRef, cartSummary: items, paymentMethod, totalPaid } })

  const handleMpPay = () => {
    window.open(mpLink, '_blank', 'noopener,noreferrer')
    setMpConfirming(true)
  }

  return (
    <div className="wrap py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-10">
          <Reveal>
            <h1
              className="font-serif italic text-primary leading-[0.95]"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
            >
              Finalizar compra
            </h1>
            <p className="mt-4 text-onSurfaceVariant font-sans text-body-lg max-w-lg">
              Elegí cómo preferís pagar tu invitación.
            </p>
            <div className="ornament my-8 text-sm">
              <span>✦</span><span>✦</span><span>✦</span>
            </div>
          </Reveal>

          {mpEligible && (
            <Reveal delay={0.02}>
              <div className="inline-flex bg-creamSurface border border-outlineVariant/40 rounded-full p-1 gap-1">
                <button
                  onClick={() => setMethod('mercadopago')}
                  className={`px-6 py-2.5 rounded-full font-sans text-label transition-colors ${
                    activeMethod === 'mercadopago' ? 'bg-primary text-onPrimary' : 'text-onSurfaceVariant hover:text-primary'
                  }`}
                >
                  Mercado Pago
                </button>
                <button
                  onClick={() => setMethod('transferencia')}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-sans text-label transition-colors ${
                    activeMethod === 'transferencia' ? 'bg-primary text-onPrimary' : 'text-onSurfaceVariant hover:text-primary'
                  }`}
                >
                  Transferencia
                  <span className="text-error text-[11px] font-bold">
                    -{TRANSFER_DISCOUNT_PERCENT}%
                  </span>
                </button>
              </div>
            </Reveal>
          )}

          {!mpEligible && (
            <Reveal delay={0.02}>
              <div className="flex items-start gap-3 bg-creamSurface border border-secondaryFixed rounded-xl p-5">
                <Icon name="info" className="text-secondary flex-shrink-0 mt-0.5" />
                <p className="font-sans text-sm text-onSurfaceVariant">
                  Mercado Pago solo está disponible para un plan por pedido. Para más de una invitación o cantidad,
                  completá la compra por transferencia o escribinos por WhatsApp.
                </p>
              </div>
            </Reveal>
          )}

          {activeMethod === 'mercadopago' ? (
            <Reveal delay={0.05}>
              <section className="space-y-6">
                <h2 className="font-serif text-headline-md text-primary flex items-center gap-3">
                  <Icon name="credit_card" /> Pagar con Mercado Pago
                </h2>
                <div className="flex items-start gap-3 bg-creamSurface border border-secondaryFixed rounded-xl p-5">
                  <Icon name="info" className="text-secondary flex-shrink-0 mt-0.5" />
                  <p className="font-sans text-sm text-onSurfaceVariant">
                    Te vamos a redirigir a Mercado Pago para completar el pago del plan{' '}
                    <strong className="text-primary">{singleItem.plan}</strong>. Cuando termines, volvé a esta
                    pestaña y tocá <strong>"Ya pagué, continuar"</strong> para cargar los datos de tu evento.
                  </p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleMpPay}
                  className="w-full md:w-auto btn-primary px-10 py-4 flex items-center justify-center gap-2"
                >
                  Pagar con Mercado Pago <Icon name="open_in_new" />
                </motion.button>

                {mpConfirming && (
                  <Reveal>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => goToForm('mercadopago', mpTotal)}
                      className="w-full md:w-auto border-2 border-primary text-primary font-sans font-bold rounded-full px-10 py-4 flex items-center justify-center gap-2 hover:bg-primary hover:text-onPrimary transition-colors"
                    >
                      Ya pagué, continuar <Icon name="arrow_forward" />
                    </motion.button>
                  </Reveal>
                )}

                <button
                  onClick={() => setMethod('transferencia')}
                  className="font-sans text-sm text-secondary hover:text-primary underline underline-offset-4 transition-colors"
                >
                  ¿Preferís transferencia? Ahorrás {TRANSFER_DISCOUNT_PERCENT}% adicional
                </button>
              </section>
            </Reveal>
          ) : (
            <Reveal delay={0.05}>
              <section className="space-y-6">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="font-serif text-headline-md text-primary flex items-center gap-3">
                    <Icon name="account_balance" /> Datos para transferir
                  </h2>
                  <span className="text-error text-label font-bold uppercase tracking-widest">
                    -{TRANSFER_DISCOUNT_PERCENT}% de descuento
                  </span>
                </div>
                <div className="space-y-3">
                  <CopyField label="Alias" value={BANK_DATA.alias} />
                  <CopyField label="CBU" value={BANK_DATA.cbu} />
                  <CopyField label="Titular" value={BANK_DATA.titular} />
                  <CopyField label="Concepto / referencia (importante)" value={orderRef} />
                </div>
                <div className="flex items-start gap-3 bg-creamSurface border border-secondaryFixed rounded-xl p-5">
                  <Icon name="info" className="text-secondary flex-shrink-0 mt-0.5" />
                  <p className="font-sans text-sm text-onSurfaceVariant">
                    Pagando por transferencia directa obtenés <strong className="text-error">{TRANSFER_DISCOUNT_PERCENT}% de descuento</strong>{' '}
                    adicional sobre el precio de Mercado Pago (ya reflejado en el total). Poné{' '}
                    <strong>{orderRef}</strong> como concepto o motivo de la transferencia si tu banco lo permite —
                    así podemos cruzarla con tu pedido más rápido. Después tocá{' '}
                    <strong>"Ya transferí, continuar"</strong>. En la siguiente pantalla cargás los datos de tu
                    evento y subís una foto o captura del comprobante. Validamos el pago y te confirmamos por
                    WhatsApp en el día.
                  </p>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => goToForm('transferencia', transferTotal)}
                  className="w-full md:w-auto btn-primary px-10 py-4 flex items-center justify-center gap-2"
                >
                  Ya transferí, continuar <Icon name="arrow_forward" />
                </motion.button>
              </section>
            </Reveal>
          )}
        </div>

        {/* Resumen */}
        <aside className="lg:col-span-5 lg:sticky lg:top-32">
          <Reveal delay={0.15}>
            <div className="bg-creamSurface rounded-xl p-8 shadow-xl border border-outlineVariant/30 space-y-8">
              <h3 className="font-serif text-headline-md text-primary">Resumen del pedido</h3>

              <div className="space-y-6">
                {items.map((item) => {
                  const qty = item.qty || 1
                  return (
                    <div key={item.id} className="flex gap-4 items-start">
                      <ProductCover
                        image={item.image}
                        gradient={item.gradient}
                        name={item.name}
                        className="relative w-20 h-28 rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-primary font-sans">{item.name}</p>
                          {item.code && (
                            <span className="font-sans text-[10px] text-promoGold border border-promoGold/40 rounded px-1.5 py-0.5 tracking-wide">
                              {item.code}
                            </span>
                          )}
                        </div>
                        <p className="text-label text-onSurfaceVariant mt-1 font-sans">{item.plan}</p>
                        <p className="mt-2 font-sans">
                          <span className="line-through text-onSurfaceVariant/70 text-sm mr-2">
                            {money(originalPrice(item.price) * qty)}
                          </span>
                          <span className="text-primary font-bold">{money(item.price * qty)}</span>
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="pt-6 border-t border-outlineVariant/30 flex justify-between items-end">
                <p className="font-bold text-primary font-sans">
                  {activeMethod === 'mercadopago' ? 'Total a pagar' : 'Total a transferir'}
                </p>
                <div className="text-right">
                  <p className="text-sm font-sans line-through text-onSurfaceVariant/70">
                    {money(items.reduce((sum, i) => sum + originalPrice(i.price) * (i.qty || 1), 0))}
                  </p>
                  <p className="font-serif text-headline-lg font-bold text-primary">
                    {money(activeMethod === 'mercadopago' ? mpTotal : transferTotal)}
                  </p>
                </div>
              </div>

              {activeMethod === 'transferencia' ? (
                <div className="flex items-center gap-2 bg-error/10 border border-error/30 rounded-xl px-4 py-3">
                  <Icon name="local_offer" className="text-error flex-shrink-0" />
                  <p className="font-sans text-xs text-onSurfaceVariant">
                    Ahorrás <strong className="text-error">{money(mpTotal - transferTotal)}</strong> pagando por
                    transferencia en vez de Mercado Pago.
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-creamSurface border border-outlineVariant/40 rounded-xl px-4 py-3">
                  <Icon name="info" className="text-secondary text-base flex-shrink-0" />
                  <p className="font-sans text-xs text-onSurfaceVariant">
                    Con transferencia pagás <strong className="text-error">{money(mpTotal - transferTotal)} menos</strong>.
                  </p>
                </div>
              )}

              <p className="text-center text-[11px] text-onSurfaceVariant px-2 font-sans">
                Referencia de tu pedido: <span className="font-semibold">{orderRef}</span> — mencionala si nos
                escribís por WhatsApp.
              </p>
            </div>
          </Reveal>
        </aside>
      </div>
    </div>
  )
}
