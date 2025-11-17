import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import ScrollReveal from '../../scroll-reveal';

interface Team {
    id: number;
    name: string;
    position: string;
    image: string;
}

interface Props {
    teams: Team[];
}

const AboutTeam = ({ teams }: Props) => {
    const [showAll, setShowAll] = useState(false);
    const visibleTeams = showAll ? teams : teams.slice(0, 10);
    const handleShowAll = () => setShowAll((prev) => !prev);

    return (
        <section id="aboutTeam" className="my-20">
            <ScrollReveal direction="up">
                <div className="mb-5">
                    <h2 className="text-center text-3xl font-light">THE TEAM</h2>
                    <h2 className="text-center text-3xl font-bold">BEHIND OUR SUCCESS</h2>
                </div>

                <AnimatePresence initial={false}>
                    <motion.div
                        key={showAll ? 'expanded' : 'collapsed'}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="grid grid-cols-2 gap-6 overflow-hidden md:grid-cols-4 lg:grid-cols-5 xl:p-2"
                    >
                        {visibleTeams.map((team) => (
                            <div key={team.id} className="">
                                <div className="card bg-base-100 flex h-full shadow-sm transition duration-300 ease-in hover:scale-105">
                                    <figure className="px-10 pt-10">
                                        <img
                                            loading="lazy"
                                            src={`/storage/${team.image}`}
                                            alt={team.name}
                                            className="aspect-square rounded-full object-cover"
                                        />
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h2 className="card-title">{team.name}</h2>
                                        <p>{team.position}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {teams.length > 10 && (
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

export default AboutTeam;
