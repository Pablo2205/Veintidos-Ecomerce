import { useSearchParams } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'

// Página de aterrizaje de los `back_urls` de la preferencia de Mercado Pago
// (ver api/mercadopago/create-preference.js). Se abre en la pestaña NUEVA
// que abrió Checkout.jsx (window.open) — la confirmación real del pago la
// hace la pestaña ORIGINAL cuando el cliente vuelve ahí y toca "Ya pagué,
// continuar" (consulta en vivo a /api/mercadopago/payment-status). Esta
// página es solo informativa, para que no quede una pestaña "colgada".
const STATUS_COPY = {
  approved: { icon: 'check_circle', title: '¡Pago aprobado!', text: 'Ya podés cerrar esta pestaña y volver a la otra para cargar los datos de tu evento.' },
  pending: { icon: 'schedule', title: 'Pago pendiente', text: 'Mercado Pago todavía está procesando tu pago. Volvé a la otra pestaña en unos minutos y tocá "Ya pagué, continuar".' },
  in_process: { icon: 'schedule', title: 'Pago en proceso', text: 'Mercado Pago todavía está procesando tu pago. Volvé a la otra pestaña en unos minutos y tocá "Ya pagué, continuar".' },
  rejected: { icon: 'error', title: 'Pago rechazado', text: 'Mercado Pago no pudo procesar el pago. Volvé a la otra pestaña para intentar de nuevo o pagar por transferencia.' },
}

export default function CheckoutReturn() {
  const [params] = useSearchParams()
  const status = params.get('status')
  const copy = STATUS_COPY[status] || STATUS_COPY.pending

  return (
    <div className="wrap py-24 text-center max-w-lg mx-auto">
      <Reveal>
        <Icon name={copy.icon} className="text-5xl text-primary mb-6" />
        <h1 className="font-serif italic text-primary mb-4" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
          {copy.title}
        </h1>
        <p className="font-sans text-onSurfaceVariant leading-relaxed">{copy.text}</p>
      </Reveal>
    </div>
  )
}
