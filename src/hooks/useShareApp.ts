import { useCallback } from 'react'
import { useHapticFeedback } from './useHapticFeedback'
import { useCopyToClipboard } from './useCopyToClipboard'
import { shareApp } from '@/utils/whatsapp'

const APP_URL = 'https://who.pipegoods.dev'

export function useShareApp() {
  const { light } = useHapticFeedback()
  const { copy } = useCopyToClipboard()

  const handleShare = useCallback(async () => {
    light()

    const shared = await shareApp()
    if (!shared) {
      // Fallback: copy app URL
      copy(APP_URL)
    }
  }, [copy, light])

  return { handleShare }
}

