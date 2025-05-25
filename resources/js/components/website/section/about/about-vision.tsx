import { BicepsFlexed, Cpu, Handshake, Leaf } from 'lucide-react';
import ScrollReveal from '../../scroll-reveal';
import type { JSX } from 'react';
import Statistic from '../../statistic';


interface Props {
    yearsExperience: number;
    totalProject: number;
    totalPartner: number;
    totalTeam: number;
}

type Direction = 'up' | 'down' | 'left' | 'right';

type VisionItem = {
    icon: JSX.Element;
    text: string;
    direction: Direction;
};

const AboutVision = ({ yearsExperience, totalProject, totalPartner, totalTeam }: Props) => {

    const visionItems: VisionItem[] = [
        {
            icon: <Cpu size={80} className="mx-auto rounded-full bg-sky-200 p-4" />,
            text: 'Mendorong inovasi teknologi di bidang teknik lingkungan',
            direction: 'right',
        },
        {
            icon: <Handshake size={80} className="mx-auto rounded-full bg-sky-200 p-4" />,
            text: 'Menjaga kepercayaan dan kepuasan klien dalam setiap pekerjaan',
            direction: 'right',
        },
        {
            icon: <BicepsFlexed size={80} className="mx-auto rounded-full bg-sky-200 p-4" />,
            text: 'Bekerja keras, efektif, dan menghasilkan hasil terbaik',
            direction: 'left',
        },
        {
            icon: <Leaf size={80} className="mx-auto rounded-full bg-sky-200 p-4" />,
            text: 'Mengutamakan solusi teknis yang ramah lingkungan dan berkelanjutan',
            direction: 'left',
        },
    ];

    return (
        <section id="aboutVision" className="my-20">
            <ScrollReveal direction="up">
                <div className="mb-5">
                    <h2 className="text-center text-3xl font-light">WE ALWAYS MAKE</h2>
                    <h2 className="text-center text-3xl font-bold">THE BEST</h2>
                </div>

                <div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-4">
                    {visionItems.map((item, index) => (
                        <div key={index} className="group relative duration-300 ease-in hover:scale-105">
                            <ScrollReveal direction={item.direction}>
                                <div className="p-2 text-center md:p-3 lg:p-4">
                                    {item.icon}
                                    <div className="max-h-full opacity-100 transition-all duration-300 group-hover:mt-3 group-hover:max-h-[200px] group-hover:opacity-100 xl:max-h-0 xl:opacity-0 xl:group-hover:mt-3 xl:group-hover:max-h-[200px] xl:group-hover:opacity-100 mt-4">
                                        <p className="text-md lg:text-lg">{item.text}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    ))}
                </div>

                <Statistic yearsExperience={yearsExperience} totalProject={totalProject} totalPartner={totalPartner} totalTeam={totalTeam} />
                
            </ScrollReveal>
        </section>
    );
};

export default AboutVision;
