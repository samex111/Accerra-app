"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Points,
  PointMaterial,
} from "@react-three/drei";

import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";

import { useRef, useMemo } from "react";

import * as THREE from "three";

function Particles() {
  const ref = useRef();

  // Generate particles
  const particles = useMemo(() => {
    const positions = new Float32Array(
      6000
    );

    for (let i = 0; i < 6000; i++) {
      positions[i] =
        (Math.random() - 0.5) * 30;
    }

    return positions;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Mouse interaction
    const mouseX = state.mouse.x;
    const mouseY = state.mouse.y;

    // Smooth rotation toward mouse
    ref.current.rotation.y +=
      (mouseX * 0.6 -
        ref.current.rotation.y) *
      0.05;

    ref.current.rotation.x +=
      (-mouseY * 0.4 -
        ref.current.rotation.x) *
      0.05;

    // Floating movement
    ref.current.position.y =
      Math.sin(
        state.clock.elapsedTime * 2
      ) * 0.25;

    // Speed rotation
    ref.current.rotation.z +=
      delta * 0.08;
  });

  return (
    <Points
      ref={ref}
      positions={particles}
      stride={3}
      frustumCulled
    >
      <PointMaterial
        transparent
        color="#ffffff"
       size={0.015}
        sizeAttenuation
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
      />
    </Points>
  );
}

export default function ParticleBackground() {
  return (
   <div className="absolute inset-0 z-0 overflow-hidden bg-black">
  
  {/* Base gradient */}
  <div
    className="
      absolute inset-0
      bg-gradient-to-br
      from-[#dfe9ff]
      via-[#4d8dff]
      to-[#0057ff]
    "
  />

  {/* Left soft glow */}
  <div
    className="
      absolute
      -left-40
      top-0
      h-[600px]
      w-[600px]
      rounded-full
      bg-white/40
      blur-[140px]
    "
  />

  {/* Center blue glow */}
  <div
    className="
      absolute
      left-1/2
      top-1/2
      h-[500px]
      w-[500px]
      -translate-x-1/2
      -translate-y-1/2
      rounded-full
      bg-blue-500/40
      blur-[140px]
    "
  />

  {/* Right strong blue */}
  <div
    className="
      absolute
      right-0
      top-0
      h-[700px]
      w-[700px]
      rounded-full
      bg-blue-700/40
      blur-[160px]
    "
  />
      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 75,
        }}
      >
        {/* Particles */}
        <Particles />

        {/* Glow / Bloom */}
        {/* <EffectComposer> */}
          <Bloom
            intensity={2}
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
          />
        {/* </EffectComposer> */}
      </Canvas>
    </div>
  );
}