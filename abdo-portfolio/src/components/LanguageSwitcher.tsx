"use client";

import { useLanguage, type Language } from "@/context/LanguageContext";
import { cn } from "@/lib/site";
import { Globe } from "lucide-react";

const LANGUAGES: { code: Language; label: string; name: string }[] = [
  { code: "fr", label: "FR", name: "Français" },
  { code: "ar", label: "عربي", name: "العربية" },
  { code: "en", label: "EN", name: "English" },
];

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-line bg-ink-3/80 p-1 backdrop-blur-md",
        className
      )}
      aria-label="Language selector"
    >
      <Globe size={13} className="ml-2 text-cream-dim" aria-hidden="true" />
      {LANGUAGES.map((l) => {
        const active = lang === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            className={cn(
              "mono rounded-full px-2.5 py-1 text-[0.68rem] font-semibold transition-all duration-200",
              active
                ? "bg-lime text-ink shadow-sm"
                : "text-cream-dim hover:text-cream"
            )}
            title={l.name}
          >
            {l.label}
          </button>
        );
      })}
    </div>
  );
}
