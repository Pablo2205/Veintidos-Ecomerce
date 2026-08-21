import { createContext, useContext, useState, useMemo } from 'react'
import { DISCOUNT_CODE, DISCOUNT_CODE_PERCENT } from '../data/site.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  // El código de descuento vive acá (no en Cart.jsx) para que sobreviva la
  // navegación a Checkout — antes se perdía al cambiar de página porque era
  // estado local del componente Cart.
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState(false)

  // El carrito vive solo en memoria — se pierde al refrescar la página. No
  // hay backend propio ni login para persistirlo entre sesiones/dispositivos
  // (se evaluó con Firebase y se sacó, ver git history si hace falta
  // retomarlo).

  const add = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: (i.qty || 1) + 1 } : i))
      }
      return [...prev, { ...product, qty: 1 }]
    })
  }

  const remove = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  const setQty = (id, qty) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)))

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0), [items])

  const applyPromo = () => {
    const isValid = promoCode.trim().toUpperCase() === DISCOUNT_CODE
    setPromoApplied(isValid)
    setPromoError(!isValid)
  }

  const updatePromoCode = (value) => {
    setPromoCode(value)
    if (promoError) setPromoError(false)
    if (promoApplied) setPromoApplied(false)
  }

  // Descuento acumulable: se aplica como % adicional sobre CUALQUIER total ya
  // calculado (precio de lista, o precio de transferencia con su -10% ya
  // adentro) — así queda acumulado con el 30% del mes y con el método de
  // pago elegido, sea cual sea.
  const applyPromoToTotal = (total) => (promoApplied ? Math.round(total * (DISCOUNT_CODE_PERCENT / 100)) : 0)

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        setQty,
        subtotal,
        promoCode,
        promoApplied,
        promoError,
        applyPromo,
        updatePromoCode,
        applyPromoToTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
