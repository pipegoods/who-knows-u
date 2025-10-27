import { useState, useMemo, useCallback, lazy, Suspense } from 'react'
import { COUNTRY_CO } from '@/data/countries-phone'
import PhoneInput from '@/components/PhoneInput'
import { validatePhone } from '@/utils/validateNumberPhone'
import WhatsAppIcon from '@/icons/WhatsAppIcon'

const Footer = lazy(() => import('@/components/Footer'))

export const API_WHATSAPP_URL = 'https://api.whatsapp.com/send?phone='

export default function App() {
  const [phone, setPhone] = useState<Phone>({
    dialCode: COUNTRY_CO.dial_code,
    number: '',
  })

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

  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900'>
      <div className='container px-4 grid place-content-center min-h-screen mx-auto max-w-md py-8'>
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
          <PhoneInput phone={phone} onPhoneChange={setPhone} />
        </section>

        {/* CTA Button */}
        {isValidPhone && (
          <a
            href={whatsappUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='group w-full mt-6 inline-flex items-center justify-center gap-3 px-8 py-4 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl shadow-lg shadow-green-500/40 hover:shadow-xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-semibold text-base tracking-wide'
            aria-label='Abrir chat de WhatsApp'
          >
            <WhatsAppIcon className='w-6 h-6 shrink-0 fill-current' />
            <span className='whitespace-nowrap'>Abrir chat de WhatsApp</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='w-5 h-5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              aria-hidden='true'
            >
              <path d='m9 18 6-6-6-6' />
            </svg>
          </a>
        )}

        {/* Footer */}
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </div>
  )
}
