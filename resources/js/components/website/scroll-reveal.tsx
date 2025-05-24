import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

type Props = {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
};

const ScrollReveal = ({ children, direction = 'up', delay = 0 }: Props) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
            x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.6,
                delay,
            },
        },
    };

    return (
        <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={variants}>
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
