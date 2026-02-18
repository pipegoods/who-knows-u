import { COUNTRIES_PHONE } from '@/data/countries-phone'
import { CountryListItem } from './CountryListItem'

interface CountryListProps {
  selectedDialCode: string
  onSelect: (dialCode: string) => void
}

export function CountryList({
  selectedDialCode,
  onSelect,
}: CountryListProps) {
  return (
    <div className='p-3 sm:p-3 flex-1 overflow-y-auto overscroll-contain min-h-0'>
      <div className='hidden sm:block text-xs font-semibold text-text-tertiary uppercase tracking-wide px-2 mb-2'>
        Seleccionar país
      </div>
      <ul
        className='flex flex-col gap-1 sm:gap-0.5'
        role='listbox'
        aria-label='Lista de países'
      >
        {COUNTRIES_PHONE.map((country) => (
          <CountryListItem
            key={country.code}
            country={country}
            isSelected={selectedDialCode === country.dial_code}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  )
}
