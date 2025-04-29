
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (element: Element, delay: number = 0) => {
  gsap.fromTo(
    element,
    { 
      y: 50, 
      opacity: 0 
    },
    { 
      y: 0, 
      opacity: 1, 
      duration: 1,
      delay,
      ease: "power3.out"
    }
  );
};

export const fadeInRight = (element: Element, delay: number = 0) => {
  gsap.fromTo(
    element,
    { 
      x: -50, 
      opacity: 0 
    },
    { 
      x: 0, 
      opacity: 1, 
      duration: 1,
      delay,
      ease: "power3.out"
    }
  );
};

export const staggerFadeIn = (elements: Element[], stagger: number = 0.1) => {
  gsap.fromTo(
    elements,
    { 
      y: 30, 
      opacity: 0 
    },
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.8,
      stagger,
      ease: "power2.out"
    }
  );
};

export const initScrollAnimations = () => {
  // Animate sections on scroll
  gsap.utils.toArray<Element>('.animate-on-scroll').forEach((section) => {
    gsap.fromTo(
      section,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        }
      }
    );
  });
};

export const textReveal = (element: Element) => {
  gsap.fromTo(
    element,
    { 
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" 
    },
    { 
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 1.2,
      ease: "power4.inOut"
    }
  );
};
