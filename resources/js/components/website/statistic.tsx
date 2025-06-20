import React from 'react'
import AnimatedNumber from '@/components/animate-number';


interface Props {
    yearsExperience: number;
    totalProject: number;
    totalPartner: number;
    totalTeam: number;
}

const Statistic = ({ yearsExperience, totalProject, totalPartner, totalTeam }: Props) => {
    return (
        <div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="duration-300 ease-in hover:scale-105">
                <div className="p-2 text-center md:p-3 lg:p-4">
                    <h2 className="mb-2 text-4xl font-bold lg:text-5xl">
                        <AnimatedNumber duration={2} value={typeof yearsExperience === 'number' ? yearsExperience : 0} />
                    </h2>
                    <p className="text-md lg:text-lg">Years Experience</p>
                </div>
            </div>
            <div className="duration-300 ease-in hover:scale-105">
                <div className="p-2 text-center md:p-3 lg:p-4">
                    <h2 className="mb-2 text-4xl font-bold lg:text-5xl">
                        <AnimatedNumber duration={2} value={typeof totalProject === 'number' ? totalProject : 0} />+
                    </h2>
                    <p className="text-md lg:text-lg">Total Project</p>
                </div>
            </div>
            <div className="duration-300 ease-in hover:scale-105">
                <div className="p-2 text-center md:p-3 lg:p-4">
                    <h2 className="mb-2 text-4xl font-bold lg:text-5xl">
                        <AnimatedNumber duration={2} value={typeof totalPartner === 'number' ? totalPartner : 0} />+
                    </h2>
                    <p className="text-md lg:text-lg">Number of Clients</p>
                </div>
            </div>
            <div className="duration-300 ease-in hover:scale-105">
                <div className="p-2 text-center md:p-3 lg:p-4">
                    <h2 className="mb-2 text-4xl font-bold lg:text-5xl">
                        <AnimatedNumber duration={2} value={typeof totalTeam === 'number' ? totalTeam : 0} />
                    </h2>
                    <p className="text-md lg:text-lg">Professional Team</p>
                </div>
            </div>
        </div>
    );
};

export default Statistic