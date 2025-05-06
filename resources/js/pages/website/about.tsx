import PageHero from '@/components/mainApp/section/page-hero';
import GuestLayout from '@/layouts/guestLayout';
import { Head } from '@inertiajs/react';
import bgAbout from '@/assets/images/bg-about.jpg';

export default function Home() {
    return (
        <>
            <Head title="Mitra Prima Enviro">
                <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" />
            </Head>
            <GuestLayout>
                <PageHero backgroundImage={bgAbout} firstTitle='GET TO' secondTitle='KNOW US'/>
            </GuestLayout>
        </>
    );
}
