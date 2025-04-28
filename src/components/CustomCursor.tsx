import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, [role="button"], .neon-card').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true));
        el.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    addEventListeners();
    handleLinkHoverEvents();
    
    return () => {
      removeEventListeners();
    };
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot fixed top-0 left-0 z-50 pointer-events-none hidden md:block"
        style={{
          translateX: position.x - 5,
          translateY: position.y - 5
        }}
        animate={{
          height: clicked ? 12 : linkHovered ? 24 : 10,
          width: clicked ? 12 : linkHovered ? 24 : 10,
          opacity: hidden ? 0 : 1,
          backgroundColor: clicked ? "#00F5FF" : linkHovered ? "rgba(155, 93, 229, 0.5)" : "#9B5DE5"
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />
      <motion.div
        className="cursor-ring fixed top-0 left-0 z-40 rounded-full border-2 border-neon-purple pointer-events-none hidden md:block"
        style={{
          translateX: position.x - 25,
          translateY: position.y - 25
        }}
        animate={{
          height: clicked ? 40 : linkHovered ? 80 : 50,
          width: clicked ? 40 : linkHovered ? 80 : 50,
          opacity: hidden ? 0 : 0.4,
          borderColor: clicked ? "#00F5FF" : linkHovered ? "#9B5DE5" : "#6930C3"
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          opacity: { duration: 0.2 }
        }}
      />
    </>
  );
};

export default CustomCursor;
