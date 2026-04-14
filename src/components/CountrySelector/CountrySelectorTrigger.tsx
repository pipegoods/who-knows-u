import ChevronDownIcon from '@/icons/ChevronDownIcon'
import { formatCountryName } from '@/utils/countryUtils'

interface CountrySelectorTriggerProps {
  triggerId: string
  listboxId: string
  isOpen: boolean
  currentCountryImage: string | undefined
  currentCountryName: string | undefined
  buttonRef: React.RefObject<HTMLButtonElement | null>
  onToggle: (e: React.MouseEvent) => void
}

export function CountrySelectorTrigger({
  triggerId,
  listboxId,
  isOpen,
  currentCountryImage,
  currentCountryName,
  buttonRef,
  onToggle,
}: CountrySelectorTriggerProps) {
  return (
    <button
        id={triggerId}
      ref={buttonRef}
      type='button'
      className={`cursor-pointer flex items-center gap-2 px-3 py-2.5 rounded-lg transition-[background-color,box-shadow] duration-200 touch-manipulation focus-ring border border-border-soft w-full justify-between ${
        isOpen ? 'bg-surface-elevated glow-inner' : 'hover:bg-surface-elevated bg-surface'
      }`}
      onClick={onToggle}
      aria-haspopup='listbox'
        aria-controls={listboxId}
      aria-expanded={isOpen}
      aria-label='Seleccionar país'
    >
      <span className='flex items-center gap-2'>
        {currentCountryImage ? (
          <img
            src={currentCountryImage}
            alt=''
            width={24}
            height={24}
            className='h-6 w-6 rounded-sm border border-border-soft object-cover shrink-0'
            loading='lazy'
            decoding='async'
          />
        ) : (
          <span className='inline-flex items-center justify-center h-6 w-6 rounded-full border border-border-soft bg-surface-subtle shrink-0'>
            <svg className='h-3.5 w-3.5 text-text-secondary' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M3 12h18M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9Z' />
            </svg>
          </span>
        )}
        <span className='text-sm font-medium text-text-secondary'>
          {currentCountryName ? formatCountryName(currentCountryName) : 'País'}
        </span>
      </span>
      <ChevronDownIcon
        className={`w-4 h-4 fill-text-secondary transition-transform duration-200 shrink-0 ${
          isOpen ? 'rotate-180' : ''
        }`}
        aria-hidden='true'
      />
    </button>
  )
}
