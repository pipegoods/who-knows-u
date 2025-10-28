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
    <div className='fixed top-4 left-1/2 -translate-x-1/2 z-50'>
      <div className='px-4 py-2 bg-slate-900 text-white rounded-full shadow-lg flex items-center gap-3'>
        {needRefresh ? (
          <>
            <span>Nueva versión disponible</span>
            <button
              onClick={() => {
                // trigger update by reloading the page — registerSW provides full reload via location.reload
                window.location.reload()
              }}
              className='ml-2 px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-sm'
            >
              Actualizar
            </button>
          </>
        ) : (
          <span>La app está lista para usarse sin conexión</span>
        )}
      </div>
    </div>
  )
}
