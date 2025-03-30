import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Facebook, Instagram, Mail, MessageCircle, Phone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Perusahaan',
        href: '/perusahaan',
    },
];

interface Perusahaan {
    id: number;
    nama_perusahaan: string;
    alamat_perusahaan: string;
    email_perusahaan: string;
    no_telp_perusahaan: string;
    whatsapp_perusahaan: string;
    deskripsi_perusahaan: string;
    instagram_perusahaan: string;
    facebook_perusahaan: string;
    foto_kantor_perusahaan: string;
}

interface Props {
    perusahaan: Perusahaan;
}

export default function Perusahaan({ perusahaan }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Perusahaan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Link href={route('perusahaan.edit', perusahaan.id)} className="btn btn-sm btn-info w-fit rounded-xl">
                    Edit Data
                </Link>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex aspect-video flex-col overflow-hidden rounded-xl border">
                        <div className="flex w-full flex-1 items-center p-4">
                            <p className="text-3xl font-bold">{perusahaan.nama_perusahaan}</p>
                        </div>
                        <div className="flex w-full flex-1 p-4">
                            <p>{perusahaan.alamat_perusahaan}</p>
                        </div>
                    </div>

                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex aspect-video flex-col justify-between overflow-hidden rounded-xl">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                            <div className="flex w-full flex-1 items-center gap-2">
                                <div>
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-md">{perusahaan.email_perusahaan}</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                            <div className="flex w-full flex-1 items-center gap-2">
                                <div>
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-md">{perusahaan.no_telp_perusahaan}</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                            <div className="flex w-full flex-1 items-center gap-2">
                                <div>
                                    <MessageCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-md">{perusahaan.whatsapp_perusahaan}</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                            <div className="flex w-full flex-1 items-center gap-2">
                                <div>
                                    <Instagram size={20} />
                                </div>
                                <div>
                                    <p className="text-md">{perusahaan.instagram_perusahaan}</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                            <div className="flex w-full flex-1 items-center gap-2">
                                <div>
                                    <Facebook size={20} />
                                </div>
                                <div>
                                    <p className="text-md">{perusahaan.facebook_perusahaan}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <img
                            src={`/storage/${perusahaan.foto_kantor_perusahaan}`}
                            alt={perusahaan.nama_perusahaan}
                            className="w-full rounded-lg object-cover"
                        />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
                    <p>
                        {perusahaan.deskripsi_perusahaan}
                        <br />
                        <br />
                    </p>
                </div>
            </div>
        </AppLayout>
    );
}
