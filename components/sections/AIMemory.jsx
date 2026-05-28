"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { fadeUp, stagger } from "@/lib/motion";

const TIMELINE_EVENTS = [
  { date: "May 12", content: "Skipped Thermodynamics 3x this week" },
  { date: "May 15", content: "Strong in Organic Chemistry. Confidence: High" },
  { date: "May 18", content: "Focus breaks at 35-min mark consistently" },
  { date: "May 21", content: "Mock score dropped. Revision gap detected." },
  { date: "May 24", content: "Momentum recovery. 4-day streak." },
];

export function AIMemory() {
  return (
    <SectionWrapper theme="light" className="pt-0">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#111827] mb-4">
            AI that remembers <br />
            how you learn.
          </h2>
          <p className="text-lg text-[#111827]/50 font-light">
            Every session is a data point. Accerra builds a long-term memory of
            your cognitive patterns to optimize your path.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative pl-8"
        >
          {/* Vertical Line */}
          <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#5B8CFF] to-[#A68CFF]" />

          {TIMELINE_EVENTS.map((event, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="relative mb-10 last:mb-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-8"
            >
              <div className="absolute -left-[32px] w-2.5 h-2.5 rounded-full bg-white border-2 border-[#5B8CFF] z-10" />
              <span className="text-xs font-bold text-[#5B8CFF] uppercase tracking-widest min-w-[60px]">
                {event.date}
              </span>
              <div className="bg-white border border-[#111827]/5 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-[#111827]/80 font-light">{event.content}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
