import GitHubStarIcon from '@/icons/GitHubStarIcon'
import ShareIcon from '@/icons/ShareIcon'

interface FooterProps {
  onShareApp?: () => void
}

export default function Footer({ onShareApp }: FooterProps) {
  return (
    <footer className='mt-12 space-y-4 animate-fade-in'>
      <div className='flex flex-col items-center gap-3'>
        <p className='text-sm text-slate-600'>
          Hecho con{' '}
          <span
            className='inline-block animate-pulse'
            role='img'
            aria-label='love'
          >
            ❤️
          </span>{' '}
          por{' '}
          <a
            className='font-semibold text-green-600 hover:text-green-700 transition-colors duration-200'
            href='https://github.com/pipegoods'
            target='_blank'
            rel='noopener noreferrer'
          >
            Andrés Vizcaíno
          </a>
        </p>

        <div className='flex flex-wrap items-center justify-center gap-2 text-xs'>
          <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium'>
            React
          </span>
          <span className='px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium'>
            TypeScript
          </span>
          <span className='px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-medium'>
            Tailwind CSS
          </span>
        </div>
      </div>

      <div className='flex flex-wrap justify-center gap-3 pt-2'>
        {onShareApp && (
          <button
            onClick={onShareApp}
            className='group inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 font-medium text-sm'
            aria-label='Compartir app'
          >
            <ShareIcon className='w-5 h-5 group-hover:scale-110 transition-transform duration-200' />
            <span>Compartir</span>
          </button>
        )}
        <a
          href='https://github.com/pipegoods/who-knows-u'
          target='_blank'
          rel='noopener noreferrer'
          className='group inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 font-medium text-sm'
          aria-label='Star who-knows-u on GitHub'
        >
          <GitHubStarIcon className='w-5 h-5 group-hover:scale-110 transition-transform duration-200' />
          <span>Star on GitHub</span>
        </a>
      </div>
    </footer>
  )
}
