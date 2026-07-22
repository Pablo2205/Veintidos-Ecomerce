import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon.jsx'
import { useCart } from '../context/CartContext.jsx'

const links = [
  ['/catalogo', 'Demos'],
  ['/#eventos', 'Eventos'],
  ['/#planes', 'Planes'],
  ['/#preguntas', 'Preguntas'],
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { items } = useCart()
  const count = items.reduce((n, i) => n + (i.qty || 1), 0)
  return (
    <header className="bg-background border-b border-outlineVariant/30 sticky top-[48px] z-50 h-20">
      <nav className="wrap flex items-center justify-between h-full">
        <Link to="/" className="font-serif text-headline-md md:text-headline-lg font-bold tracking-tight text-primary">
          veinti<span className="text-secondary">dós</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(([href, label]) => (
            <NavLink
              key={href}
              to={href}
              className="font-sans text-label text-onSurfaceVariant hover:text-primary transition-colors"
            >
              {label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/carrito"
            className="hidden md:flex items-center justify-center p-2 rounded-full hover:bg-primaryContainer/10 transition-all relative"
            aria-label="Carrito"
          >
            <Icon name="shopping_cart" className="text-primary" />
            {count > 0 && (
              <span className="absolute top-0 right-0 bg-promoGold text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-sans">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/personalizar"
            className="hidden md:inline-flex items-center gap-2 bg-primary text-onPrimary px-6 py-3 rounded-full font-sans text-label hover:opacity-90 transition-all active:scale-95"
          >
            Quiero la mía
          </Link>
          <button className="md:hidden text-primary" aria-label="Abrir menú" onClick={() => setOpen((v) => !v)}>
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden bg-background border-b border-outlineVariant/30"
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
