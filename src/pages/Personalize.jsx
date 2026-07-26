import { useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../components/Icon.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import WhatsAppButton from '../components/WhatsAppButton.jsx'
import {
  waLink,
  GOOGLE_SHEETS_URL,
  MAX_COMPROBANTE_MB,
  eventTypeOptions,
  planFeatureFlags,
} from '../data/site.js'

const stepDefs = [
  { key: 'hosts', label: 'Datos', icon: 'person' },
  { key: 'event', label: 'Evento', icon: 'event' },
  { key: 'extras', label: 'Contenido', icon: 'auto_awesome' },
  { key: 'proof', label: 'Comprobante', icon: 'receipt_long' },
]

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result) // incluye "data:<mime>;base64,...."
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function Personalize() {
  const location = useLocation()
  const orderRef = location.state?.orderRef || ''
  const cartSummary = location.state?.cartSummary || []
  const planFromCart = cartSummary[0]?.plan || ''

  const [step, setStep] = useState(0)
  const [data, setData] = useState(() => ({
    plan: planFromCart || 'Standard',
    names: '',
    whatsapp: '',
    email: '',
    eventType: eventTypeOptions[0],
    date: '',
    time: '',
    venue: '',
    address: '',
    mapsLink: '',
    gifts: '',
    dressCode: '',
    playlist: '',
    galleryLink: '',
    videoLink: '',
    customization: '',
  }))
  const [file, setFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done | error
  const fileInputRef = useRef(null)

  const flags = planFeatureFlags(data.plan)
  const update = (field) => (e) => setData((d) => ({ ...d, [field]: e.target.value }))

  const next = () => setStep((s) => Math.min(s + 1, stepDefs.length - 1))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    setFileError('')
    if (!f) return
    if (f.size > MAX_COMPROBANTE_MB * 1024 * 1024) {
      setFileError(`El archivo pesa más de ${MAX_COMPROBANTE_MB}MB. Subí una versión más liviana.`)
      setFile(null)
      return
    }
    setFile(f)
  }

  const summaryMsg = () => `Hola! Ya transferí y quiero confirmar mi invitación.
Referencia: ${orderRef || '-'}
Plan: ${data.plan}
Anfitriones: ${data.names || '-'}
Evento: ${data.eventType} — ${data.date || 'fecha a definir'}
Lugar: ${data.venue || '-'}
${file ? 'Adjunto el comprobante en este mismo chat.' : 'Te mando el comprobante a continuación.'}`

  const submitToSheets = async () => {
    if (!GOOGLE_SHEETS_URL || GOOGLE_SHEETS_URL.includes('TU_SCRIPT_ID_ACA')) {
      // Todavía no se configuró el Web App de Apps Script — no rompemos el flujo,
      // simplemente no intentamos el envío y dejamos que el usuario confirme por WhatsApp.
      return
    }
    setStatus('sending')
    try {
      const comprobanteBase64 = file ? await fileToBase64(file) : null
      const payload = {
        orderRef,
        cartSummary: cartSummary.map((i) => ({ name: i.name, plan: i.plan, price: i.price, qty: i.qty || 1 })),
        ...data,
        comprobanteNombre: file?.name || '',
        comprobanteBase64,
      }
      // Apps Script no siempre responde con headers CORS legibles desde el navegador,
      // por eso usamos no-cors: el request se envía igual (y ahí mismo se dispara el
      // mail de confirmación, ver GOOGLE_APPS_SCRIPT.md), solo no podemos leer la
      // respuesta de vuelta.
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
      setStatus('done')
    } catch (err) {
      console.error('Error enviando a Google Sheets:', err)
      setStatus('error')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < stepDefs.length - 1) {
      next()
      return
    }
    await submitToSheets()
  }

  const finished = status === 'done' || status === 'error'
  const sheetsConfigured = GOOGLE_SHEETS_URL && !GOOGLE_SHEETS_URL.includes('TU_SCRIPT_ID_ACA')

  return (
    <div className="wrap py-12 md:py-20 flex flex-col items-center">
      <header className="text-center mb-16 max-w-2xl">
        <h1 className="font-serif text-headline-lg md:text-display text-primary mb-4">
          Completá los datos de tu invitación
        </h1>
        <p className="font-sans text-onSurfaceVariant italic">
          {orderRef
            ? `Pedido ${orderRef} — cargá los datos de tu evento y subí el comprobante de la transferencia.`
            : 'Cargá los datos de tu evento. Con esta información armamos tu invitación a medida.'}
        </p>
        <div className="ornament mt-6 text-lg">
          <span>✦</span><span>✦</span><span>✦</span>
        </div>
      </header>

      {/* Stepper */}
      <div className="w-full max-w-4xl mb-16">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-outlineVariant -z-10" />
          {stepDefs.map((s, i) => {
            const completed = i < step
            const current = i === step
            return (
              <button
                key={s.key}
                onClick={() => i < step && setStep(i)}
                className="flex flex-col items-center gap-3 bg-background px-3 group"
              >
                <motion.div
                  animate={{
                    backgroundColor: completed ? '#25D366' : current ? '#182317' : '#fbf9f4',
                    color: completed || current ? '#ffffff' : '#444842',
                    borderColor: completed ? '#25D366' : current ? '#C5A059' : '#c4c8bf',
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-sans ${
                    current ? 'ring-2 ring-promoGold ring-offset-2 ring-offset-background' : ''
                  }`}
                >
                  {completed ? <Icon name="check" className="text-base" /> : <span>{i + 1}</span>}
                </motion.div>
                <span className={`font-sans text-label uppercase ${i <= step ? 'text-primary' : 'text-onSurfaceVariant'}`}>
                  {s.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-12">
        <aside className="md:col-span-4 space-y-8">
          <div className="aspect-[3/4] rounded-xl border border-outlineVariant/30 sticky top-32 overflow-hidden bg-gradient-to-br from-[#2a392e] to-[#152419] flex items-end p-6">
            <p className="text-white font-serif italic">Diseñando cada detalle con vos.</p>
          </div>
          {cartSummary.length > 0 && (
            <div className="bg-surfaceContainer p-6 rounded-xl space-y-3 border border-promoGold/30">
              <h3 className="font-serif text-headline-md text-primary text-lg">Tu pedido</h3>
              {cartSummary.map((it) => (
                <div key={it.id} className="flex justify-between text-sm font-sans text-onSurfaceVariant">
                  <span>{it.name}</span>
                  <span>x{it.qty || 1}</span>
                </div>
              ))}
            </div>
          )}
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
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp concierge
            </a>
          </div>
        </aside>

        <form className="md:col-span-8" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {!finished ? (
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
                      {planFromCart ? (
                        <div className="md:col-span-2 flex items-center gap-3 bg-secondaryContainer/40 border border-secondary/30 rounded-xl px-5 py-3">
                          <Icon name="verified" className="text-secondary" />
                          <p className="font-sans text-sm text-onSurfaceVariant">
                            Plan comprado: <strong className="text-primary">{data.plan}</strong>
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2 md:col-span-2">
                          <label className="field-label">Plan elegido</label>
                          <select className="field-input-boxed" value={data.plan} onChange={update('plan')}>
                            <option>Básica</option>
                            <option>Standard</option>
                            <option>Premium</option>
                          </select>
                        </div>
                      )}
                      <div className="flex flex-col gap-2">
                        <label className="field-label">Nombres completos</label>
                        <input className="field-input-boxed" placeholder="Ej: María & Federico" value={data.names} onChange={update('names')} required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="field-label">WhatsApp de contacto</label>
                        <input className="field-input-boxed" placeholder="+54 11 ..." value={data.whatsapp} onChange={update('whatsapp')} required />
                      </div>
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="field-label">Email para confirmaciones</label>
                        <input className="field-input-boxed" placeholder="hola@evento.com" type="email" value={data.email} onChange={update('email')} required />
                        <p className="text-[11px] text-onSurfaceVariant font-sans italic">
                          Te vamos a mandar un mail confirmando que recibimos tu pedido.
                        </p>
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
                          {eventTypeOptions.map((opt) => (
                            <option key={opt}>{opt}</option>
                          ))}
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
                    <p className="font-sans text-xs text-onSurfaceVariant -mt-3">
                      Estos campos cambian según tu plan (<strong>{data.plan}</strong>) — solo pedimos lo que tu
                      invitación va a incluir.
                    </p>

                    <div className="bg-creamSurface p-6 rounded-xl border border-promoGold/50 space-y-4">
                      <label className="field-label">Lista de regalos o alias / CBU</label>
                      <textarea
                        className="field-input-boxed resize-none"
                        rows="3"
                        placeholder="Ingresá los datos para que tus invitados puedan transferir o ver tu lista..."
                        value={data.gifts}
                        onChange={update('gifts')}
                      />
                    </div>

                    {(flags.dressCode || flags.playlist) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {flags.dressCode && (
                          <div className="flex flex-col gap-2">
                            <label className="field-label">Código de vestimenta</label>
                            <input className="field-input-boxed" placeholder="Ej: Elegante sport" value={data.dressCode} onChange={update('dressCode')} />
                          </div>
                        )}
                        {flags.playlist && (
                          <div className="flex flex-col gap-2">
                            <label className="field-label">Música de fondo</label>
                            <input className="field-input-boxed" placeholder="Link a Spotify o géneros..." value={data.playlist} onChange={update('playlist')} />
                          </div>
                        )}
                      </div>
                    )}

                    {flags.gallery && (
                      <div className="flex flex-col gap-2">
                        <label className="field-label">Galería de fotos</label>
                        <input
                          className="field-input-boxed"
                          placeholder="Link a una carpeta de Google Drive o Google Fotos"
                          value={data.galleryLink}
                          onChange={update('galleryLink')}
                        />
                        <p className="text-[10px] text-onSurfaceVariant uppercase tracking-wider mt-1 font-sans">
                          Compartí la carpeta con acceso "cualquiera con el link"
                        </p>
                      </div>
                    )}

                    {flags.video && (
                      <div className="flex flex-col gap-2">
                        <label className="field-label">Link a video (YouTube / Vimeo)</label>
                        <input className="field-input-boxed" placeholder="https://youtube.com/..." value={data.videoLink} onChange={update('videoLink')} />
                        <p className="text-[10px] text-onSurfaceVariant uppercase tracking-wider mt-1 font-sans">
                          Para un video de bienvenida
                        </p>
                      </div>
                    )}

                    {flags.customization && (
                      <div className="flex flex-col gap-2">
                        <label className="field-label">Personalización avanzada</label>
                        <textarea
                          className="field-input-boxed resize-none"
                          rows="3"
                          placeholder="Contanos si querés algo puntual en el diseño: colores, estilo, referencias..."
                          value={data.customization}
                          onChange={update('customization')}
                        />
                      </div>
                    )}
                  </section>
                )}

                {step === 3 && (
                  <section className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Icon name="receipt_long" className="text-secondary" />
                      <h2 className="font-serif text-headline-md text-primary">Comprobante de pago</h2>
                    </div>
                    <p className="font-sans text-onSurfaceVariant text-sm">
                      Subí una foto o captura de pantalla de la transferencia. Aceptamos JPG, PNG o PDF, hasta{' '}
                      {MAX_COMPROBANTE_MB}MB.
                    </p>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-promoGold/60 rounded-xl p-10 flex flex-col items-center justify-center gap-3 hover:bg-surfaceContainerHigh transition-colors cursor-pointer text-center"
                    >
                      <Icon name={file ? 'check_circle' : 'cloud_upload'} className={`text-4xl ${file ? 'text-whatsapp' : 'text-promoGold'}`} />
                      <span className="font-sans text-label text-onSurfaceVariant">
                        {file ? file.name : 'TOCÁ PARA SUBIR EL COMPROBANTE'}
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFile}
                        className="hidden"
                      />
                    </div>
                    {fileError && <p className="text-error text-sm font-sans">{fileError}</p>}
                    {!file && (
                      <p className="text-onSurfaceVariant text-xs font-sans italic">
                        Si preferís, también podés mandarnos el comprobante directo por WhatsApp al confirmar.
                      </p>
                    )}
                  </section>
                )}

                <div className="pt-6 flex flex-col md:flex-row gap-4 items-center justify-end">
                  {step > 0 && (
                    <button type="button" onClick={back} className="text-onSurfaceVariant font-sans text-label px-8 py-4 hover:text-primary transition-colors">
                      Atrás
                    </button>
                  )}
                  <button type="submit" disabled={status === 'sending'} className="w-full md:w-auto btn-primary px-12 py-4 disabled:opacity-60">
                    {status === 'sending'
                      ? 'Enviando...'
                      : step < stepDefs.length - 1
                      ? 'Siguiente paso'
                      : 'Confirmar pedido'}
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
                <div className="w-16 h-16 mx-auto rounded-full bg-whatsapp flex items-center justify-center">
                  <Icon name="check" className="text-2xl text-white" />
                </div>
                <h2 className="font-serif text-headline-lg text-primary">¡Pedido confirmado!</h2>
                <p className="font-sans text-onSurfaceVariant max-w-md mx-auto">
                  {status === 'error'
                    ? 'Guardamos tus datos, pero hubo un problema enviándolos automáticamente. Escribinos por WhatsApp para que no se pierda nada — te respondemos en el día.'
                    : 'Recibimos tu pedido correctamente. En breve nos vamos a comunicar con vos por WhatsApp o email para coordinar los próximos pasos.'}
                </p>
                {status === 'done' && sheetsConfigured && data.email && (
                  <p className="font-sans text-onSurfaceVariant text-sm">
                    Te mandamos un mail de confirmación a <strong className="text-primary">{data.email}</strong>.
                  </p>
                )}
                <p className="font-sans text-onSurfaceVariant text-sm">
                  Si querés adelantarte o ya tenés el comprobante a mano, escribinos ahora:
                </p>
                <WhatsAppButton href={waLink(summaryMsg())} className="mx-auto px-10 py-4 text-base">
                  Confirmar por WhatsApp
                </WhatsAppButton>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  )
}
