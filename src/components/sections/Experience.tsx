
// import { Briefcase } from 'lucide-react';
// import { Card } from '@/components/ui/card';

// const Experience = () => {
//   const experiences = [
//     {
//       role: "MERN Bootcamper",
//       company: "Techloset Solutions",
//       period: "02-20-2023 - 24-08-2023",
//       description: "Maintainable code using React JS, Express and Node JS, along with the Tailwind CSS, MongoDB and firebase."
//     },
//     {
//       role: "Web Developer Instructor",
//       company: "ITEC Systems Faisalabad",
//       period: "25-08-2022 - 01-02-2023",
//       description: "With the experience as a web instructor, I have gained invaluable insights into the art of guiding and educating aspiring web developers."
//     },
//     {
//       role: "Programmer",
//       company: "Corvit Systems Faisalabad",
//       period: "25-07-2022 - 20-08-2022",
//       description: "Using python programming Language, Manage the instances of AWS using python scripts."
//     },
//     {
//       role: "Selenium with JAVA training",
//       company: "HCC TECHNOLOGY FOUNDATION",
//       period: "JULY 2023 - SEPT 2023",
//       description: "With the experience trainee, I have gained expertise in web scraping using JAVA and python. Learned Testing techniques on Web Applications."
//     }
//   ];

//   return (
//     <div className="space-y-8">
//       <h2 className="section-heading text-center flex items-center justify-center gap-3">
//         <Briefcase className="h-8 w-8" />
//         <span>Experience</span>
//       </h2>
      
//       <div className="grid gap-6 md:grid-cols-2">
//         {experiences.map((exp, index) => (
//           <Card key={index} className="p-6 neon-card hover:scale-105 transition-transform duration-300">
//             <h3 className="text-xl font-bold text-neon-cyan mb-2">{exp.role}</h3>
//             <p className="text-white font-medium mb-1">{exp.company}</p>
//             <p className="text-gray-400 text-sm mb-4">{exp.period}</p>
//             <p className="text-gray-300">{exp.description}</p>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Experience;



import { useEffect, useRef } from 'react';
import { fadeInUp, fadeInRight } from '@/lib/animations';
import { Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      role: "MERN Bootcamper",
      company: "Techloset Solutions",
      period: "02-20-2023 - 24-08-2023",
      description: "Maintainable code using React JS, Express and Node JS, along with the Tailwind CSS, MongoDB and firebase."
    },
    {
      role: "Web Developer Instructor",
      company: "ITEC Systems Faisalabad",
      period: "25-08-2022 - 01-02-2023",
      description: "With the experience as a web instructor, I have gained invaluable insights into the art of guiding and educating aspiring web developers."
    },
    {
      role: "Programmer",
      company: "Corvit Systems Faisalabad",
      period: "25-07-2022 - 20-08-2022",
      description: "Using python programming Language, Manage the instances of AWS using python scripts."
    },
    {
      role: "Selenium with JAVA training",
      company: "HCC TECHNOLOGY FOUNDATION",
      period: "JULY 2023 - SEPT 2023",
      description: "With the experience trainee, I have gained expertise in web scraping using JAVA and python. Learned Testing techniques on Web Applications."
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="experience"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-dark to-dark/95"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-24">
        <h2 ref={headingRef} className="section-heading text-center flex items-center justify-center gap-3">
          <Briefcase className="h-8 w-8 text-neon-cyan" />
          <span>Experience</span>
        </h2>

        <div ref={contentRef} className="grid gap-6 md:grid-cols-2 mt-16">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-6 neon-card hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold text-neon-cyan mb-2">{exp.role}</h3>
              <p className="text-white font-medium mb-1">{exp.company}</p>
              <p className="text-gray-400 text-sm mb-4">{exp.period}</p>
              <p className="text-gray-300">{exp.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
