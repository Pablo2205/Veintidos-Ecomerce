import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { useCart } from '../context/CartContext.jsx'

const money = (n) => `$${n.toLocaleString('es-AR')}`

export default function Checkout() {
  const { items, subtotal } = useCart()
  const [payment, setPayment] = useState('mp')
  const [submitted, setSubmitted] = useState(false)

  const taxes = Math.round(subtotal * 0.21)
  const discount = payment === 'transfer' ? Math.round(subtotal * 0.1) : 0
  const total = subtotal + taxes - discount
  const first = items[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="wrap py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-12">
          <Reveal>
            <h1 className="font-serif text-display-mobile md:text-display text-primary">Finalizar compra</h1>
            <p className="mt-4 text-onSurfaceVariant font-sans text-body-lg max-w-lg">
              Creá una experiencia inolvidable. Completá los detalles de tu evento para que podamos personalizar tu
              invitación.
            </p>
            <div className="ornament my-8 text-sm">
              <span>✦</span><span>✦</span><span>✦</span>
            </div>
          </Reveal>

          <form className="space-y-10" onSubmit={handleSubmit}>
            <Reveal>
              <section className="space-y-6">
                <h2 className="font-serif text-headline-md text-primary flex items-center gap-3">
                  <Icon name="person" /> Datos personales
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="field-label">Nombre completo</label>
                    <input className="field-input" placeholder="Ej. Ana García" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="field-label">Email</label>
                    <input className="field-input" type="email" placeholder="ana@ejemplo.com" required />
                  </div>
                </div>
              </section>
            </Reveal>

            <Reveal delay={0.05}>
              <section className="space-y-6">
                <h2 className="font-serif text-headline-md text-primary flex items-center gap-3">
                  <Icon name="celebration" /> Información del evento
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="field-label">Tipo de evento</label>
                    <select className="field-input">
                      <option>Boda</option>
                      <option>XV Años</option>
                      <option>Bautismo</option>
                      <option>Cumpleaños</option>
                      <option>Evento corporativo</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="field-label">Fecha estimada</label>
                    <input className="field-input" type="date" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="field-label">Ubicación / Ciudad</label>
                  <input className="field-input" placeholder="Ej. Buenos Aires, Argentina" />
                </div>
              </section>
            </Reveal>

            <Reveal delay={0.1}>
              <section className="space-y-6">
                <h2 className="font-serif text-headline-md text-primary flex items-center gap-3">
                  <Icon name="payments" /> Método de pago
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    ['mp', 'Mercado Pago', 'Tarjetas de crédito, débito o saldo en cuenta', 'account_balance_wallet'],
                    ['transfer', 'Transferencia bancaria', 'Descuento del 10% adicional', 'account_balance'],
                  ].map(([id, title, desc, icon]) => (
                    <label
                      key={id}
                      className={`relative flex items-center p-6 border rounded-xl cursor-pointer transition-all ${
                        payment === id ? 'border-primary bg-primaryContainer/5' : 'border-outlineVariant hover:bg-surfaceContainer'
                      }`}
                    >
                      <input type="radio" name="payment" className="hidden" checked={payment === id} onChange={() => setPayment(id)} />
                      <div className="flex-1 flex items-center gap-4">
                        <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center ${payment === id ? 'border-primary' : 'border-outline'}`}>
                          {payment === id && <div className="w-3 h-3 bg-primary rounded-full" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-primary font-sans">{title}</span>
                          <span className="text-label text-onSurfaceVariant font-sans">{desc}</span>
                        </div>
                      </div>
                      <Icon name={icon} className="text-primary text-3xl" />
                    </label>
                  ))}
                </div>
              </section>
            </Reveal>

            <button type="submit" className="hidden" />
          </form>
        </div>

        {/* Resumen */}
        <aside className="lg:col-span-5 lg:sticky lg:top-32">
          <Reveal delay={0.15}>
            <div className="bg-creamSurface rounded-xl p-8 shadow-xl border border-outlineVariant/30 space-y-8">
              <h3 className="font-serif text-headline-md text-primary">Resumen del pedido</h3>

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className={`w-20 h-28 rounded-lg flex-shrink-0 bg-gradient-to-br ${item.gradient || 'from-secondaryContainer to-primaryContainer'}`} />
                    <div className="flex-1">
                      <p className="font-bold text-primary font-sans">{item.name}</p>
                      <p className="text-label text-onSurfaceVariant mt-1 font-sans">{item.plan}</p>
                      <p className="text-primary mt-2 font-semibold font-sans">{money(item.price * (item.qty || 1))}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-outlineVariant/30 space-y-3 font-sans">
                <div className="flex justify-between text-onSurfaceVariant">
                  <span>Subtotal</span><span>{money(subtotal)}</span>
                </div>
                <div className="flex justify-between text-onSurfaceVariant">
                  <span>Impuestos (IVA incl.)</span><span>{money(taxes)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-promoGold font-bold">
                    <span>Descuento transferencia</span><span>-{money(discount)}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-outlineVariant/30 flex justify-between items-end">
                <div>
                  <p className="text-label text-onSurfaceVariant uppercase tracking-widest font-sans">Total</p>
                  <p className="font-serif text-headline-lg text-primary">{money(total)}</p>
                </div>
                <div className="flex items-center gap-1 text-whatsapp font-bold text-label font-sans">
                  <Icon name="verified" className="text-base" /> Pago seguro
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                className="w-full py-4 bg-primary text-creamSurface rounded-full font-bold hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 font-sans"
              >
                {submitted ? '¡Listo! Te contactamos por WhatsApp' : 'Finalizar y pagar'}
                {!submitted && <Icon name="arrow_forward" />}
              </motion.button>

              <p className="text-center text-[11px] text-onSurfaceVariant px-4 font-sans">
                Al continuar aceptás nuestros Términos y Condiciones y la Política de Privacidad.
              </p>
            </div>
          </Reveal>
        </aside>
      </div>
    </div>
  )
}
