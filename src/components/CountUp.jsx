import { useEffect, useState, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export default function CountUp({ to, duration = 2, className = '' }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (shouldReduceMotion) {
      setValue(to);
      return;
    }
    if (isInView) {
      motionValue.set(to);
    }
  }, [isInView, to, motionValue, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    return springValue.on("change", (latest) => {
      setValue(Math.floor(latest));
    });
  }, [springValue, shouldReduceMotion]);

  return <span ref={ref} className={className}>{value}</span>;
}
