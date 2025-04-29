
import React, { useRef, useEffect, ReactNode } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation?: 'fadeUp' | 'fadeIn' | 'fadeRight' | 'fadeLeft' | 'zoom';
  delay?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

const animations = {
  fadeUp: {
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    hidden: { opacity: 0, y: 50 }
  },
  fadeIn: {
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
    hidden: { opacity: 0 }
  },
  fadeRight: {
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    hidden: { opacity: 0, x: -50 }
  },
  fadeLeft: {
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
    hidden: { opacity: 0, x: 50 }
  },
  zoom: {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    hidden: { opacity: 0, scale: 0.8 }
  }
};

const ScrollAnimationWrapper = ({ 
  children, 
  animation = 'fadeUp',
  delay = 0,
  threshold = 0.1,
  className = '',
  once = true
}: ScrollAnimationWrapperProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { 
    threshold,
    once
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animations[animation]}
      transition={{ delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
