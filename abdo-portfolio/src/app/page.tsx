import SmoothScroll from "@/components/SmoothScroll";
import HeroTrail from "@/components/HeroTrail";
import StickyDeck from "@/components/StickyDeck";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <HeroTrail />
        <StickyDeck />
        <Services />
        <Projects />
        <Pricing />
      </main>
      <Contact />
    </SmoothScroll>
  );
}
