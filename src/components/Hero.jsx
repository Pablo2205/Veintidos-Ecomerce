import { useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimationFrame, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { waLink } from '../data/site.js'
import WhatsAppButton from './WhatsAppButton.jsx'

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

// Título armado por palabras (no por línea) para que el stagger de entrada
// sea una cascada palabra a palabra — más editorial que animar bloques
// enteros de texto de una.
const headlineLines = [
  { words: ['Cada', 'fiesta', 'empieza'] },
  { words: ['con', 'una', 'gran'], accent: true },
  { words: ['invitación'], accent: true },
]

const word = {
  hidden: { opacity: 0, y: '100%' },
  show: { opacity: 1, y: '0%', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Portadas reales que pasan por detrás del celular central. El celular va
// mostrando la que está pasando (mismo orden). Capturas en
// `public/hero-frames/` (~560px de ancho) — regenerar con el mismo recorte.
const frames = [
  { key: 'lucia-juan', src: '/hero-frames/lucia-juan.jpg' },
  { key: 'walter-rocio', src: '/hero-frames/walter-rocio.jpg' },
  { key: 'olivia-ralph', src: '/hero-frames/olivia-ralph.jpg' },
  { key: 'julieta-mateo', src: '/hero-frames/julieta-mateo.jpg' },
  { key: 'lorena-gustavo', src: '/hero-frames/lorena-gustavo.jpg' },
  { key: 'ornella-diego', src: '/hero-frames/ornella-diego.jpg' },
  { key: 'valentina-franco', src: '/hero-frames/valentina-franco.jpg' },
]

// El celular cambia de invitación cada STEP ms; la cinta de atrás tarda
// `STEP * frames.length` en dar una vuelta, así una tarjeta cruza el centro
// justo cuando el celular la muestra.
const STEP = 3600

export default function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const numberY = useTransform(scrollYProgress, [0, 1], [0, 220])
  const numberRotate = useTransform(scrollYProgress, [0, 1], [0, 6])
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  return (
    <section ref={sectionRef} className="relative flex flex-col bg-background">
      <div className="relative flex flex-col items-center pt-14 lg:pt-16">
        {/* Capa de fondo (recortada) — marca de agua "22", halo y grilla. */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.span
            aria-hidden="true"
            style={{ fontSize: '40vw', ...(reduce ? {} : { y: numberY, rotate: numberRotate }) }}
            className="hidden md:block absolute left-1/2 -top-[9vw] -translate-x-1/2 font-serif italic font-bold text-primary/[0.04] leading-none select-none"
          >
            22
          </motion.span>
          <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[760px] aspect-square rounded-full bg-secondaryContainer/25 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-[58%] dot-grid text-outlineVariant/40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        </div>

        {/* Texto centrado */}
        <motion.div
          className="wrap relative z-20 flex flex-col items-center text-center"
          initial={reduce ? false : 'hidden'}
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.span variants={item} className="inline-flex items-center gap-3 font-mono text-label text-secondary tracking-widest mb-5 uppercase">
            <span className="h-px w-8 bg-promoGold" aria-hidden="true" />
            Invitaciones digitales
            <span className="h-px w-8 bg-promoGold" aria-hidden="true" />
          </motion.span>

          <motion.h1
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } } }}
            className="font-serif italic font-normal text-primary leading-[0.98] tracking-tight mb-6 max-w-[14ch]"
            style={{ fontSize: 'clamp(2.5rem, 5.4vw, 4.75rem)' }}
          >
            {headlineLines.map((line, li) => (
              <span key={li} className={`block overflow-hidden ${line.accent ? 'text-secondary' : ''}`}>
                {line.words.map((w, wi) => (
                  <span key={wi} className="inline-block overflow-hidden mr-[0.22em] align-top">
                    <motion.span variants={reduce ? undefined : word} className="inline-block">
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p variants={item} className="font-sans text-onSurfaceVariant text-base leading-relaxed max-w-md mb-9">
            Invitaciones digitales para bodas. Creamos una web única para tu evento con
            cuenta regresiva, confirmación y música — todo en un link.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppButton
              href={waLink('Hola! Quiero información sobre las invitaciones digitales.')}
              className="px-8 py-4 text-base justify-center"
            >
              Consultar por WhatsApp
            </WhatsAppButton>
            <Link to="/catalogo" className="btn-outline px-8 py-4 text-center">
              Ver demos
            </Link>
          </motion.div>
        </motion.div>

        {/* Escenario: un celular centrado con las invitaciones pasando por
            detrás. El celular va mostrando la que cruza el centro. */}
        <motion.div
          className="relative z-10 mt-8 lg:mt-10 -mb-16 lg:-mb-24 w-full"
          style={reduce ? undefined : { y: stageY, scale: stageScale }}
        >
          <PhoneStage reduce={reduce} />
        </motion.div>
      </div>

      {/* Stats band — banda verde oscura, elemento firma. El celular se apoya
          sobre su borde superior (de ahí el pt grande). */}
      <motion.div
        className="relative bg-primary pt-24 lg:pt-32"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <div className="wrap grid grid-cols-3 divide-x divide-primaryFixed/10 py-7">
          {[
            ['Confirmaciones', 'Automáticas'],
            ['Entrega', '3–5 días hábiles'],
            ['QR listo', 'Para imprimir'],
          ].map(([label, value]) => (
            <div key={label} className="text-center px-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primaryFixed/45 mb-0.5">{label}</p>
              <p
                className="font-serif italic font-normal text-primaryFixed leading-tight"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.25rem)' }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function PhoneStage({ reduce }) {
  const [active, setActive] = useState(0)
  const stageRef = useRef(null)
  const stripRef = useRef(null)
  const lastCheck = useRef(0)

  // El celular muestra la invitación cuya tarjeta está pasando por el centro
  // en este instante. Se mide (robusto a cualquier ancho de viewport) en vez
  // de asumir un offset fijo, con throttle a ~8 lecturas por segundo.
  useAnimationFrame((t) => {
    if (reduce || t - lastCheck.current < 120) return
    lastCheck.current = t
    const stage = stageRef.current
    const strip = stripRef.current
    if (!stage || !strip) return
    const stageRect = stage.getBoundingClientRect()
    const centerX = stageRect.left + stageRect.width / 2
    let best = 0
    let bestDist = Infinity
    for (const child of strip.children) {
      const r = child.getBoundingClientRect()
      const d = Math.abs(r.left + r.width / 2 - centerX)
      if (d < bestDist) {
        bestDist = d
        best = Number(child.dataset.frame)
      }
    }
    setActive((prev) => (prev === best ? prev : best))
  })

  // La cinta lleva 3 copias seguidas y se anima un tercio de su ancho, así
  // siempre cubre el ancho del contenedor y el loop es invisible.
  const loopSeconds = (STEP / 1000) * frames.length

  return (
    <div ref={stageRef} className="relative flex items-center justify-center min-h-[440px] sm:min-h-[520px]">
      {/* Cinta de invitaciones que pasa por detrás */}
      <div className="absolute inset-0 flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]">
        <motion.div
          ref={stripRef}
          className="flex gap-5 sm:gap-7 will-change-transform"
          animate={reduce ? undefined : { x: ['0%', '-33.3333%'] }}
          transition={{ duration: loopSeconds, ease: 'linear', repeat: Infinity }}
        >
          {[...frames, ...frames, ...frames].map((f, i) => (
            <div
              key={f.key + i}
              data-frame={i % frames.length}
              className="relative w-[128px] sm:w-[150px] aspect-[9/16] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg shadow-primary/10 opacity-50"
            >
              <img
                src={f.src}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover object-top select-none pointer-events-none"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Celular central — muestra la invitación que está pasando */}
      <div className="relative z-10 w-[196px] sm:w-[236px] aspect-[9/19.5] flex-shrink-0">
        <div className="absolute inset-0 rounded-[2.6rem] bg-gradient-to-br from-[#e7e9ec] via-[#c9cdd3] to-[#9ea3aa] shadow-2xl" />
        <div className="absolute inset-[3px] rounded-[2.45rem] bg-black" />
        <div className="absolute inset-[7px] rounded-[2.2rem] overflow-hidden bg-black">
          <AnimatePresence initial={false}>
            <motion.img
              key={frames[active].key}
              src={frames[active].src}
              alt="Invitación de boda de ejemplo"
              draggable={false}
              initial={reduce ? false : { opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 h-full w-full object-cover object-top select-none pointer-events-none"
            />
          </AnimatePresence>
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[32%] h-[17px] bg-black rounded-full z-10" />
        </div>
        <div className="absolute -left-[2px] top-[30%] w-[3px] h-[38px] bg-[#9ea3aa] rounded-l" />
        <div className="absolute -right-[2px] top-[26%] w-[3px] h-[46px] bg-[#9ea3aa] rounded-r" />
      </div>
    </div>
  )
}
