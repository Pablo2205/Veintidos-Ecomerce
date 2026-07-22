export default function Icon({ name, filled = false, className = '' }) {
  return <span className={`icon ${filled ? 'icon-fill' : ''} ${className}`}>{name}</span>
}
