import bgPortofolio from '@/assets/images/bg-potofolio.jpg';
import ContactUs from '@/components/website/section/contact-us';
import PageHero from '@/components/website/section/page-hero';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';

export default function Portofolio() {
    return (
        <>
            <Head title="Portofolio"></Head>
            <GuestLayout>
                <PageHero backgroundImage={bgPortofolio} firstTitle="OUR AMAZING" secondTitle="PORTOFOLIO" />
                <SectionLayout>
                    <ContactUs />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
