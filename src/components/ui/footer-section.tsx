"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Moon, Send, Sun } from "lucide-react"
import { PHONE_DISPLAY_1, EMAIL, GITHUB, getWhatsAppUrl } from "@/lib/constants"

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2m1.4 9.74V10.13H5.06v8.37z" />
    </svg>
  )
}

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const [subscribed, setSubscribed] = React.useState(false)
  const [email, setEmail] = React.useState("")

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 4000)
      setEmail("")
    }
  }

  return (
    <footer className="relative border-t border-[#051A24]/10 bg-white dark:bg-[#070b0e] text-[#051A24] dark:text-zinc-100 transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-6 py-14 md:px-10 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* 1. Newsletter */}
          <div className="relative">
            <h2 className="mb-4 text-2xl md:text-3xl font-bold tracking-tight">Stay Connected</h2>
            <p className="mb-6 text-sm text-[#051A24]/70 dark:text-zinc-400">
              Rejoignez notre newsletter pour recevoir nos dernières réalisations et offres exclusives.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <Input
                type="email"
                placeholder="Votre email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pr-12 rounded-none border-[#051A24]/20 dark:border-white/20 bg-transparent text-sm h-11"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-1 top-1 h-9 w-9 rounded-none bg-[#051A24] text-white hover:bg-black dark:bg-white dark:text-[#051A24] dark:hover:bg-zinc-200 transition-transform active:scale-95"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">S'abonner</span>
              </Button>
            </form>
            {subscribed && (
              <p className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                Merci ! Vous êtes bien inscrit(e).
              </p>
            )}
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-none bg-[#051A24]/5 dark:bg-white/5 blur-2xl pointer-events-none" />
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="mb-4 text-base font-semibold tracking-wider uppercase text-xs text-[#051A24]/60 dark:text-zinc-400">
              Liens Rapides
            </h3>
            <nav className="space-y-3 text-sm">
              <a href="#" className="block transition-colors hover:text-[#051A24] dark:hover:text-white text-[#051A24]/80 dark:text-zinc-300">
                Accueil
              </a>
              <a href="#services" className="block transition-colors hover:text-[#051A24] dark:hover:text-white text-[#051A24]/80 dark:text-zinc-300">
                Services & Tarifs
              </a>
              <a href="#work" className="block transition-colors hover:text-[#051A24] dark:hover:text-white text-[#051A24]/80 dark:text-zinc-300">
                Réalisations Pro
              </a>
              <a 
                href={getWhatsAppUrl("Salam l-équipe, bghit devis gratuit pour mon projet.")}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-[#051A24] dark:hover:text-white text-[#051A24]/80 dark:text-zinc-300"
              >
                Demander un Devis
              </a>
              <a 
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-[#051A24] dark:hover:text-white text-[#051A24]/80 dark:text-zinc-300"
              >
                GitHub Développeur
              </a>
            </nav>
          </div>

          {/* 3. Contact Us */}
          <div>
            <h3 className="mb-4 text-base font-semibold tracking-wider uppercase text-xs text-[#051A24]/60 dark:text-zinc-400">
              Contactez-Nous
            </h3>
            <address className="space-y-2.5 text-sm not-italic text-[#051A24]/80 dark:text-zinc-300">
              <p className="font-medium text-[#051A24] dark:text-white">Nimhil Digital Studio</p>
              <p>Marrakech, Maroc</p>
              <p>
                <a 
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  WhatsApp: {PHONE_DISPLAY_1}
                </a>
              </p>
              <p>
                <a href={`mailto:${EMAIL}`} className="hover:underline">
                  Email: {EMAIL}
                </a>
              </p>
            </address>
          </div>

          {/* 4. Social & Theme Toggle */}
          <div className="relative">
            <h3 className="mb-4 text-base font-semibold tracking-wider uppercase text-xs text-[#051A24]/60 dark:text-zinc-400">
              Réseaux & Thème
            </h3>
            <div className="mb-6 flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-10 w-10 border border-[#051A24]/20 dark:border-white/20 rounded-none bg-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                      <FacebookIcon className="h-4 w-4" />
                      <span className="sr-only">Facebook</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Page Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-10 w-10 border border-[#051A24]/20 dark:border-white/20 rounded-none bg-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                      <TwitterIcon className="h-4 w-4" />
                      <span className="sr-only">Twitter / X</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Suivez-nous sur X</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-10 w-10 border border-[#051A24]/20 dark:border-white/20 rounded-none bg-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                      <InstagramIcon className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Instagram Studio</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={GITHUB}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center h-10 w-10 border border-[#051A24]/20 dark:border-white/20 rounded-none bg-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>LinkedIn & Réalisations</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Dark Mode Switcher */}
            <div className="flex items-center space-x-3 pt-2">
              <Sun className="h-4 w-4 text-[#051A24]/70 dark:text-zinc-400" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
                className="rounded-none"
              />
              <Moon className="h-4 w-4 text-[#051A24]/70 dark:text-zinc-400" />
              <Label htmlFor="dark-mode" className="text-xs font-mono tracking-tight text-[#051A24]/70 dark:text-zinc-400 cursor-pointer">
                {isDarkMode ? "DARK MODE" : "LIGHT MODE"}
              </Label>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#051A24]/10 dark:border-white/10 pt-8 text-center md:flex-row">
          <p className="text-xs text-[#051A24]/60 dark:text-zinc-400 font-mono">
            © {new Date().getFullYear()} NIMHIL DIGITAL STUDIO • MARRAKECH, MAROC. ALL RIGHTS RESERVED.
          </p>
          <nav className="flex flex-wrap justify-center gap-6 text-xs text-[#051A24]/70 dark:text-zinc-400">
            <a href="#" className="transition-colors hover:text-[#051A24] dark:hover:text-white">
              Politique de Confidentialité
            </a>
            <a href="#" className="transition-colors hover:text-[#051A24] dark:hover:text-white">
              Conditions Générales
            </a>
            <a href="#" className="transition-colors hover:text-[#051A24] dark:hover:text-white">
              Mentions Légales
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
