import { memo } from 'react'
import InstallButton from './InstallButton'

// Extract static JSX outside component for better performance (rendering-hoist-jsx)
const HEADER_TITLE = 'Who Knows U'
const HEADER_DESCRIPTION =
  'Envía mensajes de WhatsApp sin agregar números a tus contactos'

function Header() {
  return (
    <header className='mb-5 sm:mb-10'>
      <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4'>
        <h1 className='text-[2.15rem] sm:text-5xl lg:text-6xl font-bold font-dyna text-text-primary tracking-tight text-balance leading-[0.94] sm:leading-[0.98]'>
          {HEADER_TITLE}
        </h1>
        <InstallButton />
      </div>
      <p className='text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl sm:max-w-2xl text-balance'>
        {HEADER_DESCRIPTION}
      </p>
    </header>
  )
}

// Memoize static component (rerender-memo)
export default memo(Header)
