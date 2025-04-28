
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  
  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', mouseMove);
    
    // Add event listeners for links and buttons
    const handleLinkHover = () => setCursorVariant('hover');
    const handleLinkLeave = () => setCursorVariant('default');
    
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);
  
  const variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      height: 12,
      width: 12,
      backgroundColor: 'rgba(155, 93, 229, 0.8)',
    },
    hover: {
      x: mousePosition.x - 15,
      y: mousePosition.y - 15,
      height: 30,
      width: 30,
      backgroundColor: 'rgba(0, 245, 255, 0.4)',
      mixBlendMode: 'difference' as 'difference'
    }
  };

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        body {
          cursor: none;
        }
      `}</style>
      
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50"
        animate={cursorVariant}
        variants={variants}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div 
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 border-2 border-neon-purple"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          height: cursorVariant === 'hover' ? 50 : 40,
          width: cursorVariant === 'hover' ? 50 : 40,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.03 }}
      />
    </>
  );
};

export default CustomCursor;
