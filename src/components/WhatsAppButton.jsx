import WhatsAppIcon from './WhatsAppIcon.jsx'

// Botón consistente para CUALQUIER lugar del sitio que desvíe a WhatsApp:
// fondo verde de marca (#25D366) + logo real, no el verde institucional
// del sitio ni el ícono genérico de chat.
export default function WhatsAppButton({
  href,
  children,
  className = 'px-8 py-4 text-base',
  iconClassName = 'w-5 h-5',
  outline = false,
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-bold transition-all active:scale-95 ${
        outline
          ? 'border-2 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-white'
          : 'bg-whatsapp text-white hover:brightness-95'
      } ${className}`}
    >
      <WhatsAppIcon className={iconClassName} />
      {children}
    </a>
  )
}
