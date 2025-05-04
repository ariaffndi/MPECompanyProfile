import bgHome from '@/assets/images/bg-home.jpg';

const HomeHero = () => {
    return (
        <div className="hero w-full min-h-screen    bg-cover bg-center" style={{ backgroundImage: `url(${bgHome})` }}>

            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="hero-content flex-col text-white lg:flex-row-reverse">
                <div>
                    <h1 className="text-5xl font-bold">Box Office News!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut
                        repudiandae et a id nisi.
                    </p>
                    <button className="btn rounded-2xl bg-blue-400 text-white">Discover More</button>
                </div>
            </div>
        </div>
    );
};

export default HomeHero;
