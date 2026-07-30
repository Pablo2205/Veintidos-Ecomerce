import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { waLink } from '../data/site.js'
import WhatsAppButton from './WhatsAppButton.jsx'
import demoBoda from '../assets/demo-boda.png'

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const reduce = useReducedMotion()
  return (
    <section className="flex flex-col bg-background">
      {/* Content */}
      <div className="relative min-h-[82vh] flex items-center py-16 lg:py-12 overflow-hidden">
        {/* Soft botanical circle behind phones */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60vw] max-w-[680px] aspect-square rounded-full bg-secondaryContainer/20 blur-3xl pointer-events-none" />

        <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            className="order-2 lg:order-1"
            initial={reduce ? false : 'hidden'}
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.span variants={item} className="inline-block font-sans text-label text-secondary tracking-widest mb-5 uppercase">
              Invitaciones digitales
            </motion.span>

            <motion.h1
              variants={item}
              className="font-serif italic font-normal text-primary leading-[1.05] tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.75rem, 6.5vw, 5.5rem)' }}
            >
              Cada fiesta<br />
              empieza con<br />
              <span className="text-secondary">una gran<br />invitación</span>
            </motion.h1>

            <motion.p variants={item} className="font-sans text-onSurfaceVariant text-base leading-relaxed max-w-md mb-10">
              Bodas y XV años. Creamos una web única para tu evento con cuenta regresiva,
              confirmación y música — todo en un link.
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

          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <div className="flex gap-6 md:gap-8 items-start">
              <IPhoneMock rotate="-6deg" image={demoBoda} />
              <IPhoneMock rotate="6deg" marginTop="mt-14" label="Mis XV" sub="Valentina" gold />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats band — dark green ground, the signature element */}
      <motion.div
        className="bg-primary"
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

function IPhoneMock({ rotate, marginTop = '', label, sub, gold, image }) {
  return (
    <div
      style={{ transform: `rotate(${rotate})` }}
      className={`relative w-[148px] sm:w-[168px] aspect-[9/19.5] flex-shrink-0 ${marginTop} transition-transform hover:rotate-0 duration-700`}
    >
      <div className="absolute inset-0 rounded-[2.4rem] bg-gradient-to-br from-[#e7e9ec] via-[#c9cdd3] to-[#9ea3aa] shadow-xl" />
      <div className="absolute inset-[3px] rounded-[2.25rem] bg-black" />
      <div className="absolute inset-[7px] rounded-[2rem] overflow-hidden bg-black">
        {image ? (
          <img src={image} alt="Demo invitación de boda" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1F2E1C] to-[#3B4A2F] flex flex-col items-center justify-center text-center px-4 gap-2">
            <span className={`text-[9px] tracking-[0.3em] uppercase ${gold ? 'text-promoGold' : 'text-white/70'}`}>
              ✦ ✦ ✦
            </span>
            <p className={`font-serif italic text-base leading-tight ${gold ? 'text-secondaryFixed' : 'text-white'}`}>
              {label}
            </p>
            <p className="font-serif text-white text-xs">{sub}</p>
            <div className="mt-1 flex gap-2 text-[8px] text-white/80 font-sans">
              <span>—d</span><span>—h</span><span>—m</span>
            </div>
          </div>
        )}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[34%] h-[18px] bg-black rounded-full z-10" />
      </div>
      <div className="absolute -left-[2px] top-[26%] w-[3px] h-[22px] bg-[#9ea3aa] rounded-l" />
      <div className="absolute -left-[2px] top-[38%] w-[3px] h-[36px] bg-[#9ea3aa] rounded-l" />
      <div className="absolute -right-[2px] top-[30%] w-[3px] h-[46px] bg-[#9ea3aa] rounded-r" />
    </div>
  )
}
