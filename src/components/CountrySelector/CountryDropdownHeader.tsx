interface CountryDropdownHeaderProps {
  onClose: () => void
  onDragStart?: (event: React.TouchEvent) => void
  onDragMove?: (event: React.TouchEvent) => void
  onDragEnd?: () => void
  onDragCancel?: () => void
}

export function CountryDropdownHeader({
  onClose,
  onDragStart,
  onDragMove,
  onDragEnd,
  onDragCancel,
}: CountryDropdownHeaderProps) {
  return (
    <div className='sticky top-0 bg-surface border-b border-border-soft px-4 pt-2 pb-3 sm:p-3 flex flex-col gap-2 sm:hidden z-10 shrink-0'>
      <div
        className='mx-auto h-1.5 w-12 rounded-full bg-border-soft'
        aria-hidden='true'
        onTouchStart={onDragStart}
        onTouchMove={onDragMove}
        onTouchEnd={onDragEnd}
        onTouchCancel={onDragCancel}
      />
      <div className='flex items-center justify-between'>
        <h2 className='text-base font-semibold text-text-primary'>
          Seleccionar país
        </h2>
        <button
          type='button'
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onClose()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onClose()
            }
          }}
          className='p-1 rounded-lg hover:bg-surface-subtle active:bg-surface-elevated transition-colors touch-manipulation focus-ring'
          aria-label='Cerrar'
        >
          <svg
            className='w-6 h-6 text-text-secondary'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'
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
    </div>
  )
}

export default CountryDropdownHeader
