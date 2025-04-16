import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ServiceForm = {
    service_name: string;
    service_description: string;
    service_image: File | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tambah Layanan',
        href: '/service',
    },
];

export default function ServiceCreate() {
    const { data, setData, post, processing, errors, reset } = useForm<ServiceForm>({
        service_name: '',
        service_description:'',
        service_image:null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('service.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Layanan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Link href={route('service.index')} className="btn btn-sm btn-info w-fit rounded-xl">
                    Kembali
                </Link>

                <div className="rounded-box border-base-content/5 overflow-x-auto">
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="product name">Nama Layanan</Label>
                                <Input
                                    id="service_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    value={data.service_name}
                                    onChange={(e) => setData('service_name', e.target.value)}
                                    disabled={processing}
                                    placeholder="nama layanan"
                                />
                                <InputError message={errors.service_name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="product description">Deskripsi Layanan</Label>
                                <textarea
                                    id="service_description"
                                    rows={5}
                                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.service_description}
                                    onChange={(e) => setData('service_description', e.target.value)}
                                    placeholder="deskripsi produk"
                                />
                                <InputError message={errors.service_description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="service image">Foto Layanan</Label>
                                <input
                                    id="service_image"
                                    name="service_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('service_image', e.target.files ? e.target.files[0] : null)}
                                    className="file-input file-input-ghost"
                                />
                                <InputError message={errors.service_image} />
                            </div>
                            <Button type="submit" className="mt-2 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Tambah Layanan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
