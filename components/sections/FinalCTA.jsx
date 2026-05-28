"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { fadeUp } from "@/lib/motion";
import { GradientText } from "@/components/ui/GradientText";

export function FinalCTA() {
  return (
    <SectionWrapper
      noPadding
      className="py-24 md:py-32 overflow-hidden relative"
    >
      {/* Visual DNA: Massive radial glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 80% at 50% 50%, rgba(91,140,255,0.12) 0%, transparent 70%),
            #060810
          `,
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl md:text-7xl font-light tracking-tight mb-8"
        >
          Education needs <br />
          <GradientText className="font-cormorant-garamond italic">
            intelligence
          </GradientText>{" "}
          infrastructure.
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-xl md:text-2xl text-white/60 font-light mb-12 leading-relaxed"
        >
          The future of learning is not more content.{" "}
          <br className="hidden md:block" />
          It is systems that understand how humans learn.
        </motion.p>

        <motion.button
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="bg-white text-[#060810] px-10 py-5 rounded-full text-lg font-medium hover:scale-[1.03] transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95"
        >
          Join the vision →
        </motion.button>
      </div>
    </SectionWrapper>
  );
}
