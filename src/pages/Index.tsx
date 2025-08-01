
// import { useEffect, useRef } from 'react';
// import ParticleBackground from '@/components/ParticleBackground';
// import Navbar from '@/components/Navbar';
// import Hero from '@/components/Hero';
// import About from '@/components/About';
// import Projects from '@/components/Projects';
// import Skills from '@/components/Skills';
// import Testimonials from '@/components/Testimonials';
// import Contact from '@/components/Contact';
// import Footer from '@/components/Footer';
// import { initScrollAnimations } from '@/lib/animations';
// import Services from '@/components/sections/Services';

// const Index = () => {
//     const projectsRef = useRef<HTMLElement>(null);
// const scrollToProjects = () => {
//     projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };
//   const contactRef = useRef<HTMLElement>(null);

//   const scrollToContact = () => {
//     contactRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };
//   useEffect(() => {
//     // Initialize scroll animations
//     initScrollAnimations();
    
//     // Update page title
//     document.title = "Creative Portfolio | 3D Interactive Experience";
//   }, []);
  
//   return (
//     <div className="min-h-screen relative ">
//       {/* 3D Particle Background */}
//       {/* <ParticleBackground /> */}
      
//       {/* Navigation */}
//       <Navbar />
      
//       {/* Main Content */}
//       <main>
//         <Hero   onProjectClick={scrollToProjects}
//            onContactClick={scrollToContact}
//            />     
//          <About />
//       <Projects ref={projectsRef} />
//         <Skills />
//         <Services/>
//         {/* <Testimonials /> */}
//         <Contact  ref={contactRef}/>
//       </main>
      
//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default Index;




import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { initScrollAnimations } from '@/lib/animations';
import Services from '@/components/sections/Services';
import Loader from '@/components/Loader';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const projectsRef = useRef<HTMLElement>(null);
const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const contactRef = useRef<HTMLElement>(null);
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    initScrollAnimations();
    document.title = "Creative Portfolio | 3D Interactive Experience";
  }, []);
  
  if (isLoading) {
    return <Loader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen relative ">
      <Navbar />
      <main>
     <Hero   onProjectClick={scrollToProjects} onContactClick={scrollToContact} />     
      <About />
      <Projects ref={projectsRef} />
        <Skills />
        <Services/>
        {/* <Testimonials /> */}
        <Contact  ref={contactRef}/>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
