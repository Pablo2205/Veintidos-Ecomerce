import SocialIcon from './SocialIcon.jsx'

// TikTok y Facebook todavía no tienen cuenta real de veintidós (ver
// CLAUDE.md) — se muestran igual como "viene pronto", pero como ícono
// inerte (no `<a>`, no redirige a ningún lado) en vez de sacarlos del todo.
// Compartido entre Footer.jsx y Contact.jsx.
export default function InertSocialIcon({ name, label, size = 'w-11 h-11', iconSize = 'w-5 h-5' }) {
  return (
    <span
      aria-label={`${label} — próximamente`}
      title={`${label} — próximamente`}
      className={`${size} rounded-full bg-secondaryContainer/20 flex items-center justify-center text-onSurfaceVariant/40 cursor-default`}
    >
      <SocialIcon name={name} className={iconSize} />
    </span>
  )
}
