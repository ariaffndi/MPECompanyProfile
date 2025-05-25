import bgAbout from '@/assets/images/bg-about.jpg';
import AboutJourney from '@/components/website/section/about/about-journey';
import AboutTeam from '@/components/website/section/about/about-team';
import AboutVision from '@/components/website/section/about/about-vision';
import PageHero from '@/components/website/section/page-hero';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';

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

interface Props {
    team: Team[];
    partners: Partner[];
    yearsExperience: number;
    totalProject: number;
    totalPartner: number;
    totalTeam: number;
}

export default function About({ yearsExperience, totalProject, totalPartner, totalTeam, team }: Props) {
    return (
        <>
            <Head title="Mitra Prima Enviro">
                <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap" />
            </Head>
            <GuestLayout>
                <PageHero backgroundImage={bgAbout} firstTitle="GET TO" secondTitle="KNOW US" />
                <SectionLayout>
                    <AboutJourney />
                    <AboutVision yearsExperience={yearsExperience} totalProject={totalProject} totalPartner={totalPartner} totalTeam={totalTeam} />
                    <AboutTeam teams={team || []} />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
