import { useEffect, useRef } from 'react';
import { fadeInUp, fadeInRight, staggerFadeIn } from '@/lib/animations';
import { Card } from '@/components/ui/card';
import { Github, Linkedin, Mail, MapPin, Download, School, Briefcase, Code, Award, User } from 'lucide-react';
import Education from './sections/Education';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Achievements from './sections/Achievements';
import picture from "/picture.jpg"
import resume from "/tabinda resume.pdf"
import finalResume from "/final cv.pdf"

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

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
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-dark to-dark/95"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 space-y-32">
        <div>
          <h2 ref={headingRef} className="section-heading text-center">
            About <span className="text-neon-cyan">Me</span>
          </h2>

          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-16">
            <div>
                   <img src={picture} width={"400px"} className='rounded-2xl neon-border mx-auto' height={"300px"}
                  alt="" />
              
            </div>
            <div ref={textRef} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-space font-bold text-white">
                  Hello, I'm <span className="text-neon-cyan">Tabinda Noor</span>
                </h3>
                <p className="text-xl text-gray-300 leading-relaxed">
                  A passionate and dedicated MERN stack developer with Bachelor's degree in Software Engineering.
                </p>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                I specialize in building dynamic and responsive web applications, bringing expertise in Tailwind CSS, MongoDB, Express.js, React.js, and Node.js. With a commitment to staying updated with the latest technologies, I bring a valuable blend of front-end and back-end development skills.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-gray-400">Name:</p>
                  <p className="text-white font-medium">Tabinda Noor</p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">Location:</p>
                  <p className="text-white font-medium flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-neon-cyan" />
                    Faisalabad, Pakistan
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">Email:</p>
                  <a 
                    href="mailto:tabindanoor415@gmail.com"
                    className="text-white font-medium hover:text-neon-cyan transition-colors duration-300"
                  >
                    tabindanoor415@gmail.com
                  </a>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-400">Role:</p>
                  <p className="text-white font-medium">Software Engineer</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                
                <a  href={resume}  download="Resume"  className="inline-flex items-center justify-center gap-2 bg-neon-purple hover:bg-neon-purple/90 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              <Download className="h-4 w-4" />  Download CV</a>


                <div className="flex gap-4 ">
                  <a
                    href="https://github.com/Tabindanoor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-neon-cyan transition-colors duration-300"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/tabinda-noor-935429237/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-neon-cyan transition-colors duration-300"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="mailto:tabindanoor415@gmail.com"
                    className="text-gray-400 hover:text-neon-cyan transition-colors duration-300"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Education />
        <Experience />
        <Skills />
        <Achievements />
      </div>
    </section>
  );
};

export default About;
