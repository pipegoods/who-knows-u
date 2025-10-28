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
    <div className='space-y-3 mt-6 w-full'>
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-lg shadow-green-500/40 hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-semibold text-base tracking-wide'
        aria-label='Abrir chat de WhatsApp'
        onClick={onWhatsAppClick}
      >
        <WhatsAppIcon className='w-6 h-6 shrink-0 fill-current group-hover:animate-bounce' />
        <span className='whitespace-nowrap'>Abrir chat de WhatsApp</span>
      </a>

      {/* Copy Button */}
      <button
        onClick={onCopy}
        className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 text-slate-700 dark:text-gray-300 rounded-xl font-medium transition-colors duration-200'
      >
        <CopyIcon className='w-5 h-5' />
        <span className='text-sm'>{copied ? '¡Copiado!' : 'Copiar link'}</span>
      </button>
    </div>
  )
}
