import bgService from '@/assets/images/bg-service.webp';
import ContactUs from '@/components/website/section/contact-us';
import PageHero from '@/components/website/section/page-hero';
import ServiceConsultation from '@/components/website/section/service/service-consultation';
import ServiceProduct from '@/components/website/section/service/service-product';
import ServiceService from '@/components/website/section/service/service-service';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';
import Meta from '@/components/Meta';

interface service {
    id: number;
    service_name: string;
    service_image: string;
    service_description: string;
}

interface Product {
    id: number;
    product_name: string;
    product_description: string;
    product_image: string;
}

interface Props {
    services: service[];
    products: Product[];
}

export default function Services({ services, products }: Props) {
    return (
        <>
            <Meta
                title="Services"
                description="Jasa IPAL profesional, konsultasi AMDAL, SPPL, UKL-UPL, dan perizinan lingkungan. Melayani seluruh Indonesia."
                image=""
            />
            <Head title=""></Head>
            <GuestLayout>
                <PageHero backgroundImage={bgService} firstTitle="OUR SERVICE" secondTitle="OUR SOLUTION" />
                <SectionLayout>
                    <ServiceService services={services} />
                    <ServiceProduct products={products} />
                    <ServiceConsultation />
                    <ContactUs />
                </SectionLayout>
            </GuestLayout>
        </>
    );
}
