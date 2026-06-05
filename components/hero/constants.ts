import type { ParticleProfile, LeafCategory } from "./types";

// ── Particle Profiles per Leaf Category ──

export const PARTICLE_PROFILES: Record<LeafCategory, ParticleProfile> = {
  definition:     { speed: 0.3, size: 2.0, opacity: 0.5, behavior: "stable" },
  formula:        { speed: 0.8, size: 1.5, opacity: 0.7, behavior: "precise" },
  pyq:            { speed: 1.0, size: 2.5, opacity: 0.9, behavior: "energetic" },
  practice:       { speed: 0.5, size: 2.0, opacity: 0.6, behavior: "steady" },
  relatedConcept: { speed: 0.6, size: 1.5, opacity: 0.6, behavior: "branching" },
};

export const DEFAULT_PARTICLE_PROFILE: ParticleProfile = {
  speed: 0.4,
  size: 1.5,
  opacity: 0.4,
  behavior: "stable",
};

// ── Animation Timing ──

export const TIMING = {
  ENTRANCE_STAGGER: 0.1,
  BACKGROUND_FADE: 0.2,
  SUBJECTS_FADE: 0.5,
  HUB_SCALE: 0.8,
  SILHOUETTE_DRAW: 1.0,
  NODES_FADE: 1.2,
  PARTICLES_START: 1.5,
  HOVER_HINT: 2.5,
  FIRST_CHAIN: 4.0,

  CHAIN_STEP_DELAY: 200,   // ms between chain activations
  CHAIN_FADE_DURATION: 600, // ms for each node to fade back
  AMBIENT_CHAIN_INTERVAL_MIN: 6000,
  AMBIENT_CHAIN_INTERVAL_MAX: 8000,
  AMBIENT_CHAIN_HOPS: 4,
  HOVER_CHAIN_HOPS: 7,

  MOBILE_AMBIENT_CHAIN_INTERVAL_MIN: 8000,
  MOBILE_AMBIENT_CHAIN_INTERVAL_MAX: 10000,
  MOBILE_CHAIN_HOPS: 3,
} as const;

// ── Layout Constants ──

export const LAYOUT = {
  DESKTOP_BREAKPOINT: 768,

  // Intelligence graph silhouette viewport
  SILHOUETTE_WIDTH: 400,
  SILHOUETTE_HEIGHT: 500,

  // Node counts
  DESKTOP_PRIMARY_NODES: 37,   // named concepts from JSON
  DESKTOP_FILLER_NODES: 180,   // unlabeled density
  MOBILE_PRIMARY_NODES: 25,
  MOBILE_FILLER_NODES: 35,

  // Node sizes
  NODE_MIN_RADIUS: 1,
  NODE_MAX_RADIUS: 3,
  NODE_ILLUMINATED_RADIUS: 4,
  NODE_BASE_OPACITY_MIN: 0.12,
  NODE_BASE_OPACITY_MAX: 0.35,
  NODE_ILLUMINATED_OPACITY: 0.95,

  // Connection distances
  INTRA_CLUSTER_DISTANCE: 60,
  CROSS_CLUSTER_DISTANCE: 120,

  // Force-directed layout
  FORCE_ITERATIONS: 50,
  FORCE_REPULSION: 800,
  FORCE_ATTRACTION: 0.05,

  // Parallax multipliers
  PARALLAX_LEFT: -0.05,
  PARALLAX_CENTER: -0.02,
  PARALLAX_RIGHT: -0.08,

  // Particles
  DESKTOP_PARTICLE_COUNT: 45,
  MOBILE_PARTICLE_COUNT: 15,
} as const;

// ── SVG Silhouette Path ──
// Gender-neutral upper torso: head, neck, shoulders
// Viewbox: 0 0 400 500

export const SILHOUETTE_PATH = `
  M 200 40
  C 160 40, 130 70, 130 110
  C 130 150, 150 180, 170 195
  C 160 200, 155 210, 155 220
  L 155 240
  C 155 250, 160 255, 165 258
  C 120 265, 70 290, 40 320
  C 20 340, 10 360, 10 380
  L 10 460
  L 390 460
  L 390 380
  C 390 360, 380 340, 360 320
  C 330 290, 280 265, 235 258
  C 240 255, 245 250, 245 240
  L 245 220
  C 245 210, 240 200, 230 195
  C 250 180, 270 150, 270 110
  C 270 70, 240 40, 200 40
  Z
`;

// Head outline for the silhouette stroke
export const SILHOUETTE_OUTLINE = `
  M 200 40
  C 160 40, 130 70, 130 110
  C 130 150, 150 180, 170 195
  C 160 200, 155 210, 155 220
  L 155 240
  C 155 250, 160 255, 165 258
  C 120 265, 70 290, 40 320
  C 20 340, 10 360, 10 380
  L 10 460
  M 390 460
  L 390 380
  C 390 360, 380 340, 360 320
  C 330 290, 280 265, 235 258
  C 240 255, 245 250, 245 240
  L 245 220
  C 245 210, 240 200, 230 195
  C 250 180, 270 150, 270 110
  C 270 70, 240 40, 200 40
`;

// ── Subject Icons (inline SVG path data) ──

export const SUBJECT_ICONS: Record<string, string> = {
  atom: "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0 M12 12C12 7 16 4 16 4M12 12C12 7 8 4 8 4M12 12C12 17 16 20 16 20M12 12C12 17 8 20 8 20M12 12C7 12 4 8 4 8M12 12C17 12 20 8 20 8M12 12C7 12 4 16 4 16M12 12C17 12 20 16 20 16",
  sigma: "M6 4h12l-6 8 6 8H6",
  flask: "M9 3h6v5l4 9H5l4-9V3z M7 21h10",
};

// ── Leaf Category Icons (small inline SVG path data, 16x16 viewBox) ──

export const LEAF_ICONS: Record<string, string> = {
  definition: "M4 2h8l4 4v10H4V2z M8 8h4 M8 11h6",
  formula: "M4 4l3 12h2l3-8 3 8h2l3-12",
  pyq: "M8 2a6 6 0 1 0 0 12h0a6 6 0 1 0 0-12z M8 14v2",
  practice: "M4 2l2 14L12 8l4 8 2-14",
  relatedConcept: "M8 2v4M4 8h4M12 8h4M8 12v4M4 4l2 2M12 4l-2 2M4 12l2-2M12 12l-2-2",
};
