import { originalPrice } from '../data/site.js'

const money = (n) => `$${n.toLocaleString('es-AR')}`

// Muestra el precio real (el que se cobra) junto con un precio más alto
// tachado arriba, sin mencionar ningún porcentaje. `dark` es para usarlo
// sobre fondos oscuros (ej. el plan Premium).
export default function PriceTag({ price, dark = false, size = 'text-3xl', align = 'items-start' }) {
  return (
    <div className={`flex flex-col ${align}`}>
      <span className={`font-sans text-sm line-through ${dark ? 'text-white/45' : 'text-onSurfaceVariant/60'}`}>
        {money(originalPrice(price))}
      </span>
      <span className={`font-serif ${size} ${dark ? 'text-white' : 'text-primary'}`}>{money(price)}</span>
    </div>
  )
}
