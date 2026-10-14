import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

const testimonialsData: Testimonial[] = [
  {
    name: 'Youssef B.',
    role: 'Gérant',
    company: 'Air Froid Expert',
    quote:
      'L’équipe a livré notre site avec une rapidité impressionnante. Dès la première semaine, nous avons reçu plusieurs demandes de devis via WhatsApp. Un travail très propre !',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Sophie Laurent',
    role: 'Directrice',
    company: 'JAAM (France)',
    quote:
      'Une collaboration exemplaire à distance. Le site est ultra-rapide, le design est moderne et nos clients apprécient la simplicité de navigation.',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Karim Tazi',
    role: 'Fondateur',
    company: 'VibeKech Marrakech',
    quote:
      'Ils ont parfaitement compris l’esprit de notre marque. Les visuels, la mise en page et les formulaires fonctionnent impeccablement sur smartphone.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Amina Mansouri',
    role: 'Directrice',
    company: 'Qualyx Solutions',
    quote:
      'Ce qui fait toute la différence, c’est le suivi (motaba3a) après la livraison. Dès qu’on a une question ou mise à jour, l’équipe répond immédiatement sur WhatsApp.',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    name: 'Mehdi Chraibi',
    role: 'Gérant Riad',
    company: 'Médina Marrakech',
    quote:
      'Le site est vraiment sahel f l-isti3mal. Je modifie mes prix et mes photos en deux clics sans aucune compétence technique. Excellent rapport qualité/prix.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

const repeatedTestimonials = [
  ...testimonialsData,
  ...testimonialsData,
  ...testimonialsData,
];

export const TestimonialCarousel: React.FC = () => {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLElement>({ threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [cardWidth, setCardWidth] = useState(427.5);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardWidth(Math.min(window.innerWidth - 48, 427.5));
      } else {
        setCardWidth(427.5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= 10) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex - 5);
    } else if (currentIndex < 5) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex + 5);
    }
  };

  const gap = 24;
  const offset = currentIndex * (cardWidth + gap);

  return (
    <section ref={sectionRef} className="w-full py-20 overflow-hidden">
      {/* Header Row */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:items-end">
        <div className="w-full md:max-w-4xl flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div
            className={isInView ? 'animate-fade-in-up' : 'opacity-0'}
            style={{ animationDelay: '0.1s' }}
          >
            <h2 className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight font-normal">
              Ce que disent nos <span className="font-serif">clients</span>
            </h2>
          </div>

          <div
            className={`flex items-center gap-6 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            {/* Stars & Rating */}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-black text-black"
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-[#0D212C] ml-1">
                Avis Clients 5/5
              </span>
            </div>

            {/* Prev/Next buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Avis précédent"
                className="w-12 h-12 rounded-none border border-[#0D212C]/20 flex items-center justify-center text-[#0D212C] hover:bg-slate-100/70 transition-colors active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Avis suivant"
                className="w-12 h-12 rounded-none border border-[#0D212C]/20 flex items-center justify-center text-[#0D212C] hover:bg-slate-100/70 transition-colors active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Track */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="w-full pl-6 md:pl-16 overflow-visible select-none"
      >
        <div
          onTransitionEnd={handleTransitionEnd}
          className="flex gap-6 will-change-transform"
          style={{
            transform: `translateX(-${offset}px)`,
            transition: isTransitioning
              ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none',
          }}
        >
          {repeatedTestimonials.map((item, index) => {
            return (
              <div
                key={`${item.name}-${index}`}
                style={{ width: `${cardWidth}px`, flexShrink: 0 }}
                className="bg-white rounded-none shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-slate-100/60 px-6 md:pl-10 md:pr-16 py-8 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <svg
                    className="w-8 h-8 text-[#0D212C] mb-6 opacity-80"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <p className="text-base text-[#0D212C] leading-relaxed mb-8">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center pt-2">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-none object-cover mr-4 shadow-sm"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold text-sm text-[#0D212C]">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#273C46] mt-0.5">
                      → {item.role}, {item.company}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
