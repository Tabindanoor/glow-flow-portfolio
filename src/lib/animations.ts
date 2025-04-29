
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
  // Performance optimization - batch all GSAP animations per frame
  gsap.ticker.lagSmoothing(0);
  
  // Animate sections on scroll with improved performance
  gsap.utils.toArray<Element>('.animate-on-scroll').forEach((section) => {
    // Only create ScrollTrigger if element is on the page
    if (document.body.contains(section)) {
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
    }
  });
  
  // Animate progress bars
  gsap.utils.toArray<Element>('[role="progressbar"]').forEach((progress) => {
    if (document.body.contains(progress)) {
      ScrollTrigger.create({
        trigger: progress,
        start: "top 90%",
        onEnter: () => {
          progress.setAttribute('aria-valuenow', progress.getAttribute('aria-valuemax') || '100');
          gsap.to(progress, {
            width: progress.getAttribute('aria-valuemax') + '%' || '100%',
            duration: 1.5,
            ease: "power3.out"
          });
        },
        once: true
      });
    }
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

// New smooth scroll function
export const smoothScroll = (target: string) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: target, offsetY: 80 },
    ease: "power3.inOut"
  });
};

// Parallax scroll effect
export const parallaxScroll = (elements: Element[], intensity: number = 0.2) => {
  elements.forEach((element) => {
    const speed = element.getAttribute('data-scroll-speed') || intensity.toString();
    
    gsap.to(element, {
      y: () => -window.innerHeight * parseFloat(speed),
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
};

// Float animation
export const floatElement = (element: Element, intensity: number = 15) => {
  gsap.to(element, {
    y: `-=${intensity}`,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut"
  });
};

// 3D Tilt effect
export const tiltElement = (element: HTMLElement) => {
  const tiltIntensity = 15;
  
  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const posX = (e.clientX - centerX) / (rect.width / 2);
    const posY = (e.clientY - centerY) / (rect.height / 2);
    
    gsap.to(element, {
      rotationX: -posY * tiltIntensity,
      rotationY: posX * tiltIntensity,
      duration: 0.5,
      ease: "power2.out"
    });
  });
  
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  });
};
