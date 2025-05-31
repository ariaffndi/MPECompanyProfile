import { ReactNode } from 'react';

type ContactCardProps = {
    icon: ReactNode;
    label: string;
    value: string;
};

const ContactCard = ({ icon, label, value }: ContactCardProps) => {
    return (
        <div className="p-2 text-center md:p-3 lg:p-4 hover:scale-105 ease-in transition duration-300">
            <div className="mx-auto mb-2 w-fit rounded-full bg-sky-200 p-4">{icon}</div>
            <p className="text-md lg:text-lg">{label}</p>
            <p className="text-md font-bold lg:text-lg">{value}</p>
        </div>
    );
};

export default ContactCard;
