
import { Award } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Achievements = () => {
  const certifications = [
    "JavaScript Certification From Coursera",
    "MERN Bootcamp Certification (Techloset Solutions)",
    "CS50x Puzzle Solver",
    "WordSprint 3.0 winner",
    "Microsoft C# .NET Training Certification",
    "Soft Skills Business Bootcamp",
    "Lablab.ai 24 Claude Hackathon",
    "Lablab.ai Gemini Hackathon",
    "Testing with Selenium (HCC Training Bootcamp)",
    "Wordpress Training (DigiSkills)",
    "Graphics Designing (DigiSkills)",
    "Python Programming (Stanford University Code In Place)",
    "Computer Networking Certification",
    "Cyber Security Certification",
    "NSE-1 and NSE-2 Certification",
    "HCIA Security Certification",
    "HCIA Cloud Computing Certification"
  ];

  return (
    <div className="space-y-8">
      <h2 className="section-heading text-center flex items-center justify-center gap-3">
        <Award className="h-8 w-8" />
        <span>Achievements & Certifications</span>
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <Card key={index} className="p-4 neon-card hover:scale-105 transition-transform duration-300">
            <p className="text-gray-300">{cert}</p>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center space-y-6">
        <h3 className="text-2xl font-bold text-white">Know More About Me</h3>
        <div className="max-w-3xl mx-auto space-y-4 text-gray-300">
          <p>
            I have done bachelors in Software Engineering from Government College University Faisalabad.
          </p>
          <p>
            I love to solve complex problems, I love traveling and reading books. I am interested in learning new and innovative skills and want to keep myself updated with the technology trends.
          </p>
          <p>
            I have also joined many remote internships which help me to enhance my skills in the Development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
