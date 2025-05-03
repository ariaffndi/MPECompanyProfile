import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guestLayout';

export default function Home() {
    return (
        <>
            <Head title="Mitra Prima Enviro">

            </Head>
            <GuestLayout>
                <h1 className="text-3xl font-bold underline">Hello world!</h1>
            </GuestLayout>
        </>
    );
}
