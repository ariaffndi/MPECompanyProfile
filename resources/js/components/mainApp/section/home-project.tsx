import ScrollReveal from '@/components/mainApp/scroll-reveal';
import { Link } from '@inertiajs/react';
import ButtonTemplate from '../button-template';

const HomeProject = () => {
    return (
        <section id="homeContactUs" className="flex w-full flex-col items-start gap-5 md:flex-row">
            <div className="aspect-video place-self-center md:w-1/3 md:place-self-start lg:pl-5">
                <div className="flex h-full items-center justify-center text-center md:text-start">
                    <ScrollReveal direction="right">
                        <h2 className="text-3xl font-light">OUR RECENT</h2>
                        <h2 className="text-3xl font-bold">PROJECT</h2>
                        <ButtonTemplate size="btn-md">
                            <Link href="#">Show All Project</Link>
                        </ButtonTemplate>
                    </ScrollReveal>
                </div>
            </div>
            <div className="grid grid-cols-1 justify-end gap-5 md:w-2/3 md:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                    <ScrollReveal direction="left" key={item}>
                        <div className="bg-base-100 aspect-video shadow-md duration-300 ease-in hover:scale-105">
                            <figure>
                                <img loading="lazy" src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
                            </figure>
                            <div className="bg-sky-900 p-4 text-white">
                                <h2 className="card-title text-md font-bold md:text-lg lg:text-xl">Card Title</h2>
                                <p className="md:text-md text-sm lg:text-lg">Surabaya, East Java</p>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
};

export default HomeProject;
