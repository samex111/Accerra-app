"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { KnowledgeData } from "../types";
import { TIMING } from "../constants";

interface ChainActivationResult {
  activeChain: string[];
  isChaining: boolean;
}

export function useChainActivation(
  data: KnowledgeData,
  hoveredConceptId: string | null,
  isMobile: boolean
): ChainActivationResult {
  const [activeChain, setActiveChain] = useState<string[]>([]);
  const [isChaining, setIsChaining] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const ambientTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build adjacency map sorted by strength
  const adjacencyRef = useRef<
  Map<string, Array<{ id: string; strength: number }>> | null
>(null);
  if (!adjacencyRef.current) {
    const adj = new Map<string, Array<{ id: string; strength: number }>>();
    for (const rel of data.relationships) {
      if (!adj.has(rel.source)) adj.set(rel.source, []);
      if (!adj.has(rel.target)) adj.set(rel.target, []);
      adj.get(rel.source)!.push({ id: rel.target, strength: rel.strength });
      adj.get(rel.target)!.push({ id: rel.source, strength: rel.strength });
    }
    // Sort each list by strength descending
    for (const [, neighbors] of adj) {
      neighbors.sort((a, b) => b.strength - a.strength);
    }
    adjacencyRef.current = adj;
  }

  const clearChain = useCallback(() => {
    for (const t of timeoutsRef.current) clearTimeout(t);
    timeoutsRef.current = [];
    setIsChaining(false);
    setActiveChain([]);
  }, []);

  // Run a chain from a starting concept
  const runChain = useCallback(
    (startConceptId: string, maxHops: number) => {
      clearChain();
      setIsChaining(true);

      const adj = adjacencyRef.current!;
      const visited = new Set<string>();
      const chain: string[] = [startConceptId];
      visited.add(startConceptId);

      // Build the chain path
      let current = startConceptId;
      for (let hop = 0; hop < maxHops - 1; hop++) {
        const neighbors = adj.get(current) ?? [];
        const next = neighbors.find((n) => !visited.has(n.id));
        if (!next) break;
        chain.push(next.id);
        visited.add(next.id);
        current = next.id;
      }

      // Animate chain with staggered timeouts
      for (let i = 0; i < chain.length; i++) {
        const t = setTimeout(() => {
          setActiveChain((prev) => [...prev, chain[i]]);
        }, i * TIMING.CHAIN_STEP_DELAY);
        timeoutsRef.current.push(t);
      }

      // Fade out after chain completes (only for ambient chains)
      if (!hoveredConceptId) {
        const fadeTimeout = setTimeout(
          () => {
            setActiveChain([]);
            setIsChaining(false);
          },
          chain.length * TIMING.CHAIN_STEP_DELAY + TIMING.CHAIN_FADE_DURATION
        );
        timeoutsRef.current.push(fadeTimeout);
      }
    },
    [clearChain, hoveredConceptId]
  );

  // Hover-triggered chain
  useEffect(() => {
    if (hoveredConceptId) {
      const hops = isMobile ? TIMING.MOBILE_CHAIN_HOPS : TIMING.HOVER_CHAIN_HOPS;
      runChain(hoveredConceptId, hops);
    } else {
      clearChain();
    }
  }, [hoveredConceptId, isMobile, runChain, clearChain]);

  // Ambient chains
  useEffect(() => {
    if (hoveredConceptId) return; // Don't run ambient during hover

    const concepts = data.concepts;
    if (concepts.length === 0) return;

    const scheduleAmbient = () => {
      const minInterval = isMobile
        ? TIMING.MOBILE_AMBIENT_CHAIN_INTERVAL_MIN
        : TIMING.AMBIENT_CHAIN_INTERVAL_MIN;
      const maxInterval = isMobile
        ? TIMING.MOBILE_AMBIENT_CHAIN_INTERVAL_MAX
        : TIMING.AMBIENT_CHAIN_INTERVAL_MAX;
      const delay = minInterval + Math.random() * (maxInterval - minInterval);

      ambientTimerRef.current = setTimeout(() => {
        const randomConcept =
          concepts[Math.floor(Math.random() * concepts.length)];
        const hops = isMobile
          ? TIMING.MOBILE_CHAIN_HOPS
          : TIMING.AMBIENT_CHAIN_HOPS;
        runChain(randomConcept.id, hops);
        scheduleAmbient();
      }, delay);
    };

    // First ambient chain after initial delay
    ambientTimerRef.current = setTimeout(() => {
      scheduleAmbient();
    }, TIMING.FIRST_CHAIN * 1000);

    return () => {
      if (ambientTimerRef.current) clearTimeout(ambientTimerRef.current);
    };
  }, [data.concepts, hoveredConceptId, isMobile, runChain]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      for (const t of timeoutsRef.current) clearTimeout(t);
      if (ambientTimerRef.current) clearTimeout(ambientTimerRef.current);
    };
  }, []);

  return { activeChain, isChaining };
}
