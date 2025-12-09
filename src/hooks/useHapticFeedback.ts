/**
 * Hook para haptic feedback en dispositivos móviles
 * Usa la API de Vibration cuando está disponible
 */
export function useHapticFeedback() {
  const vibrate = (pattern: number | number[] = 10) => {
    // Verificar si el navegador soporta la API
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(pattern)
      } catch {
        // Silently fail si no se puede vibrar
        if (import.meta.env.DEV) {
          console.debug('Haptic feedback no disponible')
        }
      }
    }
  }

  const light = () => vibrate(5)
  const medium = () => vibrate(10)
  const heavy = () => vibrate(20)
  const success = () => vibrate([10, 50, 10])
  const error = () => vibrate([20, 50, 20, 50, 20])

  return {
    vibrate,
    light,
    medium,
    heavy,
    success,
    error,
  }
}

