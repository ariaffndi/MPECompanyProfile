import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Partner {
    id: number;
    company_name: string;
    logo: string;
}

interface Props {
    partners: Partner[];
}

const Partners = ({ partners }: Props) => {
    const [showAll, setShowAll] = useState(false);
    const visiblePartners = showAll ? partners : partners.slice(0, 36);
    const handleShowAll = () => setShowAll((prev) => !prev);
    return (
        <>
            <AnimatePresence initial={false}>
                <motion.div
                    key={showAll ? 'expanded' : 'collapsed'}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="my-10 grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6"
                >
                    {visiblePartners.map((partner) => (
                        <div key={partner.id} className="duration-300 ease-in hover:scale-105">
                            <img
                                loading="lazy"
                                src={`/storage/${partner.logo}`}
                                alt={partner.company_name}
                                title={partner.company_name}
                                className="aspect-video w-full object-contain grayscale transition duration-500 hover:grayscale-0 dark:invert"
                            />
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
            {partners.length > 36 && (
                <div className="flex justify-center">
                    <Button className="btn btn-md mt-4 w-fit rounded-lg bg-sky-500 text-white hover:bg-sky-600" onClick={handleShowAll}>
                        {showAll ? 'Show Less' : 'Show All'}
                    </Button>
                </div>
            )}
        </>
    );
};

export default Partners;
