import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type ProjectForm = {
    id: number;
    project_name: string;
    client_id: number;
    category_id: number;
    location: string;
    year: number;
    value: number;
    description: string;
    project_image: File | null;
};

type Client = {
    id: number;
    client_type: string;
};

type Category = {
    id: number;
    category_name: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Project',
        href: '/project',
    },
];

export default function ProjectEdit({ project, page }: { project: ProjectForm; page: number }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        project_name: project.project_name || '',
        client_id: project.client_id || 0,
        category_id: project.category_id || 0,
        location: project.location || '',
        year: project.year || new Date().getFullYear(),
        value: project.value || 0,
        description: project.description || '',
        project_image: null as File | null,
    });

    const { clients, categories } = usePage<{
        clients: Client[];
        categories: Category[];
    }>().props;

    const [previewImage, setPreviewImage] = useState<string>(`/storage/${project.project_image}`);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const currentPage = page;
        console.log(currentPage);

        post(route('project.update', project.id), {
            method: 'put',
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                const redirectUrl = route('project.index', { page: currentPage });
                router.visit(redirectUrl, {
                    preserveState: true,
                    preserveScroll: true,
                });
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('project_image', file);

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
                                <Label htmlFor="project_name">Nama Project</Label>
                                <Input
                                    id="project_name"
                                    name="project_name"
                                    type="text"
                                    value={data.project_name}
                                    onChange={(e) => setData('project_name', e.target.value)}
                                />
                                <InputError message={errors.project_name} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="client_id">Client</Label>
                                    <select
                                        id="client_id"
                                        value={data.client_id}
                                        onChange={(e) => setData('client_id', parseInt(e.target.value))}
                                        className="rounded-md border border-gray-300 p-2"
                                    >
                                        <option value="">-- Pilih Client --</option>
                                        {clients.map((client: Client) => (
                                            <option key={client.id} value={client.id}>
                                                {client.client_type}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.client_id} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="category_id">Kategori</Label>
                                    <select
                                        id="category_id"
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', parseInt(e.target.value))}
                                        className="rounded-md border border-gray-300 p-2"
                                    >
                                        <option value="">-- Pilih Kategori --</option>
                                        {categories.map((category: Category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.category_name}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.category_id} />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="location">Lokasi</Label>
                                    <Input id="location" type="text" value={data.location} onChange={(e) => setData('location', e.target.value)} />
                                    <InputError message={errors.location} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="year">Tahun Project</Label>
                                    <Input id="year" type="number" value={data.year} onChange={(e) => setData('year', parseInt(e.target.value))} />
                                    <InputError message={errors.year} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="value">Nilai Project</Label>
                                    <Input id="value" type="number" value={data.value} onChange={(e) => setData('value', parseInt(e.target.value))} />
                                    <InputError message={errors.value} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="Project Image">Foto Project</Label>
                                <input
                                    id="project_image"
                                    name="project_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="file-input file-input-ghost"
                                />
                                <InputError message={errors.project_image} />
                                {selectedFileName && <p className="text-sm text-gray-500">File dipilih: {selectedFileName}</p>}
                                {previewImage && <img src={previewImage} alt="Preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />}
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

                            <Button type="submit" className="mt-2 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Edit Project
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
