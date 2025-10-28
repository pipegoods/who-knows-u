import { useState, useMemo, useCallback, lazy, Suspense, useRef } from 'react'
import { COUNTRY_CO } from '@/data/countries-phone'
import PhoneInput from '@/components/PhoneInput'
import Header from '@/components/Header'
import ActionButtons from '@/components/ActionButtons'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { validatePhone } from '@/utils/validateNumberPhone'
import { useHapticFeedback } from '@/hooks/useHapticFeedback'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { useWhatsAppUrl } from '@/hooks/useWhatsAppUrl'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useShareApp } from '@/hooks/useShareApp'

const Footer = lazy(() => import('@/components/Footer'))

export default function App() {
  const [phone, setPhone] = useState<Phone>({
    dialCode: COUNTRY_CO.dial_code,
    number: '',
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const { success, light } = useHapticFeedback()
  const { copy, copied } = useCopyToClipboard()

  const whatsappUrl = useWhatsAppUrl(phone.dialCode, phone.number)
  const isValidPhone = useMemo(
    () => validatePhone(phone.number),
    [phone.number]
  )

  const handleCopyLink = useCallback(() => {
    light()
    copy(whatsappUrl)
  }, [copy, whatsappUrl, light])

  const handleOpenWhatsApp = useCallback(() => {
    window.open(whatsappUrl, '_blank')
  }, [whatsappUrl])

  const { handleShare } = useShareApp()

  useKeyboardShortcuts({
    inputRef,
    onEnterPress: handleOpenWhatsApp,
    isValidPhone,
  })

  return (
    <div className='min-h-screen bg-linear-to-b from-slate-100 via-white to-slate-100'>
      <div className='container px-4 grid place-content-center min-h-screen mx-auto max-w-md py-8 relative'>
        <Header />

        <section className='w-full' aria-label='Formulario de ingreso'>
          <PhoneInput
            phone={phone}
            onPhoneChange={setPhone}
            inputRef={inputRef}
          />
        </section>

        {isValidPhone && (
          <ActionButtons
            whatsappUrl={whatsappUrl}
            onCopy={handleCopyLink}
            onWhatsAppClick={success}
            copied={copied}
          />
        )}

        <Suspense fallback={<LoadingSkeleton />}>
          <Footer onShareApp={handleShare} />
        </Suspense>
      </div>
    </div>
  )
}
