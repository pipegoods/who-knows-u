import { memo } from 'react'
import GitHubStarIcon from '@/icons/GitHubStarIcon'
import ShareIcon from '@/icons/ShareIcon'
import Button, { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FooterProps {
  onShareApp?: () => void
}

function Footer({ onShareApp }: FooterProps) {
  return (
    <footer className='mt-8 sm:mt-12 space-y-4 animate-fade-in'>
      <div className='flex flex-col items-center gap-3'>
        <p className='text-xs sm:text-sm text-text-secondary px-2 text-center'>
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
            className='font-semibold text-primary hover:text-primary-hover active:text-primary-active transition-colors duration-200 touch-manipulation focus-ring rounded px-1 -mx-1'
            href='https://github.com/pipegoods'
            target='_blank'
            rel='noopener noreferrer'
          >
            Andrés Vizcaíno
          </a>
        </p>

        <div className='flex flex-wrap items-center justify-center gap-2 text-xs'>
          <span className='px-2.5 sm:px-3 py-1 bg-surface-elevated border border-border-soft text-text-secondary rounded-full font-medium'>
            React
          </span>
          <span className='px-2.5 sm:px-3 py-1 bg-surface-elevated border border-border-soft text-text-secondary rounded-full font-medium'>
            TypeScript
          </span>
          <span className='px-2.5 sm:px-3 py-1 bg-surface-elevated border border-border-soft text-text-secondary rounded-full font-medium'>
            Tailwind CSS
          </span>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row flex-wrap justify-center gap-3 pt-2 px-2'>
        {onShareApp && (
          <Button
            onClick={onShareApp}
            variant='primary'
            size='sm'
            className='w-full sm:w-auto gap-2 group'
            aria-label='Compartir app'
          >
            <ShareIcon className='w-5 h-5 group-hover:scale-110 transition-transform duration-200 shrink-0' />
            <span>Compartir</span>
          </Button>
        )}
        <a
          href='https://github.com/pipegoods/who-knows-u'
          target='_blank'
          rel='noopener noreferrer'
          className={cn(
            buttonVariants({ variant: 'secondary', size: 'sm' }),
            'w-full sm:w-auto gap-2 group'
          )}
          aria-label='Star who-knows-u on GitHub'
        >
          <GitHubStarIcon className='w-5 h-5 group-hover:scale-110 transition-transform duration-200 shrink-0' />
          <span>Star on GitHub</span>
        </a>
      </div>
    </footer>
  )
}

// Memoize component to prevent unnecessary re-renders (rerender-memo)
export default memo(Footer)
