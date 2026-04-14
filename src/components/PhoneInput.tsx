import React, { useState } from 'react'
import CountrySelector from './CountrySelector'
import { validatePhone } from '@/utils/validateNumberPhone'
import { formatCountryName } from '@/utils/countryUtils'

interface Phone {
  dialCode: string
  number: string
}

interface PhoneInputProps {
  phone: Phone
  onPhoneChange: (phone: Phone) => void
  inputRef: React.RefObject<HTMLInputElement>
  countries: Array<{ dial_code: string; name: string; image: string; code: string }>
  currentCountry?: { dial_code: string; name: string; image: string; code: string }
}

export default function PhoneInput({ phone, onPhoneChange, inputRef, countries, currentCountry: passedCountry }: PhoneInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const foundCountry = countries.find(c => c.dial_code === phone.dialCode)
  const currentCountry = foundCountry || passedCountry
  
  // Store only digits internally, format for display
  const digits = phone.number.replace(/\D/g, '')
  const formattedNumber = formatPhoneNumberForDisplay(digits, phone.dialCode)
  const isValidPhone = validatePhone(digits)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Extract only digits from the input
    const digitsOnly = e.target.value.replace(/\D/g, '')
    onPhoneChange({ ...phone, number: digitsOnly })
  }

  const handleDialCodeChange = (newDialCode: string) => {
    onPhoneChange({ dialCode: newDialCode, number: '' })
    // Refocus input after country change
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  return (
    <div className='space-y-4 sm:space-y-6'>
      {/* Country Selector - Now prominent and accessible */}
      <div>
        <label htmlFor='country-selector-trigger' className='block text-sm font-semibold text-text-primary mb-2.5 sm:mb-3'>
          Selecciona tu país
        </label>
        <div className='flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 w-full'>
          <div className='flex-1 min-w-0'>
            <CountrySelector 
              triggerId='country-selector-trigger'
              dialCode={phone.dialCode} 
              onDialCodeChange={handleDialCodeChange}
              countries={countries}
            />
          </div>
          {currentCountry && (
            <div className='flex items-center gap-2 px-3 py-2.5 rounded-lg bg-primary-light border border-primary-border w-full sm:w-auto shrink-0'>
              <img
                src={currentCountry.image}
                alt=''
                width={24}
                height={24}
                className='h-6 w-6 rounded-sm border border-border-soft object-cover'
                loading='lazy'
                decoding='async'
              />
              <div className='text-left'>
                <p className='text-xs font-semibold text-text-primary leading-tight'>{formatCountryName(currentCountry.name)}</p>
                <p className='text-xs text-text-secondary font-medium leading-tight'>{currentCountry.dial_code}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Phone Number Input */}
      <div>
        <label htmlFor='phone-input' className='block text-sm font-semibold text-text-primary mb-2.5 sm:mb-3'>
          Número Telefónico
        </label>
        
        <div className='relative w-full'>
          {/* Input Field */}
          <input
            id='phone-input'
            ref={inputRef}
            type='tel'
            inputMode='tel'
              name='phone-number'
              autoComplete='tel-national'
            placeholder='300 123 4567'
            value={formattedNumber}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`
                w-full px-4 sm:px-5 py-3.5 sm:py-4 text-base sm:text-lg font-semibold tracking-wide transition-[border-color,box-shadow,background-color] duration-200
              bg-surface border-2 rounded-xl outline-none
              ${isFocused 
                ? 'border-primary shadow-lg bg-surface-elevated' 
                : 'border-border-soft hover:border-border bg-surface'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
              placeholder:text-text-muted placeholder:font-normal
            `}
            required
            aria-label='Número telefónico'
            aria-describedby='phone-help'
            aria-invalid={digits.length > 0 && !isValidPhone}
          />
          
          {/* Country code badge inside input */}
          <div className='absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-text-tertiary bg-surface-subtle px-2 py-1 rounded pointer-events-none'>
            {phone.dialCode}
          </div>
        </div>

        {/* Help Text + Validation State */}
        <p id='phone-help' className='mt-3 text-sm transition-colors duration-200 flex items-center gap-2' aria-live='polite'>
          {digits.length === 0 ? (
            <span className='validation-hint'>Ingresa tu número telefónico para activar las acciones.</span>
          ) : isValidPhone ? (
            <span className='validation-success'>Número válido.</span>
          ) : (
            <span className='validation-error'>El número debe tener entre 10 y 15 dígitos.</span>
          )}
        </p>
      </div>
    </div>
  )
}

// Format number for display only - doesn't modify state
function formatPhoneNumberForDisplay(digits: string, dialCode: string): string {
  if (!digits) return ''

  // Mexican phone formatting: (55) 1234-5678
  if (dialCode === '+52') {
    if (digits.length <= 2) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6, 10)}`
  }

  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`
  if (digits.length <= 10) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`

  const head = `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`
  const tail = digits
    .slice(10)
    .match(/.{1,3}/g)
    ?.join(' ') || ''

  return `${head} ${tail}`.trim()
}
