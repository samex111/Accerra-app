// ── Leaf category determines particle behavior ──
export type LeafCategory =
  | "definition"
  | "formula"
  | "pyq"
  | "practice"
  | "relatedConcept";

// ── Knowledge Data JSON Schema ──

export interface KnowledgeData {
  subjects: SubjectNode[];
  concepts: ConceptNode[];
  relationships: Relationship[];
  clusters: ClusterDefinition[];
}

export interface SubjectNode {
  id: string;
  label: string;
  icon: string;
  chapters: ChapterNode[];
}

export interface ChapterNode {
  id: string;
  label: string;
  topics: TopicNode[];
}

export interface TopicNode {
  id: string;
  label: string;
  conceptId: string;
  leaves: LeafNode[];
}

export interface LeafNode {
  id: string;
  label: string;
  category: LeafCategory;
  relatedConceptIds?: string[];
}

export interface ConceptNode {
  id: string;
  label: string;
  clusterId: string;
}

export interface Relationship {
  source: string;
  target: string;
  strength: number;
}

export interface ClusterDefinition {
  id: string;
  label: string;
  conceptIds: string[];
  relatedClusterIds: string[];
}

// ── Hero State ──

export interface HeroState {
  expandedPath: string[];
  hoveredNodeId: string | null;
  hoveredLeafCategory: LeafCategory | null;
  particleIntensity: number;
  particleCategory: LeafCategory | null;
  illuminatedConcepts: string[];
  activationChain: string[];
  isMobile: boolean;
  scrollY: number;
}

// ── Particle System ──

export type ParticleBehavior =
  | "stable"
  | "precise"
  | "energetic"
  | "steady"
  | "branching";

export interface ParticleProfile {
  speed: number;
  size: number;
  opacity: number;
  behavior: ParticleBehavior;
}

export interface Particle {
  id: number;
  pathIndex: number;
  progress: number; // 0-1 along the path
  speed: number;
  size: number;
  opacity: number;
  behavior: ParticleBehavior;
}

// ── Concept Layout (Intelligence Graph) ──

export interface LayoutNode {
  id: string;
  conceptId: string;
  label: string;
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  clusterId: string;
  isPrimary: boolean; // true = has visible label
}

export interface LayoutConnection {
  id: string;
  sourceId: string;
  targetId: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  type: "intra-cluster" | "cross-cluster";
  strength: number;
}

export interface ClusterPosition {
  id: string;
  label: string;
  cx: number;
  cy: number;
  radius: number;
}

export interface ConceptLayout {
  nodes: LayoutNode[];
  connections: LayoutConnection[];
  clusterPositions: ClusterPosition[];
  getRelatedConcepts: (conceptId: string) => string[];
}
