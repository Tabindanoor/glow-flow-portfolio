
import { Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Experience = () => {
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

  return (
    <div className="space-y-8">
      <h2 className="section-heading text-center flex items-center justify-center gap-3">
        <Briefcase className="h-8 w-8" />
        <span>Experience</span>
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2">
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
  );
};

export default Experience;
