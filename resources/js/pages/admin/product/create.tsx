import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type ProductForm = {
    product_name: string;
    product_description: string;
    product_image: File | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tambah Produk',
        href: '/product',
    },
];

export default function ProductCreate() {
    const { data, setData, post, processing, errors, reset } = useForm<ProductForm>({
        product_name: '',
        product_description: '',
        product_image: null,
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
                                    id="product_name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    value={data.product_name}
                                    onChange={(e) => setData('product_name', e.target.value)}
                                    disabled={processing}
                                    placeholder="nama produk"
                                />
                                <InputError message={errors.product_name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="product description">Deskripsi Produuk</Label>
                                <textarea
                                    id="product_description"
                                    rows={5}
                                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.product_description}
                                    required
                                    onChange={(e) => setData('product_description', e.target.value)}
                                    placeholder="deskripsi produk"
                                />
                                <InputError message={errors.product_description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="product image">Foto Produk</Label>
                                <input
                                    id="product_image"
                                    name="product_image"
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={(e) => setData('product_image', e.target.files ? e.target.files[0] : null)}
                                    className="file-input file-input-ghost"
                                />
                                <InputError message={errors.product_image} />
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
