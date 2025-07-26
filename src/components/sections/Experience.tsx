
import { useEffect, useRef } from 'react';
import { GitBranch } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { fadeInUp, fadeInRight } from '@/lib/animations';

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // const experiences = [
  //   {
  //     role: "MERN Bootcamper",
  //     company: "Techloset Solutions",
  //     period: "02-20-2023 - 24-08-2023",
  //     description: "Maintainable code using React JS, Express and Node JS, along with the Tailwind CSS, MongoDB and firebase."
  //   },
  //   {
  //     role: "Web Developer Instructor",
  //     company: "ITEC Systems Faisalabad",
  //     period: "25-08-2022 - 01-02-2023",
  //     description: "With the experience as a web instructor, I have gained invaluable insights into the art of guiding and educating aspiring web developers."
  //   },
  //   {
  //     role: "Programmer",
  //     company: "Corvit Systems Faisalabad",
  //     period: "25-07-2022 - 20-08-2022",
  //     description: "Using python programming Language, Manage the instances of AWS using python scripts."
  //   },
  //   {
  //     role: "Selenium with JAVA training",
  //     company: "HCC TECHNOLOGY FOUNDATION",
  //     period: "JULY 2023 - SEPT 2023",
  //     description: "With the experience trainee, I have gained expertise in web scraping using JAVA and python. Learned Testing techniques on Web Applications."
  //   }
  // ];


  const experiences = [
  {
    role: "Freelancer",
    company: "Remote",
    period: "Sep 2024 - Present",
    description:
      "Working on multiple freelance projects to provide web development solutions and services to organizations using MERN stack technologies.",
  },
  {
    role: "Full Stack Developer",
    company: "Zephrex, Remote",
    period: "Aug 2024 - Sep 2024",
    description:
      "Contributed to the development of company products and software solutions, focusing on full-stack development and delivering innovative features.",
  },
  {
    role: "Front-end Developer Intern",
    company: "CodSoft",
    period: "Sep 2023 - Oct 2023",
    description:
      "Developed frontend projects like Personal Portfolio, Blog Website, and Calculator using HTML, CSS, JavaScript, and React.",
  },
  {
    role: "MERN Stack Intern",
    company: "TopperWorld, Remote",
    period: "Aug 2023 - Sep 2023",
    description:
      "Built a Flipkart clone using React, enhancing skills in building e-commerce front-end interfaces.",
  },
  {
    role: "MERN Stack Intern",
    company: "SYNC, Remote",
    period: "Dec 2023 - Dec 2023",
    description:
      "Created multiple React projects including a Landing Page, Quiz App, Music Player, and E-Learning App, focusing on interactive UI design.",
  },
  {
    role: "MERN Stack Intern",
    company: "CodeClause, Remote",
    period: "Dec 2023 - Jan 2024",
    description:
      "Built React-based applications including Todo List Timer, Stopwatch, and Survey System, strengthening component-based development skills.",
  },
  {
    role: "MERN Bootcamper Intern",
    company: "Techloset Solutions, Faisalabad",
    period: "Feb 2023 - Aug 2023",
    description:
      "Designed and implemented user interfaces using React, Tailwind CSS, and HTML. Focused on code efficiency, performance optimization, debugging, and ensuring responsive design.",
  },
  {
    role: "Python Programmer",
    company: "Corvit Systems, Faisalabad",
    period: "Sep 2022 - Nov 2022",
    description:
      "Worked with Python for automating tasks and managing AWS instances through scripting. Collaborated with the team on cloud-based solutions.",
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
        <h2 ref={headingRef} className="section-heading text-center flex items-center justify-center gap-3 mb-16">
          <GitBranch className="h-8 w-8 text-neon-cyan" />
          <span>Experience Timeline</span>
        </h2>

        <div ref={contentRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-neon-purple/30" />
          
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Branch node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-neon-purple shadow-[0_0_15px_rgba(155,93,229,0.5)]" />
              
              {/* Branch line */}
              <div 
                className={`absolute left-1/2 h-1 bg-neon-purple/30 ${
                  index % 2 === 0 
                    ? '-translate-x-full w-[calc(50%-1rem)]' 
                    : 'w-[calc(50%-1rem)]'
                }`}
              />
              
              {/* Content card */}
              <Card 
                className={`w-[calc(50%-2rem)] p-6 neon-card hover:scale-105 transition-transform duration-300 ${
                  index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                }`}
              >
                <h3 className="text-xl font-bold text-neon-cyan mb-2">{exp.role}</h3>
                <p className="text-white font-medium mb-1">{exp.company}</p>
                <p className="text-gray-400 text-sm mb-4">{exp.period}</p>
                <p className="text-gray-300">{exp.description}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
