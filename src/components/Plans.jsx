import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
import PriceTag from './PriceTag.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'
import { plans, waLink } from '../data/site.js'

// Una portada de demo real por plan, para que se vea el tipo de invitación
// que trae cada uno. Capturas en `public/plans/` (~460px de ancho):
// Essential → Lucía & Juan (HTML) · Standard → Walter & Rocío · Premium →
// Delfina & Lautaro. Si se cambian, regenerar con el mismo recorte.
const planPhone = {
  Essential: '/plans/essential.jpg',
  Standard: '/plans/standard.jpg',
  Premium: '/plans/premium.jpg',
}

export default function Plans() {
  return (
    <section id="planes" className="py-section bg-background overflow-hidden relative">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondaryContainer/20 rounded-full blur-3xl pointer-events-none" />
      <div className="wrap relative z-10">
        <Reveal className="text-center mb-16 lg:mb-20">
          <p aria-hidden="true" className="ornament mb-4 text-sm">✦</p>
          <p className="font-mono text-label text-secondary uppercase tracking-widest mb-4">Nuestros Planes</p>
          <h2
            className="font-serif italic font-normal text-primary leading-[0.98]"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
          >
            Tu entrada a una invitación <span className="text-secondary">inolvidable</span>
          </h2>
        </Reveal>

        <div className="flex flex-col gap-16 lg:gap-24">
          {plans.map((p, i) => (
            <PlanRow key={p.name} plan={p} phoneRight={i % 2 === 1} />
          ))}
        </div>

        <Reveal delay={0.1} className="mt-20 lg:mt-28">
          <div className="max-w-3xl mx-auto rounded-2xl border-2 border-dashed border-promoGold/50 bg-creamSurface px-8 py-10 text-center">
            <p className="font-mono text-label text-promoGold uppercase tracking-widest mb-3">
              ✦ A tu medida ✦
            </p>
            <h3
              className="font-serif italic font-normal text-primary mb-3"
              style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)' }}
            >
              ¿Querés algo que no está en ningún plan?
            </h3>
            <p className="font-sans text-onSurfaceVariant text-base max-w-xl mx-auto mb-8">
              También hacemos diseños 100% a medida, con funciones especiales creadas
              específicamente para tu evento.
            </p>
            <WhatsAppButton
              href={waLink('Hola! Quiero cotizar un diseño 100% a medida para mi evento.')}
              className="px-10 py-4 text-base"
            >
              Cotizar por WhatsApp
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function PlanRow({ plan, phoneRight }) {
  // El verde de la marca vive acá: Standard sobre verde oscuro (`bg-primary`),
  // Premium sobre el verde un tono más claro (`bg-primaryContainer`), Essential
  // en claro. Mismo criterio de color que tenían las tarjetas viejas.
  const onDark = plan.variant === 'highlight' || plan.variant === 'dark'
  const panel =
    plan.variant === 'highlight'
      ? 'bg-primary'
      : plan.variant === 'dark'
        ? 'bg-primaryContainer'
        : 'bg-white border border-outlineVariant'

  return (
    <Reveal>
      <div className={`rounded-[2rem] ${panel} px-6 py-10 sm:px-10 sm:py-12`}>
        <div
          className={`flex flex-col items-center gap-9 lg:gap-16 lg:justify-center ${
            phoneRight ? 'lg:flex-row-reverse' : 'lg:flex-row'
          }`}
        >
          <PlanPhone image={planPhone[plan.name]} name={plan.name} tilt={phoneRight ? 4 : -4} />

          {/* Texto — pegado al celular */}
          <div className="w-full max-w-lg">
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`font-mono text-label uppercase tracking-widest ${
                  onDark ? 'text-promoGold/80' : 'text-secondary'
                }`}
              >
                Plan
              </span>
              {plan.highlight && (
                <span className="bg-promoGold text-primary px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase font-sans">
                  {plan.highlight}
                </span>
              )}
            </div>

            <h3
              className={`font-serif italic font-normal leading-tight mb-2 ${
                onDark ? 'text-primaryFixed' : 'text-primary'
              }`}
              style={{ fontSize: 'clamp(2rem, 3.6vw, 2.9rem)' }}
            >
              {plan.name}
            </h3>
            <p className={`font-sans text-base mb-6 ${onDark ? 'text-primaryFixed/60' : 'text-onSurfaceVariant'}`}>
              {plan.tagline}
            </p>

            <div className="mb-7">
              <PriceTag price={plan.price} dark={onDark} size="text-4xl sm:text-5xl" />
            </div>

            <ul
              className={`mb-8 ${
                plan.items.length > 6
                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3'
                  : 'space-y-3'
              }`}
            >
              {plan.items.map((it, idx) => {
                const isCumulative = idx === 0 && it.startsWith('Todo lo')
                return (
                  <li
                    key={it}
                    className={`flex items-start gap-2.5 font-sans text-sm ${
                      isCumulative
                        ? onDark
                          ? 'text-promoGold font-semibold'
                          : 'text-primary font-semibold'
                        : onDark
                          ? 'text-primaryFixed/80'
                          : 'text-onSurfaceVariant'
                    }`}
                  >
                    <Icon
                      name={isCumulative ? 'add' : 'check'}
                      className={`scale-[0.7] flex-shrink-0 mt-0.5 ${onDark ? 'text-promoGold/70' : 'text-secondary'}`}
                    />
                    <span>{it}</span>
                  </li>
                )
              })}
            </ul>

            <Link
              to="/catalogo"
              className={`inline-flex px-8 py-3.5 rounded-full font-sans text-sm font-semibold transition-colors ${
                onDark
                  ? 'bg-primaryFixed text-primary hover:bg-white'
                  : 'btn-outline'
              }`}
            >
              Ver invitaciones {plan.name}
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// Marco de celular en CSS (mismo lenguaje que el Hero) con la portada de la
// demo dentro, fija. Leve inclinación que se endereza al pasar el mouse.
function PlanPhone({ image, name, tilt = 0 }) {
  return (
    <div
      style={{ '--tilt': `${tilt}deg` }}
      className="relative w-[208px] sm:w-[262px] aspect-[9/19.5] flex-shrink-0 lg:[transform:rotate(var(--tilt))]"
    >
      <div className="absolute inset-0 rounded-[2.6rem] bg-gradient-to-br from-[#e7e9ec] via-[#c9cdd3] to-[#9ea3aa] shadow-2xl" />
      <div className="absolute inset-[3px] rounded-[2.45rem] bg-black" />
      <div className="absolute inset-[7px] rounded-[2.2rem] overflow-hidden bg-black">
        <img
          src={image}
          alt={`Invitación de ejemplo — plan ${name}`}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-top select-none pointer-events-none"
        />
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[34%] h-[18px] bg-black rounded-full z-10" />
      </div>
      <div className="absolute -left-[2px] top-[30%] w-[3px] h-[38px] bg-[#9ea3aa] rounded-l" />
      <div className="absolute -right-[2px] top-[26%] w-[3px] h-[46px] bg-[#9ea3aa] rounded-r" />
    </div>
  )
}
