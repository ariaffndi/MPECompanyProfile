import bgPortofolio from '@/assets/images/bg-potofolio.webp';
import ContactUs from '@/components/website/section/contact-us';
import PageHero from '@/components/website/section/page-hero';
import PortofolioPartner from '@/components/website/section/portofolio/portofoio-partner';
import PortofolioDescription from '@/components/website/section/portofolio/portofolio-description';
import PortofolioProject from '@/components/website/section/portofolio/portofolio-project';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';
import Meta from '@/components/Meta';

interface Project {
    id: number;
    project_name: string;
    location: string;
    value: number;
    project_image: string;
    category: {
        category_name: string;
    };
}

interface Partner {
    id: number;
    company_name: string;
    logo: string;
}

interface Props {
    projects: Project[];
    partners: Partner[];
}

export default function Portofolio({ projects, partners }: Props) {
    return (
        <>
            <Meta
                title="Portofolio"
                description="Jasa IPAL profesional, konsultasi AMDAL, SPPL, UKL-UPL, dan perizinan lingkungan. Melayani seluruh Indonesia."
                image=""
            />
            <Head title="Portofolio"></Head>
            <GuestLayout>
                <PageHero backgroundImage={bgPortofolio} firstTitle="OUR AMAZING" secondTitle="PORTOFOLIO" />
                <SectionLayout>
                    <PortofolioDescription />
                    <PortofolioProject projects={projects} />
                    <PortofolioPartner partners={partners} />
                    <ContactUs />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
