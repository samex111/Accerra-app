import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { StatsReveal } from "@/components/sections/StatsReveal";
import { Problem } from "@/components/sections/Problem";
import { BentoFeatures } from "@/components/sections/BentoFeatures";
import { FocusRecovery } from "@/components/sections/FocusRecovery";
import { AIMemory } from "@/components/sections/AIMemory";
import { Research } from "@/components/sections/Research";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export default function LandingPage() {
  return (
    <main className="bg-[#060810]">
      <Navbar />
      <Hero />
      <StatsReveal />
      <Problem />
      <BentoFeatures />
      <FocusRecovery />
      <AIMemory />
      <Research />
      <FinalCTA />
      <Footer />
    </main>
  );
}
