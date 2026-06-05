"use client";

import React, { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AceraaHubProps {
  isActive: boolean;
  isMobile: boolean;
}

export const AceraaHub = memo(function AceraaHub({
  isActive,
  isMobile,
}: AceraaHubProps) {
  const [pulseKey, setPulseKey] = useState(0);

  // Trigger pulse when particles arrive (isActive changes)
  useEffect(() => {
    if (isActive) {
      setPulseKey((k) => k + 1);
    }
  }, [isActive]);

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Subtle radial glow behind logo */}
      <div
        className="absolute w-[240px] h-[240px] rounded-full pointer-events-none transition-opacity duration-700"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, transparent 70%)",
          opacity: isActive ? 1 : 0.5,
        }}
      />

      {/* Pulse rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          key={`pulse-1-${pulseKey}`}
          className="absolute w-[120px] h-[120px] rounded-full border border-white/10"
          style={{
            animation: isActive
              ? "hub-pulse 2s ease-out infinite"
              : "hub-pulse 4s ease-out infinite",
          }}
        />
        <div
          key={`pulse-2-${pulseKey}`}
          className="absolute w-[120px] h-[120px] rounded-full border border-white/5"
          style={{
            animation: isActive
              ? "hub-pulse 2s ease-out infinite 0.5s"
              : "hub-pulse 4s ease-out infinite 1s",
          }}
        />
      </div>

      {/* Geometric A Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10"
      >
        <svg
          width={isMobile ? 64 : 80}
          height={isMobile ? 64 : 80}
          viewBox="0 0 80 80"
          fill="none"
          className="transition-all duration-500"
          style={{
            filter: isActive
              ? "drop-shadow(0 0 16px rgba(255,255,255,0.2))"
              : "drop-shadow(0 0 4px rgba(255,255,255,0.05))",
          }}
        >
          {/* Triangular A shape */}
          <path
            d="M40 8 L68 68 L56 68 L48 48 L32 48 L24 68 L12 68 Z"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
            className="transition-all duration-500"
            style={{
              fill: isActive ? "rgba(255,255,255,0.05)" : "none",
            }}
          />
          {/* Crossbar */}
          <line
            x1="28"
            y1="42"
            x2="52"
            y2="42"
            stroke="white"
            strokeWidth="1.5"
          />
          {/* Inner accent */}
          <path
            d="M40 18 L54 58"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
          />
          <path
            d="M40 18 L26 58"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>

      {/* Wordmark */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mt-4 text-white font-light tracking-[0.3em] text-xl md:text-2xl select-none"
        style={{ fontFamily: "var(--font-geist)" }}
      >
        ACERAA
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="relative z-10 mt-3 text-white/55 text-[11px] md:text-sm tracking-widest text-center max-w-[240px] leading-relaxed select-none"
      >
        Building the Intelligence Layer
        <br />
        for Every Student
      </motion.p>

      {/* Processing status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.0 }}
        className="relative z-10 mt-6 flex items-center gap-2"
      >
        <div
          className="w-1.5 h-1.5 rounded-full bg-white/60"
          style={{ animation: "concept-pulse 2s ease-in-out infinite" }}
        />
        <span className="text-white/40 text-[9px] tracking-[0.2em] uppercase select-none">
          Processing Knowledge
        </span>
      </motion.div>

      {/* Organizing · Connecting · Understanding */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.2 }}
        className="relative z-10 mt-1"
      >
        <span className="text-white/30 text-[8px] tracking-[0.15em] select-none">
          Organizing · Connecting · Understanding
        </span>
      </motion.div>
    </div>
  );
});
