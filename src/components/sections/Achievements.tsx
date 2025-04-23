
import { useEffect, useRef } from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { fadeInUp, fadeInRight } from '@/lib/animations';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
      name: "JavaScript Certification From Coursera",
      link: "https://drive.google.com/file/d/1example1/view",
      category: "Development"
    },
    {
      name: "MERN Bootcamp Certification (Techloset Solutions)",
      link: "https://drive.google.com/file/d/1example2/view",
      category: "Development"
    },
    {
      name: "CS50x Puzzle Solver",
      link: "https://drive.google.com/file/d/1example3/view",
      category: "Development"
    },
    {
      name: "WordSprint 3.0 winner",
      link: "https://drive.google.com/file/d/1example4/view",
      category: "Achievements"
    },
    {
      name: "Microsoft C# .NET Training Certification",
      link: "https://drive.google.com/file/d/1example5/view",
      category: "Development"
    },
    {
      name: "Soft Skills Business Bootcamp",
      link: "https://drive.google.com/file/d/1example6/view",
      category: "Business"
    },
    {
      name: "Lablab.ai 24 Claude Hackathon",
      link: "https://drive.google.com/file/d/1example7/view",
      category: "Hackathons"
    },
    {
      name: "Lablab.ai Gemini Hackathon",
      link: "https://drive.google.com/file/d/1example8/view",
      category: "Hackathons"
    },
    {
      name: "Testing with Selenium (HCC Training Bootcamp)",
      link: "https://drive.google.com/file/d/1example9/view",
      category: "Testing"
    },
    {
      name: "Wordpress Training (DigiSkills)",
      link: "https://drive.google.com/file/d/1example10/view",
      category: "Development"
    },
    {
      name: "Graphics Designing (DigiSkills)",
      link: "https://drive.google.com/file/d/1example11/view",
      category: "Design"
    },
    {
      name: "Python Programming (Stanford University Code In Place)",
      link: "https://drive.google.com/file/d/1example12/view",
      category: "Development"
    },
    {
      name: "Computer Networking Certification",
      link: "https://drive.google.com/file/d/1example13/view",
      category: "Networking"
    },
    {
      name: "Cyber Security Certification",
      link: "https://drive.google.com/file/d/1example14/view",
      category: "Security"
    },
    {
      name: "NSE-1 and NSE-2 Certification",
      link: "https://drive.google.com/file/d/1example15/view",
      category: "Security"
    },
    {
      name: "HCIA Security Certification",
      link: "https://drive.google.com/file/d/1example16/view",
      category: "Security"
    },
    {
      name: "HCIA Cloud Computing Certification",
      link: "https://drive.google.com/file/d/1example17/view",
      category: "Cloud"
    }
  ];

  // Group certifications by category
  const groupedCertifications = certifications.reduce((acc, cert) => {
    if (!acc[cert.category]) {
      acc[cert.category] = [];
    }
    acc[cert.category].push(cert);
    return acc;
  }, {} as Record<string, typeof certifications>);

  const categories = Object.keys(groupedCertifications);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-dark to-dark/95"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 space-y-20">
        <div>
          <h2 ref={headingRef} className="section-heading text-center flex items-center justify-center gap-3">
            <Award className="h-8 w-8 text-neon-cyan" />
            <span>Achievements & Certifications</span>
          </h2>

          <div ref={textRef} className="mt-16">
            <Accordion type="single" collapsible className="w-full">
              {categories.map((category, idx) => (
                <AccordionItem key={category} value={`item-${idx}`} className="border-b border-neon-cyan/30">
                  <AccordionTrigger className="text-xl font-bold text-neon-cyan py-4 hover:no-underline">
                    {category} <span className="ml-2 text-gray-400 text-sm">({groupedCertifications[category].length})</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-4 sm:grid-cols-2 py-4">
                      {groupedCertifications[category].map((cert, index) => (
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          key={index} 
                          className="group"
                        >
                          <Card className="p-4 neon-card hover:scale-105 transition-transform duration-300 flex items-start justify-between">
                            <p className="text-gray-300 group-hover:text-white transition-colors">{cert.name}</p>
                            <ExternalLink className="h-4 w-4 text-neon-purple opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Card>
                        </a>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
