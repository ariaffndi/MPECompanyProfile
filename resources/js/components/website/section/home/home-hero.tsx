import bgHome from '@/assets/images/bg-home.jpg';
import { usePage } from '@inertiajs/react';
import { ArrowDown } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import ButtonTemplate from '../../button-template';
import ScrollReveal from '../../scroll-reveal';

type Company = {
    name: string;
    description: string;
};

const HomeHero = () => {
    const { company } = usePage<{ company: Company }>().props;
    return (
        <section className="hero min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${bgHome}) ` }}>
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="hero-content flex-col px-10 text-white lg:flex-row-reverse">
                <div>
                    <ScrollReveal direction="right">
                        <h1 className="my-2 w-full pb-4 text-5xl font-bold">{company.name}</h1>
                    </ScrollReveal>
                    <hr className="w-1/2 border-t-4 border-white" />
                    <ScrollReveal direction="left">
                        <p className="py-6 lg:w-1/2">{company.description.split(/\.\s*/)[0].trim()}</p>
                        <ButtonTemplate size="btn-md">
                            <ScrollLink to="homeAbout" smooth={true} duration={500} offset={-120}>
                                Discover Me
                            </ScrollLink>
                        </ButtonTemplate>
                    </ScrollReveal>
                </div>
            </div>
            <ScrollLink
                to="homeAbout"
                    smooth={true}
                    duration={500}
                    offset={-120}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer text-white"
            >
                <ArrowDown size={32} />
            </ScrollLink>
        </section>
    );
};

export default HomeHero;
