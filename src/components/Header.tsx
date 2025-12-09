import InstallButton from './InstallButton'

export default function Header() {
  return (
    <header className='text-center mb-6 sm:mb-8'>
      <div className='flex items-center justify-center gap-2 sm:gap-3'>
        <h1 className='text-3xl sm:text-4xl font-bold font-dyna bg-linear-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-2 sm:mb-3'>
          Who Knows U
        </h1>
        <InstallButton />
      </div>
      <p className='text-xs sm:text-sm text-slate-600 leading-relaxed px-2 sm:px-4'>
        Envía mensajes de WhatsApp sin agregar números a tus contactos
      </p>
    </header>
  )
}
