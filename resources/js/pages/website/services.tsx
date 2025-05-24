import HomeHero from '@/components/website/section/home/home-hero';
import GuestLayout from '@/layouts/guestLayout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Mitra Prima Enviro">
                <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" />
            </Head>
            <GuestLayout>
                <HomeHero />
            </GuestLayout>
        </>
    );
}
