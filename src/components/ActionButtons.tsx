import CopyIcon from '@/icons/CopyIcon'
import WhatsAppIcon from '@/icons/WhatsAppIcon'

interface ActionButtonsProps {
  whatsappUrl: string
  onCopy: () => void
  onWhatsAppClick: () => void
  copied: boolean
}

export default function ActionButtons({
  whatsappUrl,
  onCopy,
  onWhatsAppClick,
  copied,
}: ActionButtonsProps) {
  return (
    <div className='space-y-3 sm:space-y-4 mt-6 w-full'>
      <a
        href={whatsappUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='group w-full inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-lg shadow-green-500/40 hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-semibold text-sm sm:text-base tracking-wide touch-manipulation'
        aria-label='Abrir chat de WhatsApp'
        onClick={onWhatsAppClick}
      >
        <WhatsAppIcon className='w-5 h-5 sm:w-6 sm:h-6 shrink-0 fill-current group-hover:animate-bounce' />
        <span className='whitespace-nowrap'>Abrir chat de WhatsApp</span>
      </a>

      <button
        onClick={onCopy}
        className='w-full flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 rounded-xl font-medium transition-colors duration-200 touch-manipulation'
        aria-label={copied ? 'Link copiado al portapapeles' : 'Copiar link al portapapeles'}
      >
        <CopyIcon className='w-5 h-5 shrink-0' />
        <span className='text-sm sm:text-base'>
          {copied ? '¡Copiado!' : 'Copiar link'}
        </span>
      </button>
    </div>
  )
}
