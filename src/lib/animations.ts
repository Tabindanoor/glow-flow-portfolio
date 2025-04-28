
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
  // Performance optimization - batch multiple animations into a single animation frame
  gsap.ticker.lagSmoothing(1000, 16); // Helps with performance during scrolling
  
  // Create animation batches
  const animateElements = () => {
    // Animate sections on scroll with performance optimizations
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

  // Use requestAnimationFrame for better performance
  requestAnimationFrame(animateElements);
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

export const parallaxEffect = (element: Element, speed: number = 0.5) => {
  gsap.to(element, {
    y: () => -window.scrollY * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });
};

// Image reveal animation
export const imageReveal = (element: Element, delay: number = 0) => {
  const image = element.querySelector('img');
  const overlay = document.createElement('div');
  
  if (!image) return;
  
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = '#0F0E17';
  overlay.style.zIndex = '1';
  
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(overlay);
  
  gsap.to(overlay, {
    scaleX: 0,
    transformOrigin: "right",
    duration: 1.2,
    delay,
    ease: "power4.inOut"
  });
  
  gsap.fromTo(
    image,
    { scale: 1.2 },
    { scale: 1, duration: 1.2, delay: delay + 0.3, ease: "power4.out" }
  );
};
