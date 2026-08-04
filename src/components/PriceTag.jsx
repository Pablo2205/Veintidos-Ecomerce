import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { originalPrice } from '../data/site.js'

const money = (n) => `$${Math.round(n).toLocaleString('es-AR')}`

// Cuenta hacia el precio real (dato genuino del negocio, no inventado) con
// un spring cuando la tarjeta entra en pantalla — un solo disparo, no se
// repite en cada scroll.
function useCountUp(target, active) {
  const [display, setDisplay] = useState(0)
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { stiffness: 55, damping: 18, mass: 0.6 })

  useEffect(() => {
    if (active) mv.set(target)
  }, [active, target, mv])

  useEffect(() => {
    const unsubscribe = spring.on('change', (v) => setDisplay(v))
    return unsubscribe
  }, [spring])

  return display
}

// Muestra el precio real (el que se cobra) junto con un precio más alto
// tachado arriba, sin mencionar ningún porcentaje. `dark` es para usarlo
// sobre fondos oscuros (ej. el plan Premium).
export default function PriceTag({ price, dark = false, size = 'text-3xl', align = 'items-start' }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const animatedPrice = useCountUp(price, inView)
  const shownPrice = reduce ? price : animatedPrice

  return (
    <div ref={ref} className={`flex flex-col ${align}`}>
      <span className={`font-sans text-sm line-through ${dark ? 'text-white/45' : 'text-onSurfaceVariant/60'}`}>
        {money(originalPrice(price))}
      </span>
      <span className={`font-serif tabular-nums ${size} ${dark ? 'text-white' : 'text-primary'}`}>
        {money(shownPrice)}
      </span>
    </div>
  )
}
