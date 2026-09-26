"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Text } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type HeroRole = "ai" | "data" | "web" | "creative";
type Body = { size: number; mass: number; position: THREE.Vector3; velocity: THREE.Vector3; color: string };

const cobalt = "#3155FF";
const ink = "#111111";
const keywords: Record<HeroRole, string[]> = {
  ai: ["AI / ML", "LLMs", "RAG", "Embeddings", "PyTorch", "Python", "Prediction"],
  data: ["DATA", "Pandas", "SQL", "EDA", "Statistics", "Feature Engineering", "Insights"],
  web: ["WEB", "React", "Next.js", "TypeScript", "APIs", "Frontend", "UI"],
  creative: ["CREATIVE", "Three.js", "GSAP", "WebGL", "Motion", "Interaction", "Experience"],
};
const starts = [[0, 0, 0], [-1.65, 0.25, 0.25], [1.5, 0.85, -0.2], [1.65, -0.9, 0.35], [-0.85, -1.45, -0.2], [-2.05, -1.15, 0.2], [0.25, 1.75, -0.4]];

function KeywordLabel({ label, index }: { label: string; index: number }) {
  const [labelPair, setLabelPair] = useState({ previous: label, current: label });
  const progress = useRef(1);
  const oldGroup = useRef<THREE.Group>(null);
  const newGroup = useRef<THREE.Group>(null);
  const oldText = useRef<THREE.Mesh>(null);
  const newText = useRef<THREE.Mesh>(null);

  useEffect(() => {
    setLabelPair((pair) => {
      if (label === pair.current) return pair;
      progress.current = 0;
      return { previous: pair.current, current: label };
    });
  }, [label]);

  useFrame((_, delta) => {
    progress.current = Math.min(1, progress.current + delta / 1.25);
    const eased = 1 - Math.pow(1 - progress.current, 3);
    const oldMaterial = oldText.current?.material as THREE.Material | undefined;
    const newMaterial = newText.current?.material as THREE.Material | undefined;
    if (oldMaterial) oldMaterial.opacity = 1 - eased;
    if (newMaterial) newMaterial.opacity = eased;
    if (oldGroup.current) oldGroup.current.position.y = -eased * 0.22;
    if (newGroup.current) newGroup.current.position.y = (1 - eased) * 0.22;
  });

  return <group position={[0, index === 0 ? -0.02 : 0, 0.08]}><group ref={oldGroup}><Text ref={oldText} fontSize={index === 0 ? 0.16 : 0.12} color={index === 0 ? "#F4F1EA" : ink} anchorX="center" anchorY="middle" fillOpacity={index === 0 ? 1 : 0.9}>{labelPair.previous}</Text></group><group ref={newGroup}><Text ref={newText} fontSize={index === 0 ? 0.16 : 0.12} color={index === 0 ? "#F4F1EA" : ink} anchorX="center" anchorY="middle" fillOpacity={0}>{labelPair.current}</Text></group></group>;
}

