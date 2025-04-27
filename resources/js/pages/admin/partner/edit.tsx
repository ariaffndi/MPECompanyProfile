import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type PartnerForm = {
    id: number;
    company_name: string;
    logo: File | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Partner',
        href: '/partner',
    },
];

export default function PartnerEdit({ partner, page }: { partner: PartnerForm; page: number }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        company_name: partner.company_name || '',
        logo: null as File | null,
    });

    const [previewImage, setPreviewImage] = useState<string>(`/storage/${partner.logo}`);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const currentPage = page;
        console.log(currentPage);

        post(route('partner.update', partner.id), {
            method: 'put',
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                const redirectUrl = route('partner.index', { page: currentPage });
                router.visit(redirectUrl, {
                    preserveState: true,
                    preserveScroll: true,
                });
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('logo', file);

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
                                <Label htmlFor="serrvice name">Nama Partner</Label>
                                <Input
                                    id="company_name"
                                    name="company_name"
                                    type="text"
                                    value={data.company_name}
                                    onChange={(e) => setData('company_name', e.target.value)}
                                />
                                <InputError message={errors.company_name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="logo">Logo Partner</Label>
                                <input
                                    id="logo"
                                    name="logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="file-input file-input-ghost"
                                />
                                <InputError message={errors.logo} />
                                {selectedFileName && <p className="text-sm text-gray-500">File dipilih: {selectedFileName}</p>}
                                {previewImage && <img src={previewImage} alt="Preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />}
                            </div>

                            <Button type="submit" className="mt-2 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Edit Partner
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
