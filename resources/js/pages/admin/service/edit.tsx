import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm,router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ServiceForm = {
    id: number;
    service_name: string;
    service_description: string;
    service_image: File | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Layanan',
        href: '/service',
    },
];

export default function ServiceEdit({ service }: { service: ServiceForm }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        service_name: service.service_name || '',
        service_description: service.service_description || '',
        service_image: null as File | null,
    });

    const param = new URLSearchParams(window.location.search).get('page') ;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('service.update', service.id), {
            method: 'put',
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                router.visit(route('service.index', { page: param }), {
                    preserveState: true,
                    preserveScroll: true,
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Layanan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Link href={route('service.index')} className="btn btn-sm btn-info w-fit rounded-xl">
                    Kembali
                </Link>

                <div className="rounded-box border-base-content/5 overflow-x-auto">
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="serrvice name">Nama Layanan</Label>
                                <Input
                                    id="service_name"
                                    name="service_name"
                                    type="text"
                                    value={data.service_name}
                                    onChange={(e) => setData('service_name', e.target.value)}
                                />
                                <InputError message={errors.service_name} className="mt-2" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="service description">Deskripsi Layanan</Label>
                                <textarea
                                    id="service_description"
                                    rows={5}
                                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.service_description}
                                    onChange={(e) => setData('service_description', e.target.value)}
                                    placeholder="deskripsi layanan"
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
                            </div>
                            <Button type="submit" className="mt-2 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Edit Layanan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
