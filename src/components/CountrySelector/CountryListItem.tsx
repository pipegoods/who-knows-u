import { forwardRef, memo } from 'react'
import { Country } from '@/types'
import { formatCountryName } from '@/utils/countryUtils'

interface CountryListItemProps {
  country: Country
  optionId: string
  isSelected: boolean
  isActive: boolean
  onSelect: () => void
}

const CountryListItemBase = forwardRef<HTMLLIElement, CountryListItemProps>(
  function CountryListItem({ country, optionId, isSelected, isActive, onSelect }, ref) {
    const handleSelect = () => {
      onSelect()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleSelect()
      }
    }

    return (
      <li
        ref={ref}
        id={optionId}
        className={`flex items-center gap-3 p-3 sm:p-2.5 cursor-pointer rounded-lg transition-[background-color,border-color,box-shadow] duration-150 touch-manipulation active:scale-[0.99] ${
          isSelected
            ? 'bg-primary-light border border-primary-border glow-inner'
            : isActive
            ? 'bg-surface-elevated glow-inner'
            : 'hover:bg-surface-elevated hover:glow-inner active:bg-surface border border-transparent'
        }`}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleSelect()
        }}
        onKeyDown={handleKeyDown}
        role='option'
        aria-selected={isSelected}
        tabIndex={-1}
      >
        <img
          src={country.image}
          alt=''
          width={24}
          height={24}
          className='h-6 w-6 rounded-sm border border-border-soft object-cover shrink-0'
          loading='lazy'
          decoding='async'
        />
        <span className='flex-1 text-text-primary text-base sm:text-sm font-medium truncate'>
          {formatCountryName(country.name)}
        </span>
        <span className='text-text-secondary text-base sm:text-sm font-semibold shrink-0'>
          {country.dial_code}
        </span>
      </li>
    )
  }
)

export const CountryListItem = memo(CountryListItemBase)
