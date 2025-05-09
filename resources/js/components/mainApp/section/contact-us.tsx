import sectionImage from '@/assets/images/section-contact-us.jpg';
import ScrollReveal from '@/components/mainApp/scroll-reveal';
import { Link } from '@inertiajs/react';

const ContactUs = () => {
    return (
        <section id="homeContactUs" className="flex w-full flex-col items-start gap-5 md:flex-row">
            <div className="card w-1/2 gap-y-4 md:place-self-center lg:pl-5">
                <ScrollReveal direction="right">
                    <h1 className="text-3xl font-light text-sky-500">Ready to collaborate?</h1>
                    <h1 className="text-3xl font-bold">Let's team up and create something incredible!</h1>
                    <Link href="#" className="btn text-base-200 mt-4 w-fit rounded-lg border-none bg-sky-500 shadow-lg hover:bg-sky-600">
                        Contact Us
                    </Link>
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
