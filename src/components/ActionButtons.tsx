import { memo } from 'react'
import CopyIcon from '@/icons/CopyIcon'
import WhatsAppIcon from '@/icons/WhatsAppIcon'
import Button, { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatCountryName } from '@/utils/countryUtils'

interface ActionButtonsProps {
  whatsappUrl: string
  onCopy: () => void
  onWhatsAppClick: () => void
  copied: boolean
  currentCountry?: { name: string; dial_code: string; image: string; code: string }
  onShare: () => void
}

function ActionButtons({
  whatsappUrl,
  onCopy,
  onWhatsAppClick,
  copied,
  currentCountry,
  onShare
}: ActionButtonsProps) {
  return (
    <div className='space-y-4 w-full'>
      {/* Enhanced share buttons */}
      <div className='flex flex-col sm:flex-row gap-3 w-full'>
        <a
          href={whatsappUrl}
          target='_blank'
          rel='noopener noreferrer'
          data-action='whatsapp'
          className={cn(
            buttonVariants({ variant: 'primary', size: 'lg' }),
            'w-full gap-3 tracking-wide group'
          )}
          aria-label={currentCountry
            ? `Abrir chat de WhatsApp con ${formatCountryName(currentCountry.name)}`
            : 'Abrir chat de WhatsApp'
          }
          onClick={onWhatsAppClick}
        >
          <WhatsAppIcon className='w-6 h-6 shrink-0 fill-current transition-transform duration-200 group-hover:scale-110' />
          <span className='text-center leading-tight sm:whitespace-nowrap'>Abrir chat de WhatsApp</span>
        </a>

        <Button
          onClick={onCopy}
          variant='secondary'
          size='default'
          className='w-full gap-2'
          aria-label={copied
            ? 'Link copiado al portapapeles'
            : 'Copiar link al portapapeles'
          }
        >
          <CopyIcon className='w-5 h-5 shrink-0' />
          <span className='text-sm'>
            {copied ? '¡Copiado!' : 'Copiar link'}
          </span>
        </Button>

        <Button
          onClick={onShare}
          size='default'
          className='w-full gap-2'
          aria-label='Compartir en redes'
        >
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 100 2.684m0-2.684l1.56 1.56m-1.56-2.22l-1.56 1.56M12 16a4 4 0 100-8 4 4 0 000 8zm0 0v1.5a2.5 2.5 0 002.5 2.5' />
          </svg>
          <span className='text-sm'>Compartir</span>
        </Button>
      </div>

      {/* Enhanced live region for screen readers */}
      <div
        role='status'
        aria-live='polite'
        aria-atomic='true'
        className='visually-hidden'
      >
        {copied
          ? currentCountry
              ? `Link copiado. Puedes compartir con ${formatCountryName(currentCountry.name)}`
            : 'Link copiado al portapapeles'
          : ''
        }
      </div>
    </div>
  )
}

// Memoize component to prevent unnecessary re-renders
export default memo(ActionButtons)
