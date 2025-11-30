import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

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

export default function ServiceEdit({ service, page }: { service: ServiceForm; page: number }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        service_name: service.service_name || '',
        service_description: service.service_description || '',
        service_image: null as File | null,
    });

    const [previewImage, setPreviewImage] = useState<string>(`/storage/${service.service_image}`);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const currentPage = page;
        console.log(currentPage);

        post(route('service.update', service.id), {
            method: 'put',
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                const redirectUrl = route('service.index', { page: currentPage });
                router.visit(redirectUrl, {
                    preserveState: true,
                    preserveScroll: true,
                });
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('service_image', file);

        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setSelectedFileName(file.name);
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Layanan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
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
                                <Label htmlFor="service_image">Foto Layanan</Label>
                                <input
                                    id="service_image"
                                    name="service_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="file-input file-input-ghost"
                                />
                                <p className="text-xs font-light text-red-600">*Max 2MB</p>
                                <InputError message={errors.service_image} />
                                {selectedFileName && <p className="text-sm text-gray-500">File dipilih: {selectedFileName}</p>}
                                {previewImage && <img src={previewImage} alt="Preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />}
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
