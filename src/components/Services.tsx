
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Layout, PenTool, Terminal, Globe, BrainCircuit } from 'lucide-react';

// Service card component with 3D tilt effect
const ServiceCard = ({ icon, title, description }: { 
  icon: JSX.Element; 
  title: string; 
  description: string 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  
  // Animation variants
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  return (
    <motion.div
      ref={cardRef}
      className="neon-card p-6 group h-full"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="space-y-4 flex flex-col h-full">
        <div className="p-3 rounded-lg bg-neon-purple/10 w-14 h-14 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-neon-purple/20">
          <motion.div 
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="text-neon-purple"
          >
            {icon}
          </motion.div>
        </div>
        
        <h3 className="text-xl font-space font-bold text-white">{title}</h3>
        
        <p className="text-gray-400 flex-grow">{description}</p>
        
        <div className="h-1 w-1/3 bg-gradient-to-r from-neon-purple to-neon-cyan mt-2 group-hover:w-2/3 transition-all duration-500"></div>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  const services = [
    {
      icon: <Layout className="h-8 w-8" />,
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces with modern frameworks like React and styled with Tailwind CSS."
    },
    {
      icon: <Terminal className="h-8 w-8" />,
      title: "Backend Development",
      description: "Building robust server-side applications with Node.js, Express, and MongoDB for efficient data handling."
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Full-Stack Solutions",
      description: "End-to-end development of web applications with seamless integration between frontend and backend systems."
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Web Application",
      description: "Developing custom web applications that solve specific business needs with focus on scalability and performance."
    },
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "UI/UX Design",
      description: "Creating intuitive and visually appealing interfaces that enhance user experience and drive engagement."
    },
    {
      icon: <BrainCircuit className="h-8 w-8" />,
      title: "API Integration",
      description: "Seamless integration of third-party APIs and services to extend your application's functionality."
    }
  ];
  
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-20 min-h-screen flex items-center relative overflow-hidden"
    >
      {/* Parallax background elements */}
      <motion.div
        className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-neon-purple/10 blur-[100px]"
        style={{
          y: useInView(sectionRef) ? -30 : 0,
          transition: { duration: 1.5, ease: "easeOut" }
        }}
      />
      <motion.div
        className="absolute bottom-20 -right-32 w-64 h-64 rounded-full bg-neon-cyan/10 blur-[100px]"
        style={{
          y: useInView(sectionRef) ? 30 : 0,
          transition: { duration: 1.5, ease: "easeOut" }
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="section-heading">
            My <span className="text-neon-cyan">Services</span>
          </h2>
          <p className="section-subheading mx-auto">
            Expert solutions tailored to bring your digital vision to life
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
