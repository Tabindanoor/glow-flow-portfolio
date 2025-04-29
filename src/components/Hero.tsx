
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
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

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen w-full flex flex-col justify-center items-center pt-16 relative overflow-hidden"
      ref={heroRef}
    >
      <motion.div 
        ref={containerRef}
        style={{ y, opacity }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <p 
            className="text-4xl font-space font-bold text-white"
          >
            I am <span className="text-gradient"> Tabinda noor</span>
          </p>

          <motion.h1 
            ref={headingRef}
            className="text-4xl sm:text-6xl md:text-7xl font-bold font-space my-6 animate-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            MERN Stack <span className="text-gradient">Developer</span>
          </motion.h1>
          
          <motion.p 
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-gray-300 max-w-2xl mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Building immersive digital experiences with cutting-edge web technologies
          </motion.p>
          
          <motion.div 
            ref={ctaRef} 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a 
              href="#projects" 
              className="btn-primary flex items-center justify-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
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
      
      {/* Parallax background elements */}
      <motion.div 
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-neon-purple/20 blur-[100px] parallax"
        data-depth="0.2"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]) }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-neon-cyan/20 blur-[100px] parallax"
        data-depth="0.4"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]) }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-neon-magenta/10 blur-[80px] parallax"
        data-depth="0.3"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
      />
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div 
          className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-white"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
