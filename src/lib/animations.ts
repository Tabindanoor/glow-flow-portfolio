
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Define a default marker config to avoid duplicate markers
const markerConfig = {
  startColor: "green",
  endColor: "red",
  fontSize: "12px",
  indent: 10
};

// Helper function to check if element is in viewport
const isInViewport = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
};

// Optimized fadeInUp animation with lazy loading
export const fadeInUp = (element: Element, delay: number = 0) => {
  // If element is not in viewport, only set up the animation but don't trigger it
  if (!isInViewport(element)) {
    ScrollTrigger.create({
      trigger: element,
      start: "top 90%",
      onEnter: () => {
        gsap.fromTo(
          element,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay, ease: "power3.out" }
        );
      },
      once: true
    });
  } else {
    // Immediate animation if already in viewport
    gsap.fromTo(
      element,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay, ease: "power3.out" }
    );
  }
};

// Optimized fadeInRight animation
export const fadeInRight = (element: Element, delay: number = 0) => {
  ScrollTrigger.create({
    trigger: element,
    start: "top 90%",
    onEnter: () => {
      gsap.fromTo(
        element,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay, ease: "power3.out" }
      );
    },
    once: true
  });
};

// Optimized staggered animation
export const staggerFadeIn = (elements: Element[], stagger: number = 0.1) => {
  // Only animate elements that are in or near the viewport
  const visibleElements = Array.from(elements).filter(el => {
    const rect = el.getBoundingClientRect();
    // Consider elements that are about to enter the viewport as well (200px buffer)
    return rect.top <= (window.innerHeight + 200);
  });

  if (visibleElements.length > 0) {
    gsap.fromTo(
      visibleElements,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger, ease: "power2.out" }
    );
  }

  // For remaining elements, set up scroll triggers
  const remainingElements = Array.from(elements).filter(el => !visibleElements.includes(el));
  if (remainingElements.length > 0) {
    ScrollTrigger.create({
      trigger: remainingElements[0],
      start: "top 90%",
      onEnter: () => {
        gsap.fromTo(
          remainingElements,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger, ease: "power2.out" }
        );
      },
      once: true
    });
  }
};

// Performance optimized scroll animations with batching
export const initScrollAnimations = () => {
  // Use requestAnimationFrame for better performance
  let scheduledAnimationFrame = false;
  
  // Create a batch of animations to process together
  const animateElements = () => {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    
    elementsToAnimate.forEach((section) => {
      // Check if animation already applied
      if (section.classList.contains('animated')) return;
      
      // Set up scroll trigger for each element
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            section,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              onComplete: () => section.classList.add('animated')
            }
          );
        },
        once: true  // Only trigger once for performance
      });
    });
    
    scheduledAnimationFrame = false;
  };

  // Queue animations in animation frame for performance
  const queueAnimations = () => {
    if (!scheduledAnimationFrame) {
      scheduledAnimationFrame = true;
      window.requestAnimationFrame(animateElements);
    }
  };

  // Initial setup
  queueAnimations();
  
  // Re-check on scroll with throttling
  let scrollTimeout: number | null = null;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) window.cancelAnimationFrame(scrollTimeout);
    scrollTimeout = window.requestAnimationFrame(queueAnimations);
  });
};

export const textReveal = (element: Element) => {
  gsap.fromTo(
    element,
    { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
    { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.2, ease: "power4.inOut" }
  );
};

// New animation for 3D hover effects
export const hoverEffect3D = (element: HTMLElement) => {
  const handleMouseMove = (e: MouseEvent) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    gsap.to(element, {
      rotationY: x * 10, // Rotate based on mouse X position
      rotationX: -y * 10, // Rotate based on mouse Y position
      ease: "power1.out",
      duration: 0.5,
      transformPerspective: 1000,
      transformOrigin: "center center"
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(element, {
      rotationY: 0,
      rotationX: 0,
      ease: "power3.out",
      duration: 0.5
    });
  };
  
  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};
