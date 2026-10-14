import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import { getWhatsAppUrl } from '../lib/constants';
import { LogoCloud } from './ui/logo-cloud-2';

interface CardItem {
  img: string;
  label: string;
  year: string;
}

const cardItems: CardItem[] = [
  { img: '/po/hero-1.png', label: 'VibeKech', year: '2026' },
  { img: '/po/hero-2.png', label: 'Riad Kasbah', year: '2025' },
  { img: '/po/hero-3.png', label: 'Air Froid', year: '2025' },
  { img: '/po/hero-4.png', label: 'Atlas Desert', year: '2026' },
  { img: '/po/hero-5.png', label: 'Villa Palmeraie', year: '2024' },
  { img: '/po/hero-6.png', label: 'Qualyx Group', year: '2025' },
  { img: '/po/hero-7.png', label: 'Nomad Tours', year: '2026' },
  { img: '/po/hero-8.png', label: 'Marrakech Craft', year: '2025' },
  { img: '/po/hero-9.png', label: 'Dar Medina', year: '2024' },
  { img: '/po/hero-10.png', label: 'Jaam Tech', year: '2025' },
  { img: '/po/hero-11.png', label: 'Oasis Camp', year: '2026' },
  { img: '/po/hero-12.png', label: 'Studio Kech', year: '2025' },
  { img: '/po/hero-13.png', label: 'Souk Artisan', year: '2024' },
  { img: '/po/hero-14.png', label: 'Majorelle Concept', year: '2025' },
  { img: '/po/hero-15.png', label: 'Palais Secret', year: '2026' },
  { img: '/po/hero-16.png', label: 'Gueliz Digital', year: '2025' },
  { img: '/po/hero-17.png', label: 'Sahara Glamping', year: '2026' },
  { img: '/po/hero-18.png', label: 'Atlas Hikes', year: '2024' },
  { img: '/po/hero-19.png', label: 'Kech Living', year: '2025' },
  { img: '/po/hero-20.png', label: 'Riad Al Nour', year: '2026' },
  { img: '/po/hero-21.png', label: 'Morocco Voyage', year: '2025' },
  { img: '/po/hero-22.png', label: 'Urban Escape', year: '2024' },
  { img: '/po/hero-23.png', label: 'Kasbah Sunset', year: '2026' },
  { img: '/po/hero-24.png', label: 'Kech Foodies', year: '2025' },
  { img: '/po/hero-25.png', label: 'Terra Excursion', year: '2026' },
  { img: '/po/hero-26.png', label: 'Maison Chic', year: '2025' },
  { img: '/po/hero-27.png', label: 'Medina Escape', year: '2024' },
  { img: '/po/hero-28.png', label: 'Desert Quad', year: '2026' },
  { img: '/po/hero-29.png', label: 'Agafay Luxury', year: '2025' },
  { img: '/po/hero-30.png', label: 'Boutique Riad', year: '2026' },
  { img: '/po/hero-31.png', label: 'Dune Sunset', year: '2025' },
  { img: '/po/hero-32.png', label: 'Kech Creators', year: '2026' },
];

