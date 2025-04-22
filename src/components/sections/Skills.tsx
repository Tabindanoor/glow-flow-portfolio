
import { Code } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Skills = () => {
  const skills = [
    { name: "HTML/CSS", progress: 95 },
    { name: "JavaScript", progress: 90 },
    { name: "Tailwind CSS", progress: 95 },
    { name: "React JS", progress: 80 },
    { name: "Node JS / Express JS", progress: 70 },
    { name: "MongoDB", progress: 70 },
    { name: "TypeScript", progress: 80 },
    { name: "Git / GitHub", progress: 90 },
    { name: "NEXT JS", progress: 70 },
    { name: "Redux Toolkit", progress: 85 },
    { name: "MUI", progress: 80 },
    { name: "Bootstrap", progress: 90 },
    { name: "React Native", progress: 70 },
    { name: "Firebase", progress: 80 },
    { name: "Python", progress: 70 },
    { name: "Software Testing", progress: 70 },
    { name: "Networking", progress: 80 },
    { name: "Socket.io", progress: 70 },
    { name: "OOP", progress: 80 },
    { name: "Ethical Hacking", progress: 75 },
  ];

  return (
    <div className="space-y-8">
      <h2 className="section-heading text-center flex items-center justify-center gap-3">
        <Code className="h-8 w-8" />
        <span>Tech Stack</span>
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium">{skill.name}</span>
              <span className="text-neon-cyan">{skill.progress}%</span>
            </div>
            <Progress value={skill.progress} className="h-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
