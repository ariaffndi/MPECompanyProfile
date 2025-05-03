import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guestLayout';

export default function Home() {
    return (
        <>
            <Head title="Mitra Prima Enviro">
                <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" />
            </Head>
            <GuestLayout>
                <h1 className="text-3xl font-bold underline">Hello world!</h1>
            </GuestLayout>
        </>
    );
}
