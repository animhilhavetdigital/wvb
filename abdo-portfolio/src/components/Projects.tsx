"use client";

import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import { SITE } from "@/lib/site";

const PROJECT_URLS = [
  { domain: "airfroidexpert.ma", url: "https://airfroidexpert.ma/" },
  { domain: "jaam.fr", url: "https://jaam.fr/" },
  { domain: "mingler.hdorbite.com", url: "https://mingler.hdorbite.com/" },
  { domain: "qualyx.fr", url: "https://www.qualyx.fr/" },
  { domain: "vibekech.com", url: "https://www.vibekech.com/" },
];

export default function Projects() {
  const { lang, isRTL } = useLanguage();
  const t = TRANSLATIONS[lang].projects;

  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="relative bg-ink px-5 py-24 md:px-10 md:py-36"
    >
      <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="mono mb-2 inline-block text-lime">
            {t.badge}
          </span>
          <h2
            id="work-title"
            className="display text-4xl text-cream sm:text-6xl md:text-[6.5rem] leading-[0.95]"
          >
            {t.heading}
          </h2>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <p className="max-w-sm text-[0.98rem] leading-relaxed text-cream-dim md:text-right">
            {t.description}
          </p>
          <a
            id="github-profile"
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <GithubIcon size={16} />
            {t.githubBtn}
          </a>
        </div>
      </div>

      <ul className="border-t border-line">
        {t.liveItems.map((project, idx) => {
          const meta = PROJECT_URLS[idx] || PROJECT_URLS[0];

          return (
            <li key={meta.domain} className="border-b border-line">
              <a
                id={`project-${meta.domain.replace(/\W+/g, "-")}`}
                href={meta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-row grid gap-4 px-1 py-8 text-cream transition-colors duration-300 md:grid-cols-12 md:items-center md:gap-6 md:px-4 md:py-10"
              >
                <span className="display text-5xl md:col-span-5 md:text-[5.5rem]">
                  {project.name}
                </span>

                <span className="project-muted max-w-md text-[0.95rem] leading-relaxed text-cream-dim md:col-span-4">
                  {project.description}
                </span>

                <span className="flex items-center justify-between gap-4 md:col-span-3 md:flex-col md:items-end md:justify-center">
                  <span className="project-muted mono text-cream-dim">
                    {project.sector}
                  </span>
                  <span className="mono inline-flex items-center gap-2 rounded-full border border-current px-4 py-2">
                    {meta.domain}
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className={isRTL ? "rotate-[-90deg]" : ""}
                    />
                  </span>
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
