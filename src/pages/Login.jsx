import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const MODES = { LOGIN: 'login', SIGNUP: 'signup', RESET: 'reset' }

export default function Login() {
  const { user, loading, firebaseEnabled, signUp, signIn, logOut, resetPassword, resendVerification } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  // Si llegamos acá redirigidos desde el Carrito/Checkout ("iniciá sesión
  // para guardar tu carrito"), volvemos ahí después de loguearse.
  const redirectTo = location.state?.from || '/carrito'

  const [mode, setMode] = useState(MODES.LOGIN)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (error) setError('')
  }

  const switchMode = (next) => {
    setMode(next)
    setError('')
    setNotice('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setNotice('')
    setBusy(true)
    try {
      if (mode === MODES.SIGNUP) {
        if (form.password !== form.confirm) {
          throw new Error('Las contraseñas no coinciden.')
        }
        await signUp(form.name, form.email, form.password)
        setNotice(`Te mandamos un mail a ${form.email} para verificar tu cuenta.`)
        setMode(MODES.LOGIN)
      } else if (mode === MODES.RESET) {
        await resetPassword(form.email)
        setNotice('Si existe una cuenta con ese email, te mandamos instrucciones para recuperar tu contraseña.')
      } else {
        await signIn(form.email, form.password)
        navigate(redirectTo, { replace: true })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return (
      <div className="wrap py-24 text-center">
        <p className="font-sans text-onSurfaceVariant">Cargando...</p>
      </div>
    )
  }

  // --- Ya con sesión iniciada: panel de cuenta en vez de formulario -------
  if (user) {
    return (
      <div className="wrap py-16 md:py-24 max-w-xl">
        <Reveal>
          <p aria-hidden="true" className="ornament mb-4 text-sm justify-start">✦</p>
          <h1 className="font-serif italic text-primary mb-8 leading-[0.95]" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}>
            Mi cuenta
          </h1>
        </Reveal>
        <Reveal delay={0.05} className="bg-surfaceContainer/40 border border-outlineVariant/30 rounded-2xl p-8">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-14 h-14 rounded-full bg-primary text-onPrimary flex items-center justify-center font-serif italic text-2xl flex-shrink-0">
              {(user.displayName || user.email || '?').charAt(0).toUpperCase()}
            </span>
            <div>
              <p className="font-sans font-semibold text-primary">{user.displayName || 'Sin nombre'}</p>
              <p className="font-sans text-sm text-onSurfaceVariant">{user.email}</p>
            </div>
          </div>

          {!user.emailVerified && (
            <div className="mb-6 p-4 rounded-xl bg-promoGold/10 border border-promoGold/30">
              <p className="font-sans text-sm text-primary mb-2">
                Todavía no verificaste tu email. Revisá tu bandeja de entrada (y spam).
              </p>
              <button
                onClick={() => resendVerification().then(() => setNotice('Te reenviamos el mail de verificación.'))}
                className="font-sans text-sm font-semibold text-secondary hover:underline"
              >
                Reenviar mail de verificación
              </button>
            </div>
          )}

          {notice && <p className="font-sans text-sm text-secondary mb-6">{notice}</p>}

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/carrito" className="btn-primary px-6 py-3 text-center text-sm">
              Ver mi carrito guardado
            </Link>
            <button onClick={logOut} className="btn-outline px-6 py-3 text-sm">
              Cerrar sesión
            </button>
          </div>
        </Reveal>
      </div>
    )
  }

  return (
    <div className="wrap py-16 md:py-24 max-w-xl">
      <Reveal>
        <p aria-hidden="true" className="ornament mb-4 text-sm justify-start">✦</p>
        <h1 className="font-serif italic text-primary mb-3 leading-[0.95]" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}>
          {mode === MODES.SIGNUP ? 'Creá tu cuenta' : mode === MODES.RESET ? 'Recuperar contraseña' : 'Iniciar sesión'}
        </h1>
        <p className="font-sans text-onSurfaceVariant mb-10 max-w-md">
          Guardá tu carrito y tus datos para retomar tu invitación cuando quieras, sin volver a
          empezar de cero.
        </p>
      </Reveal>

      {!firebaseEnabled && (
        <Reveal delay={0.02} className="mb-8 p-4 rounded-xl bg-promoGold/10 border border-promoGold/30">
          <p className="font-sans text-sm text-primary">
            Las cuentas todavía se están configurando. Mientras tanto podés seguir armando tu
            invitación y coordinar todo por WhatsApp.
          </p>
        </Reveal>
      )}

      {mode !== MODES.RESET && (
        <Reveal delay={0.03} className="flex gap-2 mb-8 p-1 bg-surfaceContainer/60 rounded-full w-fit">
          <button
            type="button"
            onClick={() => switchMode(MODES.LOGIN)}
            className={`px-5 py-2 rounded-full font-sans text-sm font-semibold transition-colors ${
              mode === MODES.LOGIN ? 'bg-primary text-onPrimary' : 'text-onSurfaceVariant hover:text-primary'
            }`}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            onClick={() => switchMode(MODES.SIGNUP)}
            className={`px-5 py-2 rounded-full font-sans text-sm font-semibold transition-colors ${
              mode === MODES.SIGNUP ? 'bg-primary text-onPrimary' : 'text-onSurfaceVariant hover:text-primary'
            }`}
          >
            Crear cuenta
          </button>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {mode === MODES.SIGNUP && (
            <div>
              <label className="field-label">Nombre</label>
              <input
                className="field-input-boxed"
                placeholder="Ej: María Pérez"
                value={form.name}
                onChange={update('name')}
                autoComplete="name"
                required
              />
            </div>
          )}

          <div>
            <label className="field-label">Email</label>
            <input
              type="email"
              className="field-input-boxed"
              placeholder="tuemail@email.com"
              value={form.email}
              onChange={update('email')}
              autoComplete="email"
              required
            />
          </div>

          {mode !== MODES.RESET && (
            <div>
              <label className="field-label">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="field-input-boxed pr-12"
                  placeholder="Mínimo 8 caracteres"
                  value={form.password}
                  onChange={update('password')}
                  autoComplete={mode === MODES.SIGNUP ? 'new-password' : 'current-password'}
                  minLength={8}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-onSurfaceVariant hover:text-primary"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-xl" />
                </button>
              </div>
            </div>
          )}

          {mode === MODES.SIGNUP && (
            <div>
              <label className="field-label">Repetir contraseña</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="field-input-boxed"
                placeholder="Repetí tu contraseña"
                value={form.confirm}
                onChange={update('confirm')}
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
          )}

          {mode === MODES.LOGIN && (
            <button
              type="button"
              onClick={() => switchMode(MODES.RESET)}
              className="font-sans text-sm text-secondary hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          )}

          {error && <p className="font-sans text-sm text-error">{error}</p>}
          {notice && <p className="font-sans text-sm text-secondary">{notice}</p>}

          <button type="submit" disabled={busy} className="btn-primary px-8 py-4 w-full disabled:opacity-60">
            {busy
              ? 'Un momento...'
              : mode === MODES.SIGNUP
                ? 'Crear cuenta'
                : mode === MODES.RESET
                  ? 'Enviar instrucciones'
                  : 'Iniciar sesión'}
          </button>

          {mode === MODES.RESET && (
            <button
              type="button"
              onClick={() => switchMode(MODES.LOGIN)}
              className="font-sans text-sm text-onSurfaceVariant hover:text-primary block mx-auto"
            >
              Volver a iniciar sesión
            </button>
          )}
        </form>
      </Reveal>
    </div>
  )
}
