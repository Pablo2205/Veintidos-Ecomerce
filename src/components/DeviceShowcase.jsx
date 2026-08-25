import { motion, useReducedMotion } from 'framer-motion'

// Composición de 3 dispositivos superpuestos (compu, tablet, celular) mostrando
// la MISMA invitación real, cada uno con su pantalla scrolleando sola en loop
// — la idea es transmitir "tu invitación, perfecta en cualquier pantalla" en
// vez de solo mostrar una captura estática. Las imágenes son full-page
// screenshots reales (bajadas de la demo en vivo), no mockups genéricos.
// Los 3 dispositivos se muestran SIEMPRE, en todos los tamaños de pantalla
// (achicados en mobile) — nada se oculta.

// Paneo vertical dentro de cada pantalla, ida y vuelta en loop infinito.
// `repeatType="mirror"` hace que frene suave en cada punta (no un salto seco
// al reiniciar). `duration` = tiempo de UN solo recorrido (ida); el ciclo
// completo dura el doble. Cada dispositivo tiene su propia duración a
// propósito — si laten sincronizados se siente mecánico en vez de tres
// pantallas scrolleando solas y a su propio ritmo.
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
    <div className="relative w-[240px] h-[260px] sm:w-[400px] sm:h-[360px] lg:w-[500px] lg:h-[420px]">
      {/* Compu — ancla de la composición, atrás-izquierda. Chica en mobile
          pero siempre presente, nunca oculta. */}
      <div className="absolute left-0 top-2 sm:top-6 lg:top-8 w-[150px] sm:w-[270px] lg:w-[350px] drop-shadow-2xl">
        <div className="rounded-t-lg bg-gradient-to-b from-[#eceef0] to-[#c9cdd3] p-[5px] pb-[3px] sm:p-[9px] sm:pb-[5px]">
          <ScrollingScreen
            image={desktopImage}
            panPx={2000}
            duration={40}
            className="rounded-[2px] aspect-[16/10]"
          />
        </div>
        <div className="relative h-[5px] sm:h-[9px] bg-gradient-to-b from-[#c9cdd3] to-[#9ea3aa] rounded-b-[3px]">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[15%] h-[3px] sm:h-[4px] bg-[#9ea3aa] rounded-b-[3px]" />
        </div>
      </div>

      {/* Tablet — atrás-derecha, separada del celu para que se lea como
          dispositivo propio y no como un recorte detrás del teléfono. */}
      <div className="absolute right-0 top-0 w-[68px] sm:w-[120px] lg:w-[150px] rotate-[7deg] drop-shadow-xl">
        <div className="rounded-[0.6rem] sm:rounded-[1.15rem] bg-gradient-to-br from-[#eceef0] via-[#c9cdd3] to-[#9ea3aa] p-[4px] sm:p-[7px]">
          <ScrollingScreen
            image={tabletImage}
            panPx={1300}
            duration={34}
            delay={0.6}
            className="rounded-[0.3rem] sm:rounded-[0.6rem] aspect-[3/4]"
          />
        </div>
      </div>

      {/* Celular — al frente y al medio, en la costura entre compu y
          tablet — protagonista de la composición. */}
      <div className="absolute left-1/2 -translate-x-1/2 sm:left-[46%] lg:left-[44%] bottom-0 w-[92px] sm:w-[145px] lg:w-[160px] rotate-[-5deg] drop-shadow-2xl">
        <div className="relative rounded-[1.4rem] sm:rounded-[2.4rem] bg-gradient-to-br from-[#eceef0] via-[#c9cdd3] to-[#9ea3aa] p-[4px] sm:p-[7px]">
          <ScrollingScreen
            image={phoneImage}
            panPx={2800}
            duration={42}
            delay={0.3}
            className="rounded-[1.1rem] sm:rounded-[2rem] aspect-[9/19.5]"
          />
          <div className="absolute top-[6px] sm:top-[10px] left-1/2 -translate-x-1/2 w-[34%] h-[9px] sm:h-[16px] bg-black rounded-full z-10" />
        </div>
      </div>
    </div>
  )
}
