import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Icon from './Icon.jsx'

// Previsualiza una demo (interna o externa) dentro de un marco de celular,
// sin sacar al usuario del catálogo. Cierra con el botón, clic afuera, o Escape.
//
// "Pantalla completa" agranda el mismo iframe dentro del modal en vez de
// navegar a la URL real de la demo — así nunca se expone el origen externo
// (ej. *.framer.app) en la barra de direcciones ni en un link visible.
//
// --- Por qué se escala el iframe (ago 2026) ------------------------------
// Las demos (sobre todo las de Framer) diseñan su breakpoint "Phone" para un
// ancho lógico de ~390px y NO reescalan por debajo de eso: el contenido
// simplemente desborda y los títulos grandes quedan cortados. El marco de
// celular acá mide ~266–306px de pantalla, así que si el iframe tomara ese
// ancho como viewport, la demo se vería recortada (bug real, reportado por
// Pablo con Valentina & Franco).
//
// Solución: el iframe SIEMPRE renderiza a `IFRAME_W` (390px, un celular de
// verdad) y se reduce con `transform: scale()` para caber en el espacio real.
// Así cada demo se ve tal cual se vería abriéndola en un celular, solo que
// más chica — nada cortado. En pantalla completa el contenedor ya es ~el
// ancho de un celular, así que no hace falta escalar y el iframe llena todo.
//
// El badge "Made in Framer" ya NO hace falta taparlo desde acá: cada proyecto
// Framer del catálogo tiene un Custom Code propio (`#__framer-badge-container
// { display: none }`, pegado por Pablo en el editor de cada sitio) que lo saca
// de raíz del lado de Framer. Si en algún momento se suma una demo Framer
// nueva sin el Custom Code, va a mostrar el badge real hasta que se le pegue
// el mismo snippet en su editor (ver `project_veintidos` memory).

const IFRAME_W = 390 // viewport lógico = un celular real → Framer usa su breakpoint "Phone"

// Renderiza la demo a IFRAME_W y la reduce con scale() para llenar exactamente
// el contenedor padre (que tiene que ser `position: relative` + tener tamaño).
function ScaledDemoFrame({ url, name }) {
  const screenRef = useRef(null)
  const [box, setBox] = useState({ scale: 1, height: 0 })

  useLayoutEffect(() => {
    const el = screenRef.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (!w || !h) return
      const scale = w / IFRAME_W
      setBox({ scale, height: h / scale })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={screenRef} className="absolute inset-0 overflow-hidden bg-white">
      <iframe
        src={url}
        title={name}
        loading="lazy"
        style={{
          width: IFRAME_W,
          height: box.height || '100%',
          border: 0,
          transform: `scale(${box.scale})`,
          transformOrigin: 'top left',
        }}
      />
    </div>
  )
}

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
      {fullscreen ? (
        <motion.div
          key="fs"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 bg-white"
        >
          {/* El iframe ocupa TODA la pantalla, sin recortes ni cromo alrededor —
              se ve igual que abriendo la invitación en el propio celular.
              Se acota a ~un ancho de celular para que en pantallas grandes
              no se estire raro; ScaledDemoFrame garantiza el viewport de 390px
              aun en celulares más angostos que eso. */}
          <div className="relative mx-auto h-full w-full max-w-[430px]">
            <ScaledDemoFrame url={url} name={name} />
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3">
            <span className="pointer-events-auto rounded-full bg-black/55 px-3 py-1.5 font-sans text-xs text-white/90 backdrop-blur-sm max-w-[60vw] truncate">
              {name}
            </span>
            <div className="pointer-events-auto flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setFullscreen(false)
                }}
                aria-label="Salir de pantalla completa"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              >
                <Icon name="close_fullscreen" className="!text-[20px]" />
              </button>
              <button
                onClick={onClose}
                aria-label="Cerrar previsualización"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
              >
                <Icon name="close" className="!text-[20px]" />
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <>
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

          <motion.div
            key="phone"
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
              <ScaledDemoFrame url={url} name={name} />
              <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[34%] h-[18px] bg-black rounded-full z-10 pointer-events-none" />
            </div>
            <div className="absolute -left-[2px] top-[26%] w-[3px] h-[22px] bg-[#9ea3aa] rounded-l" />
            <div className="absolute -left-[2px] top-[38%] w-[3px] h-[36px] bg-[#9ea3aa] rounded-l" />
            <div className="absolute -right-[2px] top-[30%] w-[3px] h-[46px] bg-[#9ea3aa] rounded-r" />
          </motion.div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setFullscreen(true)
            }}
            className="font-sans text-sm text-white/80 hover:text-white underline underline-offset-4 transition-colors"
          >
            Ver en pantalla completa ↗
          </button>
        </>
      )}
    </motion.div>
  )
}
