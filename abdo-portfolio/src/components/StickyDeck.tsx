"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, Code2, HeartHandshake, ImageIcon, Sparkles, Tag } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import { whatsappLink } from "@/lib/site";

const CARD_STYLES = [
  {
    id: "fullstack-pro",
    bg: "#111113",
    border: "rgba(218, 255, 34, 0.4)",
    accent: "#daff22",
    textColor: "#f5f5f0",
    icon: Code2,
    isCream: false,
  },
  {
    id: "a9el-taman",
    bg: "#15121b",
    border: "rgba(180, 75, 200, 0.45)",
    accent: "#d86cf5",
    textColor: "#f5f5f0",
    icon: Tag,
    isCream: false,
  },
  {
    id: "site-sahel",
    bg: "#15150e",
    border: "rgba(255, 221, 51, 0.45)",
    accent: "#ffdd33",
    textColor: "#f5f5f0",
    icon: ImageIcon,
    isCream: false,
  },
  {
    id: "equipe-motaba3a",
    bg: "#e3e3db",
    border: "rgba(13, 13, 13, 0.25)",
    accent: "#0d0d0d",
    textColor: "#0d0d0d",
    icon: HeartHandshake,
    isCream: true,
  },
];

export default function StickyDeck() {
  const rootRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const { lang, isRTL } = useLanguage();
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = cardsRef.current.filter(Boolean);
    const total = cards.length;
    const segments = total - 1;

    const layout = (progress: number) => {
      const p = progress * segments;
      const activeIndex = Math.min(Math.floor(p), segments - 1);
      const segProgress = p - activeIndex;

      cards.forEach((card, i) => {
        if (i < activeIndex) {
          gsap.set(card, {
            yPercent: -180,
            rotationX: 30,
            scale: 0.9,
            autoAlpha: 0,
            pointerEvents: "none",
            zIndex: 0,
          });
        } else if (i === activeIndex) {
          const y = gsap.utils.interpolate(-50, -180, segProgress);
          const rot = gsap.utils.interpolate(0, 30, segProgress);
          const sc = gsap.utils.interpolate(1, 0.92, segProgress);
          const alpha = gsap.utils.interpolate(1, 0, Math.min(1, segProgress * 1.25));

          gsap.set(card, {
            yPercent: y,
            rotationX: rot,
            scale: sc,
            autoAlpha: alpha,
            pointerEvents: segProgress > 0.8 ? "none" : "auto",
            zIndex: 30,
          });
        } else if (i === activeIndex + 1) {
          const tProgress = segProgress;
          const y = gsap.utils.interpolate(-44, -50, tProgress);
          const sc = gsap.utils.interpolate(0.95, 1, tProgress);
          const alpha = gsap.utils.interpolate(0.85, 1, tProgress);

          gsap.set(card, {
            yPercent: y,
            rotationX: 0,
            scale: sc,
            autoAlpha: alpha,
            pointerEvents: tProgress > 0.5 ? "auto" : "none",
            zIndex: 20,
          });
        } else {
          gsap.set(card, {
            yPercent: -40,
            rotationX: 0,
            scale: 0.9,
            autoAlpha: 0,
            pointerEvents: "none",
            zIndex: 0,
          });
        }
      });
    };

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        gsap.set(card, {
          x: 0,
          y: 0,
          xPercent: -50,
          transformOrigin: "center bottom",
          zIndex: total - i,
          force3D: true,
        });
      });

      layout(0);

      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "+=500vh",
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => layout(self.progress),
        onRefresh: (self) => layout(self.progress),
      });
    }, root);

    return () => {
      ctx.revert();
      gsap.set(cards, { clearProps: "all" });
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="expertise"
      aria-labelledby="deck-title"
      className="relative h-svh overflow-hidden bg-ink"
      style={{ perspective: "1200px" }}
    >
      {/* Header overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-50 flex items-start justify-between gap-6 px-5 pt-6 md:px-10 md:pt-10">
        <div>
          <span className="mono mb-2 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3 py-1 text-lime">
            <Sparkles size={13} />
            {t.deck.kicker}
          </span>
          <h2
            id="deck-title"
            className="display max-w-[16ch] text-3xl text-cream sm:text-4xl md:text-5xl"
          >
            {t.deck.heading}
          </h2>
        </div>
        <p className="mono hidden max-w-[24ch] text-right text-cream-dim md:block">
          {t.deck.scrollHint}
        </p>
      </div>

      {/* Cards stack */}
      {t.deck.cards.map((card, i) => {
        const style = CARD_STYLES[i] || CARD_STYLES[0];
        const Icon = style.icon;
        const isCream = style.isCream;

        return (
          <article
            key={card.step}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            aria-label={card.title}
            className="absolute left-1/2 top-[54%] flex h-[70svh] max-h-[640px] w-[min(92vw,680px)] flex-col justify-between overflow-hidden rounded-[24px] border p-6 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)] md:h-[68svh] md:p-8"
            style={{
              backgroundColor: style.bg,
              borderColor: style.border,
              color: style.textColor,
              transform: `translate(-50%, -50%)`,
              transformOrigin: "center bottom",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Card top */}
            <div>
              <div
                className="flex items-center justify-between border-b pb-4"
                style={{ borderColor: isCream ? "rgba(13,13,13,0.12)" : "rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="mono rounded-full border px-3 py-1 text-[0.7rem]"
                    style={{
                      borderColor: isCream ? "rgba(13,13,13,0.2)" : style.border,
                      color: style.textColor,
                    }}
                  >
                    {card.step}
                  </span>
                  <span
                    className="mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold"
                    style={{
                      backgroundColor: style.accent,
                      color: isCream ? "#e3e3db" : "#0d0d0d",
                    }}
                  >
                    <Icon size={12} strokeWidth={2.5} />
                    {card.badge}
                  </span>
                </div>
                <span
                  className="mono text-[0.75rem]"
                  style={{ color: isCream ? "rgba(13,13,13,0.5)" : "rgba(227,227,219,0.5)" }}
                >
                  {i + 1} / {t.deck.cards.length}
                </span>
              </div>

              {/* Title & subtitle */}
              <div className="mt-5">
                <h3 className="display text-3xl leading-[1.0] sm:text-4xl md:text-5xl">
                  {card.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed sm:text-[0.95rem]"
                  style={{ color: isCream ? "rgba(13,13,13,0.75)" : "rgba(227,227,219,0.7)" }}
                >
                  {card.subtitle}
                </p>
              </div>

              {/* Points list */}
              <ul className="mt-5 grid gap-2.5">
                {card.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-xs sm:text-[0.88rem]">
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0"
                      style={{ color: style.accent }}
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card footer */}
            <div
              className="mt-4 border-t pt-4"
              style={{ borderColor: isCream ? "rgba(13,13,13,0.12)" : "rgba(255,255,255,0.08)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="mono rounded-md px-2 py-1 text-[0.66rem]"
                      style={{
                        backgroundColor: isCream ? "rgba(13,13,13,0.07)" : "rgba(255,255,255,0.06)",
                        color: style.textColor,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={whatsappLink(card.whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-transform hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: style.accent,
                    color: isCream ? "#e3e3db" : "#0d0d0d",
                  }}
                >
                  {t.deck.askQuote}
                  <ArrowUpRight size={14} className={isRTL ? "rotate-[-90deg]" : ""} />
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
