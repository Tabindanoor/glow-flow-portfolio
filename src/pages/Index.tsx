
import { useEffect } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/sections/Skills';
import Services from '@/components/sections/Services';
import Experience from '@/components/sections/Experience';
import Education from '@/components/sections/Education';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import { initScrollAnimations } from '@/lib/animations';

const Index = () => {
  useEffect(() => {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Update page title
    document.title = "Creative Portfolio | 3D Interactive Experience";
    
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Performance optimization - load non-critical resources after page load
    const timer = setTimeout(() => {
      const lazyImages = Array.from(document.querySelectorAll('img.lazy'));
      if (lazyImages.length > 0) {
        if ('IntersectionObserver' in window) {
          const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const lazyImage = entry.target as HTMLImageElement;
                lazyImage.src = lazyImage.dataset.src || '';
                lazyImage.classList.remove('lazy');
                lazyImageObserver.unobserve(lazyImage);
              }
            });
          });

          lazyImages.forEach((lazyImage) => {
            lazyImageObserver.observe(lazyImage);
          });
        }
      }
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
  return (
    <div className="min-h-screen relative bg-dark">
      {/* 3D Particle Background */}
      <ParticleBackground />
      
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
