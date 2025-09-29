
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';
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

const Hero = ({ onProjectClick, onContactClick }: {
  onProjectClick: () => void;
  onContactClick: () => void;
}) => {
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

        <p 
            className="text-4xl font-space font-bold text-white"
          >
            I am <span className="text-gradient"> Tabinda noor</span>
          </p>


          <h1 
            ref={headingRef}
            className="text-4xl sm:text-6xl md:text-5xl font-bold font-space my-6 animate-glow"
          >
            MERN Stack <span className="text-gradient">Developer</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-gray-300 max-w-2xl mb-12"
          >
            Building immersive digital experiences with cutting-edge web technologies
          </p>

 <div className="flex gap-4">
        <button
          onClick={onProjectClick}
          className="btn-primary"
        >
          View Projects
        </button>
       
         <button onClick={onContactClick} className="btn-secondary">    Contact Me  </button>
      </div>        </div>


      
      </div>
      
      {/* Decorative gradient shapes */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-neon-purple/20 blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-neon-cyan/20 blur-[100px]" />

    </section>
  );
};

export default Hero;
