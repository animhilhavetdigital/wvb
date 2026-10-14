"use client";

import { ArrowUpRight, Check, Clock, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { WhatsappIcon } from "@/components/BrandIcons";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import { cn, whatsappLink } from "@/lib/site";

export default function Pricing() {
  const { lang, isRTL } = useLanguage();
  const t = TRANSLATIONS[lang].pricing;

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative bg-ink-2 px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <span className="mono mb-3 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-lime">
            <Sparkles size={14} />
            {t.badge}
          </span>
          <h2
            id="pricing-title"
            className="display text-4xl leading-[0.95] text-cream sm:text-6xl md:text-[6.5rem]"
          >
            {t.heading}
          </h2>
        </div>
        <p className="max-w-sm text-[0.98rem] leading-relaxed text-cream-dim md:col-span-4 md:justify-self-end">
          {t.description}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 lg:items-stretch">
        {t.packs.map((pack) => {
          const featured = pack.id === "business";

          return (
            <article
              key={pack.id}
              id={`pack-${pack.id}`}
              aria-label={pack.name}
              className={cn(
                "relative flex flex-col rounded-[24px] p-7 md:p-9 shadow-lg",
                featured
                  ? "bg-cream text-ink lg:-my-3 lg:py-11 border-2 border-lime"
                  : "border border-line bg-ink-3 text-cream",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={cn(
                    "mono rounded-full px-3 py-1 text-[0.7rem] font-bold",
                    featured
                      ? "bg-ink text-lime"
                      : "border border-lime/30 bg-lime/10 text-lime",
                  )}
                >
                  {pack.badge}
                </span>

                <span
                  className={cn(
                    "mono flex items-center gap-1.5 text-[0.72rem]",
                    featured ? "text-ink/75" : "text-cream-dim",
                  )}
                >
                  <Clock size={13} />
                  {pack.delivery}
                </span>
              </div>

              <h3 className="display mt-6 text-3xl sm:text-4xl md:text-5xl">
                {pack.name}
              </h3>

              <div className="mt-3 flex items-baseline gap-2">
                <span
                  className={cn(
                    "display text-4xl md:text-5xl font-black",
                    featured ? "text-violet" : "text-lime",
                  )}
                >
                  {pack.price}
                </span>
                <span
                  className={cn(
                    "text-xs uppercase tracking-wider",
                    featured ? "text-ink/60" : "text-cream-dim",
                  )}
                >
                  {t.currency}
                </span>
              </div>

              <p
                className={cn(
                  "mt-4 text-[0.92rem] leading-relaxed",
                  featured ? "text-ink/80" : "text-cream-dim",
                )}
              >
                {pack.audience}
              </p>

              <ul
                className={cn(
                  "mt-7 grid gap-3 border-t pt-6",
                  featured ? "border-ink/15" : "border-line",
                )}
              >
                {pack.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.92rem]">
                    <Check
                      size={17}
                      strokeWidth={2.5}
                      className={cn(
                        "mt-0.5 shrink-0",
                        featured ? "text-violet" : "text-lime",
                      )}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-8">
                <a
                  id={`pack-${pack.id}-whatsapp`}
                  href={whatsappLink(pack.whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "btn w-full justify-between shadow-md",
                    featured
                      ? "bg-ink text-cream hover:bg-violet hover:text-white"
                      : "btn-primary hover:bg-cream hover:text-ink",
                  )}
                >
                  <span className="inline-flex items-center gap-2">
                    <WhatsappIcon size={17} />
                    {pack.cta}
                  </span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className={isRTL ? "rotate-[-90deg]" : ""}
                  />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Trust banner */}
      <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line bg-ink p-6 md:p-8">
        <div className="flex items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-lime/10 text-lime">
            <HeartHandshake size={24} />
          </div>
          <div>
            <h4 className="display text-xl text-cream md:text-2xl">{t.trustTitle}</h4>
            <p className="text-sm text-cream-dim">{t.trustDesc}</p>
          </div>
        </div>

        <div className="mono flex items-center gap-6 text-xs text-cream-dim">
          <span className="flex items-center gap-1.5 text-lime">
            <ShieldCheck size={16} />
            {t.trustTag1}
          </span>
          <span className="flex items-center gap-1.5 text-lime">
            <ShieldCheck size={16} />
            {t.trustTag2}
          </span>
        </div>
      </div>
    </section>
  );
}
