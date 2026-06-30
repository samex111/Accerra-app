"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { NetworkPathData } from "./types";

interface AnimatedPathsProps {
  paths: NetworkPathData[];
}

/** Fraction of the path's length the bright square head covers. */
const HEAD_LENGTH = 0.03;   // 3%
const TAIL_LENGTH = 0.06;

/**
 * The moving "packet": a small bright square head with a thin trailing
 * line right behind it, like `=-----`. This is two stacked paths (a
 * short thick head, a longer thin tail) rather than one stroke, since a
 * single path can't vary its own width along its length. Both share the
 * same duration/delay, and the tail's strokeDashoffset is always the
 * head's plus HEAD_LENGTH, which keeps it locked exactly one head-length
 * behind — touching, no gap, moving as one piece.
 */
export function AnimatedPaths({ paths }: AnimatedPathsProps) {
  const prefersReducedMotion = useReducedMotion();
  const flowingPaths = paths.filter((path) => path.animated !== false);

  return (
    <g aria-hidden="true">
      {flowingPaths.map((path) => {
        const transition = prefersReducedMotion
          ? { duration: 0 }
          : { duration: 3, ease: "linear" as const, repeat: Infinity, delay: path.delay };

        return (
          <g key={path.id}>
            {/* thin trailing line: "-----" */}
            <motion.path
              d={path.d}
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth={1}
              strokeLinecap="butt"
              pathLength={1}
              strokeDasharray={`${TAIL_LENGTH} ${1 - TAIL_LENGTH}`}
              initial={{ strokeDashoffset: HEAD_LENGTH }}
              animate={
                prefersReducedMotion
                  ? { strokeDashoffset: HEAD_LENGTH }
                  : { strokeDashoffset: HEAD_LENGTH - 1 }
              }
              transition={transition}
            />
            {/* bright square head: "=" */}
            <motion.path
              d={path.d}
              fill="none"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth={2.0}
              strokeLinecap="butt"
              pathLength={1}
              strokeDasharray={`${HEAD_LENGTH} ${1 - HEAD_LENGTH}`}
              initial={{ strokeDashoffset: 0 }}
              animate={prefersReducedMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: -1 }}
              transition={transition}
            />
          </g>
        );
      })}
    </g>
  );
}