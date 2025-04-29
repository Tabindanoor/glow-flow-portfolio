
import { useEffect } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import Services from '@/components/Services';
import { initScrollAnimations } from '@/lib/animations';
import { motion, AnimatePresence } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Update page title
    document.title = "Creative Portfolio | 3D Interactive Experience";
  }, []);
  
  return (
    <AnimatePresence>
      <div className="min-h-screen relative bg-dark">
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* 3D Particle Background */}
        <ParticleBackground />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <About />
          <Services />
          <Projects />
          <Skills />
          {/* <Testimonials /> */}
          <Contact />
        </motion.main>
        
        {/* Footer */}
        <Footer />
      </div>
    </AnimatePresence>
  );
};

export default Index;
