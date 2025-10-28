import { useCallback, type ChangeEvent, type RefObject } from 'react'
import CountrySelector from './CountrySelector'

interface PhoneInputProps {
  phone: Phone
  onPhoneChange: (phone: Phone) => void
  inputRef?: RefObject<HTMLInputElement | null>
}

export default function PhoneInput({ phone, onPhoneChange, inputRef }: PhoneInputProps) {
  const handleNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newNumber = e.target.validity.valid ? e.target.value : phone.number

      onPhoneChange({
        ...phone,
        number: newNumber,
      })
    },
    [phone, onPhoneChange]
  )

  const handleDialCodeChange = useCallback(
    (dialCode: string) => {
      onPhoneChange({
        ...phone,
        dialCode,
      })
    },
    [phone, onPhoneChange]
  )

  return (
    <label className='flex items-center gap-1 bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 rounded-2xl p-2 shadow-md hover:border-green-500 dark:hover:border-green-600 transition-all duration- прежде focus-within:border-green-500 dark:focus-within:border-green-600 focus-within:shadow-lg cursor-text'>
      <CountrySelector
        dialCode={phone.dialCode}
        onDialCodeChange={handleDialCodeChange}
      />
      <span
        className='hidden sm:inline text-gray-700 dark:text-gray-300 font-medium px-1'
        aria-hidden='true'
      >
        {phone.dialCode}
      </span>
      <input
        ref={inputRef}
        className='text-base flex-1 bg-transparent border-none outline-none p-2 pl-1 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500'
        type='tel'
        pattern='[0-9]*'
        inputMode='numeric'
        placeholder='Número de WhatsApp'
        onChange={handleNumberChange}
        value={phone.number}
        aria-label='Número de teléfono de WhatsApp'
        aria-required='true'
        autoComplete='tel'
      />
    </label>
  )
}
