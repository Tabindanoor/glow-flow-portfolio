
import { useEffect, useRef } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { fadeInUp, fadeInRight } from '@/lib/animations';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

const Achievements = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (headingRef.current) fadeInUp(headingRef.current);
          if (textRef.current) fadeInRight(textRef.current, 0.3);
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

  const certifications = [
    {
      title: "JavaScript Certification From Coursera",
      url: "https://drive.google.com/your-js-cert-link",
      description: "Advanced JavaScript concepts and modern ES6+ features"
    },
    {
      title: "MERN Bootcamp Certification",
      org: "Techloset Solutions",
      url: "https://drive.google.com/your-mern-cert-link",
      description: "Full stack development with MongoDB, Express, React, and Node.js"
    },
    {
      title: "CS50x Puzzle Solver",
      url: "https://drive.google.com/your-cs50-cert-link",
      description: "Problem-solving and algorithmic thinking certification"
    },
    {
      title: "WordSprint 3.0 winner",
      url: "https://drive.google.com/your-wordsprint-link",
      description: "First place in competitive programming challenge"
    },
    {
      title: "Microsoft C# .NET Training",
      url: "https://drive.google.com/your-microsoft-cert-link",
      description: "Enterprise application development with .NET"
    },
    {
      title: "Soft Skills Business Bootcamp",
      url: "https://drive.google.com/your-softskills-cert-link",
      description: "Communication, leadership, and business acumen"
    },
    {
      title: "Lablab.ai 24 Claude Hackathon",
      url: "https://drive.google.com/your-lablab-cert-link",
      description: "AI development and implementation"
    },
    {
      title: "Testing with Selenium",
      org: "HCC Training Bootcamp",
      url: "https://drive.google.com/your-selenium-cert-link",
      description: "Automated testing and quality assurance"
    },
    {
      title: "Graphics Designing",
      org: "DigiSkills",
      url: "https://drive.google.com/your-graphics-cert-link",
      description: "Digital design and creative visualization"
    },
    {
      title: "Python Programming",
      org: "Stanford University Code In Place",
      url: "https://drive.google.com/your-python-cert-link",
      description: "Advanced Python programming concepts"
    },
    {
      title: "Computer Networking Certification",
      url: "https://drive.google.com/your-networking-cert-link",
      description: "Network infrastructure and security"
    },
    {
      title: "Cyber Security Certification",
      url: "https://drive.google.com/your-security-cert-link",
      description: "Information security and ethical hacking"
    },
    {
      title: "NSE-1 and NSE-2 Certification",
      url: "https://drive.google.com/your-nse-cert-link",
      description: "Network security expertise levels 1 and 2"
    },
    {
      title: "HCIA Security Certification",
      url: "https://drive.google.com/your-hcia-security-link",
      description: "Huawei security infrastructure certification"
    },
    {
      title: "HCIA Cloud Computing",
      url: "https://drive.google.com/your-hcia-cloud-link",
      description: "Cloud architecture and deployment"
    }
  ];

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-dark to-dark/95"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 space-y-20">
        <div>
          <h2 ref={headingRef} className="section-heading text-center flex items-center justify-center gap-3">
            <Award className="h-8 w-8" />
            <span>Achievements & Certifications</span>
          </h2>

          <div ref={textRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-16">
            {certifications.map((cert, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <a 
                    href={cert.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="p-6 neon-card hover:scale-105 transition-all duration-300 cursor-pointer group">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-white group-hover:text-neon-purple transition-colors">
                          {cert.title}
                        </h3>
                        <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-neon-cyan transition-colors" />
                      </div>
                      {cert.org && (
                        <p className="text-sm text-gray-400 mt-2">{cert.org}</p>
                      )}
                    </Card>
                  </a>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 bg-dark/95 border border-neon-purple/20 p-4">
                  <p className="text-sm text-gray-300">{cert.description}</p>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
