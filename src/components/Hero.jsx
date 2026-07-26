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
    <section className="relative min-h-[85vh] flex items-center pt-12 md:pt-0 overflow-hidden bg-creamSurface/30">
      <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          className="order-2 lg:order-1"
          initial={reduce ? false : 'hidden'}
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.span variants={item} className="inline-block font-sans text-label text-secondary tracking-widest mb-4 uppercase">
            Invitaciones digitales web
          </motion.span>
          <motion.h1 variants={item} className="font-serif text-display-mobile md:text-display text-primary mb-6">
            Cada fiesta empieza con <br />
            <em className="not-italic font-serif italic font-normal">una gran invitación</em>
          </motion.h1>
          <motion.p variants={item} className="font-sans text-body-lg text-onSurfaceVariant max-w-xl mb-10 leading-relaxed">
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
              Ver demos reales
            </Link>
          </motion.div>
          <motion.div variants={item} className="mt-12 flex items-center gap-8 border-t border-outlineVariant/30 pt-8">
            <div className="flex flex-col">
              <span className="font-bold text-primary font-sans">Confirmaciones</span>
              <span className="text-label text-onSurfaceVariant font-sans">Automáticas</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-primary font-sans">Entrega</span>
              <span className="text-label text-onSurfaceVariant font-sans">3-5 días</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-primary font-sans">QR Ready</span>
              <span className="text-label text-onSurfaceVariant font-sans">Para imprimir</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative order-1 lg:order-2 flex justify-center"
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <div className="relative w-full max-w-[480px]">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondaryContainer rounded-full blur-3xl opacity-30" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primaryFixed rounded-full blur-3xl opacity-30" />
            <div className="relative z-10 flex gap-8 md:gap-10 justify-center items-center">
              <IPhoneMock rotate="-6deg" image={demoBoda} />
              <IPhoneMock rotate="6deg" marginTop="mt-12" label="Mis XV" sub="Valentina" gold />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function IPhoneMock({ rotate, marginTop = '', label, sub, gold, image }) {
  return (
    <div
      style={{ transform: `rotate(${rotate})` }}
      className={`relative w-[150px] sm:w-[172px] aspect-[9/19.5] flex-shrink-0 ${marginTop} transition-transform hover:rotate-0 duration-700`}
    >
      {/* Marco plateado (iPhone) */}
      <div className="absolute inset-0 rounded-[2.4rem] bg-gradient-to-br from-[#e7e9ec] via-[#c9cdd3] to-[#9ea3aa] shadow-xl" />
      {/* Bisel interno negro */}
      <div className="absolute inset-[3px] rounded-[2.25rem] bg-black" />
      {/* Pantalla */}
      <div className="absolute inset-[7px] rounded-[2rem] overflow-hidden bg-black">
        {image ? (
          <img src={image} alt="Demo real de invitación de boda" className="w-full h-full object-cover" />
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
        {/* Dynamic island */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[34%] h-[18px] bg-black rounded-full z-10" />
      </div>
      {/* Botones laterales */}
      <div className="absolute -left-[2px] top-[26%] w-[3px] h-[22px] bg-[#9ea3aa] rounded-l" />
      <div className="absolute -left-[2px] top-[38%] w-[3px] h-[36px] bg-[#9ea3aa] rounded-l" />
      <div className="absolute -right-[2px] top-[30%] w-[3px] h-[46px] bg-[#9ea3aa] rounded-r" />
    </div>
  )
}
