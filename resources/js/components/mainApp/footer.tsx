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

const footer = () => {
    const { company } = usePage<{ company: Company }>().props;
    const currentYear: number = new Date().getFullYear();

    return (
        <div>
            <footer className="footer sm:footer-horizontal justify-between bg-sky-900 p-10 text-white">
                <aside className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
                    <AppLogoIcon className="mb-0 aspect-square w-30 rounded-lg bg-white p-2 shadow-md md:mb-12 md:w-28" />
                    <div className="text-sm leading-snug">
                        <p>
                            Copyright © {currentYear} {company.name} .
                        </p>
                        <p>Designed and Developed by | {company.name} . | All rights reserved</p>
                    </div>
                </aside>

                <div className="flex flex-col items-center gap-6 text-sm md:items-end">
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex gap-3">
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
                                <FontAwesomeIcon icon={faWhatsapp} className='text-2xl'/>
                            </a>
                        </div>
                        <nav className="flex flex-col text-center md:text-right">
                            <a className="link link-hover">ABOUT US</a>
                            <a className="link link-hover">SERVICES</a>
                            <a className="link link-hover">PORTOFOLIO</a>
                            <a className="link link-hover">CONTACT US</a>
                        </nav>
                    </div>

                    <div className="text-center leading-snug md:text-right">
                        <p className="flex items-center justify-center gap-2 md:justify-end">
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
        </div>
    );
};

export default footer;
