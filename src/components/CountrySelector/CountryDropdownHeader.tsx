interface CountryDropdownHeaderProps {
  onClose: () => void
}

export function CountryDropdownHeader({ onClose }: CountryDropdownHeaderProps) {
  return (
    <div className='sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sm:hidden z-10 shrink-0'>
      <h2 className='text-base font-semibold text-gray-900'>
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
        className='p-1 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation focus-ring'
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
  )
}
