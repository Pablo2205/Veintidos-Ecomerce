import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import logoWordmark from '../assets/brand/veintidos-logo-on-light-wordmark-only.png'

const links = [
  ['/catalogo', 'Demos'],
  ['/#eventos', 'Eventos'],
  ['/#planes', 'Planes'],
  ['/#preguntas', 'Preguntas'],
  ['/contacto', 'Contacto'],
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { items } = useCart()
  const { user } = useAuth() || {}
  const count = items.reduce((n, i) => n + (i.qty || 1), 0)

  return (
    <header className="relative bg-background sticky top-[48px] z-50">
      {/* Fila 1: menú a la izquierda, logo centrado, carrito a la derecha —
          columnas separadas (no ambos íconos juntos de un mismo lado), así
          quedan lejos del logo en vez de pegados. */}
      <div className="wrap grid grid-cols-[1fr_auto_1fr] items-center h-24 md:h-28">
        <div className="justify-self-start">
          <button className="md:hidden text-primary p-2" aria-label="Abrir menú" onClick={() => setOpen((v) => !v)}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>

        <Link to="/" className="flex items-center gap-2.5 justify-self-center group">
          <span aria-hidden="true" className="hidden sm:inline text-promoGold/50 font-serif italic text-lg transition-colors group-hover:text-promoGold">✦</span>
          <img src={logoWordmark} alt="veintidós" className="h-10 sm:h-11 md:h-14 w-auto" />
          <span aria-hidden="true" className="hidden sm:inline text-promoGold/50 font-serif italic text-lg transition-colors group-hover:text-promoGold">✦</span>
        </Link>

        <div className="justify-self-end flex items-center">
          <Link
            to="/cuenta"
            className="flex items-center justify-center p-2 rounded-full hover:bg-primaryContainer/10 transition-all relative"
            aria-label={user ? 'Mi cuenta' : 'Iniciar sesión'}
          >
            <Icon name="account_circle" className="text-primary" />
            {user && (
              <span className="absolute top-1.5 right-1.5 bg-secondary rounded-full w-2 h-2" aria-hidden="true" />
            )}
          </Link>
          <Link
            to="/carrito"
            className="flex items-center justify-center p-2 rounded-full hover:bg-primaryContainer/10 transition-all relative"
            aria-label="Carrito"
          >
            <Icon name="shopping_cart" className="text-primary" />
            {count > 0 && (
              <span className="absolute top-0 right-0 bg-promoGold text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-sans">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Fila 2: navegación centrada — solo desktop */}
      <nav className="hidden md:flex items-center justify-center gap-8 border-t border-outlineVariant/20 py-3.5">
        {links.map(([href, label]) => (
          <NavLink
            key={href}
            to={href}
            className="relative font-sans text-label text-onSurfaceVariant hover:text-primary transition-colors group py-1"
          >
            {label}
            <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-promoGold transition-all duration-300 group-hover:w-full" />
          </NavLink>
        ))}
        <Link
          to="/personalizar"
          className="inline-flex items-center gap-2 bg-primary text-onPrimary px-6 py-2 rounded-full font-sans text-label border border-transparent hover:border-promoGold hover:opacity-90 transition-all active:scale-95 -my-1"
        >
          Quiero la mía
        </Link>
      </nav>

      {/* Menú mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden bg-background border-t border-outlineVariant/30"
          >
            <div className="wrap py-4 flex flex-col gap-1">
              {links.map(([href, label]) => (
                <NavLink
                  key={href}
                  to={href}
                  onClick={() => setOpen(false)}
                  className="py-3 font-sans text-onSurfaceVariant hover:text-primary"
                >
                  {label}
                </NavLink>
              ))}
              <Link
                to="/personalizar"
                onClick={() => setOpen(false)}
                className="mt-2 text-center bg-primary text-onPrimary py-3 rounded-full font-sans text-label"
              >
                Quiero la mía
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}