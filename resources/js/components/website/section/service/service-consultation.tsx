import bgConsultation from '@/assets/images/bg-consultation.jpg';
import { Link } from '@inertiajs/react';
import ButtonTemplate from '../../button-template';
import ScrollReveal from '../../scroll-reveal';

const ServiceConsultation = () => {
    return (
        <ScrollReveal direction="up">
            <div className="hero min-h-screen" style={{ backgroundImage: `url(${bgConsultation})` }}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content justify-start md:justify-center">
                    <div className="max-w-md transform text-left md:max-w-fit xl:translate-x-1/2">
                        <h1 className="mb-5 text-3xl font-light md:text-5xl">SCHEDULE A</h1>
                        <h1 className="mb-5 text-3xl font-bold md:text-5xl">FREE CONSULTATION</h1>
                        <ButtonTemplate size="btn-md">
                            <Link href="/inquiry">Enquire Now</Link>
                        </ButtonTemplate>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    );
};

export default ServiceConsultation;
