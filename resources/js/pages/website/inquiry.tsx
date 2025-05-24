import InquirySection from '@/components/website/section/inquiry-section';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';

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
