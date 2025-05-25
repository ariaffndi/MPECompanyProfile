import ScrollReveal from '../../scroll-reveal';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Gallery {
    id: number;
    activity_name: string;
    activity_image: string;
}

interface Props {
    gallery: Gallery[];
}

const AboutGallery = ({ gallery }: Props) => {
    const [showAll, setShowAll] = useState(false);
    const visibileActivity = showAll ? gallery : gallery.slice(0, 5);
    const handleShowAll = () => setShowAll((prev) => !prev);
    return (
        <section id="aboutGallery" className="my-20">
            <ScrollReveal direction="up">
                {gallery.length > 0 && (
                    <div className="mb-10">
                        <img
                            loading="lazy"
                            src={`/storage/${gallery[0].activity_image}`}
                            alt={gallery[0].activity_name}
                            title={gallery[0].activity_name}
                            className="aspect-video w-full object-cover"
                        />
                    </div>
                )}
                <AnimatePresence initial={false}>
                    <motion.div
                        key={showAll ? 'expanded' : 'collapsed'}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="grid grid-cols-1 gap-6 overflow-hidden md:grid-cols-3 lg:grid-cols-4"
                    >
                        {visibileActivity.slice(1).map((gallery) => (
                            <div key={gallery.id} className="duration-300 ease-in hover:scale-105">
                                <img
                                    loading="lazy"
                                    src={`/storage/${gallery.activity_image}`}
                                    alt={gallery.activity_name}
                                    title={gallery.activity_name}
                                    className="aspect-video w-full object-cover"
                                />
                            </div>
                        ))}

                    </motion.div>
                </AnimatePresence>
                        {gallery.length > 5 && (
                            <div className="flex justify-center">
                                <Button className="btn btn-md mt-4 w-fit rounded-lg bg-sky-500 text-white hover:bg-sky-600" onClick={handleShowAll}>
                                    {showAll ? 'Show Less' : 'Show All'}
                                </Button>
                            </div>
                        )}
            </ScrollReveal>
        </section>
    );
};

export default AboutGallery;
