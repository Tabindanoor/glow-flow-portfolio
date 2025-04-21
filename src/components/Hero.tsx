
import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

const AnimatedText = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = THREE.MathUtils.lerp(
        mesh.current.rotation.y,
        (state.mouse.x * Math.PI) / 10,
        0.05
      );
      mesh.current.rotation.x = THREE.MathUtils.lerp(
        mesh.current.rotation.x,
        (state.mouse.y * Math.PI) / 10,
        0.05
      );
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={1.5}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
      >
        Portfolio
        <meshStandardMaterial
          color={"#00F5FF"}
          emissive={"#00F5FF"}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Text3D>
    </mesh>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current && headingRef.current && subtitleRef.current && ctaRef.current) {
      // Animate hero content
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" }
      );
      
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power3.out" }
      );
      
      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1.1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-screen w-full flex flex-col justify-center items-center pt-16 relative overflow-hidden"
      ref={heroRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 
            ref={headingRef}
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-space mb-6 animate-glow"
          >
            Creative <span className="text-neon-cyan">Developer</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-gray-300 max-w-2xl mb-12"
          >
            Building immersive digital experiences with cutting-edge web technologies
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#projects" 
              className="bg-neon-purple hover:bg-neon-purple/90 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(155,93,229,0.5)]"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 font-medium py-3 px-8 rounded-lg transition-all duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="w-full h-[300px] sm:h-[400px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight 
              position={[0, 10, 0]} 
              angle={0.3} 
              penumbra={1} 
              intensity={1} 
              castShadow
            />
            <AnimatedText />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              enableRotate={false} 
            />
          </Canvas>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <p className="text-gray-400 mb-2">Scroll Down</p>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6 text-neon-cyan" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
