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
      disabled={installing}
      aria-busy={installing}
      className='self-start sm:ml-2 inline-flex items-center gap-2 px-3 py-1.5 bg-primary hover:bg-primary-hover active:bg-primary-active text-white rounded-lg text-sm transition-colors duration-150 focus-ring'
      aria-label='Instalar aplicación'
    >
      {installing ? 'Instalando…' : 'Instalar'}
    </button>
  )
}
