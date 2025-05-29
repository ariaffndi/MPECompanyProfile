import bgPortofolio from '@/assets/images/bg-potofolio.jpg';
import ContactUs from '@/components/website/section/contact-us';
import PageHero from '@/components/website/section/page-hero';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';
import PortofolioPartner from '@/components/website/section/portofolio/portofoio-partner';

interface Partner {
    id: number;
    company_name: string;
    logo: string;
}

interface Props {
    partners: Partner[];
}

export default function Portofolio({ partners }: Props) {
    return (
        <>
            <Head title="Portofolio"></Head>
            <GuestLayout>
                <PageHero backgroundImage={bgPortofolio} firstTitle="OUR AMAZING" secondTitle="PORTOFOLIO" />
                <SectionLayout>
                    <PortofolioPartner partners={partners} />
                    <ContactUs />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
