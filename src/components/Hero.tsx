
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import ParallaxEffect from './ParallaxEffect';

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
          <ParallaxEffect intensity={0.3} direction="up">
            <p className="text-4xl font-space font-bold text-white">
              I am <span className="text-gradient"> Tabinda noor</span>
            </p>
          </ParallaxEffect>

          <motion.h1 
            ref={headingRef}
            className="text-4xl sm:text-6xl md:text-5xl font-bold font-space my-6 animate-glow"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            MERN Stack <span className="text-gradient">Developer</span>
          </motion.h1>
          
          <motion.p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-gray-300 max-w-2xl mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Building immersive digital experiences with cutting-edge web technologies
          </motion.p>
          
          <ParallaxEffect intensity={0.1} direction="down">
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
              <motion.a 
                href="#projects" 
                className="btn-primary flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </motion.a>
              <motion.a 
                href="#contact" 
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </div>
          </ParallaxEffect>
        </div>
      </div>
      
      {/* Decorative gradient shapes with parallax effect */}
      <motion.div 
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-neon-purple/20 blur-[100px]"
        animate={{ 
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-neon-cyan/20 blur-[100px]"
        animate={{ 
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut" 
        }}
      />
    </section>
  );
};

export default Hero;
