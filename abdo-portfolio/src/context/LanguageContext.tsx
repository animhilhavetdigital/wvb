"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "fr" | "ar" | "en";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("abdo_lang") as Language | null;
      if (saved && (saved === "fr" || saved === "ar" || saved === "en")) {
        return saved;
      }
    }
    return "fr";
  });

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("abdo_lang", newLang);
    }
  };

  const isRTL = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, setLang, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "font-arabic" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
