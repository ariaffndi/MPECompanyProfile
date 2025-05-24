import bgAbout from '@/assets/images/bg-about.jpg';
import AboutJourney from '@/components/website/section/about/about-journey';
import AboutVision from '@/components/website/section/about/about-vision';
import PageHero from '@/components/website/section/page-hero';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';

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

export default function About({ yearsExperience, totalProject, totalPartner, totalTeam }: Props) {
    return (
        <>
            <Head title="Mitra Prima Enviro">
                <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" />
            </Head>
            <GuestLayout>
                <PageHero backgroundImage={bgAbout} firstTitle="GET TO" secondTitle="KNOW US" />
                <SectionLayout>
                    <AboutJourney />
                    <AboutVision yearsExperience={yearsExperience} totalProject={totalProject} totalPartner={totalPartner} totalTeam={totalTeam} />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
