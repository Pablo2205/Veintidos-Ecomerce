import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { useCart } from '../context/CartContext.jsx'
import { BANK_DATA } from '../data/site.js'

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

  const orderRef = `VD-${Date.now().toString().slice(-6)}`

  const handleContinue = () => {
    navigate('/completar-datos', { state: { orderRef, cartSummary: items } })
  }

  return (
    <div className="wrap py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-10">
          <Reveal>
            <h1 className="font-serif text-display-mobile md:text-display text-primary">Finalizar compra</h1>
            <p className="mt-4 text-onSurfaceVariant font-sans text-body-lg max-w-lg">
              Transferí el total a los datos de abajo. Una vez hecho, continuá para cargar los datos de tu evento y
              adjuntar el comprobante.
            </p>
            <div className="ornament my-8 text-sm">
              <span>✦</span><span>✦</span><span>✦</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <section className="space-y-6">
              <h2 className="font-serif text-headline-md text-primary flex items-center gap-3">
                <Icon name="account_balance" /> Datos para transferir
              </h2>
              <div className="space-y-3">
                <CopyField label="Alias" value={BANK_DATA.alias} />
                <CopyField label="CBU" value={BANK_DATA.cbu} />
                <CopyField label="Titular" value={BANK_DATA.titular} />
              </div>
              <div className="flex items-start gap-3 bg-creamSurface border border-secondaryFixed rounded-xl p-5">
                <Icon name="info" className="text-secondary flex-shrink-0 mt-0.5" />
                <p className="font-sans text-sm text-onSurfaceVariant">
                  Después de transferir, tocá <strong>"Ya transferí, continuar"</strong>. En la siguiente pantalla
                  cargás los datos de tu evento y subís una foto o captura del comprobante. Validamos el pago y te
                  confirmamos por WhatsApp en el día.
                </p>
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.1}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleContinue}
              className="w-full md:w-auto btn-primary px-10 py-4 flex items-center justify-center gap-2"
            >
              Ya transferí, continuar <Icon name="arrow_forward" />
            </motion.button>
          </Reveal>
        </div>

        {/* Resumen */}
        <aside className="lg:col-span-5 lg:sticky lg:top-32">
          <Reveal delay={0.15}>
            <div className="bg-creamSurface rounded-xl p-8 shadow-xl border border-outlineVariant/30 space-y-8">
              <h3 className="font-serif text-headline-md text-primary">Resumen del pedido</h3>

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div
                      className={`w-20 h-28 rounded-lg flex-shrink-0 bg-gradient-to-br ${
                        item.gradient || 'from-secondaryContainer to-primaryContainer'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-bold text-primary font-sans">{item.name}</p>
                      <p className="text-label text-onSurfaceVariant mt-1 font-sans">{item.plan}</p>
                      <p className="text-primary mt-2 font-semibold font-sans">
                        {money(item.price * (item.qty || 1))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-outlineVariant/30 flex justify-between items-end">
                <p className="font-bold text-primary font-sans">Total a transferir</p>
                <p className="font-serif text-headline-lg text-primary">{money(subtotal)}</p>
              </div>

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
