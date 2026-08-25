import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
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
  { words: ['Cada', 'fiesta'] },
  { words: ['empieza', 'con'] },
  { words: ['una', 'gran'], accent: true },
  { words: ['invitación'], accent: true },
]

const word = {
  hidden: { opacity: 0, y: '100%' },
  show: { opacity: 1, y: '0%', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  // Parallax real ligado al scroll: el "22" de fondo baja más lento que el
  // contenido (sensación de profundidad), los teléfonos suben y se achican
  // un poco al salir del viewport. Framer Motion ya es dependencia del
  // proyecto — no se suma ninguna librería nueva para esto.
  const numberY = useTransform(scrollYProgress, [0, 1], [0, 220])
  const numberRotate = useTransform(scrollYProgress, [0, 1], [0, 6])
  const phonesY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const phonesScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60])
  // Hook llamado siempre (nunca condicionalmente) — reglas de hooks. Se usa
  // más abajo solo dentro del JSX que se renderiza cuando `!reduce`.
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  return (
    <section ref={sectionRef} className="relative flex flex-col bg-background">
      {/* Content */}
      <div className="relative min-h-[82vh] flex items-center py-16 lg:py-12 overflow-hidden">
        {/* "22" — el número detrás del nombre de la marca, como marca de agua
            editorial con parallax propio. Firma visual del sitio, no
            decoración genérica: veinti-DÓS. Se repite (más chico) en
            CtaFinal y Footer. */}
        <motion.span
          aria-hidden="true"
          style={{ fontSize: '46vw', ...(reduce ? {} : { y: numberY, rotate: numberRotate }) }}
          className="hidden md:block absolute -right-[3vw] -top-[8vw] font-serif italic font-bold text-primary/[0.05] leading-none select-none pointer-events-none"
        >
          22
        </motion.span>
        {/* Grilla punteada de marca, muy sutil, solo en la mitad derecha */}
        <div className="absolute inset-y-0 right-0 w-1/2 dot-grid text-outlineVariant/50 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        {/* Soft botanical circle behind phones */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60vw] max-w-[680px] aspect-square rounded-full bg-secondaryContainer/20 blur-3xl pointer-events-none" />

        <div className="wrap relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            className="order-2 lg:order-1"
            style={reduce ? undefined : { y: textY }}
            initial={reduce ? false : 'hidden'}
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.span variants={item} className="inline-flex items-center gap-3 font-sans text-label text-secondary tracking-widest mb-5 uppercase">
              <span className="h-px w-8 bg-promoGold" aria-hidden="true" />
              Invitaciones digitales
            </motion.span>

            <motion.h1
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.1 } } }}
              className="font-serif italic font-normal text-primary leading-[0.98] tracking-tight mb-6"
              style={{ fontSize: 'clamp(3.25rem, 8.5vw, 7.5rem)' }}
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

            <motion.p variants={item} className="font-sans text-onSurfaceVariant text-base leading-relaxed max-w-md mb-10">
              Bodas, XV años y baby showers. Creamos una web única para tu evento con cuenta
              regresiva, confirmación y música — todo en un link.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
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

          {/* Dos wrappers separados a propósito: el externo lleva el parallax
              de scroll (y/scale ligados a scrollYProgress), el interno lleva
              la animación de entrada (opacity/scale al montar). Mezclar
              ambas en el mismo elemento hace que el `style` con MotionValue
              gane silenciosamente sobre `initial`/`animate` para esa misma
              propiedad — separarlos evita el conflicto. */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            style={reduce ? undefined : { y: phonesY, scale: phonesScale }}
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="flex gap-6 md:gap-8 items-start"
            >
              <IPhoneMock rotate="-6deg" image="/demos/boda/olivia-ralph/foto-hero.jpg" />
              <IPhoneMock rotate="6deg" marginTop="mt-14" image="/demos/boda/lucia-juan/foto-hero.jpg" />
            </motion.div>
          </motion.div>
        </div>

        {/* Cue de scroll — sutil, desaparece apenas se empieza a scrollear */}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            style={{ opacity: scrollCueOpacity }}
            className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-onSurfaceVariant/50"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.2em]">Descubrí más</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-px h-8 bg-outlineVariant"
            />
          </motion.div>
        )}
      </div>

      {/* Stats band — dark green ground, the signature element */}
      <motion.div
        className="relative bg-primary"
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
              <p className="font-sans text-[10px] uppercase tracking-widest text-primaryFixed/45 mb-0.5">{label}</p>
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

function IPhoneMock({ rotate, marginTop = '', image }) {
  return (
    <div
      style={{ transform: `rotate(${rotate})` }}
      className={`relative w-[148px] sm:w-[168px] aspect-[9/19.5] flex-shrink-0 ${marginTop} transition-transform hover:rotate-0 duration-700`}
    >
      <div className="absolute inset-0 rounded-[2.4rem] bg-gradient-to-br from-[#e7e9ec] via-[#c9cdd3] to-[#9ea3aa] shadow-xl" />
      <div className="absolute inset-[3px] rounded-[2.25rem] bg-black" />
      <div className="absolute inset-[7px] rounded-[2rem] overflow-hidden bg-black">
        <img src={image} alt="Demo invitación de boda" className="w-full h-full object-cover" />
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[34%] h-[18px] bg-black rounded-full z-10" />
      </div>
      <div className="absolute -left-[2px] top-[26%] w-[3px] h-[22px] bg-[#9ea3aa] rounded-l" />
      <div className="absolute -left-[2px] top-[38%] w-[3px] h-[36px] bg-[#9ea3aa] rounded-l" />
      <div className="absolute -right-[2px] top-[30%] w-[3px] h-[46px] bg-[#9ea3aa] rounded-r" />
    </div>
  )
}
