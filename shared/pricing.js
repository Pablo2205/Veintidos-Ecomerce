// --- Fuente única de precios/cupón --------------------------------------
// Vive fuera de `src/` a propósito: la importan tanto el frontend (Vite,
// vía `src/data/site.js` que re-exporta todo esto) como las funciones
// serverless de `/api` (Node puro). `site.js` usa `import.meta.env` en otras
// partes del archivo, algo que no existe en el runtime de Node de las
// funciones — si `/api` importara `site.js` directamente, se rompería al
// cargar el módulo. Este archivo no puede depender de nada específico de
// Vite/React para poder importarse desde los dos lados sin problema.
//
// Si cambiás un precio, cambialo ACÁ (no en site.js) — services/create-preference
// y el frontend leen de acá.
export const PLAN_PRICING = {
  Essential: { original: 44789, price: 34496, transfer: 31343 },
  Standard: { original: 62462, price: 48048, transfer: 43663 },
  Premium: { original: 70470, price: 54208, transfer: 49263 },
}

export const TRANSFER_DISCOUNT_PERCENT = 10 // etiqueta de marketing (el número exacto varía un poco por plan)

export const DISCOUNT_CODE = 'VEINTIDOS'
export const DISCOUNT_CODE_PERCENT = 5
