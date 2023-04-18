export default function Footer() {
  return (
    <footer className='max-w-max mx-auto mt-5'>
      <p className='text-gray-500 text-sm'>
        proyecto hecho con <span className='text-red-500'>❤</span> por{' '}
        <a
          className='text-blue-500'
          href='https://github.com/pipegoods'
          target='_blank'
          rel='noreferrer'
        >
          Andrés Vizcaíno
        </a>
      </p>

      <p className='text-gray-500 text-xs mt-2'>
        Desarrollado con React, TS y Tailwind CSS
      </p>
    </footer>
  )
}
