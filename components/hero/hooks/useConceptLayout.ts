"use client";

import { useMemo } from "react";
import type {
  KnowledgeData,
  LayoutNode,
  LayoutConnection,
  ClusterPosition,
  ConceptLayout,
} from "../types";
import { LAYOUT } from "../constants";

// Seeded random for deterministic layout
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Check if a point is inside the silhouette — expanded, region-aware
function isInsideSilhouette(x: number, y: number): boolean {
  const cx = LAYOUT.SILHOUETTE_WIDTH / 2;

  // Head (ellipse) — top of silhouette
  if (y >= 50 && y <= 185) {
    const headCx = cx;
    const headCy = 115;
    const headRx = 60;
    const headRy = 70;
    const dx = (x - headCx) / headRx;
    const dy = (y - headCy) / headRy;
    if (dx * dx + dy * dy <= 1) return true;
  }

  // Neck — narrow transition
  if (y > 185 && y <= 260) {
    const neckHalfWidth = 40;
    if (Math.abs(x - cx) <= neckHalfWidth) return true;
  }

  // Shoulders & torso (trapezoid expanding outward)
  if (y > 260 && y <= 450) {
    const t = (y - 260) / 190;
    const halfWidth = 40 + t * 150;
    if (Math.abs(x - cx) <= halfWidth) return true;
  }

  return false;
}

// ── Predefined cluster anchor positions ──
// Instead of pure force-directed, we assign semantically meaningful
// positions so clusters are distributed across the entire silhouette.
const CLUSTER_ANCHORS: Record<string, { x: number; y: number }> = {
  // Physics clusters fill the head and upper body
  mechanics:      { x: 200, y: 90 },
  kinematics:     { x: 130, y: 150 },
  energy:         { x: 270, y: 150 },
  "waves-fields": { x: 200, y: 220 },

  calculus:       { x: 110, y: 330 },
  geometry:       { x: 90,  y: 420 },

  atomic:         { x: 290, y: 330 },
  bonding:        { x: 310, y: 420 },
};

function computeClusterPositions(
  data: KnowledgeData,
  isMobile: boolean
): ClusterPosition[] {
  const rng = seededRandom(42);
  const w = LAYOUT.SILHOUETTE_WIDTH;
  const h = LAYOUT.SILHOUETTE_HEIGHT;

  const clusters = data.clusters.map((cluster) => {
    // Use predefined anchor or fall back to center with jitter
    const anchor = CLUSTER_ANCHORS[cluster.id] || { x: w / 2, y: h / 2 };
    // Add small jitter for organic feel
    const jitterX = (rng() - 0.5) * 15;
    const jitterY = (rng() - 0.5) * 15;

    return {
      id: cluster.id,
      label: cluster.label,
      cx: anchor.x + jitterX,
      cy: anchor.y + jitterY,
      radius: Math.max(90, Math.sqrt(cluster.conceptIds.length) * 50),
      relatedIds: cluster.relatedClusterIds,
    };
  });

  // Light force-directed refinement (fewer iterations, less gravity)
  const iterations = isMobile ? 10 : 20;
  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < clusters.length; i++) {
      let fx = 0, fy = 0;

      // Repulsion from other clusters (strong — keeps them apart)
      for (let j = 0; j < clusters.length; j++) {
        if (i === j) continue;
        const dx = clusters[i].cx - clusters[j].cx;
        const dy = clusters[i].cy - clusters[j].cy;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const minDist = clusters[i].radius + clusters[j].radius + 20;
        if (dist < minDist) {
          const repulsion = (minDist - dist) * 0.5;
          fx += (dx / dist) * repulsion;
          fy += (dy / dist) * repulsion;
        }
      }

      // Very weak attraction to related clusters
      for (const relId of clusters[i].relatedIds) {
        const other = clusters.find((c) => c.id === relId);
        if (!other) continue;
        const dx = other.cx - clusters[i].cx;
        const dy = other.cy - clusters[i].cy;
        fx += dx * 0.005;
        fy += dy * 0.005;
      }

      // Weak gravity toward anchor (not center — preserves distribution)
      const anchor = CLUSTER_ANCHORS[clusters[i].id] || { x: w / 2, y: h / 2 };
      fx += (anchor.x - clusters[i].cx) * 0.03;
      fy += (anchor.y - clusters[i].cy) * 0.03;

      clusters[i].cx += fx * 0.4;
      clusters[i].cy += fy * 0.4;

      // Constrain to silhouette bounds
      const margin = 30;
      clusters[i].cx = Math.max(margin, Math.min(w - margin, clusters[i].cx));
      clusters[i].cy = Math.max(55, Math.min(h - 50, clusters[i].cy));
    }
  }

  return clusters.map(({ relatedIds, ...rest }) => rest);
}

