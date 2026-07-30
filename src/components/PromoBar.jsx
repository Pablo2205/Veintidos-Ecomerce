import { motion } from 'framer-motion'
import { PROMO_PERCENT, currentMonthLabel } from '../data/site.js'

export default function PromoBar() {
  return (
    <div className="bg-primary text-promoGold py-3 text-center sticky top-0 z-[60] overflow-hidden">
      <motion.p
        className="font-sans text-label uppercase tracking-widest flex items-center justify-center gap-4 px-mobile"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="hidden md:inline text-error">✦</span>
        <span>
          <span className="text-error font-bold">{PROMO_PERCENT}% OFF</span> en invitaciones digitales durante todo {currentMonthLabel()}
        </span>
        <span className="hidden md:inline text-error">✦</span>
      </motion.p>
    </div>
  )
}
