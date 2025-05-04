import Company from '@/pages/admin/company';
import { faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePage } from '@inertiajs/react';
import { Facebook, Mail, Phone } from 'lucide-react';

import AppLogoIcon from '../app-logo-icon';

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
        <footer className="flex flex-col items-center gap-10 bg-sky-900 p-10 text-center text-white sm:flex-row sm:items-start sm:justify-between sm:text-left">
            {/* Logo dan Copyright */}
            <aside className="flex flex-col items-center gap-4 sm:items-start">
                <AppLogoIcon className="aspect-square w-24 rounded-lg bg-white p-2 shadow-md sm:w-28" />
                <div className="text-sm leading-snug">
                    <p>
                        Copyright © {currentYear} {company.name}.
                    </p>
                    <p>Designed and Developed by | {company.name}. | All rights reserved</p>
                </div>
            </aside>

            {/* Sosial Media dan Navigasi */}
            <div className="flex flex-col items-center gap-6 sm:items-end">
                {/* Icon Sosmed */}
                <div className="flex gap-4">
                    <a className="link" href={company.instagram} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                    </a>
                    <a className="link" href={company.facebook} target="_blank" rel="noopener noreferrer">
                        <Facebook />
                    </a>
                    <a className="link" href={`mailto:${company.email}`} target="_blank" rel="noopener noreferrer">
                        <Mail />
                    </a>
                    <a className="link" href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} className="text-2xl" />
                    </a>
                </div>

                {/* Navigasi Link */}
                <nav className="flex flex-col gap-1 text-sm">
                    <a className="link link-hover">ABOUT US</a>
                    <a className="link link-hover">SERVICES</a>
                    <a className="link link-hover">PORTOFOLIO</a>
                    <a className="link link-hover">CONTACT US</a>
                </nav>

                {/* Kontak dan Alamat */}
                <div className="text-sm leading-snug">
                    <p className="flex items-center justify-center gap-2 sm:justify-end">
                        <Phone />
                        <a href={`tel:${company.phone}`}>{company.phone}</a>
                    </p>
                    <p>
                        {company.address &&
                            company.address.split(',').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
