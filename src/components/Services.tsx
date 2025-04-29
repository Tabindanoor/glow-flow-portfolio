
import React from 'react';
import { Code, Globe, Layers, Lightbulb, Server, Smartphone } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

const serviceItems = [
  {
    icon: <Code className="h-12 w-12 text-neon-cyan" />,
    title: "Web Development",
    description: "Custom websites built with modern frameworks and technologies for optimal performance and user experience."
  },
  {
    icon: <Smartphone className="h-12 w-12 text-neon-cyan" />,
    title: "Responsive Design",
    description: "Fluid layouts that adapt perfectly to any device size ensuring your site looks great everywhere."
  },
  {
    icon: <Server className="h-12 w-12 text-neon-cyan" />,
    title: "Backend Development",
    description: "Robust server-side solutions with Node.js, Express and MongoDB for secure and scalable applications."
  },
  {
    icon: <Globe className="h-12 w-12 text-neon-cyan" />,
    title: "Web Applications",
    description: "Interactive single-page applications with React that provide seamless user experiences."
  },
  {
    icon: <Layers className="h-12 w-12 text-neon-cyan" />,
    title: "Full Stack Solutions",
    description: "End-to-end development covering both frontend and backend aspects of your project."
  },
  {
    icon: <Lightbulb className="h-12 w-12 text-neon-cyan" />,
    title: "Technical Consultation",
    description: "Expert advice on technology choices, architecture planning, and development strategies."
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-dark/95 to-dark relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimationWrapper animation="fadeUp">
          <h2 className="section-heading text-center mb-16">
            My Services
          </h2>
        </ScrollAnimationWrapper>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((service, index) => (
            <ScrollAnimationWrapper 
              key={index} 
              animation="fadeUp" 
              delay={index * 0.15}
            >
              <div className="neon-card p-6 h-full flex flex-col hover:translateY-2 transition-all duration-300">
                <div className="mb-5 p-3 rounded-full bg-neon-purple/10 w-fit">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 flex-grow">{service.description}</p>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 left-0 w-64 h-64 rounded-full bg-neon-purple/10 blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-neon-cyan/10 blur-[100px]" />
    </section>
  );
};

export default Services;
