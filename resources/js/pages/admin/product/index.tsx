import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const handleDelete = () => {
        if (selectedProduct) {
            router.delete(route('product.destroy', selectedProduct.id));
            setSelectedProduct(null);
        }
    };

    const handleExportCSV = () => {
        const headers = ['No', 'Produk', 'Deskripsi'];
        const rows = product.map((p, i) => [i + 1, p.nama_product, p.deskripsi_product.replace(/\n/g, ' ')]);
        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'produk.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 sm:p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <Link href={route('product.create')} className="btn btn-sm btn-info w-fit rounded-xl">
                        Tambah Produk
                    </Link>
                    <button className="btn btn-sm btn-success w-fit rounded-xl" onClick={handleExportCSV}>
                        Export CSV
                    </button>
                </div>

                <div className="rounded-box border-base-content/5 overflow-x-auto border">
                    <table className="table-xs table min-w-[640px] text-center">
                        <thead className="bg-base-200 text-base-content">
                            <tr>
                                <th>No</th>
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
                                    <td>{product.nama_product}</td>
                                    <td>
                                        <div className="break-wordstext-sm p-2o max-w-sm whitespace-pre-wrap md:text-base">
                                            {product.deskripsi_product}
                                        </div>
                                    </td>
                                    <td>
                                        <img
                                            src={`/storage/${product.foto_product}`}
                                            alt={product.nama_product}
                                            className="mx-auto h-24 w-24 rounded-lg object-cover"
                                        />
                                    </td>
                                    <td>
                                        <Link href={route('product.edit', product.id)} className="btn btn-sm btn-primary m-2 w-fit rounded-xl">
                                            <Pencil color="white" size={20} />
                                        </Link>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button
                                                    className="btn btn-sm btn-error m-2 w-fit rounded-xl"
                                                    onClick={() => setSelectedProduct(product)}
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                                                <DialogDescription>
                                                    Apakah Anda yakin ingin menghapus produk <strong>{selectedProduct?.nama_product}</strong>?
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <button className="btn btn-primary m-1 w-fit rounded-lg">Batal</button>
                                                    </DialogClose>
                                                    <button className="btn btn-error m-1 w-fit rounded-lg" onClick={handleDelete}>
                                                        Hapus
                                                    </button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
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
