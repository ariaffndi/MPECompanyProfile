import bgContactUs from '@/assets/images/bg-contactUs.jpg';
import ContactMessage from '@/components/website/section/contact/contact-message';
import PageHero from '@/components/website/section/page-hero';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';

export default function Contact() {
    return (
        <>
            <Head title="Contact Us"></Head>
            <GuestLayout>
                <PageHero backgroundImage={bgContactUs} firstTitle="LET'S" secondTitle="GET IN TOUCH" />
                <SectionLayout>
                    <ContactMessage />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
