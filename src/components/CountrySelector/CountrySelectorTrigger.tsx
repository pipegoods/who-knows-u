import ChevronDownIcon from '@/icons/ChevronDownIcon'

interface CountrySelectorTriggerProps {
  isOpen: boolean
  currentCountryImage: string | undefined
  currentCountryName: string | undefined
  buttonRef: React.RefObject<HTMLElement | null>
  onToggle: (e: React.MouseEvent) => void
  onKeyDown: (e: React.KeyboardEvent) => void
}

export function CountrySelectorTrigger({
  isOpen,
  currentCountryImage,
  currentCountryName,
  buttonRef,
  onToggle,
  onKeyDown,
}: CountrySelectorTriggerProps) {
  return (
    <aside className='relative'>
      <section
        ref={buttonRef}
        className={`cursor-pointer flex items-center gap-2 px-2 py-1.5 rounded-lg transition-[background-color,box-shadow] duration-200 touch-manipulation focus-ring ${
          isOpen ? 'bg-surface-elevated glow-inner' : 'hover:bg-surface-elevated'
        }`}
        onClick={onToggle}
        role='button'
        tabIndex={0}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-label='Seleccionar país'
        onKeyDown={onKeyDown}
      >
        <img
          loading='eager'
          className='w-7 h-7 rounded-sm shadow-sm shrink-0'
          src={currentCountryImage}
          alt={'Bandera de ' + (currentCountryName ?? '')}
        />
        <ChevronDownIcon
          className={`w-4 h-4 fill-text-secondary transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden='true'
        />
      </section>
    </aside>
  )
}
