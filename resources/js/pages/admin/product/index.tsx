import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

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
    const [searchVal, setSearchVal] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const handleDelete = () => {
        if (selectedProduct) {
            router.delete(route('product.destroy', selectedProduct.id));
            setSelectedProduct(null);
        }
    };

    const toggleSort = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const filteredProducts = product
        .filter((p) => {
            const search = searchVal.toLowerCase();
            return p.nama_product.toLowerCase().includes(search) || p.deskripsi_product.toLowerCase().includes(search);
        })
        .sort((a, b) => {
            return sortOrder === 'asc' ? a.nama_product.localeCompare(b.nama_product) : b.nama_product.localeCompare(a.nama_product);
        });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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

    const { flash } = usePage().props as { flash?: { success?: string } };
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product" />
            <div className="w-full max-w-none m-2 flex h-full flex-1 flex-col gap-4 rounded-xl p-4 sm:p-4">
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
                            <input
                                type="search"
                                className="grow"
                                placeholder="Search"
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                            />
                        </label>
                    </div>
                </div>

                <div className="rounded-box border-base-content/5 w-full overflow-x-auto border">
                    <table className="table min-w-full text-center">
                        <thead className="bg-base-200 text-base-content">
                            <tr>
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
                                <tr key={product.id} className="border-base-content/5 border-1">
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{product.nama_product}</td>
                                    <td>
                                        <div className="line-clamp-3 text-sm whitespace-pre-line">{product.deskripsi_product}</div>
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

                {/* Pagination */}
                <div className="mt-4 flex justify-center gap-2">
                    <button className="btn btn-sm" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button key={i} className={`btn btn-sm ${currentPage === i + 1 ? 'btn-active' : ''}`} onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className="btn btn-sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
