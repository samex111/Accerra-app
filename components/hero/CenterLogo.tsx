"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface CenterLogoProps {
  /** Pass your own <Image /> or <svg> mark here. */
  children: ReactNode;
  /** left/top/width as % of whichever reference frame is in play. */
  position: { left: number; top: number; width: number };
}

/**
 * The large glass square the whole network funnels into. Floats gently
 * forever — never anything sharper than translateY(-6px), the goal is
 * "ambient," not "bouncy."
 */
export function CenterLogo({ children, position }: CenterLogoProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute flex aspect-square items-center justify-center rounded-2xl border border-white/30 bg-white/90 shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl"
      style={{ left: `${position.left}%`, top: `${position.top}%`, width: `${position.width}%` }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: prefersReducedMotion ? 0 : [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.7, delay: 1.6, ease: "easeOut" },
        y: prefersReducedMotion
          ? { duration: 0.7, delay: 1.6, ease: "easeOut" }
          : { duration: 4, ease: "easeInOut", repeat: Infinity, delay: 1.6 },
      }}
    >
      {children}
    </motion.div>
  );
}
