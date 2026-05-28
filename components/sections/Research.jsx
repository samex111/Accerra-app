"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { fadeUp, stagger } from "@/lib/motion";

const QUOTES = [
  "I study for hours but still feel like I know nothing.",
  "Mock tests make me panic even when I've prepared.",
  "I don't know what to revise. Everything feels important.",
];

export function Research() {
  return (
    <SectionWrapper id="research">
      <div className="text-center mb-20">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl md:text-5xl font-light tracking-tight mb-6"
        >
          Built from real <br className="md:hidden" /> student behavior.
        </motion.h2>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {QUOTES.map((quote, idx) => (
          <GlassCard
            key={idx}
            className="flex flex-col justify-center min-h-[280px]"
          >
            <p className="text-2xl font-cormorant-garamond italic text-white/80 leading-relaxed">
              "{quote}"
            </p>
          </GlassCard>
        ))}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="flex flex-wrap gap-4 justify-center mt-16"
      >
        {[
          "6 months of research",
          "3 academic institutions",
          "12,000+ student conversations",
        ].map((stat) => (
          <div
            key={stat}
            className="text-white/50 border border-white/10 rounded-full px-6 py-2 text-sm font-light backdrop-blur-sm"
          >
            {stat}
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