export const IngamanaScrollHero: React.FC = () => {
  const projectsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = projectsRef.current;
    if (!section) return;

    const rows = Array.from(section.querySelectorAll<HTMLElement>('.projects-row'));
    if (rows.length === 0) return;

    // 1) Smooth-scroll wiring: Lenis driven by the GSAP ticker
    const lenis = new Lenis({ autoRaf: false });
    const pumpLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(pumpLenis);
    gsap.ticker.lagSmoothing(0);

    // 2) Cache breakpoint and start/end widths
    const isMobile = () => window.innerWidth < 1000;
    let rowStartWidth = isMobile() ? 250 : 125;
    let rowEndWidth = isMobile() ? 750 : 500;

    // 3) Pre-compute and lock the section's full-expanded height
    const updateSectionHeight = () => {
      const firstRow = rows[0];
      if (!firstRow) return;

      firstRow.style.width = `${rowEndWidth}%`;
      const expandedRowHeight = firstRow.offsetHeight;
      firstRow.style.width = '';

      const sectionGap = parseFloat(getComputedStyle(section).gap) || 0;
      const sectionPadding = parseFloat(getComputedStyle(section).paddingTop) || 0;

      const expandedSectionHeight =
        expandedRowHeight * rows.length +
        sectionGap * (rows.length - 1) +
        sectionPadding * 2;

      section.style.height = `${expandedSectionHeight}px`;
    };

    updateSectionHeight();

    // 4) Per-frame ticker callback
    const onScrollUpdate = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      rows.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const rowTop = rect.top + scrollY;
        const rowBottom = rowTop + rect.height;

        const scrollStart = rowTop - viewportHeight;
        const scrollEnd = rowBottom;

        let progress = (scrollY - scrollStart) / (scrollEnd - scrollStart);
        progress = Math.max(0, Math.min(1, progress));

        const width = rowStartWidth + (rowEndWidth - rowStartWidth) * progress;
        row.style.width = `${width}%`;
      });
    };

    gsap.ticker.add(onScrollUpdate);

    // 5) Resize handler
    const handleResize = () => {
      const isMobileNow = isMobile();
      rowStartWidth = isMobileNow ? 250 : 125;
      rowEndWidth = isMobileNow ? 750 : 500;
      updateSectionHeight();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      gsap.ticker.remove(onScrollUpdate);
      gsap.ticker.remove(pumpLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="ingamana-wrapper">
      {/* 1. INTRO SECTION (full-screen, clean white, centered hero) */}
      <section className="intro min-h-[100svh] bg-white text-[#051A24] flex items-center justify-center py-16 md:py-24 px-6 sm:px-10">
        <div className="max-w-4xl w-full text-center flex flex-col items-center mx-auto select-none">
          {/* Main Headline */}
          <h1 className="text-[24px] sm:text-[30px] md:text-[36px] lg:text-[42px] font-bold text-[#0D212C] tracking-tight leading-[1.2] mb-5 max-w-4xl mx-auto">
            <span className="block sm:whitespace-nowrap">A website that turns visitors into direct</span>
            <span className="block sm:whitespace-nowrap">booking requests on your WhatsApp.</span>
          </h1>

          {/* Subparagraph description */}
          <p className="text-sm sm:text-base md:text-[16px] text-[#334155] leading-relaxed font-normal mb-7 max-w-lg mx-auto">
            Designed for Marrakech tour operators, riads, and local businesses. Showcase your authentic offers and receive direct booking inquiries straight on WhatsApp.
          </p>

          {/* Buttons row */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-5">
            <a
              href={getWhatsAppUrl("Salam, I would like to get a free website audit for my business.")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#051A24] text-white font-medium text-xs sm:text-sm px-6 py-3 rounded-none hover:bg-[#082330] transition-all shadow-md active:scale-98"
            >
              Get my free website audit
            </a>
            <a
              href="#work"
              className="bg-white text-[#051A24] border border-[#051A24]/20 font-medium text-xs sm:text-sm px-6 py-3 rounded-none hover:bg-slate-50 transition-all shadow-sm active:scale-98"
            >
              See live client sites
            </a>
          </div>

          {/* Direct WhatsApp link */}
          <div className="mb-7">
            <a
              href={getWhatsAppUrl("Salam, I have a question regarding a website for my business.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#059669] hover:underline font-mono font-medium"
            >
              <span className="w-2 h-2 rounded-none bg-[#10b981] animate-pulse"></span>
              Ask me on WhatsApp
            </a>
          </div>

          {/* Pricing promise & guarantee */}
          <div className="border-t border-slate-200/80 pt-6 max-w-xl w-full text-center">
            <p className="text-xs sm:text-sm text-[#0D212C] font-semibold mb-2">
              Websites from 4,000 MAD (4 000 DH), paid once, no monthly website fee. Usually live in 7–14 days after I receive your content.
            </p>
            <p className="text-[11px] sm:text-xs text-[#64748b] leading-relaxed max-w-lg mx-auto">
              Free, zero-commitment audit: send your current website link, your Instagram, or just your Google Maps profile, and I will show you in plain language where potential customers drop off and what I would fix first. If you do not need a new website, I will tell you honestly.
            </p>
          </div>

          {/* Scroll hint */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs font-mono uppercase text-[#64748b]">
            <span>Scroll down to explore our work</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </section>

      {/* 2. PROJECTS SECTION (10 rows × 9 cards = 90 cards total) */}
      <section ref={projectsRef} className="projects">
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="projects-row">
            {Array.from({ length: 9 }).map((_, colIndex) => {
              const itemIndex = (rowIndex * 9 + colIndex) % cardItems.length;
              const item = cardItems[itemIndex];
              return (
                <div key={`card-${rowIndex}-${colIndex}`} className="project">
                  <div className="project-img">
                    <img
                      src={item.img}
                      alt={item.label}
                      loading="lazy"
                    />
                  </div>
                  <div className="project-info">
                    <p>{item.label}</p>
                    <p>{item.year}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </section>

      {/* 3. OUTRO SECTION (full-screen, centered) */}
      <section className="outro">
        <div className="flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl w-full mx-auto select-none">
          <div className="max-w-xl flex flex-col items-center">
            <p className="font-mono text-xs uppercase tracking-widest text-[#3a4034] mb-3">
              Projets & Tarifs
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#20241c] mb-6 font-normal tracking-tight">
              Prêt à lancer votre prochain site ?
            </h2>
            <p className="text-sm text-[#3a4034] leading-relaxed mb-8 max-w-md">
              Sites web sur-mesure dès 4 000 DH (4,000 MAD) • Paiement unique, zéro abonnement mensuel, accompagnement continu.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppUrl("Salam, bghit n-hdro 3la site web b taman 4 000 DH.")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#20241c] text-[#f2efe6] px-8 py-3.5 rounded-none text-xs font-mono uppercase tracking-wider shadow-lg hover:bg-[#3a4034] transition-all"
              >
                Commander sur WhatsApp
              </a>
              <a
                href="#services"
                className="bg-transparent text-[#20241c] border border-[#20241c]/30 px-8 py-3.5 rounded-none text-xs font-mono uppercase tracking-wider hover:bg-[#20241c]/5 transition-all"
              >
                Voir les détails des packs ↓
              </a>
            </div>
          </div>

          {/* Companies we collaborate with - Infinite Marquee */}
          <div className="w-full mt-14 sm:mt-16 md:mt-20">
            <h3 className="mb-6 text-center font-medium text-base md:text-xl text-[#3a4034] tracking-tight">
              Companies we{" "}
              <span className="font-semibold text-[#20241c]">collaborate</span> with.
            </h3>
            <LogoCloud />
          </div>
        </div>
      </section>

      <style>{`
        .ingamana-wrapper {
          --paper: #f2efe6;
          --ink: #20241c;
          --olive: #3a4034;
          --acid: #d5e14e;
          background-color: var(--paper);
          color: var(--ink);
          font-family: "Inter", sans-serif;
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .ingamana-wrapper .intro {
          position: relative;
          width: 100%;
          min-height: 100svh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .ingamana-wrapper .outro {
          position: relative;
          width: 100%;
          min-height: 100svh;
          padding: 6rem 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .ingamana-wrapper .projects {
          position: relative;
          width: 100%;
          padding: 0.5rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          overflow: hidden;
        }

        .ingamana-wrapper .projects-row {
          width: 125%;
          display: flex;
          gap: 1rem;
          will-change: width;
        }

        .ingamana-wrapper .project {
          flex: 1;
          aspect-ratio: 7 / 5;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .ingamana-wrapper .project-img {
          flex: 1;
          min-height: 0;
          overflow: hidden;
          background-color: #e4e0d5;
        }

        .ingamana-wrapper .project-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .ingamana-wrapper .project-info {
          display: flex;
          justify-content: space-between;
          padding: 0.25rem 0;
        }

        .ingamana-wrapper .project-info p {
          font-size: 0.75rem;
          font-family: "Space Mono", monospace;
          color: var(--olive);
          text-transform: uppercase;
          font-weight: 500;
          letter-spacing: -0.02rem;
          line-height: 1;
        }
      `}</style>
    </div>
  );
};

export default IngamanaScrollHero;
