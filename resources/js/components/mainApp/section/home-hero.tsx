import bgHome from '@/assets/images/bg-home.jpg';
import { usePage } from '@inertiajs/react';

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
                    <h1 className="m-2 w-full md:w-1/2 border-b-4 pb-4 text-5xl font-bold">{company.name} .</h1>
                    <p className="w-full md:w-1/2 py-6">
                        {company.description.split(/\.\s*/)[0].trim()}.
                    </p>
                    <button className="btn rounded-2xl bg-blue-400 text-white">Discover More</button>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
