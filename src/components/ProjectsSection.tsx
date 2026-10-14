import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, ChevronUp, ChevronDown, ArrowDown } from 'lucide-react';

export interface ProjectData {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  link: string;
  description: string;
}

const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'air-froid-expert',
    title: 'Air Froid Expert',
    category: 'CVC & Froid Industriel',
    year: '2024',
    image: 'https://motionsites.ai/assets/hero-automation-machines-preview-DlTveRIN.gif',
    link: 'https://airfroidexpert.ma',
    description: 'Plateforme web CVC & froid industriel, orientée acquisition de prospects et devis rapides.',
  },
  {
    id: 'vibekech',
    title: 'VibeKech Marrakech',
    category: 'Lifestyle & Réservations',
    year: '2024',
    image: 'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
    link: 'https://vibekech.com',
    description: 'Écosystème digital pour la découverte et réservations lifestyle à Marrakech.',
  },
  {
    id: 'qualyx-jaam',
    title: 'JAAM & Qualyx',
    category: 'Portails & Solutions SaaS',
    year: '2023',
    image: 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
    link: 'https://jaam-qualyx.fr',
    description: 'Portails d’entreprise et solutions informatiques avec conversion optimale.',
  },
  {
    id: 'velorah-luxe',
    title: 'Velorah Studio',
    category: 'Luxe & Haute Horlogerie',
    year: '2024',
    image: 'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
    link: 'https://velorah-horlogerie.com',
    description: 'Boutique en ligne haut de gamme avec immersion visuelle et catalogue interactif.',
  },
  {
    id: 'orbit-fintech',
    title: 'Orbit Solutions',
    category: 'Fintech & Web3 Studio',
    year: '2025',
    image: 'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
    link: 'https://orbit-fintech.io',
    description: 'Interface interactive moderne pour solutions de paiement et transactions sécurisées.',
  },
];

