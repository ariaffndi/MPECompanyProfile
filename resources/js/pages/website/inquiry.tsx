import SectionLayout from '@/layouts/section-layout';
import GuestLayout from '@/layouts/guestLayout';
import { Head } from '@inertiajs/react';
import InquirySection from '@/components/mainApp/section/inquiry-section';

export default function Inquiry() {
    return (
        <>
            <Head title="Inquiry">
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
