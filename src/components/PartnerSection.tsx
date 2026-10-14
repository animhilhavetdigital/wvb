import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { getWhatsAppUrl } from '../lib/constants';
import { Cta69 } from './ui/cta69';

interface SpawnedThumbnail {
  id: number;
  x: number;
  y: number;
  rotation: number;
  src: string;
}

const trailImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
  'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
];

export const PartnerSection: React.FC = () => {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLElement>({ threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [thumbnails, setThumbnails] = useState<SpawnedThumbnail[]>([]);
  const lastSpawnTime = useRef<number>(0);
  const imageIndexRef = useRef<number>(0);
  const counterRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (now - lastSpawnTime.current < 90) return;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotation = (Math.random() - 0.5) * 16;
    const src = trailImages[imageIndexRef.current % trailImages.length];
    imageIndexRef.current += 1;
    lastSpawnTime.current = now;

    const newId = ++counterRef.current;
    const item: SpawnedThumbnail = { id: newId, x, y, rotation, src };

    setThumbnails((prev) => [...prev, item]);

    setTimeout(() => {
      setThumbnails((prev) => prev.filter((t) => t.id !== newId));
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      setThumbnails([]);
    };
  }, []);

  return (
    <div
      id="partner"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden select-none"
    >
      {/* Floating Mouse-Trail Thumbnails */}
      {thumbnails.map((item) => (
        <div
          key={item.id}
          className="pointer-events-none absolute z-30 w-28 h-20 md:w-36 md:h-24 rounded-none shadow-2xl overflow-hidden animate-trail-fade border border-white/20"
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
          }}
        >
          <img
            src={item.src}
            alt=""
            className="w-full h-full object-cover rounded-none"
          />
        </div>
      ))}

      {/* Modern Cta69 Component */}
      <div
        ref={sectionRef as any}
        className={`transition-all duration-700 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <Cta69
          badge={{ label: "Studio Digital Maroc • 2025" }}
          heading="Créons un site web qui apporte de vrais clients."
          button={{
            label: "Démarrer sur WhatsApp",
            href: getWhatsAppUrl("Salam l-équipe, bghit n-bda l-projet dyal site web dyali. Wach momkin n-chofo les options?"),
          }}
          labels={{
            marqueePhrase: "CRÉONS VOTRE SITE WEB · NIMHIL DIGITAL STUDIO",
            note: "Design sur-mesure, vitesse éclair, zéro abonnement mensuel et livraison rapide en 7 à 14 jours.",
            footnote: "Paiement unique clé en main • Formation & accompagnement WhatsApp inclus.",
          }}
          className="bg-white py-24 md:py-36 border-t border-slate-200"
        />
      </div>

      <style>{`
        @keyframes trailFade {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.7);
          }
        }
        .animate-trail-fade {
          animation: trailFade 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default PartnerSection;
