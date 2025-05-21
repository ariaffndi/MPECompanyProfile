import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type ProjectForm = {
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
        title: 'Tambah Project',
        href: '/project',
    },
];

export default function ProjectCreate() {
    const { data, setData, post, processing, errors, reset } = useForm<ProjectForm>({
        project_name: '',
        client_id: 0,
        category_id: 0,
        location: '',
        year: new Date().getFullYear(),
        value: 0,
        description: '',
        project_image: null,
    });
    const { clients, categories } = usePage<{
        clients: Client[];
        categories: Category[];
    }>().props;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('project.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Layanan" />
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
                                    required
                                    value={data.project_name}
                                    onChange={(e) => setData('project_name', e.target.value)}
                                    placeholder='Nama Project'
                                />
                                <InputError message={errors.project_name} className="mt-2" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="client_id">Client</Label>
                                    <select
                                        id="client_id"
                                        value={data.client_id}
                                        required
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
                                        required
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
                                    <Input placeholder='lokasi' id="location" type="text" required value={data.location} onChange={(e) => setData('location', e.target.value)} />
                                    <InputError message={errors.location} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="year">Tahun Project</Label>
                                    <Input id="year" type="number" required value={data.year} onChange={(e) => setData('year', parseInt(e.target.value))} />
                                    <InputError message={errors.year} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="value">Nilai Project</Label>
                                    <Input id="value" type="number" required value={data.value} onChange={(e) => setData('value', parseInt(e.target.value))} />
                                    <InputError message={errors.value} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="Project Image">Foto Project</Label>
                                <input
                                    id="project_image"
                                    name="project_image"
                                    type="file"
                                    required
                                    accept="image/*"
                                    onChange={(e) => setData('project_image', e.target.files ? e.target.files[0] : null)}
                                    className="file-input file-input-ghost"
                                />
                                <InputError message={errors.project_image} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <textarea
                                    id="description"
                                    rows={5}
                                    required
                                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} />
                            </div>
                            <Button type="submit" className="mt-2 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Tambah Project
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
