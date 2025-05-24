import sectionImage from '@/assets/images/section-about.jpg';
import ScrollReveal from '@/components/website/scroll-reveal';
import { Link, usePage } from '@inertiajs/react';
import ButtonTemplate from '../../button-template';

type Company = {
    name: string;
    description: string;
};

const AboutSection = () => {
    const { company } = usePage<{ company: Company }>().props;

    return (
        <section id="homeAbout" className="mb-20 flex w-full flex-col items-start gap-10 lg:flex-row">
            <div className="flex w-full justify-center lg:w-1/2">
                <ScrollReveal direction="right">
                    <img
                        loading="lazy"
                        src={sectionImage}
                        alt="Mitra Prima Enviro"
                        className="w-full max-w-md object-cover shadow-xl lg:aspect-square"
                    />
                </ScrollReveal>
            </div>

            <div className="flex w-full flex-col justify-center lg:w-1/2">
                <ScrollReveal direction="left">
                    <h2 className="text-3xl font-light">ABOUT</h2>
                    <h2 className="text-3xl font-bold">{company.name}</h2>
                    <p className="my-6 leading-relaxed text-gray-700 dark:text-gray-50">
                        {company.description
                            .match(/[^.!?]+[.!?]+/g)
                            ?.slice(0, 2)
                            .join(' ')}
                    </p>
                    <ButtonTemplate size="btn-md">
                        <Link href="#">Explore More</Link>
                    </ButtonTemplate>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default AboutSection;
