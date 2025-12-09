import { useEffect, useState, useCallback } from 'react'

// Minimal typing for the beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

export function useBeforeInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    function handler(e: Event) {
      const ev = e as BeforeInstallPromptEvent
      // Prevent the automatic mini-infobar on mobile
      ev.preventDefault?.()
      setDeferredPrompt(ev)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return null
    try {
      await deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice
      setDeferredPrompt(null)
      return choice
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Install prompt failed', err)
      }
      setDeferredPrompt(null)
      return null
    }
  }, [deferredPrompt])

  return { deferredPrompt, promptInstall }
}
