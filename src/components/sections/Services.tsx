
import { useRef } from 'react';
import { 
  Code, 
  Globe, 
  Smartphone, 
  Layout, 
  Database, 
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const services = [
  {
    icon: <Layout />,
    title: "UI/UX Design",
    description: "Creating stunning, intuitive user interfaces and experiences that engage and delight users.",
    gradient: "from-neon-cyan to-blue-500",
    delay: 0.1
  },
  {
    icon: <Code />,
    title: "Web Development",
    description: "Building responsive and performant web applications using modern technologies like React and Next.js.",
    gradient: "from-neon-purple to-pink-500",
    delay: 0.2
  },
  {
    icon: <Database />,
    title: "Backend Development",
    description: "Developing robust server-side applications with Node.js, Express, and MongoDB.",
    gradient: "from-green-400 to-cyan-500",
    delay: 0.3
  },
  {
    icon: <Smartphone />,
    title: "Mobile App Development",
    description: "Creating cross-platform mobile applications using React Native for both iOS and Android.",
    gradient: "from-orange-400 to-red-500",
    delay: 0.4
  },
  {
    icon: <Layers />,
    title: "Full-Stack Solutions",
    description: "End-to-end development of complete web and mobile applications from concept to deployment.",
    gradient: "from-purple-500 to-indigo-500",
    delay: 0.5
  },
  {
    icon: <Globe />,
    title: "Web Optimization",
    description: "Improving website performance, SEO, and accessibility to reach a broader audience.",
    gradient: "from-yellow-400 to-orange-500",
    delay: 0.6
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <section 
      id="services"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-dark to-dark/95"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="section-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My <span className="text-neon-cyan">Services</span>
          </motion.h2>
          <motion.p 
            className="section-subheading mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Tailored solutions to bring your digital vision to life
          </motion.p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: service.delay
              }}
              whileHover={{ 
                y: -10, 
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              <Card className="neon-card h-full p-8 overflow-hidden relative group">
                <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity duration-500" 
                     style={{ background: `linear-gradient(to bottom right, var(--neon-purple), var(--neon-cyan))` }} />
                
                <motion.div 
                  className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r ${service.gradient} text-white mb-6`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-8 h-8">
                    {service.icon}
                  </div>
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
