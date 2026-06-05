"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import type { LeafCategory, KnowledgeData } from "./types";
import { LAYOUT } from "./constants";
import { useScrollParallax } from "./hooks/useScrollParallax";
import { HeroBackground } from "./HeroBackground";
import { AceraaHub } from "./AceraaHub";
import { KnowledgeGraph } from "./KnowledgeGraph";
import { ParticleFlow } from "./ParticleFlow";
import { IntelligenceGraph } from "./IntelligenceGraph";
import knowledgeDataJson from "./knowledge-data.json";

// Static import — tree-shaken
const knowledgeData = knowledgeDataJson as KnowledgeData;

export function HeroSection() {
  // ── State ──
  const [expandedPath, setExpandedPath] = useState<string[]>([]);
  const [hoveredConceptIds, setHoveredConceptIds] = useState<string[] | null>(
    null
  );
  const [hoveredLeafCategory, setHoveredLeafCategory] =
    useState<LeafCategory | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ── Detect mobile ──
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < LAYOUT.DESKTOP_BREAKPOINT);
    };
    checkMobile();

    const mql = window.matchMedia(
      `(max-width: ${LAYOUT.DESKTOP_BREAKPOINT - 1}px)`
    );
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // ── Scroll parallax (desktop only) ──
  const { leftRef, centerRef, rightRef } = useScrollParallax();

  // ── Handlers ──
  const handleExpand = useCallback((path: string[]) => {
    setExpandedPath(path);
  }, []);

  const handleHoverLeaf = useCallback(
    (conceptIds: string[] | null, category: LeafCategory | null) => {
      setHoveredConceptIds(conceptIds);
      setHoveredLeafCategory(category);
    },
    []
  );

  // Primary hovered concept (first in list, used for chain activation)
  const primaryHoveredConcept = hoveredConceptIds?.[0] ?? null;

  // Is the particle system currently active (leaf is hovered)
  const isParticleActive = hoveredConceptIds !== null;

  // ── Mobile Layout ──
  if (isMobile) {
    return (
      <section
        className="relative w-full min-h-screen bg-black overflow-hidden"
        id="hero"
      >
        <HeroBackground />

        <div className="relative z-10 flex flex-col items-center px-6 py-16 gap-8">
          {/* Hub */}
          <div className="flex-shrink-0">
            <AceraaHub isActive={isParticleActive} isMobile={true} />
          </div>

          {/* Knowledge Tree */}
          <div className="w-full max-w-[320px]">
            <KnowledgeGraph
              data={knowledgeData}
              expandedPath={expandedPath}
              onExpand={handleExpand}
              onHoverLeaf={handleHoverLeaf}
              isMobile={true}
            />
          </div>

          {/* Particle Flow (horizontal) */}
          <ParticleFlow
            category={hoveredLeafCategory}
            isActive={isParticleActive}
            isMobile={true}
          />

          {/* Intelligence Graph */}
          <IntelligenceGraph
            data={knowledgeData}
            hoveredConceptId={primaryHoveredConcept}
            illuminatedConcepts={hoveredConceptIds ?? []}
            isMobile={true}
          />
        </div>
      </section>
    );
  }

  // ── Desktop Layout ──
  return (
    <section
      className="relative w-full h-screen min-h-[700px] bg-black overflow-hidden"
      id="hero"
    >
      <HeroBackground />

      {/* Particle Flow (absolute overlay) */}
      <ParticleFlow
        category={hoveredLeafCategory}
        isActive={isParticleActive}
        isMobile={false}
      />

      {/* Three-column layout */}
      <div className="relative z-20 flex items-center justify-between h-full max-w-[1400px] mx-auto px-8 lg:px-16 gap-4">
        {/* Left: Knowledge Graph */}
        <div
          ref={leftRef}
          className="flex-shrink-0 will-change-transform"
        >
          <KnowledgeGraph
            data={knowledgeData}
            expandedPath={expandedPath}
            onExpand={handleExpand}
            onHoverLeaf={handleHoverLeaf}
            isMobile={false}
          />
        </div>

        {/* Center: Aceraa Hub */}
        <div
          ref={centerRef}
          className="flex-shrink-0 flex items-center justify-center will-change-transform"
        >
          <AceraaHub isActive={isParticleActive} isMobile={false} />
        </div>

        {/* Right: Intelligence Graph */}
        <div
          ref={rightRef}
          className="flex-shrink-0 will-change-transform"
        >
          <IntelligenceGraph
            data={knowledgeData}
            hoveredConceptId={primaryHoveredConcept}
            illuminatedConcepts={hoveredConceptIds ?? []}
            isMobile={false}
          />
        </div>
      </div>

      {/* Flow direction indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        <span className="text-[8px] text-white/15 tracking-[0.2em] uppercase select-none">
          Knowledge
        </span>
        <svg
          width="40"
          height="6"
          viewBox="0 0 40 6"
          fill="none"
          className="opacity-20"
        >
          <path
            d="M0 3 L35 3 M30 0.5 L36 3 L30 5.5"
            stroke="white"
            strokeWidth="0.5"
          />
        </svg>
        <span className="text-[8px] text-white/20 tracking-[0.2em] uppercase select-none">
          Aceraa
        </span>
        <svg
          width="40"
          height="6"
          viewBox="0 0 40 6"
          fill="none"
          className="opacity-20"
        >
          <path
            d="M0 3 L35 3 M30 0.5 L36 3 L30 5.5"
            stroke="white"
            strokeWidth="0.5"
          />
        </svg>
        <span className="text-[8px] text-white/15 tracking-[0.2em] uppercase select-none">
          Intelligence
        </span>
      </div>
    </section>
  );
}
