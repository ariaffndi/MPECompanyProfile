import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type TeamForm = {
    name: string;
    position: string;
    image: File | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tambah Team',
        href: '/team',
    },
];

export default function TeamCreate() {
    const { data, setData, post, processing, errors, reset } = useForm<TeamForm>({
        name: '',
        position: '',
        image: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('team.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add User" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="rounded-box border-base-content/5 overflow-x-auto">
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="product name">Nama Team</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    disabled={processing}
                                    placeholder="nama team"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="product name">Posisi</Label>
                                <Input
                                    id="position"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={2}
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value)}
                                    disabled={processing}
                                    placeholder="posisi"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="product image">Foto Produk</Label>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                    className="file-input file-input-ghost"
                                />
                                <InputError message={errors.image} />
                            </div>
                            <Button type="submit" className="mt-2 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Tambah Produk
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
