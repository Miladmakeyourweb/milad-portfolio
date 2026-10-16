import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

interface OrbProps {
  position: [number, number, number];
  size: number;
  color: string;
  speed: number;
}

function GlassOrb({
  position,
  size,
  color,
  speed,
}: OrbProps) {
  const orb = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!orb.current) return;

    const time = state.clock.elapsedTime;

    orb.current.position.y =
      position[1] + Math.sin(time * speed) * 0.12;

    orb.current.position.x =
      position[0] + Math.sin(time * speed * 0.5) * 0.06;

    orb.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={orb} position={position} scale={size}>
      <sphereGeometry args={[1, 64, 64]} />

      <meshPhysicalMaterial
        color={color}
        metalness={0.12}
        roughness={0.055}
        transmission={0.65}
        thickness={1.5}
        ior={1.3}
        clearcoat={1}
        clearcoatRoughness={0.025}
        envMapIntensity={1.8}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />

      <directionalLight
        position={[-4, 5, 5]}
        intensity={2.5}
        color="#e2eaff"
      />

      <pointLight
        position={[3, 2, 3]}
        intensity={18}
        color="#7040ff"
      />

      <pointLight
        position={[-3, -2, 2]}
        intensity={16}
        color="#168dff"
      />

      {/* Small floating glass sphere on the left */}
      <GlassOrb
        position={[-2.1, 1.15, 0]}
        size={0.16}
        color="#a5d5ff"
        speed={0.7}
      />

      {/* Small floating glass sphere on the right */}
      <GlassOrb
        position={[2.05, -1.15, 0]}
        size={0.13}
        color="#c0a4ff"
        speed={0.9}
      />

      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 6],
          fov: 42,
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}