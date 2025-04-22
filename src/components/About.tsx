
import { useEffect, useRef } from 'react';
import { fadeInUp, fadeInRight, staggerFadeIn } from '@/lib/animations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Github, Linkedin, Mail, MapPin, Download } from 'lucide-react';

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
                <div className="text-7xl">👩‍💻</div>
              </div>
            </div>
            
            <Card className="absolute -bottom-6 -right-6 bg-card/80 backdrop-blur-sm p-4 neon-border">
              <p className="text-lg font-semibold">
                <span className="text-neon-cyan">MERN Stack</span> Developer
              </p>
            </Card>
          </div>
          
          <div ref={textRef} className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-space font-bold text-white">Who am I?</h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                I'm Tabinda Noor, a passionate Software Engineer specializing in MERN Stack Development.
              </p>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              With a Bachelor's degree in Software Engineering, I bring expertise in Tailwind CSS, MongoDB, Express.js, React.js, and Node.js. 
              I'm dedicated to creating seamless user experiences and staying updated with the latest technologies, including AI and advanced web development.
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
              <Button
                variant="default"
                className="bg-neon-purple hover:bg-neon-purple/90 text-white gap-2"
                onClick={() => window.open('/path-to-your-cv.pdf', '_blank')}
              >
                <Download className="h-4 w-4" />
                Download CV
              </Button>

              <div className="flex gap-4">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-neon-cyan transition-colors duration-300"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://linkedin.com/in/yourusername"
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
    </section>
  );
};

export default About;
