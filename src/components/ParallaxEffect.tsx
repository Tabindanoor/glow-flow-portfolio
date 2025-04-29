
import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxProps {
  children: ReactNode;
  offset?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const ParallaxEffect = ({ 
  children, 
  offset = 50, 
  className = "", 
  direction = 'up' 
}: ParallaxProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Calculate transform values based on direction
  const getTransformValues = () => {
    const range = offset;
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [range, -range]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [-range, range]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [range, -range]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [-range, range]);
      default:
        return useTransform(scrollYProgress, [0, 1], [range, -range]);
    }
  };
  
  const y = direction === 'up' || direction === 'down' 
    ? getTransformValues() 
    : 0;
  
  const x = direction === 'left' || direction === 'right' 
    ? getTransformValues() 
    : 0;

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxEffect;
