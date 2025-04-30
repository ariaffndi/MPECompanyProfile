import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type ProductForm = {
    id: number;
    product_name: string;
    product_description: string;
    product_image: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Produk',
        href: '/product',
    },
];

export default function ProductEdit({ product, page }: { product: ProductForm; page: number }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        product_name: product.product_name || '',
        product_description: product.product_description || '',
        product_image: null as File | null,
    });

    const [previewImage, setPreviewImage] = useState<string>(`/storage/${product.product_image}`);
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
            },
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('product_image', file);

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
                                <Label htmlFor="product_name">Nama Produk</Label>
                                <Input
                                    id="product_name"
                                    name="product_name"
                                    type="text"
                                    value={data.product_name}
                                    onChange={(e) => setData('product_name', e.target.value)}
                                />
                                <InputError message={errors.product_name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="product_description">Deskripsi Produk</Label>
                                <textarea
                                    id="product_description"
                                    rows={5}
                                    className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                                    value={data.product_description}
                                    onChange={(e) => setData('product_description', e.target.value)}
                                    placeholder="deskripsi produk"
                                />
                                <InputError message={errors.product_description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="product_image">Foto Produk</Label>
                                <input
                                    id="product_image"
                                    name="product_image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="file-input file-input-ghost"
                                />
                                <InputError message={errors.product_image} />
                                {selectedFileName && <p className="text-sm text-gray-500">File dipilih: {selectedFileName}</p>}
                                {previewImage && <img src={previewImage} alt="Preview" className="mt-2 h-24 w-24 rounded-lg object-cover" />}
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
