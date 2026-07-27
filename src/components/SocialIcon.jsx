// Instagram, Facebook y TikTok no existen en Material Symbols (la librería
// de íconos que usamos para el resto del sitio), así que están armados a
// mano acá, mismo criterio que WhatsAppIcon.jsx. currentColor hereda el
// color de texto del padre.
export default function SocialIcon({ name, className = 'w-5 h-5' }) {
  if (name === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  if (name === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M15.4 21v-7.9h2.65l.4-3.08H15.4V8.02c0-.89.25-1.5 1.52-1.5h1.63V3.77C18.25 3.7 17.31 3.6 16.21 3.6c-2.3 0-3.87 1.4-3.87 3.98v2.44H9.68v3.08h2.66V21h3.06z" />
      </svg>
    )
  }
  if (name === 'tiktok') {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path d="M16.6 3h-2.9v11.6c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.24 0 .47.03.69.09V9.02a5.6 5.6 0 0 0-.69-.04A5.66 5.66 0 0 0 5.4 14.6a5.66 5.66 0 0 0 5.66 5.66 5.66 5.66 0 0 0 5.66-5.66V9.03a8.3 8.3 0 0 0 4.5 1.32V7.42c-1.9 0-3.55-1.15-4.26-2.79-.24-.53-.36-1.1-.36-1.63z" />
      </svg>
    )
  }
  return null
}
