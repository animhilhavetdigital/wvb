"use client";

import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, WhatsappIcon } from "@/components/BrandIcons";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import { SITE, whatsappLink } from "@/lib/site";

export default function Contact() {
  const { lang, isRTL } = useLanguage();
  const t = TRANSLATIONS[lang].contact;
  const year = new Date().getFullYear();

  const consultationMsg =
    lang === "ar"
      ? "السلام عليكم، بغيت نستاشر معاكم على مشروع موقع إلكتروني جديد ونعرف الأسعار والمدة."
      : lang === "en"
      ? "Hello, I would like to consult with your team regarding a new website project."
      : "Salam l-équipe, bghit n-consulti m3akom 3la site web w n-3ref l-as3ar w l-modda.";

  return (
    <>
      <footer
        id="contact"
        aria-labelledby="contact-title"
        className="relative overflow-hidden bg-ink px-5 pb-10 pt-24 md:px-10 md:pt-36"
      >
        <h2
          id="contact-title"
          className="display text-[16vw] leading-[0.85] text-cream md:text-[13vw]"
        >
          {t.heading}
        </h2>

        <div className="mt-10 grid gap-10 border-t border-line pt-10 md:mt-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="mono mb-2 inline-block text-lime">
              {t.badge}
            </span>
            <p className="max-w-md text-lg leading-relaxed text-cream-dim">
              {t.description}
            </p>
            <a
              id="contact-whatsapp-cta"
              href={whatsappLink(consultationMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-8 shadow-lg shadow-lime/20"
            >
              <WhatsappIcon size={18} />
              {t.whatsappBtn}
            </a>
          </div>

          <dl className="grid gap-8 sm:grid-cols-2 md:col-span-7">
            <div>
              <dt className="mono mb-3 flex items-center gap-2 text-cream-dim">
                <Phone size={14} strokeWidth={1.75} aria-hidden="true" />
                {t.phoneLabel}
              </dt>
              {SITE.phones.map((phone) => (
                <dd key={phone.href}>
                  <a
                    href={phone.href}
                    className="display block text-3xl text-cream transition-colors hover:text-lime md:text-4xl"
                    dir="ltr"
                  >
                    {phone.label}
                  </a>
                </dd>
              ))}
            </div>

            <div>
              <dt className="mono mb-3 flex items-center gap-2 text-cream-dim">
                <Mail size={14} strokeWidth={1.75} aria-hidden="true" />
                {t.emailLabel}
              </dt>
              <dd>
                <a
                  id="contact-email"
                  href={`mailto:${SITE.email}`}
                  className="display block break-all text-3xl normal-case text-cream transition-colors hover:text-lime md:text-4xl"
                  dir="ltr"
                >
                  {SITE.email}
                </a>
              </dd>
            </div>

            <div>
              <dt className="mono mb-3 flex items-center gap-2 text-cream-dim">
                <MapPin size={14} strokeWidth={1.75} aria-hidden="true" />
                {t.studioLabel}
              </dt>
              <dd className="text-cream">
                <span className="display block text-3xl md:text-4xl">
                  {lang === "ar" ? "مراكش، المغرب" : "Marrakech, Maroc"}
                </span>
                <span className="mt-2 block max-w-xs text-sm leading-relaxed text-cream-dim">
                  {t.studioDesc}
                </span>
              </dd>
            </div>

            <div>
              <dt className="mono mb-3 flex items-center gap-2 text-cream-dim">
                <GithubIcon size={14} />
                {t.codeLabel}
              </dt>
              <dd>
                <a
                  id="contact-github"
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cream underline decoration-line-strong underline-offset-4 transition-colors hover:text-lime"
                  dir="ltr"
                >
                  github.com/animhilhavetdigital
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.75}
                    aria-hidden="true"
                    className={isRTL ? "rotate-[-90deg]" : ""}
                  />
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="mono mt-20 flex flex-col gap-3 border-t border-line pt-6 text-cream-dim md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {SITE.name}
          </p>
          <p>{t.copyright}</p>
          <a href="#top" className="transition-colors hover:text-cream">
            {t.backToTop}
          </a>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        id="floating-whatsapp"
        href={whatsappLink(consultationMsg)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.floatingAria}
        className="fixed bottom-5 right-5 z-[90] flex size-14 items-center justify-center rounded-full bg-[#25d366] text-ink shadow-[0_12px_30px_-8px_rgba(37,211,102,0.6)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 active:scale-95 md:bottom-8 md:right-8"
      >
        <span
          aria-hidden="true"
          className="wa-ring absolute inset-0 rounded-full bg-[#25d366]"
        />
        <WhatsappIcon size={26} className="relative" />
      </a>
    </>
  );
}
