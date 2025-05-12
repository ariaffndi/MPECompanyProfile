import sectionImage from '@/assets/images/section-contact-us.jpg';
import ScrollReveal from '@/components/mainApp/scroll-reveal';
import { Link } from '@inertiajs/react';
import ButtonTemplate from '../button-template';

const ContactUs = () => {
    return (
        <section id="homeContactUs" className="mt-20 flex w-full flex-col items-start gap-5 md:flex-row">
            <div className="card gap-y-4 md:w-1/2 md:place-self-center lg:pl-5">
                <ScrollReveal direction="right">
                    <h1 className="text-3xl font-light text-sky-500">Ready to collaborate?</h1>
                    <h1 className="text-3xl font-bold">Let's team up and create something incredible!</h1>
                    <ButtonTemplate size="btn-md">
                        <Link href="#">Contact Us</Link>
                    </ButtonTemplate>
                </ScrollReveal>
            </div>
            <div className="w-full justify-end md:w-1/2">
                <ScrollReveal direction="left">
                    <img loading="lazy" src={sectionImage} width={500} alt="section contact us" className="mx-auto object-cover md:aspect-square" />
                </ScrollReveal>
            </div>
        </section>
    );
};

export default ContactUs;