// Generate concept nodes spread within their cluster areas
function generateNodes(
  data: KnowledgeData,
  clusterPositions: ClusterPosition[],
  isMobile: boolean
): LayoutNode[] {
  const rng = seededRandom(123);
  const nodes: LayoutNode[] = [];

  // Primary nodes (real concepts from JSON)
  for (const concept of data.concepts) {
    const cluster = clusterPositions.find((c) => c.id === concept.clusterId);
    if (!cluster) continue;

    // Spread nodes across cluster radius using golden angle distribution
    const existingInCluster = nodes.filter((n) => n.clusterId === concept.clusterId).length;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5°
    const angle = existingInCluster * goldenAngle;
    const r = cluster.radius * 0.3 + (rng() * cluster.radius * 0.5);

    let x = cluster.cx + Math.cos(angle) * r;
    let y = cluster.cy + Math.sin(angle) * r;

    // Ensure inside silhouette
    let attempts = 0;
    while (!isInsideSilhouette(x, y) && attempts < 40) {
      const a2 = rng() * Math.PI * 2;
      const r2 = rng() * cluster.radius * 0.7;
      x = cluster.cx + Math.cos(a2) * r2;
      y = cluster.cy + Math.sin(a2) * r2;
      attempts++;
    }

    if (!isInsideSilhouette(x, y)) {
      x = cluster.cx;
      y = cluster.cy;
    }

    nodes.push({
      id: `node-${concept.id}`,
      conceptId: concept.id,
      label: concept.label,
      x,
      y,
      radius: LAYOUT.NODE_MIN_RADIUS + rng() * (LAYOUT.NODE_MAX_RADIUS - LAYOUT.NODE_MIN_RADIUS),
      baseOpacity: LAYOUT.NODE_BASE_OPACITY_MIN + rng() * (LAYOUT.NODE_BASE_OPACITY_MAX - LAYOUT.NODE_BASE_OPACITY_MIN),
      clusterId: concept.clusterId,
      isPrimary: true,
    });
  }

  // Filler nodes distributed across ALL clusters, biased to under-filled ones
  const fillerCount = isMobile ? LAYOUT.MOBILE_FILLER_NODES : LAYOUT.DESKTOP_FILLER_NODES;

  for (let i = 0; i < fillerCount; i++) {
    // Weighted cluster selection — larger clusters get more fillers
    const cluster = clusterPositions[Math.floor(rng() * clusterPositions.length)];

    // Spread fillers across the cluster's full radius
    const angle = rng() * Math.PI * 2;
    const r = rng() * cluster.radius * 0.9;
    let x = cluster.cx + Math.cos(angle) * r;
    let y = cluster.cy + Math.sin(angle) * r;

    let attempts = 0;
    while (!isInsideSilhouette(x, y) && attempts < 15) {
      const a2 = rng() * Math.PI * 2;
      const r2 = rng() * cluster.radius * 0.7;
      x = cluster.cx + Math.cos(a2) * r2;
      y = cluster.cy + Math.sin(a2) * r2;
      attempts++;
    }

    if (!isInsideSilhouette(x, y)) continue;

    nodes.push({
      id: `filler-${i}`,
      conceptId: "",
      label: "",
      x,
      y,
      radius: LAYOUT.NODE_MIN_RADIUS + rng() * 1,
      baseOpacity: 0.06 + rng() * 0.12,
      clusterId: cluster.id,
      isPrimary: false,
    });
  }

  return nodes;
}

// Generate connections between nodes
function generateConnections(
  nodes: LayoutNode[],
  data: KnowledgeData
): LayoutConnection[] {
  const connections: LayoutConnection[] = [];
  const nodeMap = new Map<string, LayoutNode>();
  for (const node of nodes) {
    if (node.conceptId) nodeMap.set(node.conceptId, node);
  }

  // Cross-cluster connections from relationships
  for (const rel of data.relationships) {
    const sourceNode = nodeMap.get(rel.source);
    const targetNode = nodeMap.get(rel.target);
    if (!sourceNode || !targetNode) continue;

    connections.push({
      id: `rel-${rel.source}-${rel.target}`,
      sourceId: sourceNode.conceptId,
      targetId: targetNode.conceptId,
      x1: sourceNode.x,
      y1: sourceNode.y,
      x2: targetNode.x,
      y2: targetNode.y,
      type:
        sourceNode.clusterId === targetNode.clusterId
          ? "intra-cluster"
          : "cross-cluster",
      strength: rel.strength,
    });
  }

  // Intra-cluster connections (connect nearby nodes within same cluster)
  const existingPairs = new Set(
    connections.map((c) => `${c.sourceId}|${c.targetId}`)
  );

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].clusterId !== nodes[j].clusterId) continue;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < LAYOUT.INTRA_CLUSTER_DISTANCE) {
        const pairKey1 = `${nodes[i].conceptId || nodes[i].id}|${nodes[j].conceptId || nodes[j].id}`;
        const pairKey2 = `${nodes[j].conceptId || nodes[j].id}|${nodes[i].conceptId || nodes[i].id}`;
        if (!existingPairs.has(pairKey1) && !existingPairs.has(pairKey2)) {
          const id = `intra-${nodes[i].id}-${nodes[j].id}`;
          connections.push({
            id,
            sourceId: nodes[i].conceptId || nodes[i].id,
            targetId: nodes[j].conceptId || nodes[j].id,
            x1: nodes[i].x,
            y1: nodes[i].y,
            x2: nodes[j].x,
            y2: nodes[j].y,
            type: "intra-cluster",
            strength: 0.3,
          });
          existingPairs.add(pairKey1);
        }
      }
    }
  }

  return connections;
}

export function useConceptLayout(
  data: KnowledgeData,
  isMobile: boolean
): ConceptLayout {
  return useMemo(() => {
    const clusterPositions = computeClusterPositions(data, isMobile);
    const nodes = generateNodes(data, clusterPositions, isMobile);
    const connections = generateConnections(nodes, data);

    // Build adjacency map for fast concept lookups
    const adjacency = new Map<string, Set<string>>();
    for (const rel of data.relationships) {
      if (!adjacency.has(rel.source)) adjacency.set(rel.source, new Set());
      if (!adjacency.has(rel.target)) adjacency.set(rel.target, new Set());
      adjacency.get(rel.source)!.add(rel.target);
      adjacency.get(rel.target)!.add(rel.source);
    }

    const getRelatedConcepts = (conceptId: string): string[] => {
      return Array.from(adjacency.get(conceptId) ?? []);
    };

    return { nodes, connections, clusterPositions, getRelatedConcepts };
  }, [data, isMobile]);
}
