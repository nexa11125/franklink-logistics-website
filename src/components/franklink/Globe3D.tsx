'use client';

import { useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ── Globe wireframe + distort core ── */
function GlobeCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.08;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.05;
      wireRef.current.rotation.x = Math.sin(t * 0.03) * 0.15;
    }
  });

  return (
    <group>
      {/* Solid core */}
      <mesh ref={meshRef} scale={2.8}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color="#0d1a2e"
            emissive="#1a3a5c"
            emissiveIntensity={0.15}
            roughness={0.6}
            metalness={0.9}
            distort={0.2}
            speed={1.5}
            transparent
            opacity={0.6}
          />
        </Sphere>
      </mesh>
      {/* Wireframe overlay */}
      <mesh ref={wireRef} scale={2.85}>
        <Sphere args={[1, 32, 32]}>
          <meshBasicMaterial
            color="#d4a24e"
            wireframe
            transparent
            opacity={0.06}
          />
        </Sphere>
      </mesh>
    </group>
  );
}

/* ── Globe surface dots (cities/ports) ── */
function GlobeDots() {
  const ref = useRef<THREE.Points>(null);
  const count = 600;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.85;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#d4a24e"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Animated shipping route arcs with traveling dots ── */
function ShippingRoute({ start, end, color, speed, offset }: {
  start: [number, number, number]; end: [number, number, number];
  color: string; speed: number; offset: number;
}) {
  const dotRef = useRef<THREE.Mesh>(null);
  const dot2Ref = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const mid = new THREE.Vector3(
      (start[0] + end[0]) / 2 + offset * 0.3,
      (start[1] + end[1]) / 2 + 1.2 + Math.abs(offset) * 0.2,
      (start[2] + end[2]) / 2
    );
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const omt = 1 - t;
      pts.push(new THREE.Vector3(
        omt * omt * start[0] + 2 * omt * t * mid.x + t * t * end[0],
        omt * omt * start[1] + 2 * omt * t * mid.y + t * t * end[1],
        omt * omt * start[2] + 2 * omt * t * mid.z + t * t * end[2],
      ));
    }
    return new THREE.CatmullRomCurve3(pts);
  }, [start, end, offset]);

  const lineGeo = useMemo(() => {
    const pts = curve.getPoints(60);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    return geo;
  }, [curve]);

  useFrame((state) => {
    const t1 = (state.clock.elapsedTime * speed * 0.12) % 1;
    const t2 = ((state.clock.elapsedTime * speed * 0.12) + 0.5) % 1;
    if (dotRef.current) dotRef.current.position.copy(curve.getPoint(t1));
    if (dot2Ref.current) dot2Ref.current.position.copy(curve.getPoint(t2));
  });

  return (
    <group>
      <line geometry={lineGeo}>
        <lineBasicMaterial color={color} transparent opacity={0.18} />
      </line>
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={dot2Ref}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function AllRoutes() {
  const routes = useMemo(() => [
    { start: [1.2, 1.5, 2.0] as [number, number, number], end: [-2.0, 1.0, 1.5], color: '#d4a24e', speed: 0.7, offset: 1 },
    { start: [1.5, 0.3, 2.2] as [number, number, number], end: [-1.2, -1.3, 2.0], color: '#f0c96e', speed: 1.0, offset: -1 },
    { start: [-0.5, 2.2, 1.0] as [number, number, number], end: [1.8, -0.8, 1.5], color: '#d4a24e', speed: 0.5, offset: 0.5 },
    { start: [2.0, 0.0, -1.0] as [number, number, number], end: [-1.5, 1.5, -1.8], color: '#f0c96e', speed: 0.9, offset: -0.5 },
    { start: [0.0, 2.5, 0.5] as [number, number, number], end: [0.5, -2.0, 2.0], color: '#d4a24e', speed: 0.6, offset: 1.5 },
    { start: [-2.0, -0.5, 1.5] as [number, number, number], end: [2.2, 1.2, -0.5], color: '#f0c96e', speed: 0.8, offset: -1.5 },
  ], []);

  return (
    <group rotation={[0.2, 0, 0]}>
      {routes.map((r, i) => <ShippingRoute key={i} {...r} />)}
    </group>
  );
}

/* ── 3D Shipping Container ── */
function ShippingContainer({ position, rotation, color, speed }: {
  position: [number, number, number]; rotation: [number, number, number]; color: string; speed: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      ref.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* Container body */}
      <mesh castShadow>
        <boxGeometry args={[0.6, 0.35, 0.25]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Container ridges */}
      {[-0.2, 0, 0.2].map((x, i) => (
        <mesh key={i} position={[x, 0.001, 0]}>
          <boxGeometry args={[0.02, 0.352, 0.252]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function FloatingContainers() {
  return (
    <group>
      <ShippingContainer position={[-4, 0.5, -3]} rotation={[0.1, 0.5, 0.05]} color="#c0392b" speed={0.4} />
      <ShippingContainer position={[4.5, -0.5, -2]} rotation={[-0.1, -0.3, 0.08]} color="#2980b9" speed={0.3} />
      <ShippingContainer position={[-3.5, -1.5, -4]} rotation={[0.15, 0.8, -0.05]} color="#27ae60" speed={0.5} />
      <ShippingContainer position={[3, 1.8, -5]} rotation={[-0.05, -0.6, 0.1]} color="#d4a24e" speed={0.35} />
      <ShippingContainer position={[-5, 2, -4.5]} rotation={[0.2, 1.2, -0.03]} color="#8e44ad" speed={0.45} />
    </group>
  );
}

/* ── Camera slow auto-rotate ── */
function CameraAutoRotate() {
  useFrame((state) => {
    const cam = state.camera;
    const t = state.clock.elapsedTime * 0.04;
    cam.position.x = Math.sin(t) * 0.8;
    cam.position.y = 0.3 + Math.sin(t * 0.7) * 0.3;
    cam.lookAt(0, 0, 0);
  });
  return null;
}

export default function Globe3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 6], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#f0c96e" />
      <directionalLight position={[-5, -2, 3]} intensity={0.2} color="#4488cc" />
      <pointLight position={[0, 3, 2]} intensity={0.4} color="#d4a24e" distance={15} />

      <GlobeCore />
      <GlobeDots />
      <AllRoutes />
      <FloatingContainers />
      <CameraAutoRotate />
    </Canvas>
  );
}