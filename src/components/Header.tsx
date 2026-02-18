import { memo } from 'react'
import InstallButton from './InstallButton'

// Extract static JSX outside component for better performance (rendering-hoist-jsx)
const HEADER_TITLE = 'Who Knows U'
const HEADER_DESCRIPTION =
  'Envía mensajes de WhatsApp sin agregar números a tus contactos'

function Header() {
  return (
    <header className='text-center mb-8 sm:mb-12'>
      <div className='flex items-center justify-center gap-3 mb-4'>
        <h1 className='text-4xl sm:text-5xl font-bold font-dyna text-gradient tracking-tight text-balance'>
          {HEADER_TITLE}
        </h1>
        <InstallButton />
      </div>
      <p className='text-sm sm:text-base text-text-secondary leading-relaxed px-4 max-w-md mx-auto text-balance'>
        {HEADER_DESCRIPTION}
      </p>
    </header>
  )
}

// Memoize static component (rerender-memo)
export default memo(Header)
