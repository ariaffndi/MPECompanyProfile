import ContactUs from '@/components/website/section/contact-us';
import AboutSection from '@/components/website/section/home/home-about';
import HomeHero from '@/components/website/section/home/home-hero';
import HomePartner from '@/components/website/section/home/home-partner';
import HomeProduct from '@/components/website/section/home/home-product';
import HomeProject from '@/components/website/section/home/home-project';
import HomeService from '@/components/website/section/home/home-service';
import HomeStatistic from '@/components/website/section/home/home-statistic';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';
import Meta from '@/components/Meta';

interface Partner {
    id: number;
    company_name: string;
    logo: string;
}

interface Service {
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

interface Project {
    id: number;
    project_name: string;
    location: string;
    project_image: string;
}

interface Props {
    partners: Partner[];
    services: Service[];
    projects: Project[];
    products: Product[];
    yearsExperience: number;
    totalProject: number;
    totalPartner: number;
    totalTeam: number;
}

export default function Home({ partners, services, projects, products, yearsExperience, totalProject, totalPartner, totalTeam }: Props) {
    return (
        <>
            <Meta
                title="Jasa Pengolahan Air Limbah - Mitra Prima Enviro"
                description="Jasa IPAL profesional, konsultasi AMDAL, SPPL, UKL-UPL, dan perizinan lingkungan. Melayani seluruh Indonesia."
                image=""
            />

            <Head title=""></Head>
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
