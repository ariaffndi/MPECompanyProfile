import bgHome from '@/assets/images/bg-home.jpg';
import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

type Company = {
    name: string;
    description: string;
};

const HomeHero = () => {
    const { company } = usePage<{ company: Company }>().props;
    return (
        <section className="hero min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${bgHome})` }}>
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="hero-content flex-col text-white lg:flex-row-reverse">
                <div>
                    <h1 className="my-2 w-full border-b-4 pb-4 text-5xl font-bold md:w-1/2">{company.name}</h1>
                    <p className="w-full py-6 md:w-1/2">{company.description.split(/\.\s*/)[0].trim()}</p>
                    <Link href="#" className="btn text-base-200 w-fit rounded-lg border-none bg-sky-500 shadow-none hover:bg-sky-600">
                        Discover more
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
