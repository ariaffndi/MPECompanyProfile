import React from 'react';

interface PageHeroProps {
    backgroundImage: string;
    firstTitle: string;
    secondTitle: string;
}

const PageHero: React.FC<PageHeroProps> = ({ backgroundImage, firstTitle, secondTitle }) => {
    const bgImage = backgroundImage;

    return (
        <section className="hero min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-thin">{firstTitle}</h1>
                    <h2 className="text-5xl font-bold">{secondTitle}</h2>
                </div>
            </div>
        </section>
    );
};

export default PageHero;
