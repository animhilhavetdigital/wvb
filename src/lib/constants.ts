export const WHATSAPP_NUMBER = '212631084371';
export const PHONE_DISPLAY_1 = '+212 6 31 08 43 71';
export const PHONE_DISPLAY_2 = '+212 6 59 67 21 84';
export const EMAIL = 'lecopy1994@gmail.com';
export const GITHUB = 'https://github.com/animhilhavetdigital';

export function getWhatsAppUrl(message?: string): string {
  const defaultMsg = 'Salam l-équipe, bghit n-sawb site web pro b taman mounasib. Wach momkin n-hdro 3la l-projet?';
  const text = message || defaultMsg;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
