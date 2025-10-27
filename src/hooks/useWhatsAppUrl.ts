import { useMemo } from 'react'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { validatePhone } from '@/utils/validateNumberPhone'

export function useWhatsAppUrl(dialCode: string, number: string) {
  const url = useMemo(() => {
    if (!validatePhone(number)) return ''
    return buildWhatsAppUrl(dialCode, number)
  }, [dialCode, number])

  return url
}

