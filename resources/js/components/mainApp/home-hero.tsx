import bgHome from '@/assets/images/bg-home.jpg';
import { usePage } from '@inertiajs/react';
//data company dari service provider
type Company = {
    name: string;
    description: string;
};

const HomeHero = () => {
    const { company } = usePage<{ company: Company }>().props;
    return (
        <section className="hero" style={{ backgroundImage: `url(${bgHome})` }}>
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="hero-content flex-col text-white lg:flex-row-reverse">
                <div>
                    <h1 className="m-2 w-full border-b-4 pb-4 text-5xl font-bold md:w-1/2">{company.name}</h1>
                    <p className="w-full py-6 md:w-1/2">{company.description.split(/\.\s*/)[0].trim()}.</p>
                    <button className="btn rounded-2xl bg-blue-400 text-white">Discover More</button>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
