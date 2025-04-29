
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHoverStart);
      link.addEventListener('mouseleave', handleLinkHoverEnd);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);

  const cursorSize = linkHovered ? 30 : 15;
  
  return (
    <>
      <motion.div
        className="custom-cursor-outer hidden md:block"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.9 : 1,
          opacity: 0.5
        }}
        transition={{ type: "spring", mass: 0.3, stiffness: 100 }}
      />
      <motion.div
        className="custom-cursor-inner hidden md:block"
        animate={{
          x: position.x - cursorSize / 2,
          y: position.y - cursorSize / 2,
          scale: clicked ? 0.9 : 1,
          width: linkHovered ? '30px' : '15px',
          height: linkHovered ? '30px' : '15px'
        }}
        transition={{ type: "spring", mass: 0.3, stiffness: 150 }}
      />
    </>
  );
};

export default CustomCursor;
