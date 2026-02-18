import {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useReducer,
} from 'react'
import { createPortal } from 'react-dom'
import { getCurrentCountry } from '@/data/countries-phone'
import { useHapticFeedback } from '@/hooks/useHapticFeedback'
import { CountryDropdownOverlay } from './CountryDropdownOverlay'
import { CountryDropdownPanel } from './CountryDropdownPanel'
import { CountrySelectorTrigger } from './CountrySelectorTrigger'

interface CountrySelectorProps {
  dialCode: string
  onDialCodeChange: (dialCode: string) => void
}

type ButtonPosition = {
  top: number
  left: number
  width: number
} | null

type PositionAction =
  | { type: 'reset' }
  | { type: 'update'; position: ButtonPosition }

function positionReducer(
  state: ButtonPosition,
  action: PositionAction
): ButtonPosition {
  switch (action.type) {
    case 'reset':
      return null
    case 'update':
      return action.position
    default:
      return state
  }
}

export default function CountrySelector({
  dialCode,
  onDialCodeChange,
}: CountrySelectorProps) {
  const [open, setOpen] = useState<boolean>(false)
  const { light } = useHapticFeedback()
  const buttonRef = useRef<HTMLElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const currentCountry = useMemo(() => getCurrentCountry(dialCode), [dialCode])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleCountrySelect = useCallback(
    (countryDialCode: string) => {
      light()
      onDialCodeChange(countryDialCode)
      setOpen(false)
    },
    [light, onDialCodeChange]
  )

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      light()
      setOpen((prev) => !prev)
    },
    [light]
  )

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        light()
        setOpen((prev) => !prev)
      }
    },
    [light]
  )

  // Cerrar dropdown al redimensionar
  useEffect(() => {
    if (!open) return
    const handleResize = () => {
      setTimeout(() => setOpen(false), 0)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [open])

  // Prevenir scroll del body cuando el modal está abierto en mobile
  useEffect(() => {
    if (open && typeof window !== 'undefined' && window.innerWidth < 640) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [open])

  // Cerrar al hacer click fuera del dropdown
  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e: Event) => {
      const target = e.target as Node
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        handleClose()
      }
    }

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside, {
        passive: true,
      })
    }, 0)

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open, handleClose])

  // Obtener posición del botón para el dropdown en desktop
  const [buttonPosition, dispatchPosition] = useReducer(positionReducer, null)

  useEffect(() => {
    if (!open) {
      const timeoutId = setTimeout(() => {
        dispatchPosition({ type: 'reset' })
      }, 0)
      return () => clearTimeout(timeoutId)
    }

    if (!buttonRef.current) return

    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        dispatchPosition({
          type: 'update',
          position: {
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
          },
        })
      }
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, {
      passive: true,
      capture: true,
    })
    window.addEventListener('resize', updatePosition, { passive: true })

    return () => {
      window.removeEventListener('scroll', updatePosition, { capture: true })
      window.removeEventListener('resize', updatePosition)
    }
  }, [open])

  const dropdownContent =
    open && (
      <>
        <CountryDropdownOverlay onClose={handleClose} />
        <CountryDropdownPanel
          dropdownRef={dropdownRef}
          buttonPosition={buttonPosition}
          dialCode={dialCode}
          onClose={handleClose}
          onCountrySelect={handleCountrySelect}
        />
      </>
    )

  return (
    <>
      <CountrySelectorTrigger
        isOpen={open}
        currentCountryImage={currentCountry?.image}
        currentCountryName={currentCountry?.name}
        buttonRef={buttonRef}
        onToggle={handleToggle}
        onKeyDown={handleTriggerKeyDown}
      />
      {typeof document !== 'undefined' &&
        createPortal(dropdownContent, document.body)}
    </>
  )
}
