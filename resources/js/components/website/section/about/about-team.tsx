import { Users } from 'lucide-react';
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
    return (
        <section id="aboutTeam" className="my-20">
            <ScrollReveal direction="up">
                <div className="mb-5">
                    <h2 className="text-center text-3xl font-light">THE TEAM</h2>
                    <h2 className="text-center text-3xl font-bold">BEHIND OUR SUCCESS</h2>
                </div>

                <div className="my-10 grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
                    {teams?.map((team) => (
                        <div className="card bg-base-100 aspect-4/5 h-full shadow-sm hover:scale-105 ease-in duration-300 transition">
                            <figure className="px-10 pt-10">
                                <img loading='lazy' src={`/storage/${team.image}`} alt={team.name} className="aspect-square rounded-full object-cover" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{team.name}</h2>
                                <p>{team.position}</p>
                            </div>
                        </div>
                    ))}
                    <div className="card bg-base-100 aspect-4/5 h-full shadow-sm hover:scale-105 ease-in duration-300 transition">
                        <figure className="px-10 pt-10">
                            <Users className="mx-auto aspect-square size-24 rounded-full bg-sky-100 object-cover p-4 lg:size-40" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">VIEW ALL</h2>
                            <p>our great people</p>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default AboutTeam;
