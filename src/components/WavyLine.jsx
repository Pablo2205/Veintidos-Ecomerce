/**
 * Línea ondulada dibujada a mano vía SVG <path> — misma técnica que usan las
 * demos (ver `juan-ana/`) para conectar pasos/hitos. Puramente decorativa.
 */
export default function WavyLine({ className = 'text-promoGold/40', vertical = false }) {
  return (
    <svg
      viewBox={vertical ? '0 0 24 100' : '0 0 100 24'}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`${vertical ? 'w-6 h-full' : 'w-full h-6'} ${className}`}
    >
      <path
        d={
          vertical
            ? 'M12 0 C 20 12, 4 24, 12 36 S 4 60, 12 72 S 20 92, 12 100'
            : 'M0 12 C 12 4, 24 20, 36 12 S 60 4, 72 12 S 92 20, 100 12'
        }
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
