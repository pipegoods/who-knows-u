import { useState } from 'react'
import { useBeforeInstallPrompt } from '@/hooks/useBeforeInstallPrompt'

export default function InstallButton() {
  const { deferredPrompt, promptInstall } = useBeforeInstallPrompt()
  const [installing, setInstalling] = useState(false)

  if (!deferredPrompt) return null

  return (
    <button
      onClick={async () => {
        setInstalling(true)
        await promptInstall()
        setInstalling(false)
      }}
      className='ml-2 inline-flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors duration-150'
      aria-label='Instalar aplicación'
    >
      {installing ? 'Instalando...' : 'Instalar'}
    </button>
  )
}
