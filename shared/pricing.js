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
// Standard y Premium subieron +30% (ago 2026, a pedido de Pablo) al pasar a
// ser exclusivamente las demos armadas en Framer — Essential quedó igual,
// ahora es el tier de las demos HTML hechas a mano.
//
// Premium subió de nuevo (mismo día, más tarde): el salto Standard->Premium
// había quedado en apenas +13% ($62.462 -> $70.470), muy chico para lo que
// Premium suma de verdad (canciones, álbum, video, personalización,
// prioridad). A pedido de Pablo se agrandó a +35% sobre Standard en vez de
// dejarlo como "nudge" de pricing.
export const PLAN_PRICING = {
  Essential: { original: 44789, price: 34496, transfer: 31343 },
  Standard: { original: 81201, price: 62462, transfer: 56762 },
  Premium: { original: 109621, price: 84324, transfer: 76614 },
}

export const TRANSFER_DISCOUNT_PERCENT = 10 // etiqueta de marketing (el número exacto varía un poco por plan)

export const DISCOUNT_CODE = 'VEINTIDOS'
export const DISCOUNT_CODE_PERCENT = 5
