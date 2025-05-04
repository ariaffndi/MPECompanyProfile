import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Data Company',
        href: '/company',
    },
];

type FormCompany = {
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
};

export default function EditCompany({ company }: { company: FormCompany }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: company.name,
        address: company.address,
        email: company.email,
        phone: company.phone,
        whatsapp: company.whatsapp,
        description: company.description,
        instagram: company.instagram,
        facebook: company.facebook,
        office_image: null as File | null,
        logo: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('company.update', company.id), {
            method: 'put',
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Company" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="rounded-box border-base-content/5 overflow-x-auto">
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="kantor Image">Logo Company</Label>
                                <input
                                    id="logo"
                                    name="logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('logo', e.target.files ? e.target.files[0] : null)}
                                    className="file-input file-input-ghost"
                                />
                                <p className="text-xs font-light text-red-600">*Gunakan gambar dengan rasio 1:1</p>
                                <InputError message={errors.logo} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nama Company</Label>
                                    <Input id="name" name="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="address">Alamat</Label>
                                    <Input id="address" type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                                    <InputError message={errors.address} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email Company</Label>
                                    <Input id="email" type="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone">No Telepon</Label>
                                    <Input id="phone" type="text" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                    <InputError message={errors.phone} />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="whatsapp">No Whatsapp</Label>
                                    <Input id="whatsapp" type="text" value={data.whatsapp} onChange={(e) => {
                                        let value = e.target.value;
                                        if (!value.startsWith('62')) {
                                            value = '62' + value;
                                        }
                                        setData('whatsapp',value);
                                    }} />
                                    <InputError message={errors.whatsapp} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="instagram">Instagram *url</Label>
                                    <Input id="instagram" type="text" value={data.instagram} onChange={(e) => setData('instagram', e.target.value)} />
                                    <InputError message={errors.instagram} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="facebook">Facebook *url</Label>
                                    <Input id="facebook" type="text" value={data.facebook} onChange={(e) => setData('facebook', e.target.value)} />
                                    <InputError message={errors.facebook} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="kantor Image">Foto Kantor</Label>
                                <input
                                    id="office_image"
                                    name="office_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('office_image', e.target.files ? e.target.files[0] : null)}
                                    className="file-input file-input-ghost"
                                />
                                <p className="text-xs font-light text-red-600">*Gunakan gambar dengan rasio 2:3</p>
                                <InputError message={errors.office_image} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <textarea
                                    id="description"
                                    rows={5}
                                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <Button type="submit" className="mt-2 w-full">
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
