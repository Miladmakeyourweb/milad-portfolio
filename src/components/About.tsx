
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  Code2,
  Zap,
  UserRound,
  ArrowRight,
} from "lucide-react";
import * as THREE from "three";
import "./About.css";

function FloatingOrb({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: number;
  color: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    const time = clock.getElapsedTime();
    mesh.current.position.y =
      position[1] + Math.sin(time * 0.7 + position[0]) * 0.12;

    mesh.current.rotation.y = time * 0.12;
  });

  return (
    <mesh ref={mesh} position={position} scale={size}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        color={color}
        metalness={0.25}
        roughness={0.08}
        transmission={0.65}
        thickness={1.2}
        ior={1.35}
        clearcoat={1}
        clearcoatRoughness={0.04}
      />
    </mesh>
  );
}

function About3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.8} />

      <directionalLight
        position={[-3, 4, 5]}
        intensity={2.5}
        color="#ffffff"
      />

      <pointLight
        position={[2, 1, 2]}
        intensity={15}
        color="#753cff"
      />

      <pointLight
        position={[-2, -1, 2]}
        intensity={12}
        color="#258bff"
      />

      <FloatingOrb
        position={[1.35, 1.15, 0.2]}
        size={0.2}
        color="#a9baff"
      />

      <FloatingOrb
        position={[-1.45, -0.25, 0.5]}
        size={0.29}
        color="#6e83ff"
      />

      <FloatingOrb
        position={[1.15, -1.2, 0]}
        size={0.13}
        color="#c8a4ff"
      />

      <Environment preset="city" />
    </Canvas>
  );
}

const features = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Readable, maintainable, and scalable.",
  },
  {
    icon: Zap,
    title: "High Performance",
    description: "Fast, optimized, and reliable.",
  },
  {
    icon: UserRound,
    title: "User Focused",
    description: "Designing for real people and real needs.",
  },
];

const technologies = [
  { name: "React", symbol: "⚛", className: "react" },
  { name: "Next.js", symbol: "N", className: "next" },
  { name: "Tailwind CSS", symbol: "≈", className: "tailwind" },
  { name: "Figma", symbol: "◉", className: "figma" },
  { name: "GitHub", symbol: "◉", className: "github" },
];

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-layout">
        <div className="about-visual">
          <div className="about-image-frame">
            <img
              className="about-portrait"
              src="/images/about-portrait.png"
              alt="Portrait of Milad"
            />

            <div className="about-image-shade" />
            <div className="about-image-glow" />
          </div>

          <div className="about-3d">
            <About3D />
          </div>

          <div className="about-orbit orbit-one" />
          <div className="about-orbit orbit-two" />

          <div className="about-image-caption">
            <span className="caption-dot" />
            <div>
              <strong>MILAD</strong>
              <span>Frontend Developer</span>
            </div>
          </div>
        </div>

        <div className="about-content">
          <div className="about-eyebrow">
            <span />
            ABOUT ME
          </div>

          <h2 className="about-heading">
            A Developer
            <br />
            Who Cares About{" "}
            <span className="about-gradient">Details.</span>
          </h2>

          <p className="about-description">
            I design and develop modern web applications with a
            focus on clean code, user experience, and real-world
            impact. I enjoy turning complex problems into simple,
            beautiful solutions.
          </p>

          <div className="about-feature-grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  className="about-feature-card"
                  key={feature.title}
                >
                  <div className="about-feature-icon">
                    <Icon size={25} strokeWidth={2.1} />
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>
                </article>
              );
            })}
          </div>

          <div className="about-tech">
            <div className="about-eyebrow">
              <span />
              TECH STACK
            </div>

            <div className="about-tech-grid">
              {technologies.map((tech) => (
                <div
                  className="about-tech-item"
                  key={tech.name}
                  title={tech.name}
                  aria-label={tech.name}
                >
                  <span className={`tech-symbol ${tech.className}`}>
                    {tech.symbol}
                  </span>
                  <span className="tech-name">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          <a className="about-more-button" href="#projects">
            Explore My Work
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}