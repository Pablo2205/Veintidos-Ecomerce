export default function PromoBar() {
  return (
    <div className="bg-primary text-promoGold py-3 text-center sticky top-0 z-[60]">
      <p className="font-sans text-label uppercase tracking-widest flex items-center justify-center gap-4 px-mobile">
        <span className="hidden md:inline">✦</span>
        <span>Promo de temporada: descuento especial reservando en este mes</span>
        <span className="hidden md:inline">✦</span>
      </p>
    </div>
  )
}
