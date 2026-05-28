"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { scaleIn } from "@/lib/motion";

export function GlassCard({
  children,
  className,
  hoverable = true,
  glow = false,
}) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={cn(
        "bg-white/5 border border-white/8 rounded-3xl p-7 relative overflow-hidden backdrop-blur-sm",
        hoverable &&
          "hover:-translate-y-1 hover:border-white/15 transition-all duration-300",
        glow &&
          "after:absolute after:inset-0 after:bg-gradient-to-br after:from-white/5 after:to-transparent after:pointer-events-none",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}
