import Partners from '../../partners';
import ScrollReveal from '../../scroll-reveal';

interface Partner {
    id: number;
    company_name: string;
    logo: string;
}

interface Props {
    partners: Partner[];
}

const PortofolioPartner = ({ partners }: Props) => {
    return (
        <section id="PortofolioPartner" className="my-20">
            <ScrollReveal direction="up">
                <div className="mb-5">
                    <h2 className="text-center text-3xl font-light">PARTNERS &</h2>
                    <h2 className="text-center text-3xl font-bold">COLLABORATION</h2>
                </div>

                <Partners partners={partners} />
            </ScrollReveal>
        </section>
    );
};

export default PortofolioPartner;
