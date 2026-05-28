"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp, stagger, floatY } from "@/lib/motion";
import { GradientText } from "@/components/ui/GradientText";
import { FloatingOrb } from "@/components/ui/FloatingOrb";

const PLACEHOLDERS = [
  "I understand concepts but fail in mocks…",
  "I lose focus after difficult questions…",
  "I study daily but still feel behind…",
  "I avoid Physics even when I know I should study…",
];

export function Hero() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-[#060810]">
      {/* Visual DNA: Atmospheric Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 20% 40%, rgba(91,140,255,0.25) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 80% 60%, rgba(166,140,255,0.2) 0%, transparent 60%),
              #060810
            `,
          }}
        />
        {/* SVG Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <FloatingOrb
          color="#5B8CFF"
          size="600px"
          blur="180px"
          position="-top-[200px] -left-[100px]"
          opacity={0.2}
        />
        <FloatingOrb
          color="#A68CFF"
          size="500px"
          blur="160px"
          position="-bottom-[200px] -right-[100px]"
          opacity={0.15}
        />
      </div>
      {/* Hero Illustration */}
      {/* Hero Illustration */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <img
          src="/hero-anime.(1).png"
          alt="Hero"
          className="
  absolute
  top-1/2
  left-1/2
  -translate-x-1/2
  -translate-y-1/2
  w-full h-full
  max-w-none
  object-cover
  opacity-45
  scale-110
  blur-[3px]
"
        />

        {/* Dark overlay */}
        {/* <div className="absolute inset-0 bg-[#060810]/20" /> */}

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#060810] to-transparent" />
      </div>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="max-w-[1200px] mx-auto px-6 relative z-10 text-center flex flex-col items-center"
      >
        {/* <motion.h1
          variants={fadeUp}
          className="text-[clamp(56px,8vw,108px)] font-light tracking-[-0.04em] leading-[0.95] text-white mb-8"
        >
          Built for how students actually <br />
          <GradientText className="font-cormorant-garamond italic">
            learn.
          </GradientText>
        </motion.h1> */}
        <motion.img
          variants={fadeUp}
          src="/accerra-logo-text.png"
          alt="Hero Text"
          className="w-full max-w-sm "
        />

        <motion.p
          variants={fadeUp}
          className="max-w-xl text-lg md:text-xl text-white/60 font-light leading-relaxed mb-10"
        >
          Understand how students actually learn  <br/> 
          not just what they score. <br />
          {/* Instead of forcing students to adapt to the platform,<br />
Accerra aims to adapt the platform to the student */}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <button className="bg-white text-[#060810] px-8 py-4 rounded-full font-medium hover:scale-[1.02] shadow-2xl transition-all">
            Get Early Access
          </button>
          <button className="text-white/60 px-8 py-4 hover:text-white transition-colors">
            Read Whitepaper
          </button>
        </motion.div>

        {/* The Prompt Box */}
        <motion.div variants={fadeUp} className="w-full max-w-4xl relative">
          <div className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-2xl p-6 min-h-[100px] md:min-w-2xl text-left relative overflow-hidden group hover:border-white/20 transition-all duration-500">
            <div className="text-white/40 text-sm mb-2 uppercase tracking-widest font-medium">
              Student Insight
            </div>
            <div className="relative h-12 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={placeholderIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-lg md:text-xl text-white/80 font-light"
                >
                  {PLACEHOLDERS[placeholderIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <button className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white text-[#060810] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all">
              <ArrowUp size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Subtle reflection/glow under prompt box */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-white/5 blur-2xl rounded-full pointer-events-none" />
        </motion.div>
      </motion.div>
    </section>
  );
}
