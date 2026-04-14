import { COUNTRIES_PHONE, COUNTRY_CO } from '@/data/countries-phone'
import { Country } from '@/types'

export const COUNTRIES: Country[] = COUNTRIES_PHONE.map(c => ({
  dial_code: c.dial_code,
  name: c.name,
  image: c.image,
  code: c.code,
}))

export const COUNTRY_DEFAULT: Country = { 
  dial_code: COUNTRY_CO.dial_code, 
  name: COUNTRY_CO.name, 
  image: COUNTRY_CO.image,
  code: COUNTRY_CO.code,
}

export function formatCountryName(name: string): string {
  return name.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\s+/g, ' ').trim()
}

export function getCountryNameByCode(dialCode: string): string {
  const country = COUNTRIES.find(c => c.dial_code === dialCode)
  return formatCountryName(country?.name || COUNTRY_CO.name)
}

export function getCountryFlag(dialCode: string): string {
  const country = COUNTRIES.find(c => c.dial_code === dialCode)
  return country?.image || COUNTRY_CO.image
}

export function getCountryByDialCode(dialCode: string): Country | undefined {
  return COUNTRIES.find(c => c.dial_code === dialCode)
}

export function getCountryCodeFromNumber(phoneNumber: string): string {
  const digits = phoneNumber.replace(/\D/g, '')
  if (!digits) return COUNTRY_CO.dial_code

  // Detect country by common patterns
  if (digits.startsWith('1')) {
    return '+1'
  }
  if (digits.startsWith('57')) {
    return '+57'
  }

  return COUNTRY_CO.dial_code
}
