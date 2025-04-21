import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type PartnerForm = {
    company_name: string;
    logo: File | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tambah Partner',
        href: '/partner',
    },
];

export default function PartnerCreate() {
    const { data, setData, post, processing, errors, reset } = useForm<PartnerForm>({
        company_name: '',
        logo:null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('partner.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Partner" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="rounded-box border-base-content/5 overflow-x-auto">
                    <form className="flex flex-col gap-6" onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="product name">Nama Partner</Label>
                                <Input
                                    id="company_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    value={data.company_name}
                                    onChange={(e) => setData('company_name', e.target.value)}
                                    disabled={processing}
                                    placeholder="nama partner"
                                />
                                <InputError message={errors.company_name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="service image">Logo Partner</Label>
                                <input
                                    id="logo"
                                    name="logo"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('logo', e.target.files ? e.target.files[0] : null)}
                                    className="file-input file-input-ghost"
                                />
                                <InputError message={errors.logo} />
                            </div>
                            <Button type="submit" className="mt-2 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Tambah Partner
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
