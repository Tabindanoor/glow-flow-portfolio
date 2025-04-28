import { useRef } from 'react';
import { Code, Layout, Server, Terminal, Shield, Wrench } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Layout className="h-6 w-6" />,
      skills: [
        { name: "HTML/CSS", progress: 95, description: "Expert in modern HTML5 and CSS3 features" },
        { name: "JavaScript", progress: 90, description: "Strong expertise in ES6+ features" },
        { name: "React JS", progress: 80, description: "Building complex web applications" },
        { name: "Tailwind CSS", progress: 95, description: "Modern utility-first CSS framework" },
        { name: "NEXT JS", progress: 70, description: "Server-side rendering with Next.js" }
      ]
    },
    {
      title: "Backend Development",
      icon: <Server className="h-6 w-6" />,
      skills: [
        { name: "Node JS / Express JS", progress: 70, description: "RESTful API development" },
        { name: "MongoDB", progress: 70, description: "NoSQL database management" },
        { name: "Socket.io", progress: 70, description: "Real-time application development" },
        { name: "Firebase", progress: 80, description: "Backend as a Service expertise" }
      ]
    },
    {
      title: "Programming Languages",
      icon: <Code className="h-6 w-6" />,
      skills: [
        { name: "TypeScript", progress: 80, description: "Type-safe JavaScript development" },
        { name: "Python", progress: 70, description: "Scripting and automation" },
        { name: "OOP", progress: 80, description: "Object-oriented programming principles" }
      ]
    },
    {
      title: "Development Tools",
      icon: <Wrench className="h-6 w-6" />,
      skills: [
        { name: "Git / GitHub", progress: 90, description: "Version control and collaboration" },
        { name: "Redux Toolkit", progress: 85, description: "State management for React" },
        { name: "Software Testing", progress: 70, description: "Unit and integration testing" }
      ]
    },
    {
      title: "Cybersecurity",
      icon: <Shield className="h-6 w-6" />,
      skills: [
        { name: "Ethical Hacking", progress: 75, description: "Security testing and vulnerability assessment" },
        { name: "Networking", progress: 80, description: "Network protocols and security" }
      ]
    }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div ref={sectionRef} className="space-y-12">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="section-heading text-center flex items-center justify-center gap-3"
      >
        <Terminal className="h-8 w-8" />
        <span>Tech Stack</span>
      </motion.h2>
      
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-8 md:gap-12"
      >
        {skillCategories.map((category, idx) => (
          <motion.div 
            key={idx} 
            variants={item}
            className="neon-card p-6 space-y-6 hover:scale-[1.02] transition-transform duration-300"
            style={{
              boxShadow: `0 10px 30px -15px rgba(155, 93, 229, 0.2)`,
              borderRadius: "1rem",
              backgroundColor: "rgba(15, 14, 23, 0.5)",
              backdropFilter: "blur(10px)"
            }}
            whileHover={{
              boxShadow: `0 20px 40px -15px rgba(155, 93, 229, 0.4)`,
              y: -5
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="p-3 rounded-lg bg-neon-purple/10"
                whileHover={{
                  backgroundColor: "rgba(155, 93, 229, 0.25)",
                  rotate: [0, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                {category.icon}
              </motion.div>
              <h3 className="text-xl font-space font-bold text-white">
                {category.title}
              </h3>
            </div>

            <div className="grid gap-6">
              {category.skills.map((skill, skillIdx) => (
                <HoverCard key={skillIdx}>
                  <HoverCardTrigger asChild>
                    <motion.div 
                      className="space-y-2 cursor-pointer"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{skill.name}</span>
                          <Badge variant="secondary" className="text-xs bg-neon-purple/20 text-neon-cyan">
                            {skill.progress}%
                          </Badge>
                        </div>
                      </div>
                      <Progress 
                        value={skill.progress} 
                        className="h-2 transition-all duration-300 hover:h-3 bg-dark/50 [&>div]:bg-gradient-to-r [&>div]:from-neon-purple [&>div]:to-neon-cyan" 
                      />
                    </motion.div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 bg-card/95 backdrop-blur-sm border-neon-purple/20">
                    <p className="text-sm text-gray-300">{skill.description}</p>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Skills;
