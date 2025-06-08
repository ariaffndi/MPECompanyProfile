import { useEffect } from 'react';

interface ScrollToHashProps {
    offset?: number;
}

const ScrollToHash: React.FC<ScrollToHashProps> = ({ offset = -120 }) => {
    useEffect(() => {
        const hash = window.location.hash.substring(1); 
        if (hash) {
            const el = document.getElementById(hash);
            if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY + offset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    }, [offset]);

    return null;
};

export default ScrollToHash;
