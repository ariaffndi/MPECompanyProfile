import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/product',
    },
];

type Product = {
    id: number;
    nama_product: string;
    deskripsi_product: string;
    foto_product: string;
};

export default function Product() {
    const { product } = usePage<{ product: Product[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Link href={route('product.create')} className="btn btn-sm btn-info w-fit rounded-xl">
                    Tambah Produk
                </Link>

                <div className="rounded-box border-base-content/5 overflow-x-auto border">
                    <table className="table text-center">
                        {/* head */}
                        <thead className="bg-base-200 text-base-content">
                            <tr>
                                <th>No</th>
                                <th>Id</th>
                                <th>Produk</th>
                                <th>Deskripsi</th>
                                <th>Foto</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {product?.map((product, index) => (
                                <tr key={product.id} className="border-base-content/5 border-1">
                                    <td>{index + 1}</td>
                                    <th>{product.id}</th>
                                    <td>{product.nama_product}</td>
                                    <td>{product.deskripsi_product}</td>
                                    <td>
                                        <img
                                            src={`/storage/${product.foto_product}`}
                                            alt={product.nama_product}
                                            className="mx-auto h-24 w-24 rounded-lg object-cover"
                                        />
                                    </td>
                                    <td>
                                        <Link href={route('product.edit', product.id)} className="btn btn-sm btn-primary w-fit rounded-xl">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
