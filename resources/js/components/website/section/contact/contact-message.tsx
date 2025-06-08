import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/website/scroll-reveal';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React from 'react';

const ContactMessage = () => {
    const description: string =
        'Got something on your mind? Whether it’s a question, an idea, or just a quick hello — we’d love to hear from you! Fill out the form and we’ll get back to you soon.';

    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <section id="contactMessage" className="scroll-mt-34 flex w-full flex-col items-start gap-5 md:flex-row">
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
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name*"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="input input-lg input-ghost w-full rounded-none border-0 border-b-2 border-gray-600 bg-none focus:border-gray-600 focus:outline-none"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email*"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="input input-lg input-ghost w-full rounded-none border-0 border-b-2 border-gray-600 bg-none focus:border-gray-600 focus:outline-none"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone*"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="input input-lg input-ghost w-full rounded-none border-0 border-b-2 border-gray-600 bg-none focus:border-gray-600 focus:outline-none"
                        />
                        <textarea
                            name="message"
                            placeholder="Message*"
                            value={data.message}
                            onChange={(e) => setData('message', e.target.value)}
                            className="mb4 textarea textarea-lg textarea-ghost w-full rounded-none border-0 border-b-2 border-gray-600 bg-none focus:border-gray-600 focus:outline-none md:min-h-40"
                        ></textarea>

                        <Button
                            type="submit"
                            className="btn btn-md mt-4 w-fit rounded-lg bg-sky-500 px-12 text-white hover:bg-sky-600"
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Send
                        </Button>

                        {Object.keys(errors).length > 0 && (
                            <div className="mt-2 text-sm text-red-500">
                                {Object.values(errors).map((err, i) => (
                                    <div key={i}>{err}</div>
                                ))}
                            </div>
                        )}
                    </form>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default ContactMessage;
