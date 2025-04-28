
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
      <motion.div style={{ opacity }} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
        <div className="flex flex-col items-center text-center mb-8">

          <motion.p 
            className="text-4xl font-space font-bold text-white"
          >
            I am <span className="text-gradient"> Tabinda noor</span>
          </motion.p>

          <motion.h1 
            ref={headingRef}
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-space my-6 animate-glow"
          >
            MERN Stack <span className="text-gradient">Developer</span>
          </motion.h1>
          
          <motion.p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-gray-300 max-w-2xl mb-12"
          >
            Building immersive digital experiences with cutting-edge web technologies
          </motion.p>
          
          <motion.div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
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
      </motion.div>
      
      {/* Parallax Decorative Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-neon-purple/20 blur-[100px]" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-neon-cyan/20 blur-[100px]" 
      />
      
      {/* Mouse scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 12, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/80 rounded-full animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
