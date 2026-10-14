import React from "react";
import { Badge7 } from "@/components/ui/cta69-utils/badge7";
import { Button12 } from "@/components/ui/cta69-utils/button12";
import { cn } from "@/lib/utils";

export interface Badge {
  label: string;
}

export interface ActionButton {
  label: string;
  href: string;
}

export interface Cta69Labels {
  /** Repeated phrase scrolling across the backdrop */
  marqueePhrase?: string;
  /** Short supporting line beneath the heading */
  note?: string;
  /** Fine print sitting under the button */
  footnote?: string;
}

export interface Cta69Props {
  badge?: Badge;
  heading?: string;
  button?: ActionButton;
  labels?: Cta69Labels;
  className?: string;
  children?: React.ReactNode;
}

export const cta69Demo: Cta69Props = {
  badge: { label: "Studio Digital Maroc" },
  heading: "Créons un site web qui apporte de vrais clients.",
  button: {
    label: "Démarrer sur WhatsApp",
    href: "https://wa.me/212600000000",
  },
  labels: {
    marqueePhrase: "Créons votre site web",
    note: "Design sur-mesure, rapidité éclair, zéro abonnement mensuel et livraison en 7 à 14 jours.",
    footnote: "Paiement unique clé en main • Disponibilité immédiate pour nouveaux projets.",
  },
};

const REPEATS = 8;

export function Cta69({
  badge,
  heading,
  button,
  labels = {},
  className,
  children,
}: Cta69Props) {
  const marqueePhrase = labels.marqueePhrase;
  const marqueeLine = marqueePhrase
    ? `${marqueePhrase} · `.repeat(REPEATS)
    : "";

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-white py-20 md:py-32 w-full rounded-none border-t border-slate-200/80",
        className,
      )}
    >
      <style>{`
        @keyframes cta69-marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-cta69-marquee {
          animation: cta69-marquee 45s linear infinite;
        }
      `}</style>

      {/* Giant scrolling backdrop */}
      {marqueePhrase && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center overflow-hidden select-none"
        >
          <div className="flex w-max shrink-0 animate-cta69-marquee whitespace-nowrap text-[#051A24]/[0.04]">
            {[0, 1].map((copy) => (
              <span
                key={copy}
                className="text-[22vw] font-bold leading-none tracking-tighter md:text-[16vw] uppercase"
              >
                {marqueeLine}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Centered statement */}
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 text-center md:px-6 z-10">
        {badge && <Badge7 label={badge.label} />}

        {heading && (
          <h2 className="mt-8 text-balance text-4xl font-normal leading-[1.05] tracking-tight text-[#0D212C] font-serif md:text-6xl lg:text-7xl">
            {heading}
          </h2>
        )}

        {labels.note && (
          <p className="mt-6 max-w-xl text-balance text-base text-[#273C46] md:text-lg leading-relaxed">
            {labels.note}
          </p>
        )}

        {button && (
          <div className="mt-10">
            <Button12 asChild label={button.label}>
              <a
                href={button.href}
                target={button.href.startsWith("http") ? "_blank" : undefined}
                rel={button.href.startsWith("http") ? "noopener noreferrer" : undefined}
              />
            </Button12>
          </div>
        )}

        {labels.footnote && (
          <p className="mt-8 text-xs font-mono uppercase tracking-wider text-slate-500">
            {labels.footnote}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}

export default Cta69;
