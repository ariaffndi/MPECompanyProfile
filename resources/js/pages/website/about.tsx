import bgAbout from '@/assets/images/bg-about.webp';
import AboutGallery from '@/components/website/section/about/about-gallery';
import AboutJourney from '@/components/website/section/about/about-journey';
import AboutPartner from '@/components/website/section/about/about-partner';
import AboutTeam from '@/components/website/section/about/about-team';
import AboutVision from '@/components/website/section/about/about-vision';
import ContactUs from '@/components/website/section/contact-us';
import PageHero from '@/components/website/section/page-hero';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';
import Meta from '@/components/Meta';

interface Partner {
    id: number;
    company_name: string;
    logo: string;
}

interface Team {
    id: number;
    name: string;
    position: string;
    image: string;
}

interface Gallery {
    id: number;
    activity_name: string;
    activity_image: string;
}

interface Props {
    gallery: Gallery[];
    team: Team[];
    partners: Partner[];
    yearsExperience: number;
    totalProject: number;
    totalPartner: number;
    totalTeam: number;
}

export default function About({ yearsExperience, totalProject, totalPartner, totalTeam, team, gallery, partners }: Props) {
    return (
        <>
            <Meta
                title="About"
                description="Jasa IPAL profesional, konsultasi AMDAL, SPPL, UKL-UPL, dan perizinan lingkungan. Melayani seluruh Indonesia."
                image=""
            />
            <Head title=""></Head>
            <GuestLayout>
                <PageHero backgroundImage={bgAbout} firstTitle="GET TO" secondTitle="KNOW US" />
                <SectionLayout>
                    <AboutJourney />
                    <AboutVision yearsExperience={yearsExperience} totalProject={totalProject} totalPartner={totalPartner} totalTeam={totalTeam} />
                    <AboutTeam teams={team || []} />
                    <AboutGallery gallery={gallery || []} />
                    <AboutPartner partners={partners || []} />
                    <ContactUs />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
