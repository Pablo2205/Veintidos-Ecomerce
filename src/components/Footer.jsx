import { Link } from 'react-router-dom'
import SocialIcon from './SocialIcon.jsx'
import logoWordmark from '../assets/brand/veintidos-logo-on-light.png'
import { CONTACT_EMAIL, CONTACT_LOCATION, INSTAGRAM_URL } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="relative bg-surfaceContainer border-t border-outlineVariant/20 py-section overflow-hidden">
      <div className="absolute inset-0 dot-grid text-outlineVariant/30 pointer-events-none [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="wrap relative grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="md:col-span-1 space-y-4">
          <img src={logoWordmark} alt="veintidós — invitaciones digitales" className="h-14 w-auto" />
          <p className="font-sans text-sm text-onSurfaceVariant max-w-xs">
            Invitaciones digitales de autor. Creamos experiencias que marcan el inicio de tus mejores
            momentos.
          </p>
        </div>
        <div>
          <h5 className="font-sans text-label text-primary uppercase tracking-widest mb-6">Navegación</h5>
          <ul className="space-y-3">
            <li><Link className="text-onSurfaceVariant hover:text-primary transition-colors text-sm font-sans" to="/catalogo">Demos</Link></li>
            <li><Link className="text-onSurfaceVariant hover:text-primary transition-colors text-sm font-sans" to="/#eventos">Eventos</Link></li>
            <li><Link className="text-onSurfaceVariant hover:text-primary transition-colors text-sm font-sans" to="/#planes">Planes</Link></li>
            <li><Link className="text-onSurfaceVariant hover:text-primary transition-colors text-sm font-sans" to="/#preguntas">Preguntas</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-sans text-label text-primary uppercase tracking-widest mb-6">Contacto</h5>
          <ul className="space-y-3 text-sm font-sans text-onSurfaceVariant mb-6">
            <li>{CONTACT_EMAIL}</li>
            <li>{CONTACT_LOCATION}</li>
          </ul>
          <div className="flex items-center gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full bg-secondaryContainer/40 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors"
            >
              <SocialIcon name="instagram" className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div>
          <h5 className="font-sans text-label text-primary uppercase tracking-widest mb-6">Pagos</h5>
          <div className="flex flex-wrap gap-3 text-sm font-sans text-onSurfaceVariant">
            <span className="px-3 py-1 border border-outlineVariant rounded">Transferencia bancaria</span>
          </div>
        </div>
      </div>
      <div className="wrap mt-16 pt-8 border-t border-outlineVariant/10 flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-3 text-center">
        <p className="font-sans text-label text-onSurfaceVariant opacity-60">
          © 2026 veintidós · Diseñado y desarrollado por CR Studio
        </p>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Link
            to="/terminos"
            className="font-sans text-label text-onSurfaceVariant opacity-60 hover:opacity-100 hover:text-primary transition-opacity"
          >
            Términos y condiciones
          </Link>
          <span className="text-onSurfaceVariant opacity-30" aria-hidden="true">·</span>
          <Link
            to="/privacidad"
            className="font-sans text-label text-onSurfaceVariant opacity-60 hover:opacity-100 hover:text-primary transition-opacity"
          >
            Privacidad
          </Link>
          <span className="text-onSurfaceVariant opacity-30" aria-hidden="true">·</span>
          <Link
            to="/propiedad-intelectual"
            className="font-sans text-label text-onSurfaceVariant opacity-60 hover:opacity-100 hover:text-primary transition-opacity"
          >
            Propiedad intelectual
          </Link>
        </div>
      </div>
    </footer>
  )
}
