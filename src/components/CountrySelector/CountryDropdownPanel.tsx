import { type RefObject } from 'react'
import { CountryDropdownHeader } from './CountryDropdownHeader'
import { CountryList } from './CountryList'

interface CountryDropdownPanelProps {
  dropdownRef: RefObject<HTMLDivElement | null>
  buttonPosition: { top: number; left: number; width: number } | null
  dialCode: string
  onClose: () => void
  onCountrySelect: (dialCode: string) => void
}

export function CountryDropdownPanel({
  dropdownRef,
  buttonPosition,
  dialCode,
  onClose,
  onCountrySelect,
}: CountryDropdownPanelProps) {
  return (
    <div
      ref={dropdownRef}
      className='fixed inset-x-4 bottom-0 sm:fixed sm:inset-x-auto sm:bottom-auto sm:w-96 sm:max-w-md bg-surface border border-border-soft rounded-t-xl sm:rounded-xl shadow-lg glow-outer max-h-[80vh] sm:max-h-96 flex flex-col overflow-hidden z-[9999] animate-slide-up sm:animate-slide-down focus-ring'
      style={
        buttonPosition
          ? {
              top:
                typeof window !== 'undefined' && window.innerWidth >= 640
                  ? `${buttonPosition.top + 8}px`
                  : undefined,
              left:
                typeof window !== 'undefined' && window.innerWidth >= 640
                  ? `${buttonPosition.left}px`
                  : undefined,
            }
          : undefined
      }
    >
      <CountryDropdownHeader onClose={onClose} />
      <CountryList selectedDialCode={dialCode} onSelect={onCountrySelect} />
    </div>
  )
}
