
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
    // {
    //   title: "JavaScript Certification From Coursera",
    //   url: "https://drive.google.com/your-js-cert-link",
    //   description: "Advanced JavaScript concepts and modern ES6+ features"
    // },
    {
      title: "MERN Bootcamp Certification",
      org: "Techloset Solutions",
      url: "https://drive.google.com/file/d/1hfGAlbLYduE5-XdPgEJwLllOpGGl1S8g/view?usp=sharing",
      description: "Full stack development with MongoDB, Express, React, and Node.js"
    },
    {
      title: "CS50x Puzzle Solver",
      org: "Harvard University",
      url: "https://drive.google.com/file/d/1_1ZrNsBfqOZOkAFw7FQNWh9lusZelI8t/view?usp=sharing",
      description: "Problem-solving and algorithmic thinking certification"
    },
    {
      title: "WordSprint 3.0 winner",
      org: "WordSprint Developers Hackathon",
      url: "https://drive.google.com/file/d/1pLswgXevvENarT8escPYdKuNeHIGoC66/view?usp=sharing",
      description: "Third place in competitive programming challenge"
    },
    {
      title: "Microsoft C# .NET Training",
      org: "HCC TECHNOLOGY FOUNDATION",
      url: "https://drive.google.com/file/d/1_eilu62AGURVDX1OeA_Owv9KWBd8lXtr/view?usp=sharing",
      description: "Enterprise application development with .NET"
    },
    {
      title: "Soft Skills Business Bootcamp",
      org: "HCC TECHNOLOGY FOUNDATION",
      url: "https://drive.google.com/file/d/1aJSG5CnjGUeMoudlOx-jFx9OWTt1ES4H/view?usp=sharing",
      description: "Communication, leadership, and business acumen"
    },
    {
      title: "Lablab.ai 24 Claude Hackathon",
      org:"Lablab.ai",
      url: "https://drive.google.com/file/d/1iNwYFe6Qt2rA72VGDoiu98MIA-vcG972/view?usp=sharing",
      description: "AI development and implementation"
    },
     {
      title: "Lablab.ai gemini Hackathon",
      org:"Lablab.ai",
      url: "https://drive.google.com/file/d/1_RghgibMLk12pX9T-U4-G8aT0XeGPSWL/view?usp=drive_link",
      description: "AI development and implementation"
    },
    {
      title: "Testing with Selenium",
      org: "HCC Training Bootcamp",
      url: "https://drive.google.com/file/d/14QQR25CUyPBf97B3Ai8xshdBRu8UInhX/view?usp=sharing",
      description: "Automated testing and quality assurance"
    },
    //  {
    //   title: "Testing with Selenium",
    //   org: "HCC Training Bootcamp",
    //   url: "https://drive.google.com/file/d/14QQR25CUyPBf97B3Ai8xshdBRu8UInhX/view?usp=sharing",
    //   description: "Automated testing and quality assurance"
    // },
    {
      title: "Graphics Designing",
      org: "DigiSkills",
      url: "https://drive.google.com/file/d/1PP8-TbVEpf9KnAkD957czBibf24oqLvY/view?usp=sharing",
      description: "Digital design and creative visualization"
    },
    {
      title: "Wordpress",
      org: "DigiSkills",
      url: "https://drive.google.com/file/d/18bt74QaypTLInD0cBk9IkfmDzWGcPvOG/view?usp=sharing",
      description: "Wordpress development and content management"
    },
    {
      title: "Python Programming",
      org: "Stanford University Code In Place",
      url: "https://drive.google.com/file/d/1Xy27b6iyj4WHYOU9Y0Kl2071yMMsD9tP/view?usp=sharing",
      description: "Advanced Python programming concepts"
    },
    {
      title: "Cyber Security Certification",
      org:"NAVTTC – National Vocational & Technical Training Commission",
      url: "https://drive.google.com/file/d/1-muJZzkhUKtqy6XXKj0t3n2GHpiWFaB-/view?usp=drive_link",
      description: "Information security and ethical hacking"
    },
   
  ];

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-dark to-dark/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 space-y-20">
        <div>
          <h2 ref={headingRef} className="section-heading text-center flex items-center justify-center gap-3">
            <Award className="h-8 w-8" />
            <span>Achievements & Certifications</span>
          </h2>
<div ref={textRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-16 items-stretch">
  {certifications.map((cert, index) => (
    <HoverCard key={index}>
      <HoverCardTrigger asChild>
        <a 
          href={cert.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block h-full"
        >
          <Card className="flex flex-col justify-between h-full p-6 neon-card hover:scale-105 transition-all duration-300 cursor-pointer group">
            <div>
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white group-hover:text-neon-purple transition-colors">
                  {cert.title}
                </h3>
                <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-neon-cyan transition-colors" />
              </div>
              {cert.org && (
                <p className="text-sm text-gray-400 mt-2">{cert.org}</p>
              )}
            </div>
          </Card>
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-dark/95 border border-neon-purple/20 p-4">
        <p className="text-sm text-gray-300">{cert.description}</p>
      </HoverCardContent>
    </HoverCard>
  ))}
</div>

          {/* <div ref={textRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-16">
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
          </div> */}
        </div>
     

      </div>
    </section>
  );
};

export default Achievements;
