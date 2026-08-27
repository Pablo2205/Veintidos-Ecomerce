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
  { words: ['Cada', 'fiesta', 'empieza'] },
  { words: ['con', 'una', 'gran'], accent: true },
  { words: ['invitación'], accent: true },
]

const word = {
  hidden: { opacity: 0, y: '100%' },
  show: { opacity: 1, y: '0%', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

// Las tres invitaciones que se muestran en el abanico de celulares del Hero.
// Capturas de la portada de cada demo en `public/hero-scroll/`. El del medio
// va al frente; los de los costados quedan rotados detrás.
const fanPhones = [
  { image: '/hero-scroll/walter-rocio.jpg', side: 'left' },
  { image: '/hero-scroll/delfina-lautaro.jpg', side: 'center' },
  { image: '/hero-scroll/julieta-mateo.jpg', side: 'right' },
]

export default function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  // Parallax real ligado al scroll: el "22" de fondo baja más lento que el
  // contenido (sensación de profundidad), el abanico de celulares sube y se
  // achica un poco al salir del viewport. Framer Motion ya es dependencia del
  // proyecto — no se suma ninguna librería nueva para esto.
  const numberY = useTransform(scrollYProgress, [0, 1], [0, 220])
  const numberRotate = useTransform(scrollYProgress, [0, 1], [0, 6])
  const phonesY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const phonesScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  return (
    <section ref={sectionRef} className="relative flex flex-col bg-background">
      <div className="relative flex flex-col items-center pt-14 lg:pt-16">
        {/* Capa de fondo (recortada) — la marca de agua "22", el halo y la
            grilla punteada. Aparte del contenido para que los chips flotantes
            del abanico puedan salirse sin quedar cortados. */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* "22" — firma visual de la marca, con parallax propio. Se repite
              (más chico) en CtaFinal y Footer. */}
          <motion.span
            aria-hidden="true"
            style={{ fontSize: '40vw', ...(reduce ? {} : { y: numberY, rotate: numberRotate }) }}
            className="hidden md:block absolute left-1/2 -top-[9vw] -translate-x-1/2 font-serif italic font-bold text-primary/[0.04] leading-none select-none"
          >
            22
          </motion.span>
          {/* Halo suave detrás del abanico */}
          <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[78vw] max-w-[720px] aspect-square rounded-full bg-secondaryContainer/25 blur-3xl" />
          {/* Grilla punteada, muy sutil, centrada bajo el título */}
          <div className="absolute inset-x-0 top-0 h-[62%] dot-grid text-outlineVariant/40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        </div>

        {/* Texto centrado */}
        <motion.div
          className="wrap relative z-10 flex flex-col items-center text-center"
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

        {/* Abanico de celulares — el del medio al frente, los de los costados
            rotados detrás. Cada pantalla muestra la portada de una invitación
            real. El abanico baja hasta cruzar el borde de la banda verde. */}
        <motion.div
          className="relative z-10 mt-10 lg:mt-12 -mb-16 lg:-mb-24 flex items-end justify-center"
          style={reduce ? undefined : { y: phonesY, scale: phonesScale }}
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex items-end justify-center"
          >
            {fanPhones.map((p) => (
              <PhoneMock key={p.image} {...p} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Stats band — banda verde oscura, elemento firma. Los celulares se
          apoyan sobre su borde superior (de ahí el pt grande). */}
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

// Un celular del abanico. `side` decide rotación, solapamiento y profundidad.
// La pantalla muestra la portada de la demo, fija (`object-top`).
function PhoneMock({ image, side }) {
  const isCenter = side === 'center'
  const layout =
    side === 'left'
      ? '-rotate-[19deg] origin-bottom translate-y-10 -mr-[4.5rem] sm:-mr-24 z-0'
      : side === 'right'
        ? 'rotate-[19deg] origin-bottom translate-y-10 -ml-[4.5rem] sm:-ml-24 z-0'
        : 'z-20'
  const size = isCenter ? 'w-[156px] sm:w-[210px]' : 'w-[140px] sm:w-[184px]'

  return (
    <div
      className={`relative aspect-[9/19.5] flex-shrink-0 ${size} ${layout} ${
        isCenter ? '' : 'opacity-95'
      }`}
    >
      <div className="absolute inset-0 rounded-[2.4rem] bg-gradient-to-br from-[#e7e9ec] via-[#c9cdd3] to-[#9ea3aa] shadow-2xl" />
      <div className="absolute inset-[3px] rounded-[2.25rem] bg-black" />
      <div className="absolute inset-[7px] rounded-[2rem] overflow-hidden bg-black">
        <img
          src={image}
          alt="Portada de una invitación de boda"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-top select-none pointer-events-none"
        />
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[34%] h-[16px] bg-black rounded-full z-10" />
      </div>
      <div className="absolute -left-[2px] top-[30%] w-[3px] h-[38px] bg-[#9ea3aa] rounded-l" />
      <div className="absolute -right-[2px] top-[26%] w-[3px] h-[46px] bg-[#9ea3aa] rounded-r" />
    </div>
  )
}
