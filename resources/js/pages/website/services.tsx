import GuestLayout from '@/layouts/guestLayout';
import { Head } from '@inertiajs/react';
import SectionLayout from '@/layouts/section-layout';
import PageHero from '@/components/website/section/page-hero';
import bgService from '@/assets/images/bg-service.jpg';
import ContactUs from '@/components/website/section/contact-us';

export default function Services() {
    return (
        <>
            <Head title="Services"></Head>
            <GuestLayout>
                <PageHero backgroundImage={bgService} firstTitle="OUR SERVICE" secondTitle="OUR SOLUTION" />
                <SectionLayout>
                    <ContactUs />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
