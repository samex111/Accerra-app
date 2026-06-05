"use client";

import { useRef, useEffect, useCallback } from "react";
import type { Particle, ParticleProfile } from "../types";
import { DEFAULT_PARTICLE_PROFILE } from "../constants";

interface UseParticleSystemOptions {
  svgRef: React.RefObject<SVGSVGElement | null>;
  pathRefs: React.RefObject<(SVGPathElement | null)[]>;
  particleCount: number;
  profile: ParticleProfile;
  active: boolean;
}

export function useParticleSystem({
  svgRef,
  pathRefs,
  particleCount,
  profile,
  active,
}: UseParticleSystemOptions) {
  const particlesRef = useRef<Particle[]>([]);
  const circlesRef = useRef<(SVGCircleElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const activeRef = useRef(active);
  activeRef.current = active;
  const profileRef = useRef(profile);
  profileRef.current = profile;

  // Initialize particle pool
  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    const paths = pathRefs.current;
    if (!paths || paths.length === 0) return particles;

    const validPathCount = paths.filter(Boolean).length;
    if (validPathCount === 0) return particles;

    for (let i = 0; i < particleCount; i++) {
      const pathIndex = i % validPathCount;
      const p = profileRef.current || DEFAULT_PARTICLE_PROFILE;
      particles.push({
        id: i,
        pathIndex,
        progress: Math.random(),
        speed: p.speed * (0.7 + Math.random() * 0.6),
        size: p.size * (0.8 + Math.random() * 0.4),
        opacity: p.opacity * (0.6 + Math.random() * 0.4),
        behavior: p.behavior,
      });
    }
    return particles;
  }, [particleCount, pathRefs]);

  // Apply behavior modifiers per frame
  const applyBehavior = useCallback(
    (particle: Particle, dt: number): { dx: number; dy: number; opMod: number } => {
      const t = performance.now() * 0.001;
      switch (particle.behavior) {
        case "stable":
          return { dx: 0, dy: Math.sin(t + particle.id) * 0.3, opMod: 1 };
        case "precise":
          return { dx: 0, dy: 0, opMod: 0.9 + Math.sin(t * 3 + particle.id) * 0.1 };
        case "energetic":
          return {
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            opMod: 0.7 + Math.random() * 0.3,
          };
        case "steady":
          return { dx: 0, dy: Math.sin(t * 0.5 + particle.id) * 0.5, opMod: 1 };
        case "branching":
          return {
            dx: Math.sin(t * 2 + particle.id * 0.5) * 1.5,
            dy: Math.cos(t * 2 + particle.id * 0.5) * 1.5,
            opMod: 1,
          };
        default:
          return { dx: 0, dy: 0, opMod: 1 };
      }
    },
    []
  );

  // Animation loop
  useEffect(() => {
    const svg = svgRef.current;
    const paths = pathRefs.current;
    if (!svg || !paths) return;

    // Create circle elements
    const existingCircles = svg.querySelectorAll(".hero-particle");
    existingCircles.forEach((el) => el.remove());

    particlesRef.current = initParticles();
    circlesRef.current = [];

    for (const particle of particlesRef.current) {
      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      circle.classList.add("hero-particle");
      circle.setAttribute("r", String(particle.size));
      circle.setAttribute("fill", "white");
      circle.setAttribute("opacity", "0");
      svg.appendChild(circle);
      circlesRef.current.push(circle);
    }

    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = (time - lastTime) * 0.001;
      lastTime = time;

      const particles = particlesRef.current;
      const circles = circlesRef.current;
      const currentPaths = pathRefs.current;

      if (!currentPaths) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const circle = circles[i];
        const path = currentPaths[p.pathIndex];

        if (!circle || !path) continue;

        // Update progress
        const baseSpeed = profileRef.current.speed * 0.15;
        p.progress += p.speed * baseSpeed * dt;
        if (p.progress > 1) {
          p.progress -= 1;
          // Re-randomize speed slightly
          p.speed = profileRef.current.speed * (0.7 + Math.random() * 0.6);
        }

        // Get position along path
        const pathLength = path.getTotalLength();
        const point = path.getPointAtLength(p.progress * pathLength);

        // Apply behavior offsets
        const mod = applyBehavior(p, dt);

        const finalX = point.x + mod.dx;
        const finalY = point.y + mod.dy;
        const finalOpacity = activeRef.current
          ? p.opacity * mod.opMod
          : p.opacity * 0.3 * mod.opMod;

        circle.setAttribute("cx", String(finalX));
        circle.setAttribute("cy", String(finalY));
        circle.setAttribute("opacity", String(finalOpacity));
        circle.setAttribute("r", String(p.size));
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // Clean up circles
      for (const circle of circlesRef.current) {
        circle?.remove();
      }
    };
  }, [svgRef, pathRefs, initParticles, applyBehavior]);

  // Update particle properties when profile changes
  useEffect(() => {
    for (const p of particlesRef.current) {
      p.behavior = profile.behavior;
      p.size = profile.size * (0.8 + Math.random() * 0.4);
    }
  }, [profile]);
}
