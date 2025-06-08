import ScrollReveal from '@/components/website/scroll-reveal';
import ButtonTemplate from '../../button-template';
import { Link } from '@inertiajs/react';

const ContactPlan = () => {
    const description: string =
        'Do you already have a project plan or concept in hand? We would be delighted to explore it with you and collaborate to bring your vision to reality.';

    return (
        <section id="contactPlan" className="my-10 flex w-full flex-col items-start gap-5 md:flex-row">
            <div className=" place-self-center md:w-1/2 md:place-self-start lg:pl-5">
                <div className="flex justify-start text-center md:text-start">
                    <ScrollReveal direction="right">
                        <h2 className="text-3xl font-light">ALREADY HAVE</h2>
                        <h2 className="text-3xl font-bold">A PLAN?</h2>
                    </ScrollReveal>
                </div>
            </div>
            <div className="justify-end gap-5 md:w-1/2">
                <ScrollReveal direction="left">
                    <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-50">
                        <p className="mb-4">{description}</p>
                    </div>
                    <ButtonTemplate size="btn-md">
                        <Link href="/inquiry">Enquire Now</Link>
                    </ButtonTemplate>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default ContactPlan;
