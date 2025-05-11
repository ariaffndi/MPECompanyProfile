import Company from '@/pages/admin/company';
import { faFacebook, faFacebookF, faFacebookMessenger, faFacebookSquare, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePage } from '@inertiajs/react';
import { Mail, Phone } from 'lucide-react';

import AppLogoIcon from '../app-logo-icon';
import ScrollReveal from './scroll-reveal';
//data dari company service provider
type Company = {
    name: string;
    address: string;
    email: string;
    phone: string;
    whatsapp: string;
    instagram: string;
    facebook: string;
};

const Footer = () => {
    const { company } = usePage<{ company: Company }>().props;
    const currentYear: number = new Date().getFullYear();

    return (
        <footer className="bg-sky-800 px-6 py-10 text-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-2">
                <ScrollReveal direction="right">
                    <aside className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
                        <AppLogoIcon className="mb-12 w-40 rounded-lg bg-white p-2 shadow-md md:w-28" />
                        <div className="text-sm leading-snug">
                            <p>
                                Copyright © {currentYear} {company.name}.
                            </p>
                            <p>
                                Designed and Developed by | {company.name}.<br />
                                All rights reserved.
                            </p>
                        </div>
                    </aside>
                </ScrollReveal>

                <div className="flex flex-col items-center gap-6 text-center md:items-end md:text-right">
                    <ScrollReveal direction="left">
                        <div className="flex flex-col items-center gap-2 md:items-end">
                            <div className="flex gap-4">
                                <a href={company.instagram} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} className="text-2xl hover:invert" />
                                </a>
                                <a href={company.facebook} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faFacebookSquare} className="text-2xl hover:invert" />
                                </a>
                                <a href={`mailto:${company.email}`} target="_blank" rel="noopener noreferrer">
                                    <Mail className="text-2xl hover:invert" />
                                </a>
                                <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faWhatsapp} className="text-2xl hover:invert" />
                                </a>
                            </div>
                            <nav className="flex flex-col gap-1 text-sm">
                                <a className="link link-hover">ABOUT US</a>
                                <a className="link link-hover">SERVICES</a>
                                <a className="link link-hover">PORTOFOLIO</a>
                                <a className="link link-hover">CONTACT US</a>
                            </nav>
                        </div>
                        <div className="text-sm leading-snug">
                            <p className="flex items-center justify-center gap-2 py-2 md:justify-end">
                                <Phone size={16} />
                                <a href={`tel:${company.phone}`}>{company.phone}</a>
                            </p>
                            <p>
                                {company.address?.split(',').map((line, index) => (
                                    <span key={index}>
                                        {line}
                                        <br />
                                    </span>
                                ))}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
