
import { useEffect, useRef } from 'react';
import { fadeInUp, fadeInRight, staggerFadeIn } from '@/lib/animations';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (headingRef.current) fadeInUp(headingRef.current);
          if (textRef.current) fadeInRight(textRef.current, 0.3);
          if (imageRef.current) fadeInUp(imageRef.current, 0.5);
          
          const stats = statRefs.current.filter(Boolean) as HTMLDivElement[];
          if (stats.length) staggerFadeIn(stats, 0.1);
          
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 min-h-screen flex items-center bg-gradient-to-b from-dark to-dark/95"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={headingRef} className="section-heading text-center">
          About <span className="text-neon-cyan">Me</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-16">
          <div ref={imageRef} className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden neon-border">
              <div className="w-full h-full bg-gradient-to-br from-neon-purple/30 to-neon-cyan/30 flex items-center justify-center">
                <div className="text-7xl">👨‍💻</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-4 shadow-lg neon-border">
              <p className="text-lg font-semibold">
                <span className="text-neon-cyan">5+</span> Years Experience
              </p>
            </div>
          </div>
          
          <div ref={textRef} className="space-y-6">
            <p className="text-xl text-gray-300 leading-relaxed">
              I'm a passionate web developer specializing in creating immersive digital experiences with modern technologies like React, Three.js, and GSAP.
            </p>
            
            <p className="text-xl text-gray-300 leading-relaxed">
              My approach combines technical precision with creative design to build captivating, interactive, and high-performance web applications that stand out.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-10">
              {[
                { label: "Projects", value: "25+" },
                { label: "Clients", value: "15+" },
                { label: "Experience", value: "5+ years" },
                { label: "Satisfaction", value: "100%" }
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  ref={el => statRefs.current[index] = el}
                  className="neon-card p-4 text-center"
                >
                  <p className="text-3xl font-bold text-neon-cyan mb-2">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
