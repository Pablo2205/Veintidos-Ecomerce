import { createContext, useContext, useState, useMemo } from 'react'
import { cartItems as seed } from '../data/site.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(seed)

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

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, subtotal }}>{children}</CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
