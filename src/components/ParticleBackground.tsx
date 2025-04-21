
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
  
  // Generate random particles
  const particlesPosition = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    particlesPosition[i3] = (Math.random() - 0.5) * 15;
    particlesPosition[i3 + 1] = (Math.random() - 0.5) * 15;
    particlesPosition[i3 + 2] = (Math.random() - 0.5) * 15;
  }
  
  useEffect(() => {
    if (points.current && points.current.geometry) {
      // Create a new Float32Array from the source array to ensure type consistency
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
      
      // Apply sine wave animation for floating effect
      positions[i3 + 1] = initialPositions.current[i3 + 1] + Math.sin(time * 0.5 + i * 0.1) * 0.2;
      
      // Apply subtle mouse attraction
      if (mouse.current.x !== 0 && mouse.current.y !== 0) {
        const mouseX = mouse.current.x * 10;
        const mouseY = -mouse.current.y * 10;
        const dx = mouseX - positions[i3];
        const dy = mouseY - positions[i3 + 1];
        const dz = -5 - positions[i3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const force = 0.02 / Math.max(0.5, distance);
        
        positions[i3] += dx * force;
        positions[i3 + 1] += dy * force;
        positions[i3 + 2] += dz * force;
      }
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={"#9B5DE5"}
        size={0.06}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
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
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <Particles count={2000} mouse={mousePosition} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;
