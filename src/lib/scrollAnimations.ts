
import { RefObject } from 'react';

export const useScrollReveal = (elementSelector: string, options = {}) => {
  if (typeof window !== 'undefined') {
    const animateElements = () => {
      const elements = document.querySelectorAll(elementSelector);

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        // Check if element is in viewport
        if (
          elementTop < window.innerHeight - 100 &&
          elementBottom > 0
        ) {
          element.classList.add('animate-in');
        }
      });
    };

    window.addEventListener('scroll', animateElements);
    animateElements(); // Run once on init

    return () => window.removeEventListener('scroll', animateElements);
  }
};

export const parallaxEffect = (ref: RefObject<HTMLElement>) => {
  if (typeof window !== 'undefined' && ref.current) {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollY = window.scrollY;
      const speed = 0.3;
      
      const yPos = -scrollY * speed;
      ref.current.style.transform = `translateY(${yPos}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }
};

export const initIntersectionObserver = (
  selector: string, 
  callback: (entries: IntersectionObserverEntry[]) => void, 
  options = { threshold: 0.1 }
) => {
  const observer = new IntersectionObserver(callback, options);

  document.querySelectorAll(selector).forEach((element) => {
    observer.observe(element);
  });

  return observer;
};
