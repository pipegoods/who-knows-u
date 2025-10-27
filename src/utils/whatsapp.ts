export const API_WHATSAPP_URL = 'https://api.whatsapp.com/send?phone='

export function removePlus(dialCode: string): string {
  return dialCode.replace('+', '')
}

export function buildWhatsAppUrl(dialCode: string, number: string): string {
  if (!number) return ''
  return `${API_WHATSAPP_URL}${removePlus(dialCode)}${number}`
}

const shareUrl = 'https://who-knows-u.vercel.app'

export async function shareApp(): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Who Knows U',
        text: 'Envía mensajes de WhatsApp sin agregar números a tus contactos',
        url: shareUrl,
      })
      return true
    } catch (error) {
      // User cancelled or error
      return false
    }
  }
  return false
}

