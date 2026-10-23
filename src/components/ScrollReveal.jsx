import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export function ScrollReveal({ children, className = '', once = true, margin = '-50px', as = 'div', style }) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (shouldReduceMotion) {
    return React.createElement(as, { className, style }, children);
  }

  return (
    <MotionTag
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
      className={className}
      style={style}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ children, className = '', variants = revealVariants, as = 'div', style }) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (shouldReduceMotion) {
    return React.createElement(as, { className, style }, children);
  }

  return (
    <MotionTag variants={variants} className={className} style={style}>
      {children}
    </MotionTag>
  );
}
