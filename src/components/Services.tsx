
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Globe, Laptop, Palette, Gauge, Server } from 'lucide-react';
import { staggerFadeIn } from '@/lib/animations';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const services: Service[] = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Web Development",
      description: "Custom websites built with modern frameworks and responsive design principles.",
      color: "from-neon-purple to-blue-500",
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "UI/UX Design",
      description: "Intuitive user interfaces with seamless user experiences and eye-catching visuals.",
      color: "from-neon-cyan to-blue-400",
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Frontend Development",
      description: "Interactive web applications using React, TypeScript, and cutting-edge animation libraries.",
      color: "from-green-400 to-green-600",
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: "Backend Development",
      description: "Scalable server solutions, APIs and database infrastructure for complex applications.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Laptop className="h-8 w-8" />,
      title: "Responsive Design",
      description: "Websites that work seamlessly across all devices and screen sizes.",
      color: "from-pink-500 to-red-500",
    },
    {
      icon: <Gauge className="h-8 w-8" />,
      title: "Performance Optimization",
      description: "Improving page load times and overall application performance for better user experience.",
      color: "from-blue-500 to-indigo-600",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
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
    <section 
      id="services" 
      ref={sectionRef}
      className="py-20 min-h-screen flex items-center bg-gradient-to-b from-dark to-dark/95"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="section-heading text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          My <span className="text-neon-cyan">Services</span>
        </motion.h2>
        
        <motion.p 
          className="section-subheading text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          Professional solutions to elevate your digital presence
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="neon-card p-8 hover:scale-[1.03] transition-transform duration-300"
              whileHover={{ y: -8 }}
            >
              <div className={`p-4 rounded-xl mb-6 inline-block bg-gradient-to-br ${service.color} bg-opacity-10`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold font-space mb-4">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
