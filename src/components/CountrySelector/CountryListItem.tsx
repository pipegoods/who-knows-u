interface CountryListItemProps {
  country: CountryFlag
  isSelected: boolean
  onSelect: (dialCode: string) => void
}

export function CountryListItem({
  country,
  isSelected,
  onSelect,
}: CountryListItemProps) {
  const handleSelect = () => {
    onSelect(country.dial_code)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSelect()
    }
  }

  return (
    <li
      className={`flex items-center gap-3 p-3 sm:p-2.5 cursor-pointer rounded-lg transition-[background-color,border-color,box-shadow] duration-150 touch-manipulation active:scale-[0.99] focus-ring ${
        isSelected
          ? 'bg-primary-light border border-primary-border glow-inner'
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
      tabIndex={0}
    >
      <img
        loading='lazy'
        className='w-8 h-8 sm:w-8 sm:h-8 rounded-sm shadow-sm shrink-0'
        src={country.image}
        alt={'Bandera de ' + country.name}
      />
      <span className='flex-1 text-text-primary text-base sm:text-sm font-medium truncate'>
        {country.name}
      </span>
      <span className='text-text-secondary text-base sm:text-sm font-semibold shrink-0'>
        {country.dial_code}
      </span>
    </li>
  )
}
