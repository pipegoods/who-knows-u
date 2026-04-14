import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { Country } from '@/types'
import { CountryDropdownOverlay } from './CountryDropdownOverlay'
import { CountryDropdownPanel } from './CountryDropdownPanel'
import { CountrySelectorTrigger } from './CountrySelectorTrigger'
import { COUNTRIES } from '@/utils/countryUtils'
import React from 'react'

interface CountrySelectorProps {
  dialCode: string
  onDialCodeChange: (dialCode: string) => void
  countries?: Country[]
  triggerId?: string
}

export default function CountrySelector({
  dialCode,
  onDialCodeChange,
  countries = COUNTRIES,
  triggerId = 'country-selector-trigger',
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const listboxId = 'country-listbox'

  const currentCountry = useMemo(() => {
    return countries.find((c) => c.dial_code === dialCode) || null
  }, [dialCode, countries])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleCountrySelect = useCallback(
    (countryDialCode: string) => {
      onDialCodeChange(countryDialCode)
      setIsOpen(false)
      // Restore focus to trigger after selection
      requestAnimationFrame(() => {
        if (buttonRef.current) {
          buttonRef.current.focus()
        }
      })
    },
    [onDialCodeChange]
  )

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsOpen((prev) => !prev)
    },
    []
  )

  // Cerrar dropdown al redimensionar
  useEffect(() => {
    if (!isOpen) return
    const handleResize = () => {
      setTimeout(() => setIsOpen(false), 0)
    }
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  // Prevenir scroll del body cuando el modal está abierto en mobile
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.innerWidth < 640) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

  // Cerrar al hacer click fuera del dropdown y Escape
  useEffect(() => {
    if (!isOpen) return

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
        // Restore focus to trigger
        requestAnimationFrame(() => {
          if (buttonRef.current) {
            buttonRef.current.focus()
          }
        })
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, handleClose])

  // Focus trap inside dropdown when open
  useEffect(() => {
    if (!isOpen) return
    if (typeof window !== 'undefined' && window.innerWidth >= 640) return

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dropdownRef.current) return

      const focusableElements = dropdownRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isOpen])

  // Focus first focusable element in dropdown when it opens
  useEffect(() => {
    if (!isOpen) return
    const timeoutId = setTimeout(() => {
      const searchInput = dropdownRef.current?.querySelector<HTMLInputElement>('#country-search')
      if (searchInput) {
        searchInput.focus()
      }
    }, 100)
    return () => clearTimeout(timeoutId)
  }, [isOpen])

  return (
    <div className='relative'>
      <CountrySelectorTrigger
        triggerId={triggerId}
        listboxId={listboxId}
        isOpen={isOpen}
        currentCountryImage={currentCountry?.image}
        currentCountryName={currentCountry?.name}
        buttonRef={buttonRef}
        onToggle={handleToggle}
      />
      {isOpen ? (
        <CountryDropdownPanel
          dropdownRef={dropdownRef}
          dialCode={dialCode}
          countries={countries}
          onClose={handleClose}
          onCountrySelect={handleCountrySelect}
          listboxId={listboxId}
        />
      ) : null}
      {isOpen && (
        <CountryDropdownOverlay onClose={handleClose} />
      )}
    </div>
  )
}
