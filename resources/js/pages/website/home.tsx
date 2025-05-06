import ContactUs from '@/components/mainApp/section/contact-us';
import HomeHero from '@/components/mainApp/section/home-hero';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Mitra Prima Enviro">
                <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" />
            </Head>
            <GuestLayout>
                <HomeHero />
                <SectionLayout>
                    <ContactUs />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
