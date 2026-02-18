interface CountryDropdownOverlayProps {
  onClose: () => void
}

export function CountryDropdownOverlay({ onClose }: CountryDropdownOverlayProps) {
  return (
    <button
      type='button'
      className='fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] sm:hidden animate-fade-in border-0 p-0 cursor-pointer'
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClose()
        }
      }}
      aria-label='Cerrar selector de país'
    />
  )
}
