import { motion } from 'framer-motion'
import { PROMO_PERCENT, currentMonthLabel } from '../data/site.js'

export default function PromoBar() {
  const message = `✦ ${PROMO_PERCENT}% OFF durante todo ${currentMonthLabel()}`
  // 6 repeticiones por mitad para que la tira nunca se corte, incluso en
  // pantallas anchas. Las dos mitades son idénticas: al animar x de 0% a
  // -50% (el ancho de una mitad), el loop queda perfectamente continuo.
  const half = Array.from({ length: 6 })

  return (
    <div className="bg-error text-white py-3 sticky top-0 z-[60] overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {[...half, ...half].map((_, i) => (
          <span
            key={i}
            className="font-sans text-label uppercase tracking-widest whitespace-nowrap px-6 flex-shrink-0"
          >
            {message}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
