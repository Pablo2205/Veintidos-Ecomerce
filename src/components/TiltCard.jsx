import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Envoltorio de tilt 3D que sigue el mouse — la tarjeta se inclina hacia
 * donde está el cursor, como un objeto físico. Pensado para las tarjetas de
 * Planes (decisión de compra, vale la pena el detalle premium). No pisa
 * ninguna otra animación del hijo: solo agrega rotateX/rotateY + perspectiva
 * en un wrapper propio.
 */
// Acepta y reenvía cualquier prop de motion (`variants`, `whileHover`,
// `initial`, etc.) — así reemplaza directo a un `motion.div` normal, sin
// necesitar un wrapper extra que rompería el tilt (un `display:contents`
// alrededor no tendría caja propia para rotar).
export default function TiltCard({ children, className = '', max = 8, style, ...motionProps }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [max, -max]), { stiffness: 300, damping: 25 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-max, max]), { stiffness: 300, damping: 25 })

  const handleMouseMove = (e) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={reduce ? style : { rotateX, rotateY, transformPerspective: 900, ...style }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
