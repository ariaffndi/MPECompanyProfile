import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type AnimatedNumberProps = {
    value: number;
    duration?: number;
};

export default function AnimatedNumber({ value, duration = 1 }: AnimatedNumberProps) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) =>
        Math.floor(latest).toLocaleString()
    );
    const [display, setDisplay] = useState('0');

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    useEffect(() => {
        if (!inView) return;

        const controls = animate(count, value, { duration });
        const unsubscribe = rounded.on('change', (v) => setDisplay(v));

        return () => {
            controls.stop();
            unsubscribe();
        };
    }, [inView, value, duration, count, rounded]);

    return <motion.span ref={ref}>{display}</motion.span>;
}
