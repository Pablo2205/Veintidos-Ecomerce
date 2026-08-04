import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Línea dorada fina, fija arriba de todo, que se llena con el progreso de
 * scroll de la página entera. Suavizada con spring para que no se sienta
 * robótica. Puramente decorativa (aria-hidden) y no roba clicks (h-[3px]).
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 32, mass: 0.3 })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-promoGold origin-left z-[60] motion-reduce:hidden"
    />
  )
}
