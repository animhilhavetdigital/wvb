import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const WHATSAPP_NUMBER = "212631084371";

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SITE = {
  name: "Abdo & Web Team",
  brand: "NIMHIL DIGITAL STUDIO",
  tagline: "Création de Sites Web Professionnels • Frontend & Backend • Taman Mounasib",
  email: "lecopy1994@gmail.com",
  phones: [
    { label: "+212 6 31 08 43 71", href: "tel:+212631084371" },
    { label: "+212 6 59 67 21 84", href: "tel:+212659672184" },
  ],
  github: "https://github.com/animhilhavetdigital",
  location: "Marrakech, Maroc (Intervention dans tout le Maroc & à l'international)",
  defaultWhatsapp: whatsappLink(
    "Salam l-équipe, bghit n-sawb site web pro b taman mounasib w f we9t 9sir. Wach momkin n-hdro 3la l-projet?",
  ),
} as const;
