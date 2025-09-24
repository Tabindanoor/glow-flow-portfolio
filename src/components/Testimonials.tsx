
import { useState, useEffect, useRef } from 'react';
import { fadeInUp, staggerFadeIn } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';



// دعلعتعد ہ
interface Testimonial {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "The immersive 3D elements and interactive design created for our platform completely transformed our user experience. Truly exceptional work!",
      author: "Emma Rodriguez",
      position: "Creative Director",
      company: "DigitalCraft Studios"
    },
    {
      id: 2,
      quote: "Working with this developer was a game-changer for our product. The attention to detail and technical expertise delivered results beyond our expectations.",
      author: "Michael Chen",
      position: "CTO",
      company: "TechVision"
    },
    {
      id: 3,
      quote: "I've worked with many developers, but few have the unique combination of technical skill and creative vision. The 3D visualizations created for our project were stunning.",
      author: "Sophia Williams",
      position: "Product Manager",
      company: "InnovateX"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (headingRef.current) fadeInUp(headingRef.current);
          
          const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
          if (cards.length) staggerFadeIn(cards, 0.2);
          
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-20 min-h-[80vh] flex items-center bg-gradient-to-b from-dark/95 to-dark relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 ref={headingRef} className="section-heading text-center">
          Client <span className="text-neon-cyan">Testimonials</span>
        </h2>
        
        <p className="section-subheading text-center">
          What clients say about my work and collaboration
        </p>
        
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                ref={el => cardRefs.current[index] = el}
                className={`transform transition-all duration-500 ${
                  index === activeIndex ? 'scale-105 z-10' : 'scale-95 opacity-70'
                }`}
              >
                <Card className="glass-card h-full">
                  <CardContent className="p-8 relative">
                    <Quote className="text-neon-purple/30 absolute top-4 left-4 h-12 w-12" />
                    
                    <div className="relative z-10">
                      <p className="text-gray-300 mb-6 line-clamp-6">
                        "{testimonial.quote}"
                      </p>
                      
                      <div className="border-t border-neon-purple/20 pt-4">
                        <h4 className="font-space font-medium text-white">
                          {testimonial.author}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {testimonial.position}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-neon-cyan w-6' : 'bg-gray-600'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-neon-purple/5 blur-3xl" />
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-neon-cyan/5 blur-3xl" />
    </section>
  );
};

export default Testimonials;






