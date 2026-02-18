import {
  useCallback,
  memo,
  useRef,
  useEffect,
  type ChangeEvent,
  type RefObject,
} from 'react'
import CountrySelector from './CountrySelector'
import Input from '@/components/ui/input'

interface PhoneInputProps {
  phone: Phone
  onPhoneChange: (phone: Phone) => void
  inputRef?: RefObject<HTMLInputElement | null>
}

function PhoneInput({
  phone,
  onPhoneChange,
  inputRef,
}: PhoneInputProps) {
  // Use ref to store latest phone value for callbacks (avoid accessing during render)
  const phoneRef = useRef(phone)
  
  // Update ref in effect, not during render
  useEffect(() => {
    phoneRef.current = phone
  }, [phone])

  const handleNumberChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newNumber = e.target.validity.valid
        ? e.target.value
        : phoneRef.current.number

      onPhoneChange({
        ...phoneRef.current,
        number: newNumber,
      })
    },
    [onPhoneChange]
  )

  const handleDialCodeChange = useCallback(
    (dialCode: string) => {
      onPhoneChange({
        ...phoneRef.current,
        dialCode,
      })
    },
    [onPhoneChange]
  )

  return (
    <label className='flex items-center gap-2 sm:gap-3 bg-control-bg rounded-xl p-4 sm:p-5 shadow-sm transition-[box-shadow,background-color] duration-200 hover:shadow-md focus-within:glow-inner focus-within:bg-surface cursor-text group'>
      <CountrySelector
        dialCode={phone.dialCode}
        onDialCodeChange={handleDialCodeChange}
      />
      <span
        className='inline text-text-secondary font-medium px-1 text-base sm:text-lg shrink-0 transition-colors duration-200 group-focus-within:text-text-primary'
        aria-hidden='true'
      >
        {phone.dialCode}
      </span>
      <Input
        ref={inputRef}
        name='phone-number'
        className='text-base sm:text-lg flex-1 min-w-0 p-1'
        type='tel'
        pattern='[0-9]*'
        inputMode='numeric'
        placeholder='Número de WhatsApp…'
        onChange={handleNumberChange}
        value={phone.number}
        aria-label='Número de teléfono de WhatsApp'
        aria-required='true'
        autoComplete='tel'
        spellCheck={false}
      />
    </label>
  )
}

// Memoize component to prevent unnecessary re-renders (rerender-memo)
export default memo(PhoneInput)
