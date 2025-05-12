import ContactUs from '@/components/mainApp/section/contact-us';
import AboutSection from '@/components/mainApp/section/home-about';
import HomeHero from '@/components/mainApp/section/home-hero';
import HomePartner from '@/components/mainApp/section/home-partner';
import HomeProject from '@/components/mainApp/section/home-project';
import HomeService from '@/components/mainApp/section/home-service';
import HomeProduct from '@/components/mainApp/section/home-product';
import HomeStatistic from '@/components/mainApp/section/home-statistic';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';

interface Partner {
    id: number;
    company_name: string;
    logo: string;
}

interface service {
    id: number;
    service_name: string;
    service_image: string;
}

interface Product {
    id: number;
    product_name: string;
    product_description: string;
    product_image: string;
}

interface project {
    id: number;
    project_name: string;
    location: string;
    project_image: string;
}

interface Props {
    partners: Partner[];
    services: service[];
    projects: project[];
    products: Product[];
    yearsExperience: number;
    totalProject: number;
    totalPartner: number;
    totalTeam: number;
}


export default function Home({ partners, services, projects, products, yearsExperience, totalProject, totalPartner, totalTeam }: Props) {
    return (
        <>
            <Head title="Mitra Prima Enviro">
                <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" />
            </Head>
            <GuestLayout>
                <HomeHero />
                <SectionLayout>
                    <AboutSection />
                    <HomeService services={services} />
                    <HomeProduct products={products} />
                    <HomeProject projects={projects} />
                    <HomeStatistic yearsExperience={yearsExperience} totalProject={totalProject} totalPartner={totalPartner} totalTeam={totalTeam} />
                    <HomePartner partners={partners} />
                    <ContactUs />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
