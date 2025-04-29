
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideRight' | 'scaleIn' | 'rotateIn';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
}

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -5 },
    visible: { opacity: 1, rotate: 0 }
  }
};

const ScrollAnimationWrapper = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.5,
  className = '',
  once = true,
  threshold = 0.2
}: ScrollAnimationWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold 
  });

  const selectedAnimation = animations[animation];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={selectedAnimation}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
