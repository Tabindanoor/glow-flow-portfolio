
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const mMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      const isLinkOrButton = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer');
        
      setLinkHovered(isLinkOrButton);
    };
    
    const mDown = () => setClicked(true);
    const mUp = () => setClicked(false);
    
    // Hide cursor when it leaves the window
    const mLeave = () => setHidden(true);
    const mEnter = () => setHidden(false);

    document.addEventListener('mousemove', mMove);
    document.addEventListener('mousedown', mDown);
    document.addEventListener('mouseup', mUp);
    document.addEventListener('mouseleave', mLeave);
    document.addEventListener('mouseenter', mEnter);
    
    return () => {
      document.removeEventListener('mousemove', mMove);
      document.removeEventListener('mousedown', mDown);
      document.removeEventListener('mouseup', mUp);
      document.removeEventListener('mouseleave', mLeave);
      document.removeEventListener('mouseenter', mEnter);
    };
  }, []);

  const cursorVariants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
    },
    link: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
    },
    clicked: {
      x: position.x - 16,
      y: position.y - 16,
      height: 28,
      width: 28,
    }
  };

  return (
    <>
      <style>
        {`
          body {
            cursor: none;
          }
        `}
      </style>
      
      <motion.div 
        className={`fixed top-0 left-0 z-50 pointer-events-none rounded-full border-2 border-neon-cyan
          ${hidden ? 'opacity-0' : 'opacity-100'}
          ${clicked ? 'bg-neon-purple/20' : linkHovered ? 'bg-neon-cyan/20' : 'bg-transparent'}`
        }
        variants={cursorVariants}
        animate={clicked ? "clicked" : linkHovered ? "link" : "default"}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
    </>
  );
};

export default CustomCursor;
