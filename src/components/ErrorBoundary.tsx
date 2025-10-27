import { Component, type ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className='min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-4'>
          <div className='max-w-md w-full text-center space-y-4'>
            <div className='text-6xl mb-4'>😅</div>
            <h1 className='text-2xl font-bold font-dyna text-gray-900 dark:text-white'>
              ¡Ups! Discovery un error
            </h1>
            <p className='text-gray-600 dark:text-gray-400'>
              Algo salió mal, pero no te preocupes. Presiona el botón para
              intentar de nuevo.
            </p>
            {this.state.error && (
              <details className='text-left bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-4'>
                <summary className='cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300'>
                  Detalles técnicos
                </summary>
                <pre className='mt-2 text-xs text-gray-600 dark:text-gray-400 overflow-auto'>
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className='mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-semibold transition-colors duration-200'
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

