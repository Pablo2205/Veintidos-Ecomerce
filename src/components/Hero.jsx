import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { waLink } from '../data/site.js'

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
            Bodas, XV años y grandes festejos. Creamos una web única para tu evento con cuenta regresiva,
            confirmación y música — todo en un link.
          </motion.p>
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
            <a
              href={waLink('Hola! Quiero información sobre las invitaciones digitales.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-8 py-4 text-center"
            >
              Consultar por WhatsApp
            </a>
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
          <div className="relative w-full max-w-[500px]">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-secondaryContainer rounded-full blur-3xl opacity-30" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primaryFixed rounded-full blur-3xl opacity-30" />
            <div className="relative z-10 flex gap-4 md:gap-6 justify-center">
              <PhoneCard
                rotate="-6deg"
                gradient="from-[#3C5F41] to-[#8FB996]"
                label="¡Nos casamos!"
                sub="Camila & Agustín"
              />
              <PhoneCard
                rotate="6deg"
                marginTop="mt-12"
                gradient="from-[#1F2E1C] to-[#3B4A2F]"
                gold
                label="Mis XV"
                sub="Valentina"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PhoneCard({ rotate, marginTop = '', gradient, gold, label, sub }) {
  return (
    <div
      style={{ transform: `rotate(${rotate})` }}
      className={`w-1/2 aspect-[9/19] rounded-[2.5rem] bg-surfaceContainer overflow-hidden border-[6px] border-primary ${marginTop} transition-transform hover:rotate-0 duration-700 shadow-xl`}
    >
      <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center text-center px-4 gap-3`}>
        <span className={`text-[10px] tracking-[0.3em] uppercase ${gold ? 'text-promoGold' : 'text-white/70'}`}>✦ ✦ ✦</span>
        <p className={`font-serif italic text-lg leading-tight ${gold ? 'text-secondaryFixed' : 'text-white'}`}>{label}</p>
        <p className="font-serif text-white text-sm">{sub}</p>
        <div className="mt-2 flex gap-2 text-[9px] text-white/80 font-sans">
          <span>—d</span><span>—h</span><span>—m</span>
        </div>
      </div>
    </div>
  )
}
