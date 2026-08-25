import { motion, useReducedMotion } from 'framer-motion'

// Composición de 3 dispositivos superpuestos (compu, tablet, celular) mostrando
// la MISMA invitación real, cada uno con su pantalla scrolleando sola en loop
// — la idea es transmitir "tu invitación, perfecta en cualquier pantalla" en
// vez de solo mostrar una captura estática. Las imágenes son full-page
// screenshots reales (bajadas de la demo en vivo), no mockups genéricos.

// Paneo vertical lento dentro de cada pantalla, en loop ida-y-vuelta. Cada
// dispositivo tiene su propia duración a propósito — si laten sincronizados
// se siente mecánico/artificial en vez de tres pantallas scrolleando solas.
function ScrollingScreen({ image, panPx, duration, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <motion.img
        src={image}
        alt="Invitación digital — vista de la demo"
        className="absolute top-0 left-0 w-full h-auto will-change-transform"
        animate={reduce ? undefined : { y: [0, -panPx, -panPx, 0] }}
        transition={
          reduce
            ? undefined
            : { duration, delay, repeat: Infinity, ease: 'easeInOut', times: [0, 0.45, 0.55, 1] }
        }
      />
    </div>
  )
}

export default function DeviceShowcase({ desktopImage, tabletImage, phoneImage }) {
  return (
    <div className="relative w-[280px] h-[320px] sm:w-[440px] sm:h-[380px] lg:w-[520px] lg:h-[430px]">
      {/* Compu — ancla de la composición, atrás-izquierda. Se oculta en
          mobile: a ese tamaño una laptop en miniatura no se lee, mejor
          menos ruido y dejar que el celular sea el protagonista solo. */}
      <div className="hidden md:block absolute left-0 top-8 w-[300px] lg:w-[350px] drop-shadow-2xl">
        <div className="rounded-t-lg bg-gradient-to-b from-[#eceef0] to-[#c9cdd3] p-[9px] pb-[5px]">
          <ScrollingScreen
            image={desktopImage}
            panPx={2450}
            duration={28}
            className="rounded-[2px] aspect-[16/10]"
          />
        </div>
        <div className="relative h-[9px] bg-gradient-to-b from-[#c9cdd3] to-[#9ea3aa] rounded-b-[3px]">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[15%] h-[4px] bg-[#9ea3aa] rounded-b-[3px]" />
        </div>
      </div>

      {/* Tablet — atrás-derecha, separada del celu para que se lea como
          dispositivo propio y no como un recorte detrás del teléfono. */}
      <div className="hidden sm:block absolute right-0 top-0 w-[135px] lg:w-[155px] rotate-[7deg] drop-shadow-xl">
        <div className="rounded-[1.15rem] bg-gradient-to-br from-[#eceef0] via-[#c9cdd3] to-[#9ea3aa] p-[7px]">
          <ScrollingScreen
            image={tabletImage}
            panPx={1550}
            duration={23}
            delay={0.6}
            className="rounded-[0.6rem] aspect-[3/4]"
          />
        </div>
      </div>

      {/* Celular — al frente y al medio, en la costura entre compu y
          tablet — protagonista de la composición, como en el Hero actual. */}
      <div className="absolute left-1/2 -translate-x-1/2 sm:left-[46%] lg:left-[44%] bottom-0 w-[148px] sm:w-[162px] rotate-[-5deg] drop-shadow-2xl">
        <div className="relative rounded-[2.4rem] bg-gradient-to-br from-[#eceef0] via-[#c9cdd3] to-[#9ea3aa] p-[7px]">
          <ScrollingScreen
            image={phoneImage}
            panPx={3100}
            duration={19}
            delay={0.3}
            className="rounded-[2rem] aspect-[9/19.5]"
          />
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[34%] h-[16px] bg-black rounded-full z-10" />
        </div>
      </div>
    </div>
  )
}
