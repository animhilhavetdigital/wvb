"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, CheckCircle2, ShieldCheck, Sparkles, Users } from "lucide-react";
import { WhatsappIcon } from "@/components/BrandIcons";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { TRANSLATIONS } from "@/lib/translations";
import { whatsappLink } from "@/lib/site";

const TRAIL_IMAGES = [
  "/trail/web.jpg",
  "/trail/dashboard.jpg",
  "/trail/responsive.jpg",
  "/trail/marrakech.jpg",
] as const;

const SLICES = 10;
const IMAGE_SIZE = 185;
const DISTANCE_THRESHOLD = 140;
const LIFESPAN_MS = 1050;
const LERP_FACTOR = 0.1;
const OUT_DURATION_MS = 450;
const MAX_OUT_DELAY_MS = 4.5 * 25;

type Point = { x: number; y: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const openPolygon = (startY: number, endY: number) =>
  `polygon(0% ${startY}%, 100% ${startY}%, 100% ${endY}%, 0% ${endY}%)`;

const closedPolygon = (startY: number, endY: number) =>
  `polygon(50% ${startY}%, 50% ${startY}%, 50% ${endY}%, 50% ${endY}%)`;

export default function HeroTrail() {
  const rootRef = useRef<HTMLElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];

  const navItems = [
    { href: "#expertise", label: t.nav.expertise },
    { href: "#services", label: t.nav.services },
    { href: "#work", label: t.nav.work },
    { href: "#pricing", label: t.nav.pricing },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const root = rootRef.current;
    const container = trailRef.current;
    if (!root || !container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (reduceMotion || !finePointer) return;

    TRAIL_IMAGES.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    const mouse: Point = { x: 0, y: 0 };
    const lastSpawn: Point = { x: 0, y: 0 };
    const cursor: Point = { x: 0, y: 0 };
    let hasPointer = false;
    let imageIndex = 0;
    let rafId = 0;
    const timeouts = new Set<number>();

    const schedule = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timeouts.delete(id);
        fn();
      }, ms);
      timeouts.add(id);
    };

    const toLocal = (e: MouseEvent): Point => {
      const rect = container.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const onMouseMove = (e: MouseEvent) => {
      const p = toLocal(e);
      mouse.x = p.x;
      mouse.y = p.y;
      if (!hasPointer) {
        cursor.x = lastSpawn.x = p.x;
        cursor.y = lastSpawn.y = p.y;
        hasPointer = true;
      }
    };

    const onMouseLeave = () => {
      hasPointer = false;
    };

    const spawn = () => {
      const src = TRAIL_IMAGES[imageIndex % TRAIL_IMAGES.length];
      imageIndex += 1;

      const item = document.createElement("div");
      item.className = "trail-img";
      item.style.left = `${cursor.x - IMAGE_SIZE / 2}px`;
      item.style.top = `${cursor.y - IMAGE_SIZE / 2}px`;
      item.style.width = `${IMAGE_SIZE}px`;
      item.style.height = `${IMAGE_SIZE}px`;

      const layers: HTMLDivElement[] = [];
      for (let i = 0; i < SLICES; i++) {
        const startY = i * (100 / SLICES);
        const endY = (i + 1) * (100 / SLICES);
        const layer = document.createElement("div");
        layer.className = "trail-layer";
        layer.style.backgroundImage = `url(${src})`;
        layer.style.clipPath = closedPolygon(startY, endY);
        item.appendChild(layer);
        layers.push(layer);
      }

      container.appendChild(item);
      void item.offsetWidth;

      layers.forEach((layer, i) => {
        const startY = i * (100 / SLICES);
        const endY = (i + 1) * (100 / SLICES);
        layer.style.transitionDelay = `${Math.abs(i - 4.5) * 85}ms`;
        layer.style.clipPath = openPolygon(startY, endY);
      });

      schedule(() => {
        layers.forEach((layer, i) => {
          const startY = i * (100 / SLICES);
          const endY = (i + 1) * (100 / SLICES);
          layer.style.transitionDelay = `${(4.5 - Math.abs(i - 4.5)) * 22}ms`;
          layer.style.clipPath = closedPolygon(startY, endY);
          layer.style.opacity = "0.2";
        });
        schedule(() => item.remove(), OUT_DURATION_MS + MAX_OUT_DELAY_MS + 40);
      }, LIFESPAN_MS);
    };

    const render = () => {
      if (hasPointer) {
        cursor.x = lerp(cursor.x, mouse.x, LERP_FACTOR);
        cursor.y = lerp(cursor.y, mouse.y, LERP_FACTOR);

        const travelled = Math.hypot(
          mouse.x - lastSpawn.x,
          mouse.y - lastSpawn.y,
        );
        if (travelled > DISTANCE_THRESHOLD) {
          spawn();
          lastSpawn.x = mouse.x;
          lastSpawn.y = mouse.y;
        }
      }
      rafId = requestAnimationFrame(render);
    };

    root.addEventListener("mousemove", onMouseMove);
    root.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      root.removeEventListener("mousemove", onMouseMove);
      root.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
      timeouts.forEach((id) => window.clearTimeout(id));
      timeouts.clear();
      container.innerHTML = "";
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col overflow-hidden bg-ink"
    >
      {/* Header */}
      <header className="relative z-40 flex items-center justify-between gap-4 px-5 pt-5 md:px-10 md:pt-7">
        <a
          href="#top"
          className="display flex items-center gap-2 text-2xl tracking-tight text-cream"
          aria-label="Studio Web, retour en haut"
        >
          <span>NIMHIL<span className="text-lime">.</span>WEB</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="mono text-cream-dim transition-colors hover:text-cream"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          <p className="mono hidden sm:flex items-center gap-2 text-cream-dim">
            <span className="relative flex size-2">
              <span className="wa-ring absolute inset-0 rounded-full bg-lime" />
              <span className="relative size-2 rounded-full bg-lime" />
            </span>
            <span>{t.header.status}</span>
          </p>
        </div>
      </header>

      {/* Trail layer */}
      <div
        ref={trailRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20"
      />

      {/* Hero Body */}
      <div className="relative flex flex-1 flex-col justify-end px-5 pb-8 md:px-10 md:pb-10">
        <div className="relative z-30 mb-6 flex flex-wrap items-center gap-2 md:mb-8">
          <span className="mono inline-flex items-center gap-1.5 rounded-full border border-lime/40 bg-lime/10 px-3 py-1 text-xs text-lime">
            <Sparkles size={13} />
            {t.hero.badgeTeam}
          </span>
          <span className="mono inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cream-dim">
            <Users size={13} />
            {t.hero.badgeClients}
          </span>
          <span className="mono inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cream-dim">
            <ShieldCheck size={13} />
            {t.hero.badgeSupport}
          </span>
        </div>

        <h1
          id="hero-title"
          className="display pointer-events-none relative z-30 select-none text-cream mix-blend-difference"
        >
          <span className="block text-[13.5vw] leading-[0.85] md:text-[9.5vw]">
            {t.hero.titleLine1}
          </span>
          <span className="block text-[13.5vw] leading-[0.85] text-lime md:text-[9.5vw]">
            {t.hero.titleLine2}
          </span>
        </h1>

        <div className="relative z-40 mt-8 grid gap-8 border-t border-line pt-6 md:mt-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <p className="display text-2xl font-extrabold leading-[1.08] text-cream sm:text-3xl md:text-4xl">
              {t.hero.subtitleHeading1}
              <br />
              <span className="text-lime">{t.hero.subtitleHeading2}</span>
            </p>
          </div>

          <p className="max-w-md text-[0.95rem] leading-relaxed text-cream-dim md:col-span-4">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap gap-3 md:col-span-3 md:justify-end">
            <a
              id="hero-whatsapp-cta"
              href={whatsappLink(
                lang === "ar"
                  ? "السلام عليكم، بغيت نعرف تفاصيل أكثر ونطلب عرض سعر لمشروع موقع إلكتروني."
                  : lang === "en"
                  ? "Hello, I would like to get a free quote for a professional website."
                  : "Salam l-équipe, bghit n-sawb site web pro b taman mounasib w motaba3a. Wach momkin devis?"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary shadow-lg shadow-lime/20"
            >
              <WhatsappIcon size={18} />
              {t.hero.whatsappCta}
            </a>
            <a id="hero-view-work" href="#work" className="btn btn-ghost">
              {t.hero.viewWork}
              <ArrowDown size={16} strokeWidth={1.75} />
            </a>
          </div>
        </div>

        {/* 4 Trust stats pills */}
        <div className="relative z-40 mt-8 grid grid-cols-2 gap-3 border-t border-line/60 pt-6 sm:grid-cols-4 md:mt-10">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-lime shrink-0" />
            <div>
              <p className="display text-xl text-cream md:text-2xl">{t.hero.stat1Number}</p>
              <p className="mono text-[0.68rem] text-cream-dim">{t.hero.stat1Label}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-lime shrink-0" />
            <div>
              <p className="display text-xl text-cream md:text-2xl">{t.hero.stat2Number}</p>
              <p className="mono text-[0.68rem] text-cream-dim">{t.hero.stat2Label}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-lime shrink-0" />
            <div>
              <p className="display text-xl text-cream md:text-2xl">{t.hero.stat3Number}</p>
              <p className="mono text-[0.68rem] text-cream-dim">{t.hero.stat3Label}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-lime shrink-0" />
            <div>
              <p className="display text-xl text-cream md:text-2xl">{t.hero.stat4Number}</p>
              <p className="mono text-[0.68rem] text-cream-dim">{t.hero.stat4Label}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile static preview strip */}
      <div
        aria-hidden="true"
        className="relative z-10 -mt-2 mb-8 flex gap-2 overflow-hidden px-5 md:hidden"
      >
        {TRAIL_IMAGES.map((src) => (
          <div key={src} className="relative aspect-square w-1/3 shrink-0 rounded-lg overflow-hidden border border-line">
            <Image
              src={src}
              alt=""
              fill
              sizes="33vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
