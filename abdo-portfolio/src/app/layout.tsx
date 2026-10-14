import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Cairo, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Création de Sites Web Professionnels au Maroc • Frontend & Backend • Taman Mounasib",
  description:
    "Équipe professionnelle de création de sites web au Maroc. Sites riches en fonctionnalités, faciles à gérer (site sahel), b taman zwin w a9el taman, avec photos & icônes incluses et motaba3a continue.",
  keywords: [
    "création site web Maroc",
    "site web Marrakech",
    "développeur web Maroc",
    "création site vitrine Maroc",
    "site e-commerce Maroc",
    "site web pas cher Maroc",
    "agence web Marrakech",
    "Next.js dev Maroc",
  ],
  authors: [{ name: "Abdo & Web Team" }],
  openGraph: {
    title: "Création de Sites Web Professionnels au Maroc • Frontend & Backend",
    description:
      "Sites web sur-mesure, faciles à gérer, à prix abordable avec motaba3a et support continu.",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${barlow.variable} ${cairo.variable} ${dmSans.variable} ${plexMono.variable} antialiased`}
    >
      <body className="grain">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
