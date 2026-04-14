import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react'
import { COUNTRY_CO } from '@/data/countries-phone'
import PhoneInput from '@/components/PhoneInput'
import Header from '@/components/Header'
import UpdateBanner from '@/components/UpdateBanner'
import ActionButtons from '@/components/ActionButtons'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import { validatePhone } from '@/utils/validateNumberPhone'
import { useHapticFeedback } from '@/hooks/useHapticFeedback'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { useWhatsAppUrl } from '@/hooks/useWhatsAppUrl'
import { SkipLink } from '@/components/SkipLink'
import { COUNTRIES, getCountryNameByCode, getCountryByDialCode } from '@/utils/countryUtils'
import { Country } from '@/types'

const Footer = React.lazy(() => import('@/components/Footer'))

interface Phone {
  dialCode: string
  number: string
}

export default function App() {
  const [phone, setPhone] = useState<Phone>({
    dialCode: COUNTRY_CO.dial_code,
    number: '',
  })

  const [countries] = useState(COUNTRIES)
  const isCountriesLoaded = true
  const inputEl = useRef<HTMLInputElement | null>(null)
  const mainRef = useRef<HTMLDivElement | null>(null)
  const { success, light, medium } = useHapticFeedback()
  const { copy, copied } = useCopyToClipboard()
  const [currentCountry, setCurrentCountry] = useState<Country>({
    dial_code: COUNTRY_CO.dial_code,
    name: COUNTRY_CO.name,
    image: COUNTRY_CO.image,
    code: COUNTRY_CO.code,
  })

  const whatsappUrl = useWhatsAppUrl(phone.dialCode, phone.number)
  const isValidPhone = useMemo(
    () => validatePhone(phone.number),
    [phone.number]
  )

  // Update current country when dial code changes
  useEffect(() => {
    const country = getCountryByDialCode(phone.dialCode)
    if (country) setCurrentCountry(country)
  }, [phone.dialCode])

  useEffect(() => {
    // Enhanced keyboard shortcut for Enter
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isValidPhone && inputEl.current) {
        // Focus WhatsApp button for better accessibility
        const whatsappBtn = document.querySelector('[data-action="whatsapp"]') as HTMLElement
        whatsappBtn?.focus()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [isValidPhone])

  const handleCopyLink = useCallback(() => {
    light()
    copy(whatsappUrl)
    medium()
  }, [copy, whatsappUrl, light, medium])

  const handleShareApp = useCallback(() => {
    if (navigator.share && whatsappUrl) {
      navigator.share({
        title: getCountryNameByCode(phone.dialCode) || 'Smart Contact',
        url: whatsappUrl,
      }).catch(console.warn)
      return
    }

    handleCopyLink()
  }, [whatsappUrl, phone.dialCode, handleCopyLink])

  if (!isCountriesLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSkeleton />
      </div>
    )
  }

  return (
    <div className='min-h-dvh bg-background relative overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(50,84,61,0.08),transparent_45%)]' />
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,173,141,0.12),transparent_48%)]' />

      {/* Skip to main content link for accessibility */}
      <SkipLink href="#main-content">
        Saltar al contenido principal
      </SkipLink>

      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-10 py-3 sm:py-8 lg:py-10 relative'>
        <UpdateBanner />
        <Header />

        <main
          id='main-content'
          ref={mainRef}
          className='w-full mt-4 sm:mt-8 space-y-3 sm:space-y-6'
          tabIndex={-1}
          aria-label="Área de contenido principal"
        >
          <section className='w-full max-w-3xl mx-auto rounded-2xl border border-border-soft bg-surface p-3 sm:p-7 lg:p-8 shadow-sm' aria-labelledby="phone-input-label">
            <h2 id="phone-input-label" className="text-lg sm:text-2xl font-semibold text-text-primary tracking-tight mb-3 sm:mb-5 text-balance">
              Enviar mensaje sin guardar contacto
            </h2>
            <p className='text-sm text-text-secondary leading-relaxed mb-3 sm:mb-5'>
              Escribe el número, abre WhatsApp y listo. Sin guardar contactos.
            </p>
            <PhoneInput
              phone={phone}
              onPhoneChange={setPhone}
              inputRef={inputEl}
              countries={countries}
              currentCountry={currentCountry}
            />

            {/* Enhanced conditional rendering with better accessibility */}
            {isValidPhone && isCountriesLoaded && (
              <div className='mt-5 sm:mt-6'>
                <ActionButtons
                  whatsappUrl={whatsappUrl}
                  onCopy={handleCopyLink}
                  onWhatsAppClick={success}
                  copied={copied}
                  currentCountry={currentCountry}
                  onShare={handleShareApp}
                />
              </div>
            )}
          </section>

          <section className='w-full max-w-3xl mx-auto px-0 sm:px-1 py-0'>
            <React.Suspense fallback={<LoadingSkeleton />}>
              <Footer />
            </React.Suspense>
          </section>
        </main>
      </div>
    </div>
  )
}
