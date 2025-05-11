import ContactUs from '@/components/mainApp/section/contact-us';
import AboutSection from '@/components/mainApp/section/home-about';
import HomeHero from '@/components/mainApp/section/home-hero';
import HomePartner from '@/components/mainApp/section/home-partner';
import HomeProject from '@/components/mainApp/section/home-project';
import HomeService from '@/components/mainApp/section/home-service';
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
    service_description: string;
    service_image: string;
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
}

export default function Home({ partners, services, projects }: Props) {
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
                    <HomeProject projects={projects} />
                    <HomePartner partners={partners} />
                    <ContactUs />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
