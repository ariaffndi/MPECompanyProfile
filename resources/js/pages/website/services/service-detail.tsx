import ScrollReveal from '@/components/website/scroll-reveal';
import ContactUs from '@/components/website/section/contact-us';
import ServiceConsultation from '@/components/website/section/service/service-consultation';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';

interface Service {
    id: number;
    service_name: string;
    service_image: string;
    service_description: string;
}

interface Props {
    service: Service;
}

const ServiceDetail = ({ service }: Props) => {
    return (
        <>
            <Head title="Service"></Head>
            <GuestLayout>
                <div className="bg-base-200">
                    <ScrollReveal direction="up">
                        <div className="relative h-[100vh] bg-cover bg-center" style={{ backgroundImage: `url(/storage/${service.service_image})` }}>
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div className="relative z-10 flex h-full flex-col justify-center px-8 pb-12 text-white">
                                <ScrollReveal direction="right">
                                    <div className="mb-4 text-sm font-light tracking-wide uppercase opacity-75">
                                        Service / <span className="font-bold">{service.service_name}</span>
                                    </div>
                                    <h2 className="text-5xl font-bold">{service.service_name}</h2>
                                </ScrollReveal>
                            </div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="left">
                        <ScrollReveal direction="left">
                            <div className="relative z-20 mx-4 -mt-24 grid grid-cols-2 rounded-lg bg-white p-8 shadow-lg md:mx-12">
                                <div className="">
                                    <ScrollReveal direction="right">
                                        <h2 className="text-center text-3xl font-light">ABOUT</h2>
                                        <h2 className="text-center text-3xl font-bold">OUR SERVICE</h2>
                                    </ScrollReveal>
                                </div>
                                <div className="">
                                    <ScrollReveal direction="left">
                                        <p className="">{service.service_description}</p>
                                    </ScrollReveal>
                                </div>
                            </div>
                        </ScrollReveal>
                    </ScrollReveal>
                </div>
                <SectionLayout>
                    <ServiceConsultation />
                    <ContactUs />
                </SectionLayout>
            </GuestLayout>
        </>
    );
};

export default ServiceDetail;
