
import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticlesProps {
  count: number;
  mouse: React.RefObject<THREE.Vector2>;
}

const Particles = ({ count, mouse }: ParticlesProps) => {
  const points = useRef<THREE.Points>(null!);
  const initialPositions = useRef<Float32Array | null>(null);
  
  const particlesPosition = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    particlesPosition[i3] = (Math.random() - 0.5) * 20; // Increased spread
    particlesPosition[i3 + 1] = (Math.random() - 0.5) * 15;
    particlesPosition[i3 + 2] = (Math.random() - 0.5) * 10;
  }
  
  useEffect(() => {
    if (points.current && points.current.geometry) {
      const positionAttribute = points.current.geometry.attributes.position.array;
      initialPositions.current = new Float32Array(positionAttribute);
    }
  }, []);

  useFrame(({ clock }) => {
    if (!points.current || !initialPositions.current || !mouse.current) return;
    
    const positions = points.current.geometry.attributes.position.array as Float32Array;
    const time = clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Enhanced wave animation
      positions[i3] = initialPositions.current[i3] + Math.sin(time * 0.4 + i * 0.02) * 0.2;
      positions[i3 + 1] = initialPositions.current[i3 + 1] + Math.cos(time * 0.3 + i * 0.03) * 0.3;
      positions[i3 + 2] = initialPositions.current[i3 + 2] + Math.sin(time * 0.5 + i * 0.04) * 0.2;
      
      // Enhanced mouse interaction
      if (mouse.current.x !== 0 && mouse.current.y !== 0) {
        const mouseX = mouse.current.x * 15;
        const mouseY = -mouse.current.y * 15;
        const dx = mouseX - positions[i3];
        const dy = mouseY - positions[i3 + 1];
        const dz = -5 - positions[i3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const force = 0.05 / Math.max(0.5, distance);
        
        positions[i3] += dx * force;
        positions[i3 + 1] += dy * force;
        positions[i3 + 2] += dz * force;
      }
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#9B5DE5"
          size={0.05}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Points positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00F5FF"
          size={0.03}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.6}
        />
      </Points>
    </>
  );
};

const ParticleBackground = () => {
  const mousePosition = useRef(new THREE.Vector2(0, 0));
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Particles count={4000} mouse={mousePosition} />
      </Canvas>
      <div className="gradient-overlay bg-gradient-to-b from-dark/0 via-dark/70 to-dark" />
    </div>
  );
};

export default ParticleBackground;
