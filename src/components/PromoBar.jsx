import { PROMO_PERCENT, currentMonthLabel } from '../data/site.js'

export default function PromoBar() {
  return (
    <div className="bg-primary text-promoGold py-3 text-center sticky top-0 z-[60]">
      <p className="font-sans text-label uppercase tracking-widest flex items-center justify-center gap-4 px-mobile">
        <span className="hidden md:inline">✦</span>
        <span>
          {PROMO_PERCENT}% OFF en invitaciones digitales durante todo {currentMonthLabel()}
        </span>
        <span className="hidden md:inline">✦</span>
      </p>
    </div>
  )
}
