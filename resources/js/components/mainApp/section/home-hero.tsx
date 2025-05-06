import bgHome from '@/assets/images/bg-home.jpg';
import { Link, usePage } from '@inertiajs/react';

type Company = {
    name: string;
    description: string;
};

const HomeHero = () => {
    const { company } = usePage<{ company: Company }>().props;
    return (
        <section className="hero min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${bgHome})` }}>
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="hero-content flex-col px-20 text-white lg:flex-row-reverse">
                <div>
                    <h1 className="my-2 w-full pb-4 text-5xl font-bold">{company.name}</h1>
                    <hr className="w-1/2 border-t-4 border-white" />
                    <p className="py-6 md:mr-99">{company.description.split(/\.\s*/)[0].trim()}</p>
                    <Link href="#" className="btn text-base-200 w-fit rounded-lg border-none bg-sky-500 shadow-none hover:bg-sky-600">
                        Discover more
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
