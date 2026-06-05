"use client";

import React, { memo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  KnowledgeData,
  SubjectNode,
  ChapterNode,
  TopicNode,
  LeafNode,
  LeafCategory,
} from "./types";
import { SUBJECT_ICONS, LEAF_ICONS, TIMING } from "./constants";

interface KnowledgeGraphProps {
  data: KnowledgeData;
  expandedPath: string[];
  onExpand: (path: string[]) => void;
  onHoverLeaf: (
    conceptIds: string[] | null,
    category: LeafCategory | null
  ) => void;
  isMobile: boolean;
}

// ── Subject Node ──
const SubjectItem = memo(function SubjectItem({
  subject,
  isExpanded,
  onToggle,
  onHover,
  isMobile,
  children,
  delay,
}: {
  subject: SubjectNode;
  isExpanded: boolean;
  onToggle: () => void;
  onHover: () => void;
  isMobile: boolean;
  children: React.ReactNode;
  delay: number;
}) {
  const collapseTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleMouseEnter = () => {
    if (isMobile) return;
    clearTimeout(collapseTimer.current);
    onHover();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: TIMING.SUBJECTS_FADE + delay * TIMING.ENTRANCE_STAGGER,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="select-none"
    >
      <button
        onClick={isMobile ? onToggle : undefined}
        onMouseEnter={handleMouseEnter}
        className="group flex items-center gap-2.5 w-full text-left py-1.5 transition-all duration-300"
      >
        {/* Subject icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`transition-all duration-300 ${
            isExpanded ? "text-white" : "text-white/35 group-hover:text-white/70"
          }`}
        >
          <path d={SUBJECT_ICONS[subject.icon] || SUBJECT_ICONS.atom} />
        </svg>

        {/* Subject label */}
        <span
          className={`text-sm tracking-wide transition-all duration-300 ${
            isExpanded
              ? "text-white"
              : "text-white/45 group-hover:text-white/80"
          }`}
        >
          {subject.label}
        </span>

        {/* Expand indicator */}
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={`ml-auto transition-transform duration-300 ${
            isExpanded ? "rotate-90" : ""
          }`}
        >
          <path
            d="M3 1 L7 5 L3 9"
            stroke={isExpanded ? "white" : "rgba(255,255,255,0.25)"}
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden ml-5 border-l border-white/8 pl-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

// ── Chapter Node ──
const ChapterItem = memo(function ChapterItem({
  chapter,
  isExpanded,
  onToggle,
  onHover,
  isMobile,
  children,
}: {
  chapter: ChapterNode;
  isExpanded: boolean;
  onToggle: () => void;
  onHover: () => void;
  isMobile: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-1">
      <button
        onClick={isMobile ? onToggle : undefined}
        onMouseEnter={!isMobile ? onHover : undefined}
        className="group flex items-center gap-2 w-full text-left py-1 transition-all duration-300"
      >
        <span
          className={`text-xs transition-all duration-300 ${
            isExpanded
              ? "text-white/85"
              : "text-white/35 group-hover:text-white/65"
          }`}
        >
          {chapter.label}
        </span>
        <svg
          width="8"
          height="8"
          viewBox="0 0 10 10"
          fill="none"
          className={`ml-auto transition-transform duration-300 ${
            isExpanded ? "rotate-90" : ""
          }`}
        >
          <path
            d="M3 1 L7 5 L3 9"
            stroke={isExpanded ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)"}
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden ml-3 border-l border-white/8 pl-3"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// ── Topic Node ──
const TopicItem = memo(function TopicItem({
  topic,
  isExpanded,
  onToggle,
  onHover,
  isMobile,
  children,
}: {
  topic: TopicNode;
  isExpanded: boolean;
  onToggle: () => void;
  onHover: () => void;
  isMobile: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-0.5">
      <button
        onClick={isMobile ? onToggle : undefined}
        onMouseEnter={!isMobile ? onHover : undefined}
        className="group flex items-center gap-2 w-full text-left py-0.5 transition-all duration-300"
      >
        {/* Small concept dot */}
        <div
          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
            isExpanded
              ? "bg-white/70"
              : "bg-white/20 group-hover:bg-white/50"
          }`}
        />
        <span
          className={`text-[11px] transition-all duration-300 ${
            isExpanded
              ? "text-white/75"
              : "text-white/30 group-hover:text-white/60"
          }`}
        >
          {topic.label}
        </span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden ml-3 pl-3 border-l border-white/8"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// ── Leaf Node ──
const LeafItem = memo(function LeafItem({
  leaf,
  onHoverStart,
  onHoverEnd,
}: {
  leaf: LeafNode;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <div
      className="group flex items-center gap-2 py-0.5 cursor-pointer"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onTouchStart={onHoverStart}
    >
      {/* Category icon */}
      <svg
        width="10"
        height="10"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-white/20 group-hover:text-white/60 transition-colors duration-300 flex-shrink-0"
      >
        <path d={LEAF_ICONS[leaf.category] || LEAF_ICONS.definition} />
      </svg>

      {/* Leaf label */}
      <span className="text-[10px] text-white/25 group-hover:text-white/70 transition-colors duration-300">
        {leaf.label}
      </span>

      {/* Category indicator dot */}
      <div
        className={`w-1 h-1 rounded-full ml-auto transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
          leaf.category === "formula"
            ? "bg-white/70"
            : leaf.category === "pyq"
              ? "bg-white/50"
              : "bg-white/30"
        }`}
      />
    </div>
  );
});

// ── Main Knowledge Graph Component ──
export const KnowledgeGraph = memo(function KnowledgeGraph({
  data,
  expandedPath,
  onExpand,
  onHoverLeaf,
  isMobile,
}: KnowledgeGraphProps) {
  // Collapse timer for desktop hover — prevents flicker when moving between items
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleSubjectToggle = useCallback(
    (subjectId: string) => {
      if (expandedPath[0] === subjectId) {
        onExpand([]);
      } else {
        onExpand([subjectId]);
      }
    },
    [expandedPath, onExpand]
  );

  const handleSubjectHover = useCallback(
    (subjectId: string) => {
      clearTimeout(collapseTimerRef.current);
      if (expandedPath[0] !== subjectId) {
        onExpand([subjectId]);
      }
    },
    [expandedPath, onExpand]
  );

  const handleChapterToggle = useCallback(
    (subjectId: string, chapterId: string) => {
      if (expandedPath[1] === chapterId) {
        onExpand([subjectId]);
      } else {
        onExpand([subjectId, chapterId]);
      }
    },
    [expandedPath, onExpand]
  );

  const handleChapterHover = useCallback(
    (subjectId: string, chapterId: string) => {
      clearTimeout(collapseTimerRef.current);
      if (expandedPath[1] !== chapterId) {
        onExpand([subjectId, chapterId]);
      }
    },
    [expandedPath, onExpand]
  );

  const handleTopicToggle = useCallback(
    (subjectId: string, chapterId: string, topicId: string) => {
      if (expandedPath[2] === topicId) {
        onExpand([subjectId, chapterId]);
      } else {
        onExpand([subjectId, chapterId, topicId]);
      }
    },
    [expandedPath, onExpand]
  );

  const handleTopicHover = useCallback(
    (subjectId: string, chapterId: string, topicId: string) => {
      clearTimeout(collapseTimerRef.current);
      if (expandedPath[2] !== topicId) {
        onExpand([subjectId, chapterId, topicId]);
      }
    },
    [expandedPath, onExpand]
  );

  const handleLeafHoverStart = useCallback(
    (leaf: LeafNode) => {
      onHoverLeaf(leaf.relatedConceptIds || [], leaf.category);
    },
    [onHoverLeaf]
  );

  const handleLeafHoverEnd = useCallback(() => {
    onHoverLeaf(null, null);
  }, [onHoverLeaf]);

  // Collapse on mouse leave (desktop only)
  const handleTreeMouseLeave = useCallback(() => {
    if (isMobile) return;
    collapseTimerRef.current = setTimeout(() => {
      onExpand([]);
    }, 600); // 600ms grace period before collapse
  }, [isMobile, onExpand]);

  const handleTreeMouseEnter = useCallback(() => {
    clearTimeout(collapseTimerRef.current);
  }, []);

  return (
    <div
      className={`${isMobile ? "w-full" : "w-full max-w-[260px]"}`}
      onMouseLeave={handleTreeMouseLeave}
      onMouseEnter={handleTreeMouseEnter}
    >
      {/* Panel label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: TIMING.SUBJECTS_FADE - 0.2, duration: 0.5 }}
        className="mb-4 flex items-center gap-2"
      >
        <div className="w-6 h-px bg-white/25" />
        <span className="text-[9px] text-white/30 tracking-[0.25em] uppercase select-none">
          Knowledge
        </span>
      </motion.div>

      {/* Subject tree */}
      <div className="space-y-1">
        {data.subjects.map((subject, subjectIdx) => (
          <SubjectItem
            key={subject.id}
            subject={subject}
            isExpanded={expandedPath[0] === subject.id}
            onToggle={() => handleSubjectToggle(subject.id)}
            onHover={() => handleSubjectHover(subject.id)}
            isMobile={isMobile}
            delay={subjectIdx}
          >
            {subject.chapters.map((chapter) => (
              <ChapterItem
                key={chapter.id}
                chapter={chapter}
                isExpanded={expandedPath[1] === chapter.id}
                onToggle={() =>
                  handleChapterToggle(subject.id, chapter.id)
                }
                onHover={() =>
                  handleChapterHover(subject.id, chapter.id)
                }
                isMobile={isMobile}
              >
                {chapter.topics.map((topic) => (
                  <TopicItem
                    key={topic.id}
                    topic={topic}
                    isExpanded={expandedPath[2] === topic.id}
                    onToggle={() =>
                      handleTopicToggle(
                        subject.id,
                        chapter.id,
                        topic.id
                      )
                    }
                    onHover={() =>
                      handleTopicHover(
                        subject.id,
                        chapter.id,
                        topic.id
                      )
                    }
                    isMobile={isMobile}
                  >
                    {topic.leaves.map((leaf) => (
                      <LeafItem
                        key={leaf.id}
                        leaf={leaf}
                        onHoverStart={() => handleLeafHoverStart(leaf)}
                        onHoverEnd={handleLeafHoverEnd}
                      />
                    ))}
                  </TopicItem>
                ))}
              </ChapterItem>
            ))}
          </SubjectItem>
        ))}
      </div>

      {/* Hover hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: TIMING.HOVER_HINT, duration: 0.5 }}
        className="mt-6"
      >
        <span className="text-[8px] text-white/20 tracking-widest select-none">
          {isMobile ? "Tap any topic to explore" : "Hover over any topic to explore"}
        </span>
      </motion.div>
    </div>
  );
});
