import InquirySection from '@/components/website/section/inquiry-section';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';
import Meta from '@/components/Meta';

export default function Inquiry() {
    return (
        <>
            <Meta
                title="Inquiry"
                description="Jasa IPAL profesional, konsultasi AMDAL, SPPL, UKL-UPL, dan perizinan lingkungan. Melayani seluruh Indonesia."
                image=""
            />
            <Head title="">
                <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" />
            </Head>
            <GuestLayout>
                <SectionLayout>
                    <InquirySection />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
