"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Leaf } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { fadeUp, floatY } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function FocusRecovery() {
  return (
    <SectionWrapper theme="light" className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <motion.h4
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-[#111827]/40 text-sm uppercase tracking-widest font-medium"
          >
            Soft Intelligence
          </motion.h4>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl md:text-5xl font-light tracking-tight text-[#111827]"
          >
            Focus without <br />
            pressure.
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-xl text-[#111827]/60 font-light leading-relaxed max-w-md"
          >
            Accerra helps students recover focus during difficult study sessions
            without guilt. We detect distraction before it turns into
            frustration.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div
            variants={floatY}
            animate="animate"
            className="bg-[#FFF8EC] border border-amber-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[220px]"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-4">
                <Clock size={20} />
              </div>
              <h3 className="text-lg font-medium text-amber-900 mb-2">
                Distraction detected
              </h3>
              <p className="text-sm text-amber-700/70 font-light">
                You've been off-task for 8 minutes. Ready to jump back in?
              </p>
            </div>
            <button className="w-full py-2 bg-amber-900 text-white rounded-full text-sm font-medium hover:bg-amber-950 transition-colors mt-4">
              Start recovery
            </button>
          </motion.div>

          <motion.div
            variants={floatY}
            animate="animate"
            className="bg-[#F0FFF4] border border-green-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[220px]"
            style={{ animationDelay: "1s" }}
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4">
                <Leaf size={20} />
              </div>
              <h3 className="text-lg font-medium text-green-900 mb-2">
                Recovery active
              </h3>
              <p className="text-sm text-green-700/70 font-light mb-4">
                Light session. 12 min focused. Keep the momentum.
              </p>
              <div className="h-1.5 w-full bg-green-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "40%" }}
                  className="h-full bg-green-500"
                />
              </div>
            </div>
            <div className="mt-4 text-[10px] text-green-700 uppercase tracking-widest font-bold">
              40% Progress
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
