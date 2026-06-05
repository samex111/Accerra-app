"use client";

import { useMemo } from "react";
import type {
  KnowledgeData,
  LayoutNode,
  LayoutConnection,
  ClusterPosition,
  ConceptLayout,
} from "../types";
import { LAYOUT, SILHOUETTE_PATH } from "../constants";

// Seeded random for deterministic layout
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Check if a point is inside the silhouette path (approximate)
function isInsideSilhouette(x: number, y: number): boolean {
  const cx = LAYOUT.SILHOUETTE_WIDTH / 2;

  // Head (ellipse)
  if (y >= 45 && y <= 190) {
    const headCx = cx;
    const headCy = 115;
    const headRx = 65;
    const headRy = 75;
    const dx = (x - headCx) / headRx;
    const dy = (y - headCy) / headRy;
    if (dx * dx + dy * dy <= 1) return true;
  }

  // Neck
  if (y > 190 && y <= 260) {
    const neckHalfWidth = 45;
    if (Math.abs(x - cx) <= neckHalfWidth) return true;
  }

  // Shoulders & torso (trapezoid)
  if (y > 260 && y <= 460) {
    const t = (y - 260) / 200;
    const halfWidth = 45 + t * 155;
    if (Math.abs(x - cx) <= halfWidth) return true;
  }

  return false;
}

// Simple force-directed layout for cluster centers
function computeClusterPositions(
  data: KnowledgeData,
  isMobile: boolean
): ClusterPosition[] {
  const rng = seededRandom(42);
  const w = LAYOUT.SILHOUETTE_WIDTH;
  const h = LAYOUT.SILHOUETTE_HEIGHT;
  const cx = w / 2;
  const cy = h / 2;

  // Initialize cluster centers in a circular pattern
  const clusters = data.clusters.map((cluster, i) => {
    const angle = (i / data.clusters.length) * Math.PI * 2 - Math.PI / 2;
    const r = Math.min(w, h) * 0.25;
    return {
      id: cluster.id,
      label: cluster.label,
      cx: cx + Math.cos(angle) * r + (rng() - 0.5) * 20,
      cy: cy + Math.sin(angle) * r + (rng() - 0.5) * 20,
      radius: Math.max(35, Math.sqrt(cluster.conceptIds.length) * 22),
      relatedIds: cluster.relatedClusterIds,
    };
  });

  // Run force-directed iterations
  const iterations = isMobile ? 25 : LAYOUT.FORCE_ITERATIONS;
  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < clusters.length; i++) {
      let fx = 0,
        fy = 0;

      // Repulsion from other clusters
      for (let j = 0; j < clusters.length; j++) {
        if (i === j) continue;
        const dx = clusters[i].cx - clusters[j].cx;
        const dy = clusters[i].cy - clusters[j].cy;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        const repulsion = LAYOUT.FORCE_REPULSION / (dist * dist);
        fx += (dx / dist) * repulsion;
        fy += (dy / dist) * repulsion;
      }

      // Attraction to related clusters
      for (const relId of clusters[i].relatedIds) {
        const other = clusters.find((c) => c.id === relId);
        if (!other) continue;
        const dx = other.cx - clusters[i].cx;
        const dy = other.cy - clusters[i].cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        fx += dx * LAYOUT.FORCE_ATTRACTION;
        fy += dy * LAYOUT.FORCE_ATTRACTION;
      }

      // Gravity toward center
      fx += (cx - clusters[i].cx) * 0.02;
      fy += (cy - clusters[i].cy) * 0.02;

      clusters[i].cx += fx * 0.3;
      clusters[i].cy += fy * 0.3;

      // Constrain to silhouette bounds (with margin)
      const margin = 40;
      clusters[i].cx = Math.max(margin, Math.min(w - margin, clusters[i].cx));
      clusters[i].cy = Math.max(60, Math.min(h - margin, clusters[i].cy));
    }
  }

  return clusters.map(({ relatedIds, ...rest }) => rest);
}

// Generate concept nodes within their cluster areas
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

    // Position within cluster radius
    let x: number, y: number;
    let attempts = 0;
    do {
      const angle = rng() * Math.PI * 2;
      const r = rng() * cluster.radius * 0.8;
      x = cluster.cx + Math.cos(angle) * r;
      y = cluster.cy + Math.sin(angle) * r;
      attempts++;
    } while (!isInsideSilhouette(x, y) && attempts < 30);

    // Clamp if still outside
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

  // Filler nodes for visual density
  const fillerCount = isMobile
    ? LAYOUT.MOBILE_FILLER_NODES
    : LAYOUT.DESKTOP_FILLER_NODES;

  for (let i = 0; i < fillerCount; i++) {
    const cluster =
      clusterPositions[Math.floor(rng() * clusterPositions.length)];
    let x: number, y: number;
    let attempts = 0;
    do {
      const angle = rng() * Math.PI * 2;
      const r = rng() * cluster.radius * 1.2;
      x = cluster.cx + Math.cos(angle) * r;
      y = cluster.cy + Math.sin(angle) * r;
      attempts++;
    } while (!isInsideSilhouette(x, y) && attempts < 20);

    if (!isInsideSilhouette(x, y)) continue;

    nodes.push({
      id: `filler-${i}`,
      conceptId: "",
      label: "",
      x,
      y,
      radius: LAYOUT.NODE_MIN_RADIUS + rng() * 1,
      baseOpacity: 0.08 + rng() * 0.15,
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
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].clusterId !== nodes[j].clusterId) continue;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < LAYOUT.INTRA_CLUSTER_DISTANCE) {
        const id = `intra-${nodes[i].id}-${nodes[j].id}`;
        // Check we don't already have a relationship connection for this pair
        const existing = connections.find(
          (c) =>
            (c.sourceId === nodes[i].conceptId &&
              c.targetId === nodes[j].conceptId) ||
            (c.sourceId === nodes[j].conceptId &&
              c.targetId === nodes[i].conceptId)
        );
        if (!existing) {
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
