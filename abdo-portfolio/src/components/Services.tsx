"use client";

import Image from "next/image";
import { Check, Code2, Database, LayoutDashboard, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import { cn } from "@/lib/site";

type ServiceMeta = {
  id: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  tone: "dark" | "cream";
  className: string;
  imageClassName: string;
};

const SERVICES_META: ServiceMeta[] = [
  {
    id: "frontend",
    icon: Code2,
    image: "/trail/web.jpg",
    imageAlt: "Interface web moderne en mode sombre sur un ordinateur portable",
    tone: "dark",
    className: "md:col-span-4 md:row-span-2",
    imageClassName: "aspect-[16/9] md:aspect-[16/8]",
  },
  {
    id: "backend",
    icon: Database,
    image: "/trail/dashboard.jpg",
    imageAlt: "Tableau de bord analytics et gestion backend moderne",
    tone: "cream",
    className: "md:col-span-2",
    imageClassName: "aspect-[16/9]",
  },
  {
    id: "dashboard-motaba3a",
    icon: LayoutDashboard,
    image: "/trail/responsive.jpg",
    imageAlt: "Site web fluide et facile à administrer sur smartphone",
    tone: "dark",
    className: "md:col-span-2",
    imageClassName: "aspect-[16/9]",
  },
];

export default function Services() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang].services;

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative bg-ink-2 px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <span className="mono mb-2 inline-flex items-center gap-1.5 text-lime">
            <Sparkles size={14} />
            {t.kicker}
          </span>
          <h2
            id="services-title"
            className="display text-4xl text-cream sm:text-6xl md:text-[6.5rem] leading-[0.95]"
          >
            {t.headingLine1}
            <br />
            {t.headingLine2}
          </h2>
        </div>
        <p className="max-w-sm text-[0.98rem] leading-relaxed text-cream-dim md:col-span-4 md:justify-self-end">
          {t.description}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-6 md:gap-5">
        {t.items.map((item, idx) => {
          const meta = SERVICES_META[idx] || SERVICES_META[0];
          const Icon = meta.icon;
          const isCream = meta.tone === "cream";

          return (
            <article
              key={item.badge}
              id={`service-${meta.id}`}
              className={cn(
                "group flex flex-col overflow-hidden rounded-[24px] border",
                isCream
                  ? "border-transparent bg-cream text-ink"
                  : "border-line bg-ink-3 text-cream",
                meta.className,
              )}
            >
              <div
                className={cn(
                  "relative w-full overflow-hidden",
                  meta.imageClassName,
                )}
              >
                <Image
                  src={meta.image}
                  alt={meta.imageAlt}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>

              <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        "mono rounded-full px-2.5 py-1 text-[0.68rem] font-bold",
                        isCream
                          ? "bg-ink text-cream"
                          : "border border-lime/30 bg-lime/10 text-lime",
                      )}
                    >
                      {item.badge}
                    </span>
                    <Icon
                      size={24}
                      strokeWidth={1.75}
                      className={isCream ? "text-ink" : "text-lime"}
                      aria-hidden="true"
                    />
                  </div>

                  <h3
                    className={cn(
                      "display mt-4 text-3xl md:text-4xl",
                      meta.id === "frontend" && "md:text-5xl",
                    )}
                  >
                    {item.title}
                  </h3>
                </div>

                <p
                  className={cn(
                    "max-w-prose text-[0.92rem] leading-relaxed",
                    isCream ? "text-ink/75" : "text-cream-dim",
                  )}
                >
                  {item.summary}
                </p>

                <ul
                  className={cn(
                    "grid gap-2.5",
                    meta.id === "frontend" && "md:grid-cols-2",
                  )}
                >
                  {item.specs.map((spec) => (
                    <li key={spec} className="flex items-start gap-2.5 text-xs sm:text-[0.88rem]">
                      <Check
                        size={15}
                        strokeWidth={2.5}
                        className={cn(
                          "mt-0.5 shrink-0",
                          isCream ? "text-ink" : "text-lime",
                        )}
                        aria-hidden="true"
                      />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={cn(
                    "mono mt-auto flex flex-wrap items-center justify-between gap-3 border-t pt-5",
                    isCream
                      ? "border-ink/15 text-ink/65"
                      : "border-line text-cream-dim",
                  )}
                >
                  <span>{item.tools.join("  •  ")}</span>
                  <span className="inline-flex items-center gap-1 text-[0.7rem] font-semibold">
                    <ShieldCheck size={13} />
                    {t.includedTag}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
