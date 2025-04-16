import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2, Info } from 'lucide-react';
import { useState } from 'react';

import { useFlashToast } from '@/hooks/useFlashToast';
import { usePaginationParam } from '@/hooks/usePaginationParam';
import { useSearchSort } from '@/hooks/useSearchSort';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Products', href: '/product' }];

type Product = {
    id: number;
    nama_product: string;
    deskripsi_product: string;
    foto_product: string;
};

export default function Product() {
    const { product } = usePage<{ product: Product[] }>().props;
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { page: currentPage, setPage: setCurrentPage } = usePaginationParam();
    const { search, setSearch, sortOrder, toggleSort, filtered } = useSearchSort(product, (p) => p.nama_product + ' ' + p.deskripsi_product);
    const itemsPerPage = 4;

    useFlashToast();

    const handleDelete = () => {
        if (selectedProduct) {
            router.delete(route('product.destroy', selectedProduct.id), {
                preserveScroll: true,
                preserveState: true,
                data: { page: currentPage },
                onSuccess: () => {
                    setSelectedProduct(null);
                },
            });
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

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
            <Head title="Produk" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <Link href={route('product.create')} className="btn btn-sm btn-info w-fit rounded-xl">
                        Tambah Produk
                    </Link>
                    <div className="flex flex-col justify-between gap-2 sm:flex-row">
                        <button className="btn btn-sm btn-success w-fit rounded-xl" onClick={handleExportCSV}>
                            Export CSV
                        </button>

                        <label className="input h-8 rounded-xl">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input type="search" className="grow" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                        </label>
                    </div>
                </div>

                <div className="rounded-box border-base-content/5 w-full overflow-x-auto border">
                    <table className="table-pin-rows table min-w-full text-center">
                        <thead>
                            <tr className="bg-base-300 text-base-content">
                                <th>No</th>
                                <th className="cursor-pointer" onClick={toggleSort}>
                                    Produk {sortOrder === 'asc' ? '↑' : '↓'}
                                </th>
                                <th>Deskripsi</th>
                                <th>Foto</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((product, index) => (
                                <tr
                                    key={product.id}
                                    className="border-base-content/5 hover:bg-base-200 cursor-pointer border-1"
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{product.nama_product}</td>
                                    <td className="whitespace-nowrapd max-w-[200px] truncate">
                                        {product.deskripsi_product}
                                    </td>
                                    <td>
                                        <img
                                            src={`/storage/${product.foto_product}`}
                                            alt={product.nama_product}
                                            className="mx-auto h-16 w-16 rounded-lg object-cover"
                                        />
                                    </td>
                                    <td>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button
                                                    title="Detail Produk"
                                                    className="btn btn-sm btn-info m-1 w-fit rounded-xl"
                                                    onClick={() => setSelectedProduct(product)}
                                                >
                                                    <Info size={20} />
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>Detail Produk</DialogTitle>
                                                <DialogDescription className="max-h-[400px] overflow-y-auto">
                                                    <figure>
                                                        <img
                                                            src={`/storage/${product.foto_product}`}
                                                            alt={product.nama_product}
                                                            className="mx-auto aspect-square max-w-[200px] rounded-lg object-cover"
                                                        />
                                                    </figure>
                                                    <div className="card-body">
                                                        <h2 className="card-title">{product.nama_product}</h2>
                                                        <p className="whitespace-pre-line">{product.deskripsi_product}</p>
                                                    </div>
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <button className="btn btn-gray m-1 w-fit rounded-lg">Kembali</button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <Link
                                            href={route('product.edit', product.id)}
                                            title="Edit Produk"
                                            className="btn btn-sm btn-warning m-1 w-fit rounded-xl"
                                        >
                                            <Pencil size={20} />
                                        </Link>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button
                                                    title="Hapus Produk"
                                                    className="btn btn-sm btn-error m-1 w-fit rounded-xl"
                                                    onClick={() => setSelectedProduct(product)}
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>Konfirmasi Hapus</DialogTitle>
                                                <DialogDescription>
                                                    Apakah Anda yakin ingin menghapus produk{' '}
                                                    <strong>{selectedProduct?.nama_product}</strong>?
                                                </DialogDescription>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <button className="btn btn-gray m-1 w-fit rounded-lg">Batal</button>
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

                <div className="mt-4 flex justify-center gap-2">
                    <button className="btn btn-sm" onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button key={i} className={`btn btn-sm ${currentPage === i + 1 ? 'btn-active' : ''}`} onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className="btn btn-sm"
                        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
