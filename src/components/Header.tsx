import InstallButton from './InstallButton'

export default function Header() {
  return (
    <header className='text-center mb-8'>
      <div className='flex items-center justify-center gap-3'>
        <h1 className='text-4xl font-bold font-dyna bg-linear-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-3'>
          Who Knows U
        </h1>
        <InstallButton />
      </div>
      <p className='text-sm text-slate-600 leading-relaxed px-4'>
        Envía mensajes de WhatsApp sin agregar números a tus contactos
      </p>
    </header>
  )
}
