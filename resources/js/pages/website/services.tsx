import GuestLayout from '@/layouts/guestLayout';
import { Head } from '@inertiajs/react';
import SectionLayout from '@/layouts/section-layout';
import PageHero from '@/components/website/section/page-hero';
import bgService from '@/assets/images/bg-service.jpg';
import ContactUs from '@/components/website/section/contact-us';
import ServiceService from '@/components/website/section/service/service-service';
import ServiceProduct from '@/components/website/section/service/service-product';
import ServiceConsultation from '@/components/website/section/service/service-consultation';

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
            <Head title="Services"></Head>
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
