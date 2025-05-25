import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type TeamForm = {
    id: number;
    name: string;
    position: string;
    image: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Team',
        href: '/team',
    },
];

export default function TeamEdit({ team, page }: { team: TeamForm; page: number }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: team.name || '',
        position: team.position || '',
        image: null as File | null,
    });

    const [previewImage, setPreviewImage] = useState<string>(`/storage/${team.image}`);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const currentPage = page;
        console.log(currentPage);

        post(route('team.update', team.id), {
            method: 'put',
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                const redirectUrl = route('team.index', { page: currentPage });
                router.visit(redirectUrl, {
                    preserveState: true,
                    preserveScroll: true,
                });
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);

        if (file) {
            setPreviewImage(URL.createObjectURL(file));
            setSelectedFileName(file.name);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Produk" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="rounded-box border-base-content/5 overflow-x-auto">
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nama</Label>
                                <Input id="name " name="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="position">Jabatan</Label>
                                <Input
                                    id="position"
                                    name="position"
                                    type="text"
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value)}
                                />
                                <InputError message={errors.position} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image">Foto Team</Label>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="file-input file-input-ghost"
                                />
                                <InputError message={errors.image} />
                                {selectedFileName && <p className="text-sm text-gray-500">File dipilih: {selectedFileName}</p>}
                                {previewImage && <img src={previewImage} alt="Preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />}
                            </div>

                            <Button type="submit" className="mt-2 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Edit Team
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
