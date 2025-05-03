import { useFlashToast } from '@/hooks/useFlashToast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Facebook, Instagram, Mail, MessageCircle, Pencil, Phone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Perusahaan',
        href: '/company',
    },
];

interface Company {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    whatsapp: string;
    description: string;
    instagram: string;
    facebook: string;
    office_image: string;
    logo: string;
}

interface Props {
    company: Company;
}

const getUsernameFromUrl = (url: string) => {
    if (!url) return '-';
    const last = url.split('/').filter(Boolean).pop();
    return last?.startsWith('@') ? last.slice(1) : (last ?? '-');
};

export default function Company({ company }: Props) {
    useFlashToast();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Company" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Link href={route('company.edit', company.id)} className="btn btn-sm btn-warning w-fit rounded-xl">
                    <Pencil size={16} /> Edit Data
                </Link>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex aspect-video flex-col overflow-hidden rounded-xl border">
                        <div className="flex w-full flex-1 items-center p-4">
                            <p className="text-3xl font-bold">{company.name}</p>
                        </div>
                        <div className="flex w-full flex-1 p-4">
                            <p>{company.address}</p>
                        </div>
                    </div>

                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex aspect-video flex-col justify-between overflow-hidden rounded-xl">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                            <div className="flex w-full flex-1 items-center gap-2">
                                <div>
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-sm">{company.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                            <div className="flex w-full flex-1 items-center gap-2">
                                <div>
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-sm">{company.phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                            <div className="flex w-full flex-1 items-center gap-2">
                                <div>
                                    <MessageCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-sm">{company.whatsapp}</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                            <div className="flex w-full flex-1 items-center gap-2">
                                <div>
                                    <Instagram size={20} />
                                </div>
                                <div>
                                    <p className="text-sm">{getUsernameFromUrl(company.instagram)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                            <div className="flex w-full flex-1 items-center gap-2">
                                <div>
                                    <Facebook size={20} />
                                </div>
                                <div>
                                    <p className="text-sm">{getUsernameFromUrl(company.facebook)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <img src={`/storage/${company.office_image}`} alt={company.name} className="w-full rounded-lg object-cover" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
                    <p className="text-sm">
                        {company.description}
                        <br />
                        <br />
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
