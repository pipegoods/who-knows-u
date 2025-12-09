import { useEffect, useState } from 'react'

// `virtual:pwa-register` is provided by vite-plugin-pwa
// It exposes registerSW which accepts callbacks
import { registerSW } from 'virtual:pwa-register'

export default function UpdateBanner() {
  const [needRefresh, setNeedRefresh] = useState(false)
  const [offlineReady, setOfflineReady] = useState(false)

  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        setNeedRefresh(true)
      },
      onOfflineReady() {
        setOfflineReady(true)
      },
    })

    return () => {
      // no-op: registerSW returns update function but nothing to cleanup here
      void updateSW
    }
  }, [])

  if (!needRefresh && !offlineReady) return null

  return (
    <div className='fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[calc(100%-2rem)] sm:max-w-md px-4 sm:px-0'>
      <div className='px-3 sm:px-4 py-2 bg-slate-900 text-white rounded-full shadow-lg flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3'>
        {needRefresh ? (
          <>
            <span className='text-xs sm:text-sm text-center'>Nueva versión disponible</span>
            <button
              onClick={() => {
                // trigger update by reloading the page — registerSW provides full reload via location.reload
                window.location.reload()
              }}
              className='px-3 py-1.5 sm:py-1 bg-green-500 hover:bg-green-600 active:bg-green-700 rounded-full sm:rounded text-xs sm:text-sm font-medium transition-colors duration-200 touch-manipulation'
            >
              Actualizar
            </button>
          </>
        ) : (
          <span className='text-xs sm:text-sm text-center px-2'>La app está lista para usarse sin conexión</span>
        )}
      </div>
    </div>
  )
}
