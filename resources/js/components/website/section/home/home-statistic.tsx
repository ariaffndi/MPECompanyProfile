import ScrollReveal from '../../scroll-reveal';
import Statistic from '../../statistic';

interface Props {
    yearsExperience: number;
    totalProject: number;
    totalPartner: number;
    totalTeam: number;
}

const HomeStatistic = ({ yearsExperience, totalProject, totalPartner, totalTeam }: Props) => {
    return (
        <section id="homeStatistic" className="my-20">
            <ScrollReveal direction="up">
                <div className="mb-5">
                    <h2 className="text-center text-3xl font-light">WE ALWAYS MAKE</h2>
                    <h2 className="text-center text-3xl font-bold">THE BEST</h2>
                </div>

                <Statistic yearsExperience={yearsExperience} totalProject={totalProject} totalPartner={totalPartner} totalTeam={totalTeam} />
            </ScrollReveal>
        </section>
    );
};

export default HomeStatistic;
