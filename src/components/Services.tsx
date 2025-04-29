
import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  Code, 
  Layout, 
  Globe, 
  Smartphone, 
  Rocket, 
  Zap 
} from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: JSX.Element;
  color: string;
}

const Services = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  // Fix: Remove threshold from useInView options as it's not supported in this version of framer-motion
  const isInView = useInView(ref, { once: false });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const services: Service[] = [
    {
      title: 'Web Development',
      description: 'Creating responsive, performant websites with modern technologies and best practices.',
      icon: <Code className="h-10 w-10" />,
      color: 'bg-gradient-to-br from-neon-purple to-neon-violet'
    },
    {
      title: 'UI/UX Design',
      description: 'Designing intuitive interfaces and seamless user experiences for digital products.',
      icon: <Layout className="h-10 w-10" />,
      color: 'bg-gradient-to-br from-neon-cyan to-blue-500'
    },
    {
      title: '3D Web Experiences',
      description: 'Building immersive 3D web experiences using Three.js and WebGL technologies.',
      icon: <Globe className="h-10 w-10" />,
      color: 'bg-gradient-to-br from-green-400 to-emerald-600'
    },
    {
      title: 'Mobile Development',
      description: 'Creating cross-platform mobile applications with React Native and native technologies.',
      icon: <Smartphone className="h-10 w-10" />,
      color: 'bg-gradient-to-br from-amber-400 to-orange-600'
    },
    {
      title: 'Performance Optimization',
      description: 'Optimizing web applications for speed, SEO, and user experience.',
      icon: <Zap className="h-10 w-10" />,
      color: 'bg-gradient-to-br from-yellow-400 to-amber-600'
    },
    {
      title: 'Deployment & DevOps',
      description: 'Setting up CI/CD pipelines and managing cloud infrastructure for web applications.',
      icon: <Rocket className="h-10 w-10" />,
      color: 'bg-gradient-to-br from-red-400 to-rose-600'
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section 
      id="services" 
      className="py-20 min-h-screen flex items-center bg-gradient-to-b from-dark to-dark/95"
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="section-heading text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          My <span className="text-neon-cyan">Services</span>
        </motion.h2>
        
        <motion.p 
          className="section-subheading text-center mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Professional solutions to elevate your digital presence
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="neon-card p-6 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col"
              variants={itemVariants}
            >
              <div className={`rounded-lg p-4 w-16 h-16 mb-6 flex items-center justify-center ${service.color}`}>
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold font-space mb-3">
                {service.title}
              </h3>
              
              <p className="text-gray-400 flex-grow">
                {service.description}
              </p>
              
              <motion.button 
                className="mt-6 text-neon-cyan flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Learn more 
                <svg 
                  className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
