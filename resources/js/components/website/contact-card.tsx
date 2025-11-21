type ContactCardProps = {
    href: string;
    icon: React.ReactNode;
    label: string;
    value: string;
};

const ContactCard = ({ href, icon, label, value }: ContactCardProps) => {
    return (
        <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="block"
        >
            <div className="rounded-xl p-4 text-center transition-transform duration-300 hover:scale-105">
                <div className="mx-auto mb-3 w-fit rounded-full bg-sky-200 p-4">{icon}</div>

                <p className="text-base font-medium text-gray-600 md:text-lg dark:text-gray-300">{label}</p>

                <p className="text-lg font-bold break-all text-gray-900 md:text-xl dark:text-white">{value}</p>
            </div>
        </a>
    );
};

export default ContactCard;
