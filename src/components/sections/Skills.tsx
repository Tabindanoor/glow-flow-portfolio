
import { useRef, useState } from 'react';
import { Code, Layout, Server, Terminal, Shield, Wrench } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { motion, useInView } from 'framer-motion';

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
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div ref={sectionRef} className="space-y-12">
      <motion.h2 
        className="section-heading text-center flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <Terminal className="h-8 w-8" />
        <span>Tech Stack</span>
      </motion.h2>
      
      <motion.div 
        className="grid gap-8 md:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {skillCategories.map((category, idx) => (
          <motion.div 
            key={idx} 
            className="neon-card p-6 space-y-6 hover:scale-[1.02] transition-transform duration-300"
            variants={itemVariants}
            whileHover={{ 
              boxShadow: "0 0 20px rgba(155, 93, 229, 0.4)",
              transition: { duration: 0.3 }
            }}
          >
            <motion.div 
              className="flex items-center gap-3 mb-6"
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * idx }}
            >
              <div className="p-2 rounded-lg bg-neon-purple/10">
                {category.icon}
              </div>
              <h3 className="text-xl font-space font-bold text-white">
                {category.title}
              </h3>
            </motion.div>

            <div className="grid gap-6">
              {category.skills.map((skill, skillIdx) => (
                <HoverCard key={skillIdx}>
                  <HoverCardTrigger asChild>
                    <motion.div 
                      className="space-y-2 cursor-pointer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.5, delay: 0.1 * skillIdx + 0.3 * idx }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{skill.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {skill.progress}%
                          </Badge>
                        </div>
                      </div>
                      <Progress 
                        value={skill.progress} 
                        className="h-2 transition-all duration-300 hover:h-3 bg-secondary"
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
