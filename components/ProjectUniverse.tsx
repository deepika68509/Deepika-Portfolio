"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const positions: [number, number, number][] = [[-2.2, 0.8, 0], [-0.3, 1.45, 0.15], [1.8, 0.3, -0.1], [0.2, -1.25, 0.2]];

function Universe({ active }: { active: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.18) * 0.12;
  });
  return (
    <group ref={group}>
      {positions.slice(0, -1).map((position, index) => <Line key={index} points={[position, positions[index + 1]]} color={active >= 0 && (active === index || active === index + 1) ? "#D7FF3F" : "#111111"} transparent opacity={active >= 0 && (active === index || active === index + 1) ? 0.7 : 0.18} lineWidth={0.7} />)}
      {positions.map((position, index) => <mesh key={index} position={position}><sphereGeometry args={[active === index ? 0.18 : 0.1, 16, 16]} /><meshBasicMaterial color={active === index ? "#3155FF" : "#111111"} /></mesh>)}
    </group>
  );
}

export default function ProjectUniverse({ active }: { active: number }) {
  return <div className="webgl-universe" aria-hidden="true"><Canvas camera={{ position: [0, 0, 6], fov: 44 }} dpr={[1, 1.5]}><Universe active={active} /></Canvas></div>;
}
