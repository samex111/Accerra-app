"use client";

import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";
import type { KnowledgeData } from "./types";
import { useConceptLayout } from "./hooks/useConceptLayout";
import { useChainActivation } from "./hooks/useChainActivation";
import { SILHOUETTE_OUTLINE, TIMING, LAYOUT } from "./constants";

interface IntelligenceGraphProps {
  data: KnowledgeData;
  hoveredConceptId: string | null;
  illuminatedConcepts: string[];
  isMobile: boolean;
}

export const IntelligenceGraph = memo(function IntelligenceGraph({
  data,
  hoveredConceptId,
  illuminatedConcepts,
  isMobile,
}: IntelligenceGraphProps) {
  const layout = useConceptLayout(data, isMobile);
  const { activeChain } = useChainActivation(
    data,
    hoveredConceptId,
    isMobile
  );

  // Merge illuminated concepts and active chain
  const activeConcepts = useMemo(() => {
    const set = new Set<string>();
    for (const id of illuminatedConcepts) set.add(id);
    for (const id of activeChain) set.add(id);
    return set;
  }, [illuminatedConcepts, activeChain]);

  // Chain order map for sequential glow intensity
  const chainOrder = useMemo(() => {
    const map = new Map<string, number>();
    activeChain.forEach((id, idx) => map.set(id, idx));
    return map;
  }, [activeChain]);

  // Active connections: both endpoints are active
  const activeConnectionIds = useMemo(() => {
    const ids = new Set<string>();
    for (const conn of layout.connections) {
      if (activeConcepts.has(conn.sourceId) && activeConcepts.has(conn.targetId)) {
        ids.add(conn.id);
      }
    }
    return ids;
  }, [layout.connections, activeConcepts]);

  const svgWidth = LAYOUT.SILHOUETTE_WIDTH;
  const svgHeight = LAYOUT.SILHOUETTE_HEIGHT;

  return (
    <div className={`relative ${isMobile ? "w-full max-w-[300px] mx-auto" : "w-full max-w-[400px]"}`}>
      {/* Panel label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: TIMING.NODES_FADE - 0.2, duration: 0.5 }}
        className={`mb-4 flex items-center gap-2 ${isMobile ? "" : "justify-end"}`}
      >
        <span className="text-[9px] text-white/30 tracking-[0.25em] uppercase select-none">
          Student Intelligence
        </span>
        <div className="w-6 h-px bg-white/25" />
      </motion.div>

      {/* SVG Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: TIMING.SILHOUETTE_DRAW, duration: 0.8 }}
      >
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto"
          style={{ maxHeight: isMobile ? "350px" : "500px" }}
        >
          <defs>
            {/* Glow filter for active nodes */}
            <filter id="concept-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Stronger glow for chain head */}
            <filter id="chain-head-glow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Connection glow for active pathways */}
            <filter id="connection-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Silhouette outline — VISIBLE ── */}
          <g>
            <path
              d={SILHOUETTE_OUTLINE}
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hero-silhouette-draw"
            />
            {/* Second pass: subtle inner glow */}
            <path
              d={SILHOUETTE_OUTLINE}
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="hero-silhouette-draw"
              style={{ animationDelay: "1.2s" }}
            />
          </g>

          {/* ── Connections ── */}
          <g>
            {layout.connections.map((conn) => {
              const isActive = activeConnectionIds.has(conn.id);
              const isCrossCluster = conn.type === "cross-cluster";

              // Check if this connection is part of the active chain pathway
              const sourceInChain = chainOrder.has(conn.sourceId);
              const targetInChain = chainOrder.has(conn.targetId);
              const isChainPath = sourceInChain && targetInChain;

              return (
                <line
                  key={conn.id}
                  x1={conn.x1}
                  y1={conn.y1}
                  x2={conn.x2}
                  y2={conn.y2}
                  stroke="white"
                  strokeWidth={
                    isChainPath
                      ? 1.2
                      : isActive
                        ? isCrossCluster ? 1.4 : 1.1
                        : 0.3
                  }
                  opacity={
                    isChainPath
                      ? 0.6
                      : isActive
                        ? isCrossCluster ? 0.4 : 0.25
                        : isCrossCluster ? 0.18 : 0.22
                  }
                  filter={isChainPath ? "url(#connection-glow)" : undefined}
                  className="transition-all duration-300"
                />
              );
            })}
          </g>

          {/* ── Concept Nodes ── */}
          <g>
            {layout.nodes.map((node) => {
              const isActive = node.conceptId
                ? activeConcepts.has(node.conceptId)
                : false;
              const chainIdx = node.conceptId ? chainOrder.get(node.conceptId) : undefined;
              const isChainHead = chainIdx === 0;
              const isInChain = chainIdx !== undefined;

              // Determine radius and opacity based on state
              let radius = node.radius;
              let opacity = node.baseOpacity;
              let filter: string | undefined;

              if (isChainHead) {
                radius = LAYOUT.NODE_ILLUMINATED_RADIUS + 1;
                opacity = 1;
                filter = "url(#chain-head-glow)";
              } else if (isInChain) {
                radius = LAYOUT.NODE_ILLUMINATED_RADIUS;
                opacity = 0.85 - (chainIdx! * 0.05);
                filter = "url(#concept-glow)";
              } else if (isActive) {
                radius = LAYOUT.NODE_ILLUMINATED_RADIUS;
                opacity = LAYOUT.NODE_ILLUMINATED_OPACITY;
                filter = "url(#concept-glow)";
              }

              return (
                <g key={node.id}>
                  {/* Node circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius}
                    fill="white"
                    opacity={opacity}
                    className={`transition-all duration-300 ${node.isPrimary && !isActive ? "hero-concept-breathe" : ""
                      }`}
                    filter={filter}
                  />

                  {/* Label — visible ONLY for illuminated primary nodes */}
                  {node.isPrimary && !isMobile && (
                    <text
                      x={node.x}
                      y={node.y - 10}
                      textAnchor="middle"
                      fill="white"
                     fontSize="11"
                      fontWeight="400"
                      letterSpacing="0.04em"
                      opacity={
                        isActive
                          ? 1
                          : 0.28
                      }
                      className="pointer-events-none select-none"
                      style={{ fontFamily: "var(--font-geist)" }}
                    >
                      {node.label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* ── Cluster Labels — subtle, always visible ── */}
          {!isMobile &&
            layout.clusterPositions.map((cluster) => {
              // Check if any concept in this cluster is active
              const clusterActive = layout.nodes.some(
                (n) => n.clusterId === cluster.id && n.conceptId && activeConcepts.has(n.conceptId)
              );

              return (
                <text
                  key={cluster.id}
                  x={cluster.cx}
                  y={cluster.cy + cluster.radius + 14}
                  textAnchor="middle"
                  fill="white"
                  fontSize="7"
                  fontWeight="400"
                  letterSpacing="0.15em"
                  opacity={clusterActive ? 0.35 : 0.12}
                  className="uppercase pointer-events-none select-none transition-opacity duration-500"
                  style={{ fontFamily: "var(--font-geist)" }}
                >
                  {cluster.label}
                </text>
              );
            })}
        </svg>
      </motion.div>
    </div>
  );
});