const CONFIG = {
  LERP_FACTOR: 0.08,
  BUFFER_SIZE: 5,
  MINIMAP_HEIGHT: 250,
  WHEEL_COOLDOWN: 450, // ms between scroll transitions
  WHEEL_THRESHOLD: 25, // px accumulated before triggering slide transition
};

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const projectListRef = useRef<HTMLUListElement | null>(null);
  const minimapPreviewRef = useRef<HTMLDivElement | null>(null);
  const minimapInfoListRef = useRef<HTMLDivElement | null>(null);

  const [activeProject, setActiveProject] = useState<ProjectData>(PROJECTS_DATA[0]);
  const [activeNumber, setActiveNumber] = useState<string>('01');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Programmatic jump to project index
  const goToProjectRef = useRef<(indexDelta: number) => void>(() => {});
  const jumpToIndexRef = useRef<(targetIndex: number) => void>(() => {});

  useEffect(() => {
    const container = containerRef.current;
    const projectList = projectListRef.current;
    const minimapPreview = minimapPreviewRef.current;
    const minimapInfoList = minimapInfoListRef.current;

    if (!container || !projectList || !minimapPreview || !minimapInfoList) return;

    let projectHeight = container.clientHeight || window.innerHeight;
    const minimapHeight = CONFIG.MINIMAP_HEIGHT;

    let currentY = 0;
    let targetY = 0;
    let targetIndex = 0;
    let frameId: number;

    const projectsMap = new Map<number, { el: HTMLElement; updateParallax: (scroll: number, idx: number) => void }>();
    const minimapMap = new Map<number, { el: HTMLElement; updateParallax: (scroll: number, idx: number) => void }>();
    const minimapInfoMap = new Map<number, { el: HTMLElement }>();

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const getProjectData = (index: number) => {
      const n = PROJECTS_DATA.length;
      const wrapped = (((index % n) + n) % n);
      const data = PROJECTS_DATA[wrapped];
      const number = String(wrapped + 1).padStart(2, '0');
      return { ...data, number, wrappedIndex: wrapped };
    };

    const createParallax = (img: HTMLImageElement, height: number) => {
      let current = 0;
      return (scroll: number, index: number) => {
        const target = (-scroll - index * height) * 0.2;
        current = lerp(current, target, 0.1);
        if (Math.abs(current - target) > 0.01) {
          img.style.transform = `translateY(${current}px) scale(1.5)`;
        }
      };
    };

    const createElement = (index: number) => {
      const data = getProjectData(index);

      // 1. Full-screen project slide
      if (!projectsMap.has(index)) {
        const li = document.createElement('li');
        li.className = 'absolute top-0 left-0 w-full h-full overflow-hidden select-none pointer-events-auto cursor-pointer';
        li.setAttribute('data-index', String(index));

        const img = document.createElement('img');
        img.src = data.image;
        img.alt = data.title;
        img.className = 'w-full h-full object-cover relative transform scale-150 will-change-transform';
        img.loading = 'eager';

        // Dark gradient overlay for deep contrast & text readability
        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/65 pointer-events-none';

        // Slide title watermark
        const titleBadge = document.createElement('div');
        titleBadge.className = 'absolute bottom-8 left-8 sm:bottom-12 sm:left-12 z-10 flex flex-col gap-1 text-white/90 drop-shadow-md';
        titleBadge.innerHTML = `
          <span class="text-xs font-mono tracking-widest uppercase opacity-75">${data.number} • ${data.category} (${data.year})</span>
          <h2 class="text-2xl sm:text-4xl font-semibold tracking-tight text-white flex items-center gap-2">
            ${data.title}
          </h2>
          <p class="text-xs sm:text-sm text-white/70 max-w-md hidden sm:block">${data.description}</p>
        `;

        li.appendChild(img);
        li.appendChild(overlay);
        li.appendChild(titleBadge);

        // Click slide to open project
        li.addEventListener('click', () => {
          window.open(data.link, '_blank', 'noopener,noreferrer');
        });

        projectList.appendChild(li);
        const updateParallax = createParallax(img, projectHeight);
        projectsMap.set(index, { el: li, updateParallax });
      }

      // 2. Miniature minimap preview image
      if (!minimapMap.has(index)) {
        const miniItem = document.createElement('div');
        miniItem.className = 'absolute top-0 left-0 w-full h-full overflow-hidden will-change-transform';

        const miniImg = document.createElement('img');
        miniImg.src = data.image;
        miniImg.alt = data.title;
        miniImg.className = 'w-full h-full object-cover relative transform scale-150 will-change-transform';

        miniItem.appendChild(miniImg);
        minimapPreview.appendChild(miniItem);

        const updateParallax = createParallax(miniImg, minimapHeight);
        minimapMap.set(index, { el: miniItem, updateParallax });
      }

      // 3. Minimap text info card
      if (!minimapInfoMap.has(index)) {
        const info = document.createElement('div');
        info.className = 'absolute top-0 left-0 w-full h-[250px] flex flex-col justify-between p-2 sm:p-4 will-change-transform';

        // Row 1: Number (left) & Title (right)
        const row1 = document.createElement('div');
        row1.className = 'w-full flex items-center justify-between text-xs sm:text-sm font-semibold tracking-tight uppercase text-[#051A24] border-b border-slate-100 pb-2';
        row1.innerHTML = `
          <span class="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded-none text-[#051A24] font-bold">${data.number}</span>
          <span class="text-right truncate max-w-[50%] font-bold">${data.title}</span>
        `;

        // Row 2: Category (left) & Year (right)
        const row2 = document.createElement('div');
        row2.className = 'w-full flex items-center justify-between text-xs font-medium uppercase text-slate-500 pt-2 border-t border-slate-100';
        row2.innerHTML = `
          <span class="truncate max-w-[65%] text-[11px] sm:text-xs">${data.category}</span>
          <span class="font-mono text-[11px] sm:text-xs">${data.year}</span>
        `;

        info.appendChild(row1);
        info.appendChild(row2);
        minimapInfoList.appendChild(info);

        minimapInfoMap.set(index, { el: info });
      }
    };

    const syncElements = (centerIndex: number) => {
      const min = centerIndex - CONFIG.BUFFER_SIZE;
      const max = centerIndex + CONFIG.BUFFER_SIZE;

      for (let i = min; i <= max; i++) {
        createElement(i);
      }

      // Remove out-of-window elements
      projectsMap.forEach((item, index) => {
        if (index < min || index > max) {
          item.el.remove();
          projectsMap.delete(index);
        }
      });

      minimapMap.forEach((item, index) => {
        if (index < min || index > max) {
          item.el.remove();
          minimapMap.delete(index);
        }
      });

      minimapInfoMap.forEach((item, index) => {
        if (index < min || index > max) {
          item.el.remove();
          minimapInfoMap.delete(index);
        }
      });
    };

    const updatePositions = () => {
      const minimapY = (currentY * minimapHeight) / projectHeight;

      projectsMap.forEach(({ el, updateParallax }, index) => {
        el.style.transform = `translateY(${index * projectHeight + currentY}px)`;
        updateParallax(currentY, index);
      });

      minimapMap.forEach(({ el, updateParallax }, index) => {
        el.style.transform = `translateY(${index * minimapHeight + minimapY}px)`;
        updateParallax(minimapY, index);
      });

      minimapInfoMap.forEach(({ el }, index) => {
        el.style.transform = `translateY(${index * minimapHeight + minimapY}px)`;
      });
    };

    let lastKnownCenter = 0;

    const animate = () => {
      // Smooth lerp toward target scroll position
      currentY += (targetY - currentY) * CONFIG.LERP_FACTOR;

      const centerIndex = Math.round(-currentY / projectHeight);
      if (centerIndex !== lastKnownCenter) {
        lastKnownCenter = centerIndex;
        const currentData = getProjectData(centerIndex);
        setActiveProject(currentData);
        setActiveNumber(currentData.number);
        setActiveIndex(currentData.wrappedIndex);
      }

      syncElements(centerIndex);
      updatePositions();

      frameId = requestAnimationFrame(animate);
    };

    // Pre-seed window
    syncElements(0);
    frameId = requestAnimationFrame(animate);

    // =========================================================
    // SCROLL TRANSITION ENGINE (Wheel / Trackpad / Gestures)
    // =========================================================
    let accumulatedDelta = 0;
    let lastTransitionTime = 0;

    const handleWheel = (e: WheelEvent) => {
      const now = performance.now();
      accumulatedDelta += e.deltaY;

      // Threshold check to avoid accidental jitter
      if (Math.abs(accumulatedDelta) < CONFIG.WHEEL_THRESHOLD) {
        return;
      }

      // Transition cooldown: ensure clean 1-by-1 step on mouse wheel or trackpad
      if (now - lastTransitionTime < CONFIG.WHEEL_COOLDOWN) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const direction = accumulatedDelta > 0 ? 1 : -1;
      accumulatedDelta = 0;
      lastTransitionTime = now;

      // Advance by 1 project with smooth scroll transition
      targetIndex += direction;
      targetY = -targetIndex * projectHeight;
    };

    // Touch swipe support (Mobile)
    let touchStartY = 0;
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY - e.changedTouches[0].clientY;
      const deltaX = touchStartX - e.changedTouches[0].clientX;

      // Ensure vertical swipe
      if (Math.abs(deltaY) > 35 && Math.abs(deltaY) > Math.abs(deltaX)) {
        const direction = deltaY > 0 ? 1 : -1;
        targetIndex += direction;
        targetY = -targetIndex * projectHeight;
      }
    };

    // Mouse drag support
    let isMouseDown = false;
    let dragStartY = 0;
    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('button, a')) return;
      isMouseDown = true;
      dragStartY = e.clientY;
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const delta = dragStartY - e.clientY;
      if (Math.abs(delta) > 40) {
        const direction = delta > 0 ? 1 : -1;
        targetIndex += direction;
        targetY = -targetIndex * projectHeight;
      }
    };

    const handleResize = () => {
      projectHeight = container.clientHeight || window.innerHeight;
      targetY = -targetIndex * projectHeight;
      currentY = targetY;
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);

    // Programmatic step triggers
    goToProjectRef.current = (indexDelta: number) => {
      targetIndex += indexDelta;
      targetY = -targetIndex * projectHeight;
    };

    jumpToIndexRef.current = (idx: number) => {
      const currentWrapped = (((targetIndex % PROJECTS_DATA.length) + PROJECTS_DATA.length) % PROJECTS_DATA.length);
      const diff = idx - currentWrapped;
      targetIndex += diff;
      targetY = -targetIndex * projectHeight;
    };

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);

      projectsMap.forEach((item) => item.el.remove());
      minimapMap.forEach((item) => item.el.remove());
      minimapInfoMap.forEach((item) => item.el.remove());
      projectsMap.clear();
      minimapMap.clear();
      minimapInfoMap.clear();
    };
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[640px] max-h-[1080px] overflow-hidden bg-[#051A24] select-none text-[#051A24]">
      {/* 1. Main Parallax Shell Container */}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {/* Full-screen slides virtual list */}
        <ul ref={projectListRef} className="absolute inset-0 w-full h-full overflow-hidden m-0 p-0 list-none pointer-events-auto" />

        {/* 2. Floating Centered Minimap */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] sm:w-[75%] max-w-[880px] h-[calc(250px+3rem)] bg-white/95 backdrop-blur-md p-4 sm:p-6 overflow-hidden rounded-none shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.2)] z-30 pointer-events-auto flex flex-col justify-between">
          <div className="relative w-full h-full">
            {/* Center miniature filmstrip window */}
            <div
              ref={minimapPreviewRef}
              onClick={() => window.open(activeProject.link, '_blank', 'noopener,noreferrer')}
              title={`Ouvrir ${activeProject.title} en direct`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42%] sm:w-[35%] max-w-[260px] h-full overflow-hidden rounded-none shadow-lg border border-black/10 z-10 cursor-pointer group transition-transform hover:scale-[1.02]"
            >
              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center text-white text-xs font-medium gap-1 pointer-events-none">
                <span>Visiter</span> <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Background text info layer */}
            <div ref={minimapInfoListRef} className="relative w-full h-full overflow-hidden" />
          </div>

          {/* Minimap Bottom Action Bar: Direct Link Button + Dots + Arrows */}
          <div className="w-full pt-3 mt-1 border-t border-slate-100 flex items-center justify-between z-20">
            <a
              href={activeProject.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 bg-[#051A24] text-white hover:bg-[#0D212C] text-xs font-medium rounded-none shadow-xs transition-transform hover:scale-105"
            >
              <span>Visiter le site</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Project Indicator Dots */}
            <div className="hidden sm:flex items-center gap-1.5">
              {PROJECTS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => jumpToIndexRef.current(idx)}
                  className={`h-2 rounded-none transition-all duration-300 ${
                    activeIndex === idx ? 'w-6 bg-[#051A24]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`Aller au projet ${idx + 1}`}
                />
              ))}
            </div>

            {/* Stepper Chevrons */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono text-slate-500 mr-1 sm:mr-2">
                {activeNumber} / 05
              </span>
              <button
                type="button"
                onClick={() => goToProjectRef.current(-1)}
                title="Projet Précédent"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-none bg-slate-100 hover:bg-slate-200 text-[#051A24] transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => goToProjectRef.current(1)}
                title="Projet Suivant"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-none bg-slate-100 hover:bg-slate-200 text-[#051A24] transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Floating Top Section Header Badge */}
        <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30 pointer-events-none">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-black/60 backdrop-blur-md border border-white/15 rounded-none text-white/90 text-xs font-mono uppercase tracking-widest">
            <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
            Scroll Parallaxe • Scroll pour changer de projet
          </span>
        </div>

        {/* 4. Floating Jump to Next Section Button */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 pointer-events-auto">
          <a
            href="#partner"
            onClick={(e) => {
              e.preventDefault();
              const partnerSec = document.querySelector('section:has(input), #partner') || document.querySelector('footer');
              partnerSec?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 hover:bg-white text-[#051A24] backdrop-blur-md rounded-none text-xs font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <span>Section suivante</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
