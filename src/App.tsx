import {
  useState,
  useMemo,
  useCallback,
  lazy,
  Suspense,
  useEffect,
  useRef,
} from 'react'
import { COUNTRY_CO } from '@/data/countries-phone'
import PhoneInput from '@/components/PhoneInput'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { validatePhone } from '@/utils/validateNumberPhone'
import { useHapticFeedback } from '@/hooks/useHapticFeedback'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { useDarkMode } from '@/hooks/useDarkMode'
import WhatsAppIcon from '@/icons/WhatsAppIcon'
import CopyIcon from '@/icons/CopyIcon'
import ShareIcon from '@/icons/ShareIcon'
import DarkModeIcon from '@/icons/DarkModeIcon'
import LightModeIcon from '@/icons/LightModeIcon'

const Footer = lazy(() => import('@/components/Footer'))

export const API_WHATSAPP_URL = 'https://api.whatsapp.com/send?phone='
const APP_URL = 'https://who-knows-u.vercel.app'

export default function App() {
  const [phone, setPhone] = useState<Phone>({
    dialCode: COUNTRY_CO.dial_code,
    number: '',
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const { success, light } = useHapticFeedback()
  const { copy, copied } = useCopyToClipboard()
  const { isDark, toggle: toggleDarkMode } = useDarkMode()

  const removePlus = useCallback((dialCode: string) => {
    return dialCode.replace('+', '')
  }, [])

  const whatsappUrl = useMemo(() => {
    if (!validatePhone(phone.number)) return ''
    return `${API_WHATSAPP_URL}${removePlus(phone.dialCode)}${phone.number}`
  }, [phone, removePlus])

  const isValidPhone = useMemo(
    () => validatePhone(phone.number),
    [phone.number]
  )

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K for quick focus
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        light()
        inputRef.current?.focus()
      }
      // Enter to open WhatsApp
      if (e.key === 'Enter' && isValidPhone && !e.ctrlKey && !e.metaKey) {
        window.open(whatsappUrl, '_blank')
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isValidPhone, whatsappUrl, light])

  const handleCopyLink = useCallback(() => {
    light()
    copy(whatsappUrl)
  }, [copy, whatsappUrl, light])

  const handleShareApp = useCallback(async () => {
    light()
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Who Knows U',
          text: 'Envía mensajes de WhatsApp sin agregar números a tus contactos',
          url: APP_URL,
        })
      } catch (error) {
        // User cancelled or error
        console.log('Share cancelled')
      }
    } else {
      // Fallback: copy app URL
      copy(APP_URL)
    }
  }, [copy, light])

  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900'>
      <div className='container px-4 grid place-content-center min-h-screen mx-auto max-w-md py-8 relative'>
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className='absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200 z-10'
          aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
          {isDark ? (
            <LightModeIcon className='w-6 h-6 text-yellow-500' />
          ) : (
            <DarkModeIcon className='w-6 h-6 text-gray-700' />
          )}
        </button>

        {/* Header Section */}
        <header className='text-center mb-8'>
          <h1 className='text-4xl font-bold font-dyna bg-linear-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-3'>
            Who Knows U
          </h1>
          <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed px-4'>
            Envía mensajes de WhatsApp sin agregar números a tus contactos
          </p>
        </header>

        {/* Input Section */}
        <section className='w-full' aria-label='Formulario de ingreso'>
          <PhoneInput phone={phone} onPhoneChange={setPhone} inputRef={inputRef} />
        </section>

        {/* Action Buttons */}
        {isValidPhone && (
          <div className='space-y-3 mt-6 w-full'>
            {/* WhatsApp Button */}
            <a
              href={whatsappUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-lg shadow-green-500/40 hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-semibold text-base tracking-wide'
              aria-label='Abrir chat de WhatsApp'
              onClick={success}
            >
              <WhatsAppIcon className='w-6 h-6 shrink-0 fill-current group-hover:animate-bounce' />
              <span className='whitespace-nowrap'>Abrir chat de WhatsApp</span>
            </a>

            {/* Copy & Share Buttons */}
            <div className='flex gap-2'>
              <button
                onClick={handleCopyLink}
                className='flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors duration-200'
              >
                <CopyIcon className='w-5 h-5' />
                <span className='text-sm'>{copied ? '¡Copiado!' : 'Copiar link'}</span>
              </button>
              <button
                onClick={handleShareApp}
                className='flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors duration-200'
              >
                <ShareIcon className='w-5 h-5' />
                <span className='text-sm'>Compartir app</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <Suspense fallback={<LoadingSkeleton />}>
          <Footer />
        </Suspense>
      </div>
    </div>
  )
}
