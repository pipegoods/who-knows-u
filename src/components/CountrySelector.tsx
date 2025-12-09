import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { COUNTRIES_PHONE, getCurrentCountry } from '@/data/countries-phone'
import { useHapticFeedback } from '@/hooks/useHapticFeedback'
import ChevronDownIcon from '@/icons/ChevronDownIcon'

interface CountrySelectorProps {
  dialCode: string
  onDialCodeChange: (dialCode: string) => void
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

  // Cerrar dropdown al redimensionar (solo resize, no scroll)
  useEffect(() => {
    if (!open) return

    const handleResize = () => setOpen(false)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [open])

  // Prevenir scroll del body cuando el modal está abierto en mobile
  useEffect(() => {
    if (open && window.innerWidth < 640) {
      // Solo bloquear scroll en mobile
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [open])

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      light()
      setOpen((prev) => !prev)
    },
    [light]
  )

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
        setOpen(false)
      }
    }

    // Usar timeout para evitar que el click que abre cierre inmediatamente
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }, 0)

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  // Obtener posición del botón para el dropdown en desktop
  const [buttonPosition, setButtonPosition] = useState<{
    top: number
    left: number
    width: number
  } | null>(null)

  useEffect(() => {
    if (open && buttonRef.current) {
      const updatePosition = () => {
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect()
          setButtonPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
          })
        }
      }

      updatePosition()
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)

      return () => {
        window.removeEventListener('scroll', updatePosition, true)
        window.removeEventListener('resize', updatePosition)
      }
    } else {
      setButtonPosition(null)
    }
  }, [open])

  const dropdownContent = open && (
    <>
      {/* Overlay para mobile - se cierra al hacer click */}
      <div
        className='fixed inset-0 bg-black/50 z-[9998] sm:hidden animate-fade-in'
        onClick={handleClose}
        aria-hidden='true'
      />

      {/* Dropdown - Modal en mobile, dropdown en desktop */}
      <div
        ref={dropdownRef}
        className='fixed inset-x-4 bottom-0 sm:fixed sm:inset-x-auto sm:bottom-auto sm:w-96 sm:max-w-md bg-white border-2 border-slate-300 rounded-t-3xl sm:rounded-2xl shadow-2xl sm:shadow-md max-h-[80vh] sm:max-h-96 flex flex-col overflow-hidden z-[9999] animate-slide-up sm:animate-slide-down'
        style={
          buttonPosition
            ? {
                top:
                  window.innerWidth >= 640
                    ? `${buttonPosition.top + 8}px`
                    : undefined,
                left:
                  window.innerWidth >= 640
                    ? `${buttonPosition.left}px`
                    : undefined,
              }
            : undefined
        }
      >
        {/* Header del modal en mobile */}
        <div className='sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sm:hidden z-10 shrink-0'>
          <h2 className='text-base font-semibold text-gray-900'>
            Seleccionar país
          </h2>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleClose()
            }}
            className='p-1 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation'
            aria-label='Cerrar'
          >
            <svg
              className='w-6 h-6 text-gray-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        {/* Contenido con scroll */}
        <div className='p-3 sm:p-3 flex-1 overflow-y-auto overscroll-contain min-h-0'>
          <div className='hidden sm:block text-xs font-semibold text-gray-500 uppercase tracking-wide px-2 mb-2'>
            Seleccionar país
          </div>
          <ul
            className='flex flex-col gap-1.5 sm:gap-1'
            role='listbox'
            aria-label='Lista de países'
          >
            {COUNTRIES_PHONE.map((country) => (
              <li
                key={country.code}
                className={`flex items-center gap-3 p-3 sm:p-2.5 cursor-pointer rounded-xl transition-all duration-150 touch-manipulation active:scale-[0.98] ${
                  dialCode === country.dial_code
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'hover:bg-gray-50 active:bg-gray-100'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleCountrySelect(country.dial_code)
                }}
                role='option'
                aria-selected={dialCode === country.dial_code}
              >
                <img
                  loading='lazy'
                  className='w-8 h-8 sm:w-8 sm:h-8 rounded-sm shadow-sm shrink-0'
                  src={country.image}
                  alt={'Bandera de ' + country.name}
                />
                <span className='flex-1 text-gray-900 text-base sm:text-sm font-medium truncate'>
                  {country.name}
                </span>
                <span className='text-gray-500 text-base sm:text-sm font-semibold shrink-0'>
                  {country.dial_code}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )

  return (
    <>
      <aside className='relative'>
        <section
          ref={buttonRef}
          className='cursor-pointer flex items-center gap-1.5 px-2 py-2 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 touch-manipulation'
          onClick={handleToggle}
          role='button'
          tabIndex={0}
          aria-haspopup='listbox'
          aria-expanded={open}
          aria-label='Seleccionar país'
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              light()
              setOpen((prev) => !prev)
            }
          }}
        >
          <img
            loading='eager'
            className='w-7 h-7 rounded-sm shadow-sm shrink-0'
            src={currentCountry?.image}
            alt={'Bandera de ' + currentCountry?.name}
          />
          <ChevronDownIcon
            className={`w-4 h-4 fill-gray-600 transition-transform duration-200 shrink-0 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </section>
      </aside>
      {typeof document !== 'undefined' &&
        createPortal(dropdownContent, document.body)}
    </>
  )
}
