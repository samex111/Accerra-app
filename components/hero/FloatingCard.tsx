"use client";

import { motion } from "framer-motion";
import type { FloatingCardData } from "./types";

interface FloatingCardProps {
  card: FloatingCardData;
  /** Tighter padding/icon/text sizing for the mobile trunk layout. */
  compact?: boolean;
}

/**
 * One glass pill: icon + uppercase mono label. Positioned with
 * left/top/width percentages that come from whichever reference frame
 * is in play (desktop funnel or mobile trunk), so it lines up with its
 * connection line at every breakpoint.
 */
export function FloatingCard({ card, compact = false }: FloatingCardProps) {
  const Icon = card.icon;

  return (
    <motion.div
      className={
        compact
          ? "absolute flex items-center gap-1.5 whitespace-nowrap rounded-md border border-white/25 bg-white/10 px-2 py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md"
          : "absolute hidden items-center gap-2 whitespace-nowrap rounded-md border border-white/25 bg-white/10 px-3 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md sm:flex"
      }
      style={{ left: `${card.left}%`, top: `${card.top}%`, width: `${card.width}%` }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: card.delay }}
    >
      <Icon
        className={compact ? "h-3 w-3 shrink-0 text-white/90" : "h-3.5 w-3.5 shrink-0 text-white/90"}
        strokeWidth={1.75}
      />
      <span
        className={
          compact
            ? "font-mono text-[8.5px] font-medium uppercase tracking-wider text-white/90"
            : "font-mono text-[10px] font-medium uppercase tracking-wider text-white/90 sm:text-[11px]"
        }
      >
        {card.label}
      </span>
    </motion.div>
  );
}
