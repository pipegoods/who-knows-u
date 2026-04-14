import { useState, useCallback, useEffect, useRef } from 'react'
import { Country } from '@/types'
import { CountryListItem } from './CountryListItem'

interface CountryListProps {
  listboxId: string
  selectedDialCode: string
  onSelect: (dialCode: string) => void
  onClose: () => void
  countries: Country[]
}

export function CountryList({
  listboxId,
  selectedDialCode,
  onSelect,
  onClose,
  countries,
}: CountryListProps) {
  const [activeIndex, setActiveIndex] = useState<number>(() => {
    const idx = countries.findIndex((c) => c.dial_code === selectedDialCode)
    return idx >= 0 ? idx : 0
  })
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const selectedIndex = countries.findIndex((country) => country.dial_code === selectedDialCode)
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
  }, [countries, selectedDialCode])

  // Handle arrow key navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const itemCount = countries.length
      if (itemCount === 0) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setActiveIndex((prev) => (prev + 1) % itemCount)
          break
        case 'ArrowUp':
          e.preventDefault()
          setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount)
          break
        case 'Home':
          e.preventDefault()
          setActiveIndex(0)
          break
        case 'End':
          e.preventDefault()
          setActiveIndex(itemCount - 1)
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (countries[activeIndex]) {
            onSelect(countries[activeIndex].dial_code)
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    },
    [activeIndex, onSelect, onClose, countries]
  )

  // Scroll active item into view when it changes
  useEffect(() => {
    const activeElement = itemRefs.current[activeIndex]
    if (activeElement) {
      activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [activeIndex])

  return (
    <div className='p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:p-3 flex-1 overflow-y-auto overscroll-contain min-h-0'>
      <div className='hidden sm:block text-xs font-semibold text-text-tertiary uppercase tracking-wide px-2 mb-2'>
        Seleccionar país
      </div>
      <ul
        id={listboxId}
        className='flex flex-col gap-1 sm:gap-0.5'
        role='listbox'
        aria-label='Lista de países'
        aria-activedescendant={countries[activeIndex] ? getCountryOptionId(countries[activeIndex]) : undefined}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {countries.map((country, index) => (
          <CountryListItem
            key={`${country.code}-${country.dial_code}`}
            ref={(el) => {
              itemRefs.current[index] = el
            }}
            country={country}
            optionId={getCountryOptionId(country)}
            isSelected={country.dial_code === selectedDialCode}
            isActive={index === activeIndex}
            onSelect={() => onSelect(country.dial_code)}
          />
        ))}
      </ul>
    </div>
  )
}

function getCountryOptionId(country: Country): string {
  return `country-option-${country.code.toLowerCase()}`
}
