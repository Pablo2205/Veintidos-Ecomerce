import { motion, useReducedMotion } from 'framer-motion'

// Composición de 3 dispositivos mostrando la MISMA invitación real, cada
// pantalla con un paneo vertical sutil en loop. Estructura calcada de la
// referencia (Paste): laptop al centro casi sin rotar, celular superpuesto
// adelante, tablet apenas asomando atrás — un solo objeto prolijo, no un
// collage de mockups tirados con rotaciones fuertes. Las imágenes son
// screenshots reales recortados a la parte más prolija de la demo (el
// hero), no la página completa — evita que el paneo cruce por secciones
// oscuras/densas que se ven mal en un mockup chico.

function ScrollingScreen({ image, panPx, duration, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <motion.img
        src={image}
        alt="Invitación digital — vista de la demo"
        className="absolute top-0 left-0 w-full h-auto will-change-transform"
        animate={reduce ? undefined : { y: [0, -panPx] }}
        transition={
          reduce
            ? undefined
            : { duration, delay, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
        }
      />
    </div>
  )
}

export default function DeviceShowcase({ desktopImage, tabletImage, phoneImage }) {
  return (
    <div className="relative w-[230px] h-[190px] sm:w-[390px] sm:h-[280px] lg:w-[470px] lg:h-[320px]">
      {/* Tablet — atrás, apenas asomando del lado izquierdo. Solo aporta
          profundidad ("ecosistema"), no compite por atención. */}
      <div className="absolute left-0 top-3 sm:top-4 w-[62px] sm:w-[105px] lg:w-[125px] rotate-[3deg] drop-shadow-lg">
        <div className="rounded-[0.5rem] sm:rounded-[0.9rem] bg-[#e8e8ea] p-[4px] sm:p-[6px]">
          <ScrollingScreen
            image={tabletImage}
            panPx={135}
            duration={13}
            delay={0.4}
            className="rounded-[0.25rem] sm:rounded-[0.5rem] aspect-[3/4]"
          />
        </div>
      </div>

      {/* Laptop — el ancla de la composición, centrada, casi sin rotar. */}
      <div className="absolute left-[13%] sm:left-[9%] top-0 w-[150px] sm:w-[280px] lg:w-[345px] drop-shadow-2xl">
        <div className="rounded-t-md bg-[#e8e8ea] p-[6px] pb-[3px] sm:p-[9px] sm:pb-[5px]">
          <ScrollingScreen
            image={desktopImage}
            panPx={190}
            duration={15}
            className="rounded-[2px] aspect-[16/10]"
          />
        </div>
        <div className="h-[5px] sm:h-[8px] bg-[#c7c8cb] rounded-b-[3px]" />
      </div>

      {/* Celular — al frente, superpuesto sobre la esquina de la laptop,
          apenas inclinado. Protagonista de la composición. */}
      <div className="absolute right-0 bottom-0 w-[78px] sm:w-[125px] lg:w-[142px] rotate-[-3deg] drop-shadow-2xl">
        <div className="relative rounded-[1.1rem] sm:rounded-[1.8rem] bg-[#e8e8ea] p-[4px] sm:p-[6px]">
          <ScrollingScreen
            image={phoneImage}
            panPx={480}
            duration={20}
            delay={0.2}
            className="rounded-[0.85rem] sm:rounded-[1.5rem] aspect-[9/19.5]"
          />
          <div className="absolute top-[6px] sm:top-[9px] left-1/2 -translate-x-1/2 w-[32%] h-[8px] sm:h-[14px] bg-black rounded-full z-10" />
        </div>
      </div>
    </div>
  )
}
