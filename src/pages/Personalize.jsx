import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../components/Icon.jsx'
import { waLink } from '../data/site.js'

const stepDefs = [
  { key: 'hosts', label: 'Datos', icon: 'person' },
  { key: 'event', label: 'Evento', icon: 'event' },
  { key: 'extras', label: 'Contenido', icon: 'auto_awesome' },
]

const initialData = {
  names: '',
  whatsapp: '',
  email: '',
  eventType: 'Boda',
  date: '',
  time: '',
  venue: '',
  address: '',
  mapsLink: '',
  gifts: '',
  dressCode: '',
  playlist: '',
  videoLink: '',
}

export default function Personalize() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(initialData)
  const [done, setDone] = useState(false)

  const update = (field) => (e) => setData((d) => ({ ...d, [field]: e.target.value }))

  const next = () => setStep((s) => Math.min(s + 1, stepDefs.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step < stepDefs.length - 1) {
      next()
      return
    }
    setDone(true)
  }

  const summary = `Hola! Quiero mi invitación digital.
Anfitriones: ${data.names || '-'}
Evento: ${data.eventType} — ${data.date || 'fecha a definir'}
Lugar: ${data.venue || '-'}`

  return (
    <div className="wrap py-12 md:py-20 flex flex-col items-center">
      <header className="text-center mb-16 max-w-2xl">
        <h1 className="font-serif text-headline-lg md:text-display text-primary mb-4">
          Formulario de personalización
        </h1>
        <p className="font-sans text-onSurfaceVariant italic">
          Cargá los datos de tu evento. Con esta información armamos tu invitación a medida.
        </p>
        <div className="ornament mt-6 text-lg">
          <span>✦</span><span>✦</span><span>✦</span>
        </div>
      </header>

      {/* Stepper */}
      <div className="w-full max-w-4xl mb-16">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-outlineVariant -z-10" />
          {stepDefs.map((s, i) => (
            <button
              key={s.key}
              onClick={() => i < step && setStep(i)}
              className="flex flex-col items-center gap-3 bg-background px-4 group"
            >
              <motion.div
                animate={{
                  backgroundColor: i <= step ? '#182317' : '#fbf9f4',
                  color: i <= step ? '#ffffff' : '#444842',
                  borderColor: i <= step ? '#182317' : '#c4c8bf',
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-sans"
              >
                {i < step ? <Icon name="check" className="text-base" /> : <span>{i + 1}</span>}
              </motion.div>
              <span className={`font-sans text-label uppercase ${i <= step ? 'text-primary' : 'text-onSurfaceVariant'}`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-12">
        <aside className="md:col-span-4 space-y-8">
          <div className="aspect-[3/4] rounded-xl border border-outlineVariant/30 sticky top-32 overflow-hidden bg-gradient-to-br from-[#2a392e] to-[#152419] flex items-end p-6">
            <p className="text-white font-serif italic">Diseñando cada detalle con vos.</p>
          </div>
          <div className="bg-surfaceContainer p-6 rounded-xl space-y-4">
            <h3 className="font-serif text-headline-md text-primary">¿Necesitás ayuda?</h3>
            <p className="font-sans text-onSurfaceVariant text-sm">
              Nuestro equipo de diseño está disponible para asistirte con cualquier duda sobre la carga de datos.
            </p>
            <a
              href={waLink('Hola! Tengo una duda cargando los datos de mi invitación.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-whatsapp font-sans text-label hover:underline"
            >
              <Icon name="chat" /> WhatsApp concierge
            </a>
          </div>
        </aside>

        <form className="md:col-span-8" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-10"
              >
                {step === 0 && (
                  <section className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Icon name="person" className="text-secondary" />
                      <h2 className="font-serif text-headline-md text-primary">Datos de los anfitriones</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="field-label">Nombres completos</label>
                        <input className="field-input-boxed" placeholder="Ej: María & Federico" value={data.names} onChange={update('names')} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="field-label">WhatsApp de contacto</label>
                        <input className="field-input-boxed" placeholder="+54 11 ..." value={data.whatsapp} onChange={update('whatsapp')} />
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="field-label">Email para confirmaciones</label>
                        <input className="field-input-boxed" placeholder="hola@evento.com" type="email" value={data.email} onChange={update('email')} />
                      </div>
                    </div>
                  </section>
                )}

                {step === 1 && (
                  <section className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Icon name="event" className="text-secondary" />
                      <h2 className="font-serif text-headline-md text-primary">Detalles del evento</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="field-label">Tipo de evento</label>
                        <select className="field-input-boxed" value={data.eventType} onChange={update('eventType')}>
                          <option>Boda</option>
                          <option>XV Años</option>
                          <option>Bautismo</option>
                          <option>Cumpleaños</option>
                          <option>Otro</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="field-label">Fecha</label>
                          <input className="field-input-boxed" type="date" value={data.date} onChange={update('date')} />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="field-label">Hora</label>
                          <input className="field-input-boxed" type="time" value={data.time} onChange={update('time')} />
                        </div>
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="field-label">Nombre del salón / lugar</label>
                        <input className="field-input-boxed" placeholder="Ej: Estancia La Linda" value={data.venue} onChange={update('venue')} />
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="field-label">Dirección completa</label>
                        <input className="field-input-boxed" placeholder="Calle 123, Localidad" value={data.address} onChange={update('address')} />
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="field-label">Link a Google Maps</label>
                        <input className="field-input-boxed" placeholder="https://goo.gl/maps/..." value={data.mapsLink} onChange={update('mapsLink')} />
                      </div>
                    </div>
                  </section>
                )}

                {step === 2 && (
                  <section className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Icon name="auto_awesome" className="text-secondary" />
                      <h2 className="font-serif text-headline-md text-primary">Secciones especiales</h2>
                    </div>
                    <div className="bg-creamSurface p-6 rounded-xl border border-secondaryFixed space-y-4">
                      <label className="field-label">Lista de regalos o alias / CBU</label>
                      <textarea
                        className="field-input-boxed resize-none"
                        rows="3"
                        placeholder="Ingresá los datos para que tus invitados puedan transferir o ver tu lista..."
                        value={data.gifts}
                        onChange={update('gifts')}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="field-label">Código de vestimenta</label>
                        <input className="field-input-boxed" placeholder="Ej: Elegante sport" value={data.dressCode} onChange={update('dressCode')} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="field-label">Sugerencias de playlist</label>
                        <input className="field-input-boxed" placeholder="Link a Spotify o géneros..." value={data.playlist} onChange={update('playlist')} />
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="field-label">Link a video (YouTube / Vimeo)</label>
                        <input className="field-input-boxed" placeholder="https://youtube.com/..." value={data.videoLink} onChange={update('videoLink')} />
                        <p className="text-[10px] text-onSurfaceVariant uppercase tracking-wider mt-1 font-sans">
                          Opcional, para un video de bienvenida
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                <div className="pt-6 flex flex-col md:flex-row gap-4 items-center justify-end">
                  {step > 0 && (
                    <button type="button" onClick={back} className="text-onSurfaceVariant font-sans text-label px-8 py-4 hover:text-primary transition-colors">
                      Atrás
                    </button>
                  )}
                  <button type="submit" className="w-full md:w-auto btn-primary px-12 py-4">
                    {step < stepDefs.length - 1 ? 'Siguiente paso' : 'Enviar formulario'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 space-y-6"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-secondaryContainer flex items-center justify-center">
                  <Icon name="check" className="text-2xl text-primary" />
                </div>
                <h2 className="font-serif text-headline-lg text-primary">¡Datos recibidos!</h2>
                <p className="font-sans text-onSurfaceVariant max-w-md mx-auto">
                  Confirmá el envío por WhatsApp y en menos de 72hs hábiles vas a tener la primera versión de tu
                  invitación.
                </p>
                <a
                  href={waLink(summary)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-primary px-10 py-4"
                >
                  <Icon name="chat" filled /> Confirmar por WhatsApp
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  )
}
