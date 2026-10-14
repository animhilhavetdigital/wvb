import React from 'react';
import { Quote } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import {
  CinematicLogoCloud,
  LogoCloudClient,
} from './ui/cinematic-logo-cloud';

const techClients: LogoCloudClient[] = [
  { name: 'TypeScript', slug: 'typescript', nameClassName: 'font-semibold text-blue-600' },
  { name: 'JavaScript', slug: 'javascript', nameClassName: 'font-semibold text-yellow-600' },
  { name: 'Python', slug: 'python', nameClassName: 'font-semibold text-amber-600' },
  { name: 'PHP', slug: 'php', nameClassName: 'font-semibold text-indigo-500' },
  { name: 'Next.js', slug: 'nextdotjs', nameClassName: 'font-semibold text-slate-900' },
  { name: 'React', slug: 'react', nameClassName: 'font-semibold text-sky-500' },
  { name: 'Vue.js', slug: 'vuedotjs', nameClassName: 'font-semibold text-emerald-600' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', nameClassName: 'font-semibold text-cyan-600' },
  { name: 'Node.js', slug: 'nodedotjs', nameClassName: 'font-semibold text-emerald-600' },
  { name: 'HTML5', slug: 'html5', nameClassName: 'font-semibold text-orange-600' },
  { name: 'CSS3', slug: 'css3', nameClassName: 'font-semibold text-blue-600' },
  { name: 'PostgreSQL', slug: 'postgresql', nameClassName: 'font-semibold text-indigo-600' },
  { name: 'MySQL', slug: 'mysql', nameClassName: 'font-semibold text-sky-700' },
  { name: 'MongoDB', slug: 'mongodb', nameClassName: 'font-semibold text-green-600' },
  { name: 'WordPress', slug: 'wordpress', nameClassName: 'font-semibold text-sky-800' },
  { name: 'Shopify', slug: 'shopify', nameClassName: 'font-semibold text-emerald-700' },
  { name: 'GSAP', slug: 'greensock', nameClassName: 'font-semibold text-green-600' },
  { name: 'Docker', slug: 'docker', nameClassName: 'font-semibold text-blue-500' },
  { name: 'Git', slug: 'git', nameClassName: 'font-semibold text-red-600' },
];

export const TestimonialSection: React.FC = () => {
  const { ref: sectionRef, isInView } = useInViewAnimation<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24 bg-white flex flex-col items-center text-center overflow-x-hidden"
    >
      {/* Centered Quote Content */}
      <div className="max-w-3xl px-6 mx-auto flex flex-col items-center">
        {/* Quote Icon */}
        <div
          className={`mb-6 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <Quote className="w-6 h-6 text-slate-900" />
        </div>

        {/* Large Quote Text */}
        <h2
          className={`text-[32px] md:text-[40px] lg:text-[44px] leading-[1.15] text-[#0D212C] tracking-tight font-normal mb-5 ${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          ‘Un site web doit être rapide, élégant et surtout apporter de <span className="font-serif">vrais clients</span>’
        </h2>

        {/* Author */}
        <p
          className={`italic text-sm text-[#273C46] mb-8 ${
            isInView ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.3s' }}
        >
          Abdo — Nimhil Digital Studio
        </p>
      </div>

      {/* Full-width Edge-to-Edge Animated Tech Cloud */}
      <div
        className={`w-full overflow-hidden bg-white mt-8 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.4s' }}
      >
        <CinematicLogoCloud
          clients={techClients}
          variant="marquee-named"
          eyebrow="Stack Technique & Technologies Maîtrisées"
          className="w-full bg-white py-4 border-y border-slate-200/80"
        />
      </div>
    </section>
  );
};

export default TestimonialSection;
