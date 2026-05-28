"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { fadeUp } from "@/lib/motion";

export function Problem() {
  return (
    <SectionWrapper id="vision">
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12 md:gap-24 items-start">
        <motion.h3
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-4xl md:text-6xl font-light leading-[1.1] tracking-tight"
        >
          Most students don't <br />
          <span className="font-cormorant-garamond italic text-[#A68CFF]">
            fail
          </span>{" "}
          because of <br />
          lack of content.
        </motion.h3>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-col gap-6 pt-2 md:pt-4"
        >
          <p className="text-xl text-white/60 font-light leading-relaxed">
            Information is everywhere. The bottleneck isn't the data—it's the
            delivery, the focus, and the emotional resilience required to
            sustain long-term preparation.
          </p>
          <p className="text-xl text-white/60 font-light leading-relaxed">
            Accerra monitors the "how" of learning. We track the silent
            breakdowns that lead to burnout before they happen.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
