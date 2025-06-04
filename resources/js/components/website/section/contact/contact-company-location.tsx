import ScrollReveal from '@/components/website/scroll-reveal';
import { usePage } from '@inertiajs/react';
import MapEmbed from '../../map-embed';

type Company = {
    name: string;
    address: string;
    office_image: string;
};

const ContactCompanyLocation = () => {
    const { company } = usePage<{ company: Company }>().props;
    return (
        <section className="my-10 flex flex-col">
            <div id="contactCompanyLocation" className="my-10 flex w-full flex-col items-start gap-5 md:flex-row">
                <div className="place-self-center md:w-1/2 md:place-self-start lg:pl-5">
                    <div className="flex h-full justify-start text-center md:text-start">
                        <ScrollReveal direction="right">
                            <h2 className="text-3xl font-light">WHERE TO</h2>
                            <h2 className="text-3xl font-bold">FIND US?</h2>
                        </ScrollReveal>
                    </div>
                </div>
                <div className="justify-end gap-5 md:w-1/2">
                    <ScrollReveal direction="left">
                        <h3 className="mb-4 text-xl font-bold lg:mb-8">{company.name}</h3>
                        <p className="text-md md:w-1/2">{company.address}</p>
                    </ScrollReveal>
                </div>
            </div>
            <ScrollReveal direction="up">
                <div className="my-10 w-full">
                    <img
                        loading="lazy"
                        src={`/storage/${company.office_image}`}
                        alt="Mitra Prima Enviro"
                        className="aspect-video w-full object-cover"
                    />
                </div>
                <MapEmbed src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.9654389570696!2d112.7794910748518!3d-7.2815408927257215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fa3ec22cd90f%3A0x260ff601d35b3c0b!2sPT.%20Mitra%20Prima%20Enviro!5e1!3m2!1sen!2sid!4v1748679494292!5m2!1sen!2sid" />
            </ScrollReveal>
        </section>
    );
};

export default ContactCompanyLocation;
