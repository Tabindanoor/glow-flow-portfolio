
import React, { useRef, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxEffectProps {
  children: ReactNode;
  intensity?: number;
  direction?: 'up' | 'down';
  className?: string;
}

const ParallaxEffect = ({ 
  children,
  intensity = 0.2,
  direction = 'up',
  className = ''
}: ParallaxEffectProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const factor = direction === 'up' ? -intensity * 100 : intensity * 100;
  
  const y = useTransform(scrollYProgress, [0, 1], [0, factor]);
  
  return (
    <motion.div ref={ref} className={`parallax-container ${className}`}>
      <motion.div style={{ y }} className="parallax-inner">
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ParallaxEffect;
