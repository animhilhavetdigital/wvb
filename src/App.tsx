import React from 'react';
import { IngamanaScrollHero } from './components/IngamanaScrollHero';
import { TestimonialSection } from './components/TestimonialSection';
import { PricingSection } from './components/PricingSection';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { ProjectsSection } from './components/ProjectsSection';
import { PartnerSection } from './components/PartnerSection';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-[#051A24] selection:bg-[#20241c] selection:text-[#f2efe6] relative pb-20">
      {/* 1. INGAMANA SCROLL HERO: Full-screen intro + 10-row widening image grid + outro */}
      <IngamanaScrollHero />

      {/* 2. SERVICES & PRICING SECTION */}
      <div id="services">
        <PricingSection />
      </div>

      {/* 3. TESTIMONIAL QUOTE SECTION */}
      <TestimonialSection />

      {/* 4. TESTIMONIAL CAROUSEL */}
      <TestimonialCarousel />

      {/* 5. PROJECTS SECTION */}
      <div id="work">
        <ProjectsSection />
      </div>

      {/* 6. PARTNER / CTA SECTION */}
      <PartnerSection />

      {/* 7. FOOTER */}
      <Footer />

      {/* 8. FIXED BOTTOM NAV */}
      <BottomNav />
    </div>
  );
};

export default App;
