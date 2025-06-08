import bgContactUs from '@/assets/images/bg-contactUs.jpg';
import ContactCompanyLocation from '@/components/website/section/contact/contact-company-location';
import ContactContacts from '@/components/website/section/contact/contact-contacts';
import ContactMessage from '@/components/website/section/contact/contact-message';
import ContactPlan from '@/components/website/section/contact/contact-plan';
import PageHero from '@/components/website/section/page-hero';
import { useFlashToast } from '@/hooks/useFlashToast';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';

export default function Contact() {
    useFlashToast();
    return (
        <>
            <Head title="Contact Us"></Head>
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
