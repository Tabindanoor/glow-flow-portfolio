
import { useEffect, useRef } from 'react';
import { fadeInUp } from '@/lib/animations';

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

  return (
    <footer 
      ref={footerRef} 
      className="py-10 bg-dark border-t border-neon-purple/20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#" className="text-2xl font-space font-bold text-white">
              Port<span className="text-neon-cyan">folio</span>
            </a>
            <p className="text-gray-400 mt-2">
              Creating immersive digital experiences
            </p>
          </div>
          
          <div className="flex space-x-6">
            {[
              { name: "GitHub", href: "#", icon: "github" },
              { name: "LinkedIn", href: "#", icon: "linkedin" },
              { name: "Twitter", href: "#", icon: "twitter" },
              { name: "Instagram", href: "#", icon: "instagram" }
            ].map((socialLink) => (
              <a 
                key={socialLink.name}
                href={socialLink.href}
                className="text-gray-400 hover:text-neon-cyan transition-colors duration-300"
                aria-label={socialLink.name}
              >
                <div className="neon-card p-2 hover:border-neon-cyan/50">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 6C6.6 6 2 10.6 2 16s4.6 10 10 10 10-4.6 10-10-4.6-10-10-10zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" 
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>© {currentYear} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
