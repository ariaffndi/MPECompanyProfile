import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type GalerryForm = {
    activity_name: string;
    activity_image: File | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tambah Kegiatan',
        href: '/gallery',
    },
];

export default function TeamCreate() {
    const { data, setData, post, processing, errors, reset } = useForm<GalerryForm>({
        activity_name: '',
        activity_image: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('gallery.store'), {
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
                                <Label htmlFor="product activity_name">Nama Kegiatan</Label>
                                <Input
                                    id="activity_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    value={data.activity_name}
                                    onChange={(e) => setData('activity_name', e.target.value)}
                                    disabled={processing}
                                    placeholder="nama kegiatan"
                                />
                                <InputError message={errors.activity_name} className="mt-2" />
                            </div>
                            <div className="grid gap-2">
                                <InputError message={errors.activity_name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="product activity_image">Foto Kegiatan</Label>
                                <input
                                    id="activity_image"
                                    name="activity_image"
                                    type="file"
                                    accept="activity_image/*"
                                    onChange={(e) => setData('activity_image', e.target.files ? e.target.files[0] : null)}
                                    className="file-input file-input-ghost"
                                />
                                <InputError message={errors.activity_image} />
                            </div>
                            <Button type="submit" className="mt-2 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Tambah Foto
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
