import { memo } from 'react'
import CopyIcon from '@/icons/CopyIcon'
import WhatsAppIcon from '@/icons/WhatsAppIcon'
import Button, { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ActionButtonsProps {
  whatsappUrl: string
  onCopy: () => void
  onWhatsAppClick: () => void
  copied: boolean
}

function ActionButtons({
  whatsappUrl,
  onCopy,
  onWhatsAppClick,
  copied,
}: ActionButtonsProps) {
  return (
    <div className='space-y-3 mt-8 w-full'>
      {/* Link styled as button using buttonVariants */}
      <a
        href={whatsappUrl}
        target='_blank'
        rel='noopener noreferrer'
        className={cn(
          buttonVariants({ variant: 'primary', size: 'lg' }),
          'w-full gap-3 tracking-wide group'
        )}
        aria-label='Abrir chat de WhatsApp'
        onClick={onWhatsAppClick}
      >
        <WhatsAppIcon className='w-6 h-6 shrink-0 fill-current transition-transform duration-200 group-hover:scale-110' />
        <span className='whitespace-nowrap'>Abrir chat de WhatsApp</span>
      </a>

      <Button
        onClick={onCopy}
        variant='secondary'
        size='default'
        className='w-full gap-2'
        aria-label={copied ? 'Link copiado al portapapeles' : 'Copiar link al portapapeles'}
      >
        <CopyIcon className='w-5 h-5 shrink-0' />
        <span className='text-sm'>
          {copied ? '¡Copiado!' : 'Copiar link'}
        </span>
      </Button>
    </div>
  )
}

// Memoize component to prevent unnecessary re-renders (rerender-memo)
export default memo(ActionButtons)
