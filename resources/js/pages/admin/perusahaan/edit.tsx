import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Breadcrumbs untuk navigasi
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Data Perusahaan',
        href: '/perusahaan',
    },
];

interface Props {
    perusahaan: {
        id: number;
        nama_perusahaan: string;
        alamat_perusahaan: string;
        email_perusahaan: string;
        no_telp_perusahaan: string;
        whatsapp_perusahaan: string;
        deskripsi_perusahaan: string;
        instagram_perusahaan: string;
        facebook_perusahaan: string;
    };
}

export default function EditPerusahaan({ perusahaan }: Props) {
    const { data, setData, put, processing, errors } = useForm({ ...perusahaan });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('perusahaan.update', perusahaan.id), {});
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Perusahaan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Link href={route('perusahaan.index')} className="btn btn-sm btn-info w-fit rounded-xl">
                    Kembali
                </Link>

                <div className="rounded-box border-base-content/5 overflow-x-auto">
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="nama_perusahaan">Nama Perusahaan</Label>
                                    <Input
                                        id="nama_perusahaan"
                                        type="text"
                                        required
                                        value={data.nama_perusahaan}
                                        onChange={(e) => setData('nama_perusahaan', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.nama_perusahaan} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="alamat_perusahaan">Alamat</Label>
                                    <Input
                                        id="alamat_perusahaan"
                                        type="text"
                                        required
                                        value={data.alamat_perusahaan}
                                        onChange={(e) => setData('alamat_perusahaan', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.alamat_perusahaan} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email_perusahaan">Email_perusahaan</Label>
                                    <Input
                                        id="email_perusahaan"
                                        type="Email"
                                        required
                                        value={data.email_perusahaan}
                                        onChange={(e) => setData('email_perusahaan', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.email_perusahaan} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="no_telp_perusahaan">No Telepon</Label>
                                    <Input
                                        id="no_telp_perusahaan"
                                        type="text"
                                        required
                                        value={data.no_telp_perusahaan}
                                        onChange={(e) => setData('no_telp_perusahaan', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.no_telp_perusahaan} />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="whatsapp_perusahaan">No Whatsapp</Label>
                                    <Input
                                        id="whatsapp_perusahaan"
                                        type="text"
                                        required
                                        value={data.whatsapp_perusahaan}
                                        onChange={(e) => setData('whatsapp_perusahaan', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.whatsapp_perusahaan} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="instagram_perusahaan">Instagram</Label>
                                    <Input
                                        id="instagram_perusahaan"
                                        type="text"
                                        required
                                        value={data.instagram_perusahaan}
                                        onChange={(e) => setData('instagram_perusahaan', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.instagram_perusahaan} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="facebook_perusahaan">Facebook</Label>
                                    <Input
                                        id="facebook_perusahaan"
                                        type="text"
                                        required
                                        value={data.facebook_perusahaan}
                                        onChange={(e) => setData('facebook_perusahaan', e.target.value)}
                                        disabled={processing}
                                    />
                                    <InputError message={errors.facebook_perusahaan} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="foto_kantor_perusahaan">Foto Kantor</Label>
                                <InputError message={errors.foto_kantor_perusahaan} />
                                <input id="foto_kantor_perusahaan" type="file" className="file-input file-input-ghost" accept="image/*" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="deskripsi_perusahaan">Deskripsi</Label>
                                <textarea
                                    id="deskripsi_perusahaan"
                                    required
                                    rows={5}
                                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.deskripsi_perusahaan}
                                    onChange={(e) => setData('deskripsi_perusahaan', e.target.value)}
                                    disabled={processing}
                                />
                                <InputError message={errors.deskripsi_perusahaan} />
                            </div>

                            <Button type="submit" className="mt-2 w-full" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Simpan Perubahan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
