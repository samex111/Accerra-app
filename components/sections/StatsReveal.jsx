"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function StatsReveal() {
  return (
    <SectionWrapper className="py-[80px] md:py-[100px] border-y border-white/5">
      <div className="flex justify-center text-center">
        <motion.h2
          initial={{ opacity: 0.15 }}
          whileInView={{ opacity: 0.55 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-[clamp(40px,6vw,80px)] font-light tracking-tight text-white leading-tight"
        >
          12,000+ students in <br className="hidden md:block" />
          early research.
        </motion.h2>
      </div>
    </SectionWrapper>
  );
}
