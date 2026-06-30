import { Navbar } from "@/components/sections/Navbar";
import { StatsReveal } from "@/components/sections/StatsReveal";
import { Problem } from "@/components/sections/Problem";
import { BentoFeatures } from "@/components/sections/BentoFeatures";
import { FocusRecovery } from "@/components/sections/FocusRecovery";
import { AIMemory } from "@/components/sections/AIMemory";
import { Research } from "@/components/sections/Research";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { HeroSection } from "@/components/hero";
import Image from "next/image";
import AboutAceraa from "@/components/sections/AboutAceraa";
import AboutWordmark from "@/components/sections/AboutAceraa";

export default function LandingPage() {
  return (
    <main className="bg-[#060810]">
      <Navbar />
      <HeroSection
        backgroundSrc="/flower-image-1.png" // also currently empty — needs a real path
        logo={
          <Image
            src="/aceraa-logo.jpeg"
            alt="Aceraa"
            fill
            className="h-10 w-10 p-2 object-contain sm:h-12 sm:w-12"
          />
        }
      />
      <StatsReveal />
      <Problem />
      <BentoFeatures />
      <FocusRecovery />
      <AIMemory />
      <Research />
      <FinalCTA />
      <AboutWordmark></AboutWordmark>
      <Footer />
    </main>
  );
}
