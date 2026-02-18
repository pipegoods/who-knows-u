// Internal constant - used by buildWhatsAppUrl
const API_WHATSAPP_URL = 'https://api.whatsapp.com/send?phone='

// Internal helper - remove + from dial code
function removePlus(dialCode: string): string {
  return dialCode.replace('+', '')
}

export function buildWhatsAppUrl(dialCode: string, number: string): string {
  if (!number) return ''
  return `${API_WHATSAPP_URL}${removePlus(dialCode)}${number}`
}

const shareUrl = 'https://who.pipegoods.dev'

export async function shareApp(): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Who Knows U',
        text: 'Envía mensajes de WhatsApp sin agregar números a tus contactos',
        url: shareUrl,
      })
      return true
    } catch {
      // User cancelled or error
      return false
    }
  }
  return false
}

