import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// --- Configuración de Firebase (Authentication + Firestore) ---------------
// Estos valores NO son secretos en el sentido tradicional — Firebase está
// diseñado para que este config viaje en el bundle del cliente (cualquiera
// puede verlo con F12). La seguridad real vive en otro lado:
//   1. Firestore Security Rules (ver `firestore.rules` en la raíz) — deciden
//      quién puede leer/escribir qué documento, no el config.
//   2. Firebase Authentication — nunca vemos ni guardamos contraseñas en
//      texto plano; las maneja Google del otro lado.
// Aun así los sacamos a variables de entorno (`.env`, no versionado) en vez
// de hardcodearlos, para no tener que tocar código si cambian y para poder
// tener valores distintos en preview/producción si hiciera falta.
//
// Ver `docs/FIREBASE-SETUP.md` para los pasos de creación del proyecto.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Mientras el `.env` no esté cargado (recién clonado el repo, o en un
// preview deploy sin las env vars configuradas en Vercel), la app entera NO
// tiene por qué romperse — el login simplemente se muestra pero avisa que
// todavía no está disponible. Ver `AuthContext.jsx`.
export const firebaseEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

export const app = firebaseEnabled && !getApps().length ? initializeApp(firebaseConfig) : getApps()[0] || null
export const auth = firebaseEnabled ? getAuth(app) : null
export const db = firebaseEnabled ? getFirestore(app) : null
