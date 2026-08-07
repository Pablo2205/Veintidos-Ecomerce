import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth'
import { auth, firebaseEnabled } from '../lib/firebase.js'

const AuthContext = createContext(null)

// Mensaje amigable para los códigos de error más comunes de Firebase Auth —
// por defecto tira cosas como "Firebase: Error (auth/email-already-in-use)."
// que no queremos mostrarle a un cliente real.
function friendlyAuthError(err) {
  const code = err?.code || ''
  const map = {
    'auth/email-already-in-use': 'Ya existe una cuenta con ese email. Probá iniciar sesión.',
    'auth/invalid-email': 'Ese email no parece válido.',
    'auth/weak-password': 'La contraseña tiene que tener al menos 8 caracteres.',
    'auth/wrong-password': 'Email o contraseña incorrectos.',
    'auth/invalid-credential': 'Email o contraseña incorrectos.',
    'auth/user-not-found': 'No encontramos una cuenta con ese email.',
    'auth/too-many-requests': 'Demasiados intentos. Esperá un minuto y probá de nuevo.',
    'auth/network-request-failed': 'No pudimos conectar. Revisá tu conexión a internet.',
  }
  return map[code] || err?.message || 'Ocurrió un error inesperado. Probá de nuevo.'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // Arranca en `true` solo si Firebase está configurado — si no, no hay
  // nada que esperar y no queremos dejar el resto de la app colgada.
  const [loading, setLoading] = useState(firebaseEnabled)

  useEffect(() => {
    if (!firebaseEnabled) return
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const requireFirebase = () => {
    if (!firebaseEnabled) {
      throw new Error(
        'Las cuentas todavía no están activadas en este sitio. Mientras tanto, escribinos por WhatsApp y seguimos por ahí.'
      )
    }
  }

  // Contraseña mínima 8 caracteres como defensa en profundidad además del
  // mínimo de 6 que exige Firebase — ver AUTH-Y-SEGURIDAD.md.
  const signUp = async (name, email, password) => {
    requireFirebase()
    if (password.length < 8) {
      throw new Error('La contraseña tiene que tener al menos 8 caracteres.')
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      if (name.trim()) await updateProfile(cred.user, { displayName: name.trim() })
      await sendEmailVerification(cred.user)
      return cred.user
    } catch (err) {
      throw new Error(friendlyAuthError(err))
    }
  }

  const signIn = async (email, password) => {
    requireFirebase()
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      return cred.user
    } catch (err) {
      throw new Error(friendlyAuthError(err))
    }
  }

  const logOut = async () => {
    requireFirebase()
    await firebaseSignOut(auth)
  }

  const resetPassword = async (email) => {
    requireFirebase()
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (err) {
      throw new Error(friendlyAuthError(err))
    }
  }

  const resendVerification = async () => {
    requireFirebase()
    if (auth.currentUser) await sendEmailVerification(auth.currentUser)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, firebaseEnabled, signUp, signIn, logOut, resetPassword, resendVerification }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
