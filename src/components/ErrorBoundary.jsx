import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // Esto queda en la consola del navegador (F12 → Console) — es lo primero
    // que hay que mirar si la página se traba: el mensaje exacto aparece acá.
    console.error('Error atrapado por ErrorBoundary:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="text-center max-w-md space-y-6">
            <h1 className="font-serif text-2xl text-primary">Algo se rompió en esta sección</h1>
            <p className="font-sans text-onSurfaceVariant text-sm">
              {this.state.error?.message || 'Error desconocido.'}
            </p>
            <button
              onClick={this.handleReset}
              className="btn-primary px-8 py-3 inline-block"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
