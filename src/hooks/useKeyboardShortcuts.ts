import { useEffect, RefObject } from 'react'
import { useHapticFeedback } from './useHapticFeedback'

interface UseKeyboardShortcutsProps {
  inputRef: RefObject<HTMLInputElement | null>
  onEnterPress: () => void
  isValidPhone: boolean
}

export function useKeyboardShortcuts({
  inputRef,
  onEnterPress,
  isValidPhone,
}: UseKeyboardShortcutsProps) {
  const { light } = useHapticFeedback()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K for quick focus
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        light()
        inputRef.current?.focus()
      }
      // Enter to open WhatsApp
      if (e.key === 'Enter' && isValidPhone && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        onEnterPress()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isValidPhone, inputRef, light, onEnterPress])
}

