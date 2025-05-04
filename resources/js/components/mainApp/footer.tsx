import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import AppLogoIcon from '../app-logo-icon';

const footer: React.FC = () => {
    const currentYear: number = new Date().getFullYear();

    return (
        <div>
            <footer className="footer sm:footer-horizontal justify-between bg-sky-900 p-10 text-white">
                <aside className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
                    <AppLogoIcon className="w-30 md:w-28 mb-0 md:mb-12 aspect-square bg-white p-2 rounded-lg shadow-md" />
                    <div className="text-sm leading-snug">
                        <p>Copyright © {new Date().getFullYear()} PT. Mitra Prima Enviro</p>
                        <p>Designed and Developed by | PT. Mitra Prima Enviro. | All rights reserved</p>
                    </div>
                </aside>

                <div className="flex flex-col gap-6 text-sm items-center  md:items-end">
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex gap-3">
                            <a className="link" href="#">
                                <Instagram />
                            </a>
                            <a className="link" href="#">
                                <Facebook />
                            </a>
                            <a className="link" href="#">
                                <Mail />
                            </a>
                        </div>
                        <nav className="flex flex-col text-center md:text-right">
                            <a className="link link-hover">ABOUT US</a>
                            <a className="link link-hover">SERVICES</a>
                            <a className="link link-hover">PORTOFOLIO</a>
                            <a className="link link-hover">CONTACT US</a>
                        </nav>
                    </div>

                    <div className="text-center md:text-right leading-snug">
                        <p className="flex items-center justify-center md:justify-end gap-2">
                            <Phone />
                            <a href="tel:0315924528" >
                                (031) 5924528
                            </a>
                        </p>
                        <p>
                            Jl. Kertajaya Indah Timur VI No.2, Manyar
                            <br />
                            Sabrangan, Kec. Mulyorejo, Kota SBY,
                            <br />
                            Jawa Timur 60116
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default footer;
