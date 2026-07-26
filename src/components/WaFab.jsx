import { waLink } from '../data/site.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'

export default function WaFab() {
  return (
    <a
      href={waLink('Hola! Quiero información sobre las invitaciones digitales.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="group fixed bottom-8 right-8 z-[70]"
    >
      <div className="relative flex items-center gap-3 bg-whatsapp text-white p-4 rounded-full shadow-lg group-hover:pr-6 transition-all duration-300">
        <WhatsAppIcon className="w-6 h-6 flex-shrink-0" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-sans font-bold text-sm">
          Chateá con nosotros
        </span>
      </div>
    </a>
  )
}
