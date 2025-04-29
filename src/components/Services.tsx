
import { CodeIcon, Lightbulb, Laptop, Layout, PenTool, Rocket } from "lucide-react";
import ScrollAnimationWrapper from "./ScrollAnimationWrapper";
import ParallaxEffect from "./ParallaxEffect";

const Services = () => {
  const services = [
    {
      icon: <Layout className="w-10 h-10" />,
      title: "UI/UX Design",
      description:
        "Creating intuitive and visually stunning user interfaces with a focus on user experience and accessibility.",
    },
    {
      icon: <CodeIcon className="w-10 h-10" />,
      title: "Web Development",
      description:
        "Building responsive, high-performance websites and web applications using modern technologies.",
    },
    {
      icon: <Lightbulb className="w-10 h-10" />,
      title: "Creative Concept",
      description:
        "Developing unique creative concepts that help your brand stand out in a crowded digital landscape.",
    },
    {
      icon: <PenTool className="w-10 h-10" />,
      title: "Branding",
      description:
        "Creating cohesive brand identities that communicate your values and connect with your audience.",
    },
    {
      icon: <Laptop className="w-10 h-10" />,
      title: "Application Development",
      description:
        "Crafting custom applications that solve specific business problems and improve efficiency.",
    },
    {
      icon: <Rocket className="w-10 h-10" />,
      title: "Digital Marketing",
      description:
        "Implementing strategic digital marketing campaigns that drive growth and engagement.",
    },
  ];

  return (
    <section id="services" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <ScrollAnimationWrapper animation="fadeIn">
          <h2 className="section-heading text-center mb-16">
            <span className="text-gradient">Services</span>
          </h2>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ParallaxEffect
              key={index}
              offset={20}
              direction={index % 2 === 0 ? "up" : "down"}
            >
              <ScrollAnimationWrapper
                animation="scaleIn"
                delay={index * 0.1}
                className="h-full"
              >
                <div 
                  className="neon-card p-6 rounded-lg h-full hover:border-neon-cyan/50 transition-all duration-300"
                >
                  <div className="mb-5 text-neon-purple">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 font-space">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </ScrollAnimationWrapper>
            </ParallaxEffect>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
