
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from 'react';

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

  // Initialize parallax effects
  initParallaxEffects();
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

// Parallax scrolling effect
export const initParallaxEffects = () => {
  const parallaxElements = gsap.utils.toArray<HTMLElement>('.parallax');
  
  parallaxElements.forEach(element => {
    const depth = element.dataset.depth ? parseFloat(element.dataset.depth) : 0.2;
    
    gsap.to(element, {
      y: `${-(depth * 100)}%`,
      ease: "none",
      scrollTrigger: {
        trigger: element.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });
  });
};

// Create a floating animation effect
export const floatAnimation = (element: RefObject<HTMLElement>, duration: number = 3, distance: number = 15) => {
  if (!element.current) return;
  
  gsap.to(element.current, {
    y: `-=${distance}`,
    duration: duration,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
};

// Rotate element on scroll
export const rotateOnScroll = (element: RefObject<HTMLElement>, rotation: number = 360) => {
  if (!element.current) return;
  
  gsap.to(element.current, {
    rotation: rotation,
    scrollTrigger: {
      trigger: element.current,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    }
  });
};

// Reveal on scroll with mask effect
export const revealMask = (element: HTMLElement) => {
  if (!element) return;
  
  gsap.set(element, {
    autoAlpha: 0,
    scale: 0.8
  });
  
  gsap.to(element, {
    duration: 1.5,
    autoAlpha: 1,
    scale: 1,
    ease: "expo.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%"
    }
  });
};
