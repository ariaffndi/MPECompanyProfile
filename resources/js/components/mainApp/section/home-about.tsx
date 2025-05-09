import sectionImage from '@/assets/images/section-about.jpg';
import ScrollReveal from '@/components/mainApp/scroll-reveal';
import { Link, usePage } from '@inertiajs/react';

type Company = {
    name: string;
    description: string;
};

const AboutSection = () => {
    const { company } = usePage<{ company: Company }>().props;

    return (
        <section id="homeAbout" className="my-20 flex w-full flex-col items-start gap-10 px-6 md:flex-row">
            <div className="flex w-full justify-center md:w-1/2">
                <ScrollReveal direction="right">
                    <img src={sectionImage} alt="Mitra Prima Enviro" className="w-full max-w-md rounded-lg object-cover shadow-lg md:aspect-square" />
                </ScrollReveal>
            </div>

            <div className="flex w-full flex-col justify-center md:w-1/2">
                <ScrollReveal direction="left">
                    <h2 className="mb-2 text-2xl font-light text-gray-500 uppercase dark:text-gray-100">About</h2>
                    <h1 className="mb-4 text-2xl font-extrabold text-gray-800 md:text-3xl dark:text-gray-50">{company.name}</h1>
                    <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-50">{company.description}</p>
                    <Link href="#" className="btn w-fit rounded-lg bg-sky-500 px-6 py-2 text-white shadow-md hover:bg-sky-600">
                        Explore More
                    </Link>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default AboutSection;
