
import { useEffect, useState } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  easing?: number;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { 
    speed = 0.1, 
    direction = 'up',
    easing = 0.1 
  } = options;
  
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const target = scrollY * speed;
      setOffset(current => current + (target - current) * easing);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, easing]);
  
  const getTransform = () => {
    switch (direction) {
      case 'up':
        return { transform: `translateY(-${offset}px)` };
      case 'down':
        return { transform: `translateY(${offset}px)` };
      case 'left':
        return { transform: `translateX(-${offset}px)` };
      case 'right':
        return { transform: `translateX(${offset}px)` };
      default:
        return { transform: `translateY(-${offset}px)` };
    }
  };
  
  return getTransform();
};
