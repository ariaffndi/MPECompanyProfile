import ScrollReveal from '@/components/website/scroll-reveal';
import { usePage } from '@inertiajs/react';
import { Mail, Phone, Send } from 'lucide-react';
import ContactCard from '../../contact-card';

type Company = {
    email: string;
    phone: string;
    whatsapp: string;
};

const ContactContacts = () => {
    const { company } = usePage<{ company: Company }>().props;
    return (
        <section id="contactContacts" className="my-20">
            <ScrollReveal direction="up">
                <div className="mb-5">
                    <h2 className="text-center text-3xl font-light">WE ALWAYS MAKE</h2>
                    <h2 className="text-center text-3xl font-bold">THE BEST</h2>
                </div>

                <div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <ContactCard icon={<Phone size={40} />} label="Front Office" value={company.phone} />
                    <ContactCard icon={<Mail size={40} />} label="Email" value={company.email} />
                    <ContactCard icon={<Send size={40} />} label="WhatsApp" value={company.whatsapp} />
                </div>
            </ScrollReveal>
        </section>
    );
};

export default ContactContacts;
