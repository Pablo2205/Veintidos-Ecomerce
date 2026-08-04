import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import SocialIcon from '../components/SocialIcon.jsx'
import {
  WA_NUMBER,
  CONTACT_EMAIL,
  CONTACT_LOCATION,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  TIKTOK_URL,
  waLink,
} from '../data/site.js'

const initialForm = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const message = `Hola! Te escribo desde la web de veintidós.
Nombre: ${form.name || '-'}
Email: ${form.email || '-'}
Teléfono: ${form.phone || '-'}
Mensaje: ${form.message || '-'}`

  const handleSubmit = (e) => {
    e.preventDefault()
    window.open(waLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="wrap py-16 md:py-24">
      <Reveal>
        <p aria-hidden="true" className="ornament mb-4 text-sm justify-start">✦</p>
        <h1
          className="font-serif italic text-primary mb-6 leading-[0.95]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
        >
          Contacto
        </h1>
      </Reveal>

      {/* Redes — debajo del título, arriba de todo lo demás */}
      <Reveal delay={0.03} className="mb-14">
        <p className="font-sans text-label text-primary uppercase tracking-widest mb-4">Seguinos</p>
        <div className="flex items-center gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 rounded-full bg-secondaryContainer/50 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors"
          >
            <SocialIcon name="instagram" className="w-5 h-5" />
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-11 h-11 rounded-full bg-secondaryContainer/50 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors"
          >
            <SocialIcon name="facebook" className="w-5 h-5" />
          </a>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="w-11 h-11 rounded-full bg-promoGold/10 flex items-center justify-center text-primary hover:bg-promoGold hover:text-white transition-colors"
          >
            <SocialIcon name="tiktok" className="w-5 h-5" />
          </a>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
        {/* Info de contacto */}
        <Reveal delay={0.05} className="lg:col-span-4 space-y-6">
          <a
            href={waLink('Hola! Te escribo desde la web de veintidós.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-onSurfaceVariant hover:text-primary transition-colors group"
          >
            <span className="w-10 h-10 rounded-full bg-whatsapp/10 flex items-center justify-center flex-shrink-0 group-hover:bg-whatsapp/20 transition-colors">
              <WhatsAppIcon className="w-5 h-5 text-whatsapp" />
            </span>
            <span className="font-sans">+{WA_NUMBER}</span>
          </a>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-4 text-onSurfaceVariant hover:text-primary transition-colors group"
          >
            <span className="w-10 h-10 rounded-full bg-secondaryContainer/50 flex items-center justify-center flex-shrink-0 group-hover:bg-secondaryContainer transition-colors">
              <Icon name="mail" className="text-secondary" />
            </span>
            <span className="font-sans">{CONTACT_EMAIL}</span>
          </a>

          <div className="flex items-center gap-4 text-onSurfaceVariant">
            <span className="w-10 h-10 rounded-full bg-promoGold/10 flex items-center justify-center flex-shrink-0">
              <Icon name="location_on" className="text-promoGold" />
            </span>
            <span className="font-sans">{CONTACT_LOCATION}</span>
          </div>

          <div className="flex items-center gap-4 text-onSurfaceVariant">
            <span className="w-10 h-10 rounded-full bg-secondaryContainer/50 flex items-center justify-center flex-shrink-0">
              <Icon name="schedule" className="text-secondary" />
            </span>
            <span className="font-sans">Respondemos en el día, todos los días</span>
          </div>

          <div className="pt-6 border-t border-outlineVariant/30">
            <p className="font-sans text-sm text-onSurfaceVariant mb-4">
              ¿Preferís ir directo al grano? Escribinos por WhatsApp y te respondemos al toque.
            </p>
            <WhatsAppButton
              href={waLink('Hola! Te escribo desde la web de veintidós.')}
              className="px-6 py-3 text-sm"
              iconClassName="w-4 h-4"
            >
              Escribir por WhatsApp
            </WhatsAppButton>
          </div>
        </Reveal>

        {/* Formulario */}
        <Reveal delay={0.1} className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex flex-col gap-2">
              <label className="field-label">Nombre</label>
              <input
                className="field-input"
                placeholder="ej.: María Pérez"
                value={form.name}
                onChange={update('name')}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="field-label">Email</label>
              <input
                type="email"
                className="field-input"
                placeholder="ej.: tuemail@email.com"
                value={form.email}
                onChange={update('email')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="field-label">Teléfono</label>
              <input
                className="field-input"
                placeholder="ej.: 1123445567"
                value={form.phone}
                onChange={update('phone')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="field-label">Mensaje</label>
              <textarea
                className="field-input resize-none"
                rows="4"
                placeholder="ej.: Tu mensaje"
                value={form.message}
                onChange={update('message')}
                required
              />
            </div>
            {/* Dirige a WhatsApp (abre wa.me al enviar) — por regla del proyecto lleva el
                verde de marca de WhatsApp, no btn-primary (verde institucional). */}
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-bold transition-all active:scale-95 bg-whatsapp text-white hover:brightness-95 px-10 py-4 w-full sm:w-auto"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Enviar por WhatsApp
            </button>
            <p className="text-xs text-onSurfaceVariant font-sans italic">
              Al enviar se abre WhatsApp con tu mensaje ya armado, listo para mandar — no compartimos tus datos con nadie más.
            </p>
          </form>
        </Reveal>
      </div>
    </div>
  )
}
