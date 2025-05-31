import ScrollReveal from '@/components/website/scroll-reveal';
import ButtonTemplate from '../../button-template';
import { Link } from '@inertiajs/react';

const ContactMessage = () => {
    const description: string =
        'Got something on your mind? Whether it’s a question, an idea, or just a quick hello — we’d love to hear from you! Fill out the form and we’ll get back to you soon.';

    return (
        <section id="contactMessage" className="flex w-full flex-col items-start gap-5 md:flex-row">
            <div className="aspect-video place-self-center md:w-1/2 md:place-self-start lg:pl-5">
                <div className="flex h-full items-center justify-center text-center md:text-start">
                    <ScrollReveal direction="right">
                        <h2 className="text-3xl font-light">DROP US</h2>
                        <h2 className="text-3xl font-bold">A MESSAGE</h2>
                        <div className="my-6 text-lg leading-relaxed text-gray-700 dark:text-gray-50">{description}</div>
                    </ScrollReveal>
                </div>
            </div>
            <div className="justify-end gap-5 md:w-1/2">
                <ScrollReveal direction="left">
                    <form action="">
                        <input
                            type="text"
                            placeholder="Name*"
                            className="input input-lg input-ghost w-full rounded-none border-0 border-b-2 border-gray-600 bg-none focus:border-gray-600 focus:outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Email*"
                            className="input input-lg input-ghost w-full rounded-none border-0 border-b-2 border-gray-600 bg-none focus:border-gray-600 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Phone*"
                            className="input input-lg input-ghost w-full rounded-none border-0 border-b-2 border-gray-600 bg-none focus:border-gray-600 focus:outline-none"
                        />
                        <textarea
                            placeholder="Message*"
                            className="mb4 textarea textarea-lg textarea-ghost w-full rounded-none border-0 border-b-2 border-gray-600 bg-none focus:border-gray-600 focus:outline-none md:min-h-40"
                        ></textarea>
                        <ButtonTemplate size="btn-md">
                            <Link href="#">Send</Link>
                        </ButtonTemplate>
                    </form>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default ContactMessage;
