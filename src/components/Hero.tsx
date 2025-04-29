
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D } from '@react-three/drei';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (heroRef.current && headingRef.current && subtitleRef.current && ctaRef.current) {
      // Animate hero content using framer-motion's animate function
      const controls = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 }
      };
    }
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-screen w-full flex flex-col justify-center items-center pt-16 relative overflow-hidden"
      ref={containerRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-8">
          <ParallaxEffect direction="up" offset={30} className="mb-6">
            <motion.p 
              className="text-4xl font-space font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              I am <span className="text-gradient"> Tabinda noor</span>
            </motion.p>
          </ParallaxEffect>

          <motion.h1 
            ref={headingRef}
            className="text-4xl sm:text-6xl md:text-5xl font-bold font-space my-6 animate-glow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            style={{ y: textY }}
          >
            MERN Stack <span className="text-gradient">Developer</span>
          </motion.h1>
          
          <ParallaxEffect direction="down" offset={20}>
            <motion.p 
              ref={subtitleRef}
              className="text-xl sm:text-2xl text-gray-300 max-w-2xl mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              Building immersive digital experiences with cutting-edge web technologies
            </motion.p>
          </ParallaxEffect>
          
          <motion.div 
            ref={ctaRef} 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
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
          </motion.div>
        </div>
      </div>
      
      {/* Parallax effect for decorative shapes */}
      <motion.div 
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-neon-purple/20 blur-[100px]" 
        style={{ y: backgroundY }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-neon-cyan/20 blur-[100px]" 
        style={{ y: backgroundY }}
      />
    </section>
  );
};

export default Hero;
