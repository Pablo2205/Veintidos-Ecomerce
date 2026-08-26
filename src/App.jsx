import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import WaFab from './components/WaFab.jsx'
import PromoBar from './components/PromoBar.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import CheckoutReturn from './pages/CheckoutReturn.jsx'
import Personalize from './pages/Personalize.jsx'
import Contact from './pages/Contact.jsx'
import Terms from './pages/Terms.jsx'
import Privacy from './pages/Privacy.jsx'
import IntellectualProperty from './pages/IntellectualProperty.jsx'

function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Esperamos un tick a que la sección de destino ya esté en el DOM
      // (importante cuando venimos navegando desde otra página, no solo
      // haciendo scroll dentro de Home).
      const t = setTimeout(() => {
        const el = document.getElementById(hash.replace('#', ''))
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 60)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <ErrorBoundary>
      <ScrollManager />
      <ScrollProgress />
      <PromoBar />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/retorno" element={<CheckoutReturn />} />
          <Route path="/personalizar" element={<Personalize />} />
          <Route path="/completar-datos" element={<Personalize />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/terminos" element={<Terms />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/propiedad-intelectual" element={<IntellectualProperty />} />
        </Routes>
      </main>
      <Footer />
      <WaFab />
    </ErrorBoundary>
  )
}
