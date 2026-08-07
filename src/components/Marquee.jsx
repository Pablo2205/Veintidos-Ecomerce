import { useReducedMotion } from 'framer-motion'

/**
 * Franja de texto en loop infinito, técnica editorial (revistas, sitios de
 * moda) — le da al sitio un momento de identidad propia entre el Hero y el
 * resto del contenido. Duplicamos el contenido una vez y animamos -50%
 * con CSS puro (no Framer Motion) para que el loop sea perfecto y liviano;
 * `prefers-reduced-motion` lo deja estático.
 */
const DEFAULT_ITEMS = ['Bodas', 'Cumple XV', 'Baby Showers', 'Invitaciones digitales', 'Diseño a medida']

export default function Marquee({ items = DEFAULT_ITEMS, className = '' }) {
  const reduce = useReducedMotion()
  const content = (
    <div className="flex items-center shrink-0">
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className="font-serif italic px-6 whitespace-nowrap" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
            {it}
          </span>
          <span className="text-promoGold text-xl" aria-hidden="true">✦</span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className={`flex w-max ${reduce ? '' : 'animate-marquee'}`}>
        {content}
        {content}
      </div>
    </div>
  )
}
