import ContactUs from '@/components/mainApp/section/contact-us';
import HomeHero from '@/components/mainApp/section/home-hero';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';
import HomePartner from '@/components/mainApp/section/home-partner';
import AboutSection from '@/components/mainApp/section/home-about';

interface Partner {
    id: number;
    company_name: string;
    logo: string;
}

interface Props  {
    partners: Partner[];
}


export default function Home({ partners }: Props) {
    return (
        <>
            <Head title="Mitra Prima Enviro">
                <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" />
            </Head>
            <GuestLayout>
                <HomeHero />
                <SectionLayout>
                    <AboutSection/>
                    <HomePartner partners={partners} />
                    <ContactUs />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
