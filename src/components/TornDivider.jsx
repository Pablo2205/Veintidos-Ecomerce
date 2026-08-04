/**
 * Borde de "papel roto" entre secciones — mismo lenguaje visual que ya usan
 * las demos de invitaciones (public/demos/), traído al sitio principal para
 * que la tienda se sienta hecha del mismo papel que el producto que vende.
 *
 * Amplitud sutil a propósito (±3-4%, no ±10%): con picos grandes se ve
 * sierra/montaña, no papel roto. Ver nota en CLAUDE.md sobre esta técnica.
 */
function tornPath(seed = 0) {
  // Puntos fijos (no random en cada render) con variación leve por `seed`
  // para que dividers consecutivos no sean idénticos.
  const base = [0, 4, 1, 5, 0, 6, 2, 4, 0, 5, 1, 6, 0]
  const pts = base.map((v, i) => v + ((i + seed) % 3) - 1)
  const step = 100 / (pts.length - 1)
  return pts.map((v, i) => `${(i * step).toFixed(2)},${v}`).join(' ')
}

export default function TornDivider({ flip = false, color = 'fill-background', seed = 0, className = '' }) {
  return (
    <svg
      viewBox="0 0 100 8"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block w-full h-4 md:h-6 ${flip ? 'rotate-180' : ''} ${className}`}
    >
      <polygon points={`0,8 ${tornPath(seed)} 100,8`} className={color} />
    </svg>
  )
}
