import { Link } from 'react-router-dom'
import logoWordmark from '../assets/logo-wordmark.png'

export default function Footer() {
  return (
    <footer className="bg-surfaceContainer border-t border-outlineVariant/20 py-section">
      <div className="wrap grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="md:col-span-1 space-y-4">
          <img src={logoWordmark} alt="veintidós" className="h-9 w-auto" />
          <p className="font-sans text-sm text-onSurfaceVariant max-w-xs">
            Invitaciones digitales de autor. Creamos experiencias digitales que marcan el inicio de tus mejores
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
          <ul className="space-y-3 text-sm font-sans text-onSurfaceVariant">
            <li>hola@veintidos.ar</li>
            <li>Buenos Aires, Argentina</li>
            <li>
              <a className="hover:text-primary transition-colors" href="https://instagram.com/veintidos.invitaciones" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-sans text-label text-primary uppercase tracking-widest mb-6">Pagos</h5>
          <div className="flex flex-wrap gap-3 text-sm font-sans text-onSurfaceVariant">
            <span className="px-3 py-1 border border-outlineVariant rounded">Transferencia bancaria</span>
          </div>
        </div>
      </div>
      <div className="wrap mt-16 pt-8 border-t border-outlineVariant/10 text-center">
        <p className="font-sans text-label text-onSurfaceVariant opacity-60">
          © 2026 veintidós · Hecho con ♥ en Buenos Aires
        </p>
      </div>
    </footer>
  )
}
