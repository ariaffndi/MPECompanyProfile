import ScrollReveal from '@/components/website/scroll-reveal';
import ContactUs from '@/components/website/section/contact-us';
import ServiceConsultation from '@/components/website/section/service/service-consultation';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head } from '@inertiajs/react';

type Project = {
    project_name: string;
    location: string;
    project_image: string;
    value: string;
    year: number;
    category: {
        category_name: string;
    };
    client: {
        client_type: string;
    };
    description: string;
};

type Props = {
    project: Project;
};

const DetailItem = ({ title, value, customClass = '' }: { title: string; value: string; customClass?: string }) => (
    <div className={`p-4 ${customClass} border-gray-400`}>
        <div className="ml-2 text-sm text-gray-500">{title}</div>
        <div className="ml-2 text-lg font-medium text-gray-800">{value}</div>
    </div>
);

const ProjectDetail = ({ project }: Props) => {
    return (
        <>
            <Head title="Portofolio"></Head>
            <GuestLayout>
                <div className="bg-base-200">
                    <ScrollReveal direction="up">
                        <div className="relative h-[100vh] bg-cover bg-center" style={{ backgroundImage: `url(/storage/${project.project_image})` }}>
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div className="relative z-10 flex h-full flex-col justify-center px-8 pb-12 text-white">
                                <ScrollReveal direction="right">
                                    <div className="mb-4 text-sm font-light tracking-wide uppercase opacity-75">
                                        Portfolio / {project.category.category_name} / <span className="font-bold">{project.project_name}</span>
                                    </div>
                                    <h2 className="text-5xl font-bold">{project.project_name}</h2>
                                </ScrollReveal>
                            </div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="left">
                        <ScrollReveal direction="left">
                            <div className="relative z-20 mx-4 -mt-24 grid grid-cols-2 rounded-lg bg-white p-8 shadow-lg md:mx-12 md:grid-cols-4">
                                <DetailItem title="Location" value={project.location} customClass="border-r" />
                                <DetailItem title="Client" value={project.client.client_type} customClass="border-l border-r" />
                                <DetailItem title="Category" value={project.category.category_name} customClass="border-l border-r" />
                                <DetailItem title="Year" value={project.year.toString()} customClass="border-l" />
                            </div>
                        </ScrollReveal>
                    </ScrollReveal>
                </div>
                <SectionLayout>
                    <section id="portofolioDescription" className="flex w-full flex-col items-start gap-5 md:flex-row">
                        <div className="aspect-video place-self-center md:w-2/5 md:place-self-start lg:pl-5">
                            <div className="flex w-full items-center justify-center text-center md:text-start">
                                <ScrollReveal direction="right">
                                    <h2 className="text-3xl font-light">ABOUT</h2>
                                    <h2 className="text-3xl font-bold">THE PROJECT</h2>
                                </ScrollReveal>
                            </div>
                        </div>
                        <div className="justify-end gap-5 md:w-3/5">
                            <ScrollReveal direction="left">
                                <div className="my-6 text-lg leading-relaxed text-gray-700 dark:text-gray-50">
                                    {project.description
                                        .split('.')
                                        .map((s) => s.trim())
                                        .map((sentence, index) => (
                                            <p className="mb-4" key={index}>
                                                {sentence}
                                            </p>
                                        ))}
                                </div>
                            </ScrollReveal>
                        </div>
                    </section>
                    <ServiceConsultation />
                    <ContactUs />
                </SectionLayout>
            </GuestLayout>
        </>
    );
};

export default ProjectDetail;
