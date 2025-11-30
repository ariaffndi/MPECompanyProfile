import bgContactUs from '@/assets/images/bg-contactUs.webp';
import ContactCompanyLocation from '@/components/website/section/contact/contact-company-location';
import ContactContacts from '@/components/website/section/contact/contact-contacts';
import ContactMessage from '@/components/website/section/contact/contact-message';
import ContactPlan from '@/components/website/section/contact/contact-plan';
import PageHero from '@/components/website/section/page-hero';
import { useFlashToast } from '@/hooks/useFlashToast';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';
import Meta from '@/components/Meta';

export default function Contact() {
    useFlashToast();
    return (
        <>
            <Meta
                title="Contact Us"
                description="Jasa IPAL profesional, konsultasi AMDAL, SPPL, UKL-UPL, dan perizinan lingkungan. Melayani seluruh Indonesia."
                image=""
            />
            <Head title=""></Head>
            <GuestLayout>
                <PageHero backgroundImage={bgContactUs} firstTitle="LET'S" secondTitle="GET IN TOUCH" />
                <SectionLayout>
                    <ContactMessage />
                    <ContactContacts />
                    <ContactPlan />
                    <ContactCompanyLocation />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
