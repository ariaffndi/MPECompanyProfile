import bgPortofolio from '@/assets/images/bg-potofolio.jpg';
import ContactUs from '@/components/website/section/contact-us';
import PageHero from '@/components/website/section/page-hero';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';
import PortofolioPartner from '@/components/website/section/portofolio/portofoio-partner';
import PortofolioDescription from '@/components/website/section/portofolio/portofolio-description';
import PortofolioProject from '@/components/website/section/portofolio/portofolio-project';


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
