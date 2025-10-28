import DarkModeToggle from './DarkModeToggle'

export default function Header() {
  return (
    <>
      <DarkModeToggle />
      <header className='text-center mb-8'>
        <h1 className='text-4xl font-bold font-dyna bg-linear-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-3'>
          Who Knows U
        </h1>
        <p className='text-sm text-slate-600 dark:text-gray-400 leading-relaxed px-4'>
          Envía mensajes de WhatsApp sin agregar números a tus contactos
        </p>
      </header>
    </>
  )
}

