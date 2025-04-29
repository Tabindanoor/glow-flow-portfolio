
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if the cursor is over a clickable element
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      );
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-neon-cyan/80 z-[9999] pointer-events-none mix-blend-difference"
        animate={{ 
          x: position.x - 10, 
          y: position.y - 10,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      />
      
      {/* Outer ring that expands on hover over clickable elements */}
      <motion.div 
        className="fixed top-0 left-0 rounded-full border-2 border-neon-cyan/50 z-[9999] pointer-events-none mix-blend-difference"
        animate={{ 
          x: position.x - 20, 
          y: position.y - 20,
          width: isPointer ? '50px' : '20px',
          height: isPointer ? '50px' : '20px',
          opacity: isVisible ? 1 : 0,
          scale: isPointer ? 1.2 : 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    </>
  );
};

export default CustomCursor;
