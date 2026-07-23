// Isotipo de veintidós: "22" enlazado dentro de un sello circular,
// con una guirnalda de laurel — coherente con la estética editorial
// del sitio (Playfair Display, verde salvia + dorado).
export default function LogoMark({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label="veintidós">
      <circle cx="50" cy="50" r="48" fill="#182317" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#C5A059" strokeWidth="1.4" />

      {/* destello superior */}
      <path
        d="M50 20 L52.3 26.3 L58.5 28.5 L52.3 30.7 L50 37 L47.7 30.7 L41.5 28.5 L47.7 26.3 Z"
        fill="#C5A059"
      />

      {/* "22" */}
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="30"
        fill="#F2EFE9"
      >
        22
      </text>

      {/* guirnalda — lado izquierdo */}
      <g fill="#C5A059">
        <ellipse cx="0" cy="0" rx="2.6" ry="6.4" transform="translate(33,75) rotate(-68)" />
        <ellipse cx="0" cy="0" rx="2.8" ry="7" transform="translate(26,67) rotate(-46)" />
        <ellipse cx="0" cy="0" rx="3" ry="7.4" transform="translate(21.5,57) rotate(-22)" />
        <ellipse cx="0" cy="0" rx="3" ry="7.4" transform="translate(20,47) rotate(-2)" />
      </g>
      {/* guirnalda — lado derecho (espejo) */}
      <g fill="#C5A059">
        <ellipse cx="0" cy="0" rx="2.6" ry="6.4" transform="translate(67,75) rotate(68)" />
        <ellipse cx="0" cy="0" rx="2.8" ry="7" transform="translate(74,67) rotate(46)" />
        <ellipse cx="0" cy="0" rx="3" ry="7.4" transform="translate(78.5,57) rotate(22)" />
        <ellipse cx="0" cy="0" rx="3" ry="7.4" transform="translate(80,47) rotate(2)" />
      </g>
    </svg>
  )
}
