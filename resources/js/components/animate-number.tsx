import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

type AnimatedNumberProps = {
  value: number;
  duration?: number; 
};

export default function AnimatedNumber({ value, duration = 1 }: AnimatedNumberProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest).toLocaleString());
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const controls = animate(count, value, { duration });
    const unsubscribe = rounded.on('change', (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, duration]);

  return <motion.span>{display}</motion.span>;
}
