import bgHome from '@/assets/images/bg-home.jpg';

const HomeHero = () => {
    return (
        <div className="hero min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${bgHome})` }}>
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="hero-content flex-col text-white lg:flex-row-reverse">
                <div>
                    <h1 className="text-5xl font-bold border-b-4 m-2 w-1/2 pb-4">Mitra Prima Enviro .</h1>
                    <p className="py-6">
                        Merupakan salah satu layanan Achmad & Assosiates Group yang bergerak dibidang Enviromental Service meliputi Layanan WWTP
                        Design and Build,<br /> WWTP Equipment Supply, dan WWTP Operational - Maintenance Service.
                    </p>
                    <button className="btn rounded-2xl bg-blue-400 text-white">Discover More</button>
                </div>
            </div>
        </div>
    );
};

export default HomeHero;
