"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { NetworkPathData } from "./types";

interface ConnectionDotsProps {
  paths: NetworkPathData[];
}

/**
 * Small junction markers. Each pulses opacity and scale independently
 * on its own delay so the network feels alive rather than mechanical.
 */
export function ConnectionDots({ paths }: ConnectionDotsProps) {
  const prefersReducedMotion = useReducedMotion();
  const dots = paths.flatMap((path) => path.dots);

  return (
    <g aria-hidden="true">
      {dots.map((dot) => (
        <motion.circle
          key={dot.id}
          cx={dot.cx}
          cy={dot.cy}
          r={2.2}
          fill="rgba(255,255,255,0.9)"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={prefersReducedMotion ? { opacity: 0.6, scale: 1 } : { opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 2.4, ease: "easeInOut", repeat: Infinity, delay: dot.delay }
          }
          style={{ transformOrigin: `${dot.cx}px ${dot.cy}px` }}
        />
      ))}
    </g>
  );
}
