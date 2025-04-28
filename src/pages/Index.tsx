
import { useEffect } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import { motion, useScroll, useSpring } from 'framer-motion';
import Footer from '@/components/Footer';
import { initScrollAnimations } from '@/lib/animations';
import Services from '@/components/sections/Services';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  // useEffect(() => {
  //   // Initialize scroll animations
  //   initScrollAnimations();
    
  //   // Update page title
  //   document.title = "Creative Portfolio | 3D Interactive Experience";
  // }, []);
  

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Update page title
    document.title = "Creative Portfolio | 3D Interactive Experience";
    
    // Preload assets for better performance
    const preloadImages = () => {
      const images = ['/placeholder.svg'];
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };
    
    preloadImages();
  }, []);
  
  return (
    <div className="min-h-screen relative bg-dark">
      3D Particle Background
      <ParticleBackground />
      <CustomCursor />
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Services/>
        <Projects />
        <Skills />
        {/* <Testimonials /> */}
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
