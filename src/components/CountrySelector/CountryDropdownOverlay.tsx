interface CountryDropdownOverlayProps {
  onClose: () => void
}

export function CountryDropdownOverlay({ onClose }: CountryDropdownOverlayProps) {
  return (
    <div
      role='presentation'
      className='fixed inset-0 bg-black/30 backdrop-blur-[1px] z-40 sm:hidden animate-fade-in cursor-pointer'
      onClick={onClose}
    />
  )
}
