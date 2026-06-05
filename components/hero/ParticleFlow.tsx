"use client";

import React, { memo, useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import type { LeafCategory, ParticleProfile } from "./types";
import { useParticleSystem } from "./hooks/useParticleSystem";
import {
  PARTICLE_PROFILES,
  DEFAULT_PARTICLE_PROFILE,
  TIMING,
  LAYOUT,
} from "./constants";

interface ParticleFlowProps {
  category: LeafCategory | null;
  isActive: boolean;
  isMobile: boolean;
}

export const ParticleFlow = memo(function ParticleFlow({
  category,
  isActive,
  isMobile,
}: ParticleFlowProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  const profile: ParticleProfile = useMemo(
    () => (category ? PARTICLE_PROFILES[category] : DEFAULT_PARTICLE_PROFILE),
    [category]
  );

  const particleCount = isMobile
    ? LAYOUT.MOBILE_PARTICLE_COUNT
    : LAYOUT.DESKTOP_PARTICLE_COUNT;

  // Store path refs
  useEffect(() => {
    if (svgRef.current) {
      const paths = svgRef.current.querySelectorAll<SVGPathElement>(
        ".particle-path"
      );
      pathRefs.current = Array.from(paths);
    }
  }, [isMobile]);

  useParticleSystem({
    svgRef,
    pathRefs,
    particleCount,
    profile,
    active: isActive,
  });

  // Different layouts for mobile vs desktop
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: TIMING.PARTICLES_START, duration: 1 }}
        className="w-full h-[60px] relative"
      >
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
        >
          {/* Horizontal flow paths for mobile */}
          <path
            className="particle-path"
            d="M 0 30 C 100 15, 200 45, 400 30"
            fill="none"
            stroke="none"
          />
          <path
            className="particle-path"
            d="M 0 20 C 100 35, 300 10, 400 25"
            fill="none"
            stroke="none"
          />
          <path
            className="particle-path"
            d="M 0 40 C 150 25, 250 50, 400 35"
            fill="none"
            stroke="none"
          />

          {/* Faint visible guide line */}
          <path
            d="M 0 30 C 100 15, 200 45, 400 30"
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: TIMING.PARTICLES_START, duration: 1 }}
      className="absolute inset-0 pointer-events-none z-10"
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* ── Left to Center: Knowledge → Hub ── */}
        {/* Main stream */}
        <path
          className="particle-path"
          d="M 260 350 C 380 320, 520 300, 680 400"
          fill="none"
          stroke="none"
        />
        {/* Upper arc */}
        <path
          className="particle-path"
          d="M 260 300 C 380 250, 500 260, 680 380"
          fill="none"
          stroke="none"
        />
        {/* Lower arc */}
        <path
          className="particle-path"
          d="M 260 420 C 380 430, 550 390, 680 410"
          fill="none"
          stroke="none"
        />

        {/* ── Center to Right: Hub → Intelligence ── */}
        {/* Main stream */}
        <path
          className="particle-path"
          d="M 760 400 C 900 300, 1020 320, 1160 350"
          fill="none"
          stroke="none"
        />
        {/* Upper arc */}
        <path
          className="particle-path"
          d="M 760 380 C 880 260, 1000 270, 1160 300"
          fill="none"
          stroke="none"
        />
        {/* Lower arc */}
        <path
          className="particle-path"
          d="M 760 420 C 880 440, 1000 400, 1160 400"
          fill="none"
          stroke="none"
        />

        {/* Branching paths (for relatedConcept category) */}
        <path
          className="particle-path"
          d="M 760 400 C 900 350, 980 250, 1160 250"
          fill="none"
          stroke="none"
        />
        <path
          className="particle-path"
          d="M 760 400 C 900 450, 980 480, 1160 460"
          fill="none"
          stroke="none"
        />

        {/* Faint visible guide lines */}
        <path
          d="M 260 350 C 380 320, 520 300, 680 400"
          fill="none"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth="0.5"
          strokeDasharray="4 8"
        />
        <path
          d="M 760 400 C 900 300, 1020 320, 1160 350"
          fill="none"
          stroke="rgba(255,255,255,0.02)"
          strokeWidth="0.5"
          strokeDasharray="4 8"
        />
      </svg>
    </motion.div>
  );
});
