
import { School, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { fadeInRight, fadeInUp } from '@/lib/animations';

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const education = [
    {
      degree: "BSSE",
      institution: "GC University Faisalabad",
      period: "2020 - 2024",
      description: "Bachelors in Software Engineering, learned Software Development. Learned enhanced concepts in programming. Selected MERN as a future field."
    },
    {
      degree: "ICS",
      institution: "Kips College",
      period: "2018 - 2020",
      description: "Intermediate in Computer Science, scored 92% in exams. Learned C++ language and practically worked on OOP concepts."
    },
    {
      degree: "Matriculation",
      institution: "Muslim Girls School",
      period: "2016 - 2018",
      description: "Matriculation with Computer Science, scored 94% in exams. Learned the basic of C language and Object Oriented Programming."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (headingRef.current) fadeInUp(headingRef.current);
          if (contentRef.current) fadeInRight(contentRef.current, 0.3);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-dark to-dark/95"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 space-y-16">
        <h2 ref={headingRef} className="section-heading text-center">
          My <span className="text-neon-cyan">Education</span>
        </h2>

        <div ref={contentRef} className="relative">
          {/* Timeline bar */}
          <div className="absolute left-0 top-8 bottom-8 w-2 bg-gradient-to-b from-neon-cyan to-neon-purple rounded-full hidden lg:block"></div>
          
          {education.map((edu, index) => (
            <div 
              key={index} 
              className="flex flex-col lg:flex-row items-start gap-8 mb-16 last:mb-0 group"
            >
              {/* Circle marker */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-dark border-4 border-neon-cyan flex items-center justify-center group-hover:scale-110 transition-transform">
                  <School className="h-5 w-5 text-neon-cyan" />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-6 rounded-xl bg-gradient-to-r from-dark/60 to-dark/80 backdrop-blur-md border border-neon-purple/20 hover:border-neon-cyan/40 transition-all duration-300 shadow-lg group-hover:shadow-neon-cyan/20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <h3 className="text-2xl font-bold text-neon-cyan">{edu.degree}</h3>
                  <span className="text-white bg-neon-purple/20 px-3 py-1 rounded-full text-sm mt-2 sm:mt-0">
                    {edu.period}
                  </span>
                </div>
                
                <h4 className="text-lg text-white font-medium mb-4">{edu.institution}</h4>
                <p className="text-gray-300">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
