"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { GradientText } from "@/components/ui/GradientText";
import { fadeUp, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const ACTIVITY_BARS = [
  { label: "PYQ Solving", pct: 78 },
  { label: "Revision", pct: 65 },
  { label: "Notes", pct: 82 },
  { label: "Focus", pct: 71 },
  { label: "Consistency", pct: 90 },
];

export function BentoFeatures() {
  return (
    <SectionWrapper id="features">
      <div className="text-center mb-16">
        <motion.h4
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-white/40 text-sm uppercase tracking-widest font-medium mb-4"
        >
          Intelligence Layers
        </motion.h4>
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl md:text-5xl font-light tracking-tight"
        >
          How <span className="font-cormorant-garamond italic">Accerra</span>{" "}
          thinks.
        </motion.h2>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 md:auto-rows-[240px]"
      >
        {/* Card 1 — Activity Layer (Large Tall) */}
        <GlassCard className="md:col-span-3 md:row-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div
                className="w-2 h-2 rounded-full bg-[#5B8CFF]"
                style={{ animation: "pulse 2s infinite" }}
              />
              <span className="text-xs font-medium text-[#5B8CFF] uppercase tracking-wider">
                Activity Layer
              </span>
            </div>
            <h3 className="text-2xl font-light mb-4 text-white/90">
              Analyzing 14 days of <br />
              learning patterns...
            </h3>

            <div className="space-y-4 mt-8">
              {ACTIVITY_BARS.map((bar, idx) => (
                <div key={bar.label} className="space-y-1">
                  <div className="flex justify-between text-[10px] text-white/40 uppercase tracking-widest font-medium">
                    <span>{bar.label}</span>
                    <span>{bar.pct}%</span>
                  </div>
                  <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${bar.pct}%` }}
                      transition={{ duration: 1.5, delay: idx * 0.1 }}
                      className="h-full bg-gradient-to-r from-[#5B8CFF] to-[#A68CFF]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-white/40 font-light mt-8">
            Real-time behavior tracking detects deviations in preparation rhythm
            before they impact mock scores.
          </p>
        </GlassCard>

        {/* Card 2 — Intelligence Layer */}
        <GlassCard className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-light mb-6 text-white/90">
              Weakness detected
            </h3>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {Array.from({ length: 16 }).map((_, i) => {
                const isWeak = i === 10 || i === 11 || i === 14 || i === 15;
                return (
                  <div
                    key={i}
                    className={cn(
                      "aspect-square rounded-sm transition-colors duration-500",
                      isWeak
                        ? "bg-amber-400/40 border border-amber-400/50"
                        : "bg-white/5",
                    )}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-xs text-white/60 font-light">
              Subject Breakdown
            </span>
            <span className="text-xs font-medium text-amber-400">
              Physics: High Priority
            </span>
          </div>
        </GlassCard>

        {/* Card 3 — Teaching Layer */}
        <GlassCard className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-light mb-6 text-white/90">
              Recovery path ready
            </h3>
            <div className="space-y-4">
              {[
                { label: "Review thermodynamics notes", done: true },
                { label: "30-min targeted focus session", done: true },
                { label: "Conceptual gap fill: Entropy", done: false },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center border transition-colors",
                      item.done
                        ? "bg-[#8BE28B]/20 border-[#8BE28B]/40"
                        : "border-white/10",
                    )}
                  >
                    {item.done && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8BE28B]" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm font-light",
                      item.done ? "text-white/80" : "text-white/30",
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </SectionWrapper>
  );
}
