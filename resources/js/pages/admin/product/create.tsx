import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ProductForm = {
    nama_product: string;
    deskripsi_product: string;
    foto_product: File | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tambah Produk',
        href: '/product',
    },
];

export default function ProductCreate() {
    const { data, setData, post, processing, errors, reset } = useForm<ProductForm>({
        nama_product: '',
        deskripsi_product:'',
        foto_product:null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('product.store'), {
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
                                <Label htmlFor="product name">Nama Produk</Label>
                                <Input
                                    id="nama_product"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    value={data.nama_product}
                                    onChange={(e) => setData('nama_product', e.target.value)}
                                    disabled={processing}
                                    placeholder="nama produk"
                                />
                                <InputError message={errors.nama_product} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="product description">Deskripsi Produuk</Label>
                                <textarea
                                    id="deskripsi_product"
                                    rows={5}
                                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.deskripsi_product}
                                    onChange={(e) => setData('deskripsi_product', e.target.value)}
                                    placeholder="deskripsi produk"
                                />
                                <InputError message={errors.deskripsi_product} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="product image">Foto Produk</Label>
                                <input
                                    id="foto_product"
                                    name="foto_product"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('foto_product', e.target.files ? e.target.files[0] : null)}
                                    className="file-input file-input-ghost"
                                />
                                <InputError message={errors.foto_product} />
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
