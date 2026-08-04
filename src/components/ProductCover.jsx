import { useState } from 'react'

/**
 * Portada de un producto: la foto real de la demo si existe y carga bien;
 * si no hay `image` o falla la carga, cae al degradé de color de siempre.
 * Compartido por Catalog, Cart, Checkout y Personalize — antes cada uno
 * mostraba su propio bloque de color liso en vez de la invitación que el
 * cliente realmente compró (regla nueva: siempre mostrar el diseño real).
 *
 * OJO: no agrega `relative` acá — el className del caller siempre tiene que
 * incluir su propio `position` (`relative` o `absolute inset-0`). Tenerlo
 * hardcodeado acá generaba dos utilities de `position` compitiendo en el
 * mismo elemento cuando el caller pasaba `absolute` (Catalog/Personalize),
 * y ganaba la que Tailwind emite después en su hoja de estilos — no la que
 * aparece último en el string de clases. Resultado: la portada colapsaba y
 * no se veía ni la foto ni el degradé de respaldo.
 */
export default function ProductCover({ image, gradient, name, className = '' }) {
  const [broken, setBroken] = useState(false)
  const showImage = image && !broken
  return (
    <div className={`overflow-hidden ${className} ${showImage ? '' : `bg-gradient-to-br ${gradient || 'from-secondaryContainer to-primaryContainer'}`}`}>
      {showImage ? (
        <img
          src={image}
          alt={name}
          onError={() => setBroken(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        name && (
          <span className="absolute inset-0 flex items-center justify-center font-serif italic text-white/90 text-sm px-3 text-center">
            {name}
          </span>
        )
      )}
    </div>
  )
}
