
import { School } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import { fadeInRight, fadeInUp } from '@/lib/animations';


const Education = () => {

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
          if (textRef.current) fadeInRight(textRef.current, 0.3);
          if (imageRef.current) fadeInUp(imageRef.current, 0.5);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (

    <section    id="education" 
    ref={sectionRef}>
    <div className="space-y-8" 
    >
      <h2 className="section-heading text-center flex items-center justify-center gap-3">
        <School className="h-8 w-8" />
        <span  ref={headingRef} >Education</span>
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {education.map((edu, index) => (
          <Card key={index} className="p-6 neon-card hover:scale-105 transition-transform duration-300">
            <h3 ref={textRef} className="text-xl font-bold text-neon-cyan mb-2">{edu.degree}</h3>
            <p className="text-white font-medium mb-1">{edu.institution}</p>
            <p className="text-gray-400 text-sm mb-4">{edu.period}</p>
            <p className="text-gray-300">{edu.description}</p>
          </Card>
        ))}
      </div>
    </div>
    </section>
  );
};

export default Education;
