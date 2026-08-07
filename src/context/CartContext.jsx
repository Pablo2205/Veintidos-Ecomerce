import { createContext, useContext, useState, useMemo, useEffect, useRef } from 'react'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { DISCOUNT_CODE, DISCOUNT_CODE_PERCENT } from '../data/site.js'
import { db, firebaseEnabled } from '../lib/firebase.js'
import { useAuth } from './AuthContext.jsx'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  // El código de descuento vive acá (no en Cart.jsx) para que sobreviva la
  // navegación a Checkout — antes se perdía al cambiar de página porque era
  // estado local del componente Cart.
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState(false)

  // --- Persistencia en Firestore (solo con sesión iniciada) ----------------
  // Objetivo: si alguien agrega una invitación al carrito y no llega a
  // terminar la compra, no perder esos datos. Con cuenta creada, el carrito
  // se guarda en `carts/{uid}` y se restaura solo al iniciar sesión — desde
  // este dispositivo o cualquier otro. Ver `firestore.rules`: cada usuario
  // solo puede leer/escribir su propio documento.
  const auth = useAuth()
  const user = auth?.user
  const restoredForUid = useRef(null)
  const saveTimer = useRef(null)

  useEffect(() => {
    if (!firebaseEnabled || !user) {
      restoredForUid.current = null
      return
    }
    if (restoredForUid.current === user.uid) return
    restoredForUid.current = user.uid

    getDoc(doc(db, 'carts', user.uid))
      .then((snap) => {
        const saved = snap.exists() ? snap.data()?.items : null
        if (Array.isArray(saved) && saved.length) {
          // Solo restauramos si el carrito local está vacío, para no pisar
          // algo que la persona ya estaba armando en este mismo dispositivo.
          setItems((current) => (current.length ? current : saved))
        }
      })
      .catch(() => {
        // Sin conexión, reglas de Firestore aún no desplegadas, etc. — el
        // carrito local sigue funcionando igual, nunca bloqueamos la compra
        // por esto.
      })
  }, [user])

  useEffect(() => {
    if (!firebaseEnabled || !user) return
    clearTimeout(saveTimer.current)
    // Debounce simple: evita escribir en Firestore en cada click de "+1".
    saveTimer.current = setTimeout(() => {
      setDoc(
        doc(db, 'carts', user.uid),
        { items, email: user.email || '', updatedAt: serverTimestamp() },
        { merge: true }
      ).catch(() => {})
    }, 800)
    return () => clearTimeout(saveTimer.current)
  }, [items, user])

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
