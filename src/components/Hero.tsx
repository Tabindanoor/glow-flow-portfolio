
import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

const AnimatedText = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (mesh.current) {
      // Smoother rotation based on mouse movement
      mesh.current.rotation.y = THREE.MathUtils.lerp(
        mesh.current.rotation.y,
        (state.mouse.x * Math.PI) / 8,
        0.075
      );
      mesh.current.rotation.x = THREE.MathUtils.lerp(
        mesh.current.rotation.x,
        (state.mouse.y * Math.PI) / 8,
        0.075
      );
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <Text3D
        font="/fonts/Inter_Bold.json"
        size={1.2}
        height={0.3}
        curveSegments={24}
        bevelEnabled
        bevelThickness={0.05}
        bevelSize={0.04}
        bevelOffset={0}
        bevelSegments={10}
      >
        Portfolio
        <meshStandardMaterial
          color={"#00F5FF"}
          emissive={"#00F5FF"}
          emissiveIntensity={0.8}
          metalness={1}
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
            Creative <span className="text-gradient">Developer</span>
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
              className="btn-primary flex items-center justify-center gap-2 group"
            >
              View Projects
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="btn-secondary"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="w-full h-[300px] sm:h-[400px] animate-float">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <spotLight 
              position={[0, 10, 0]} 
              angle={0.3} 
              penumbra={1} 
              intensity={1.5} 
              castShadow
            />
            <AnimatedText />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              enableRotate={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <p className="text-gray-400 mb-2">Scroll Down</p>
        <ArrowDown className="h-6 w-6 text-neon-cyan" />
      </div>
      
      {/* Decorative gradient shapes */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-neon-purple/20 blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-neon-cyan/20 blur-[100px]" />
    </section>
  );
};

export default Hero;
