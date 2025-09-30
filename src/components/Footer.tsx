
import { useEffect, useRef } from 'react';
import { fadeInUp } from '@/lib/animations';
import { Github, Linkedin, Twitter, Instagram, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (footerRef.current) fadeInUp(footerRef.current);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/Tabindanoor", icon: Github },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/tabinda-noor-935429237/", icon: Linkedin },
    { name: "Instagram", href: "https://www.instagram.com/noortabinda/", icon: Instagram },
    { name: "Email", href: "tabindanoor415@gmail.com", icon: Mail }
  ];

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer 
      ref={footerRef} 
      className="py-16 bg-dark border-t border-neon-purple/20 relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <a href="#" className="text-2xl font-space font-bold text-white">
              Port<span className="text-gradient">folio</span>
            </a>
            <p className="text-gray-400 max-w-xs">
              Creating immersive digital experiences and innovative web solutions that stand out.
            </p>
            
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-neon-cyan transition-colors duration-300"
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-space font-semibold text-white mb-4">Navigation</h3>
            <nav className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-neon-cyan transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-space font-semibold text-white mb-4">Contact</h3>
            <p className="text-gray-400">Feel free to reach out for collaborations or just a friendly hello</p>
            
            <div className="flex flex-col space-y-2">
              <a href="mailto:tabindanoor415@gmail.com" className="text-gray-400 hover:text-neon-cyan transition-colors duration-300">
                tabindanoor415@gmail.com
              </a>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="mt-6 flex items-center text-neon-cyan hover:text-white transition-colors duration-300"
              aria-label="Scroll to top"
            >
              Back to top
              <ArrowUp className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm flex flex-col sm:flex-row justify-between items-center">
          <p>© {currentYear} Creative Portfolio. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            <span className="text-neon-cyan">Design & Development</span> with ❤️
          </p>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-8 blur-md bg-neon-purple/30 rounded-full" />
    </footer>
  );
};

export default Footer;
