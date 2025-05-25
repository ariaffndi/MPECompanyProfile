import ScrollReveal from '../../scroll-reveal';

interface Partner {
    id: number;
    company_name: string;
    logo: string;
}

interface Props {
    partners: Partner[];
}

const AboutPartner = ({ partners }: Props) => {
    return (
        <section id="AboutPartner" className="my-20">
            <ScrollReveal direction="up">
                <div className="mb-5">
                    <h2 className="text-center text-3xl font-light">PARTNERS &</h2>
                    <h2 className="text-center text-3xl font-bold">COLLABORATION</h2>
                </div>

                <div className="my-10 grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
                    {partners?.map((partner) => (
                        <div className="">
                            <img
                               loading='lazy'
                                src={`/storage/${partner.logo}`}
                                alt={partner.company_name}
                                title={partner.company_name}
                                className="aspect-video w-full object-contain grayscale transition duration-500 hover:grayscale-0 dark:invert"
                            />
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
};

export default AboutPartner;
