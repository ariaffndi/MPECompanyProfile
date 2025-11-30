import React from 'react';
import ScrollReveal from '../scroll-reveal';

interface PageHeroProps {
    backgroundImage: string;
    firstTitle: string;
    secondTitle: string;
}

const PageHero: React.FC<PageHeroProps> = ({ backgroundImage, firstTitle, secondTitle }) => {
    const bgImage = backgroundImage;

    return (
        <section id='heroSection' className="hero min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="hero-content text-center">
                <div className="max-w-md text-white">
                    <ScrollReveal direction="left">
                        <h1 className="p-2 text-5xl font-light tracking-widest">{firstTitle}</h1>
                    </ScrollReveal>
                    <ScrollReveal direction="right">
                        <h2 className="p-2 text-5xl font-bold tracking-widest">{secondTitle}</h2>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default PageHero;