function OrbitalBody({ body, index, label }: { body: Body; index: number; label: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame(() => { if (group.current) group.current.position.copy(body.position); });
  return <group ref={group}><mesh><sphereGeometry args={[body.size, index === 0 ? 28 : 18, index === 0 ? 28 : 18]} /><meshBasicMaterial color={body.color} /></mesh>{index === 0 && <mesh rotation={[Math.PI / 2.15, 0.1, -0.2]}><torusGeometry args={[0.86, 0.012, 8, 80]} /><meshBasicMaterial color={cobalt} transparent opacity={0.72} /></mesh>}{index > 0 && index % 2 === 0 && <mesh rotation={[Math.PI / 2, index * 0.25, 0]}><torusGeometry args={[body.size * 1.5, 0.007, 6, 40]} /><meshBasicMaterial color={body.color} transparent opacity={0.28} /></mesh>}<KeywordLabel label={label} index={index} /></group>;
}

function GravityField({ role, reducedMotion }: { role: HeroRole; reducedMotion: boolean }) {
  const root = useRef<THREE.Group>(null);
  const pointerForce = useRef(new THREE.Vector3());
  const bodies = useMemo<Body[]>(() => starts.map(([x, y, z], index) => ({ size: index === 0 ? 0.62 : 0.16 + (index % 3) * 0.04, mass: index === 0 ? 12 : 0.5 + (index % 3) * 0.16, position: new THREE.Vector3(x, y, z), velocity: index === 0 ? new THREE.Vector3() : new THREE.Vector3(-y * 0.16, x * 0.16, (index % 2 ? 1 : -1) * 0.035), color: index === 0 ? ink : index % 3 === 0 ? cobalt : "#496BFF" })), []);
  const [isMobile, setIsMobile] = useState(false);
  const visibleCount = isMobile ? 5 : bodies.length;
  const orbitalLines = useMemo(() => [[[-2.5, 0, 0], [0, 2.05, 0], [2.35, 0, 0], [0, -1.9, 0], [-2.5, 0, 0]], [[-1.85, -1.5, 0.2], [-0.5, -2.05, 0.2], [1.5, -1.55, 0.2], [2.1, 0.1, 0.2]]], []);

  useEffect(() => { const update = () => setIsMobile(window.innerWidth < 700); update(); window.addEventListener("resize", update); return () => window.removeEventListener("resize", update); }, []);
  useFrame(({ pointer, camera, clock }, delta) => {
    const frame = Math.min(delta, 0.035);
    pointerForce.current.set(pointer.x * 0.22, pointer.y * 0.16, 0);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.16, 0.025);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.1, 0.025);
    if (root.current) { root.current.rotation.z = THREE.MathUtils.lerp(root.current.rotation.z, pointer.x * 0.025, 0.025); root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -pointer.y * 0.025, 0.025); }
    if (reducedMotion) return;
    for (let index = 1; index < visibleCount; index += 1) {
      const body = bodies[index];
      const force = new THREE.Vector3();
      for (let otherIndex = 0; otherIndex < visibleCount; otherIndex += 1) {
        if (otherIndex === index) continue;
        const other = bodies[otherIndex];
        const direction = other.position.clone().sub(body.position);
        const distance = Math.max(direction.length(), 0.36);
        const attraction = (0.12 * body.mass * other.mass) / (distance * distance + 0.7);
        force.add(direction.normalize().multiplyScalar(attraction));
        if (distance < body.size + other.size + 0.42) force.add(direction.normalize().multiplyScalar(-(body.size + other.size + 0.42 - distance) * 0.24));
      }
      force.add(pointerForce.current.clone().sub(body.position).multiplyScalar(0.006));
      body.velocity.add(force.multiplyScalar(frame / body.mass)); body.velocity.multiplyScalar(0.999); body.position.add(body.velocity.clone().multiplyScalar(frame));
      if (body.position.length() > 2.9) body.velocity.add(body.position.clone().normalize().multiplyScalar(-0.012));
    }
    bodies[0].position.set(0, Math.sin(clock.getElapsedTime() * 0.35) * 0.025, 0);
  });

  return <group ref={root}>{orbitalLines.map((line, index) => <Line key={index} points={line as [number, number, number][]} color={ink} transparent opacity={0.09} lineWidth={0.5} />)}{bodies.slice(0, visibleCount).map((body, index) => <OrbitalBody key={index} body={body} index={index} label={keywords[role][index]} />)}</group>;
}

export default function HeroVisualization({ role }: { role: HeroRole }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => { const query = window.matchMedia("(prefers-reduced-motion: reduce)"); const update = () => setReducedMotion(query.matches); update(); query.addEventListener("change", update); return () => query.removeEventListener("change", update); }, []);
  return <div className="webgl-hero" aria-hidden="true"><Canvas camera={{ position: [0, 0, 7], fov: 43 }} dpr={[1, 1.25]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }} fallback={<div className="hero-static-fallback">{keywords[role].slice(0, 5).map((keyword) => <span key={keyword}>{keyword}</span>)}</div>}><GravityField role={role} reducedMotion={reducedMotion} /><OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.35} minPolarAngle={Math.PI / 2.6} maxPolarAngle={Math.PI / 1.7} /></Canvas><div className="hero-scene-caption">GRAVITY FIELD / {role.toUpperCase()}</div></div>;
}