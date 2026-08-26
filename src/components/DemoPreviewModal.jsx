import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Icon from './Icon.jsx'

// Previsualiza una demo (interna o externa) dentro de un marco de celular,
// sin sacar al usuario del catálogo. Cierra con el botón, clic afuera, o Escape.
//
// "Pantalla completa" agranda el mismo iframe dentro del modal en vez de
// navegar a la URL real de la demo — así nunca se expone el origen externo
// (ej. *.framer.app) en la barra de direcciones ni en un link visible.
//
// El badge "Made in Framer" ya NO hace falta taparlo desde acá: cada proyecto
// Framer del catálogo tiene un Custom Code propio (`#__framer-badge-container
// { display: none }`, pegado por Pablo en el editor de cada sitio) que lo saca
// de raíz del lado de Framer. Hubo una capa `FramerBadgeShield` acá (ago 2026)
// mientras esa solución no estaba en las 8 demos — se sacó una vez confirmado
// que las 8 ya tenían el Custom Code aplicado. Si en algún momento se suma una
// demo Framer nueva sin el Custom Code, va a mostrar el badge real hasta que
// se le pegue el mismo snippet en su editor (ver `project_veintidos` memory).

export default function DemoPreviewModal({ url, name, onClose }) {
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-black/70 backdrop-blur-sm px-4 py-8"
    >
      <div className="flex items-center justify-between w-full max-w-[340px]">
        <p className="font-sans text-sm text-white/90 truncate pr-4">{name}</p>
        <button
          onClick={onClose}
          aria-label="Cerrar previsualización"
          className="flex-shrink-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <Icon name="close" />
        </button>
      </div>

      {fullscreen ? (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full h-full max-w-[520px] rounded-2xl overflow-hidden bg-white shadow-2xl"
        >
          <iframe src={url} title={name} className="w-full h-full border-0" loading="lazy" />
        </motion.div>
      ) : (
        <motion.div
          layout
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-[280px] sm:w-[320px] aspect-[9/19.5] flex-shrink-0"
        >
          <div className="absolute inset-0 rounded-[2.6rem] bg-gradient-to-br from-[#e7e9ec] via-[#c9cdd3] to-[#9ea3aa] shadow-2xl" />
          <div className="absolute inset-[3px] rounded-[2.45rem] bg-black" />
          <div className="absolute inset-[7px] rounded-[2.2rem] overflow-hidden bg-white">
            <iframe
              src={url}
              title={name}
              className="w-full h-full border-0"
              loading="lazy"
            />
            <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[34%] h-[18px] bg-black rounded-full z-10 pointer-events-none" />
          </div>
          <div className="absolute -left-[2px] top-[26%] w-[3px] h-[22px] bg-[#9ea3aa] rounded-l" />
          <div className="absolute -left-[2px] top-[38%] w-[3px] h-[36px] bg-[#9ea3aa] rounded-l" />
          <div className="absolute -right-[2px] top-[30%] w-[3px] h-[46px] bg-[#9ea3aa] rounded-r" />
        </motion.div>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation()
          setFullscreen((v) => !v)
        }}
        className="font-sans text-sm text-white/80 hover:text-white underline underline-offset-4 transition-colors"
      >
        {fullscreen ? 'Volver a vista de celular' : 'Ver en pantalla completa ↗'}
      </button>
    </motion.div>
  )
}
