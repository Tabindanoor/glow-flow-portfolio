
import { useEffect } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Achievements from '@/components/sections/Achievements';
import { initScrollAnimations } from '@/lib/animations';

const Index = () => {
  useEffect(() => {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Update page title
    document.title = "Creative Portfolio | 3D Interactive Experience";
  }, []);
  
  return (
    <div className="min-h-screen relative bg-dark">
      {/* 3D Particle Background */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Achievements />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
