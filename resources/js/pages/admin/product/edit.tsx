import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type ProductForm = {
    id: number;
    nama_product: string;
    deskripsi_product: string;
    foto_product: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Produk',
        href: '/product',
    },
];

export default function ProductEdit({ product,page }: { product: ProductForm,page:number }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama_product: product.nama_product || '',
        deskripsi_product: product.deskripsi_product || '',
        foto_product: null as File | null,
    });

    const [previewImage, setPreviewImage] = useState<string>(`/storage/${product.foto_product}`);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const currentPage = page;
        console.log(currentPage);

        post(route('product.update', product.id), {
            method: 'put',
            preserveScroll: true,
            preserveState: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                const redirectUrl = route('product.index', { page: currentPage });
                router.visit(redirectUrl, {
                    preserveState: true,
                    preserveScroll: true,
                });
            }
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('foto_product', file);

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
                                <Label htmlFor="nama_product">Nama Produk</Label>
                                <Input
                                    id="nama_product"
                                    name="nama_product"
                                    type="text"
                                    value={data.nama_product}
                                    onChange={(e) => setData('nama_product', e.target.value)}
                                />
                                <InputError message={errors.nama_product} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="deskripsi_product">Deskripsi Produk</Label>
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
                                <Label htmlFor="foto_product">Foto Produk</Label>
                                <input
                                    id="foto_product"
                                    name="foto_product"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="file-input file-input-ghost"
                                />
                                <InputError message={errors.foto_product} />
                                {selectedFileName && (
                                    <p className="text-sm text-gray-500">File dipilih: {selectedFileName}</p>
                                )}
                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="mt-2 h-24 w-24 rounded-lg object-cover"
                                    />
                                )}
                            </div>

                            <Button type="submit" className="mt-2 w-full" tabIndex={4} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Edit Produk
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
