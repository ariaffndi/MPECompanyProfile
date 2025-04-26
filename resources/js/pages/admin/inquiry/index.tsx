import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useFlashToast } from '@/hooks/useFlashToast';
import { usePaginationParam } from '@/hooks/usePaginationParam';
import { useSearchSort } from '@/hooks/useSearchSort';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Info, Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Pemesanan', href: '/inquiry' }];

type Inquiry = {
    id: number;
    name: string;
    email: string;
    phone: string;
    service: {
        id: number;
        service_name: string;
    };
    product: {
        id: number;
        nama_product: string;
    };
    detail: string;
    status: string;
};

type Paginator<T> = {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    next_page_url: string | null;
    prev_page_url: string | null;
};

export default function Inquiry() {
    const { inquiry, filters } = usePage<{ inquiry: Paginator<Inquiry>; filters: { search: string; sort: string; status: string } }>().props;
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const { page, setPage } = usePaginationParam();
    const { search, setSearch, sortOrder, toggleSort, filtered } = useSearchSort(inquiry.data, (inquiryItem) => inquiryItem.name);

    useFlashToast();

    const handleDelete = () => {
        if (selectedInquiry)
            router.delete(route('inquiry.destroy', selectedInquiry.id), {
                preserveScroll: true,
                preserveState: true,
                data: { page: inquiry.current_page },
                onSuccess: () => {
                    setSelectedInquiry(null);
                },
            });
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        router.get(
            route('inquiry.index'),
            { page: newPage },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const handleSearch = (setSearch: string) => {
        router.get(
            route('inquiry.index'),
            { search: setSearch },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleStatusFilter = (status: string) => {
        router.get(
            route('inquiry.index'),
            { search, status, page: 1 },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleExportCSV = () => {
        const headers = ['No', 'Nama', 'Email', 'Telepon', 'Layanan', 'Produk', 'Deskripsi', 'Status'];
        const rows = inquiry.data.map((inquiryItem, i) => [
            i + 1,
            inquiryItem.name,
            inquiryItem.email,
            inquiryItem.phone,
            inquiryItem.service.service_name,
            inquiryItem.product.nama_product,
            inquiryItem.status,
            inquiryItem.detail.replace(/\n/g, ' '),
        ]);
        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'layanan.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Layanan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <Link href={route('inquiry.create')} className="btn btn-sm btn-info w-fit rounded-xl">
                        <PlusCircle size={16} /> Tambah Data
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
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                            />
                        </label>
                    </div>
                </div>

                <div className="rounded-box border-base-content/5 w-full overflow-x-auto border">
                    <table className="table-pin-rows table min-w-full text-center">
                        <thead>
                            <tr className="bg-base-300 text-base-content">
                                <th>No</th>
                                <th className="cursor-pointer" onClick={toggleSort}>
                                    Nama {sortOrder === 'asc' ? '↑' : '↓'}
                                </th>
                                <th>Email</th>
                                <th>Telepon</th>
                                <th>Layanan</th>
                                <th>Produk</th>
                                <th>Deskripsi</th>
                                <th>
                                    <select
                                        value={filters.status || ''}
                                        onChange={(e) => handleStatusFilter(e.target.value)}
                                        className=""
                                    >
                                        <option value="">Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="progress">Progress</option>
                                        <option value="finished">Finished</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((inquiryItem, index) => (
                                <tr
                                    key={inquiryItem.id}
                                    className="border-base-content/5 hover:bg-base-200 border-1"
                                    onClick={() => setSelectedInquiry(inquiryItem)}
                                >
                                    <td>{(inquiry.current_page - 1) * inquiry.per_page + index + 1}</td>
                                    <td>{inquiryItem.name}</td>
                                    <td>{inquiryItem.email}</td>
                                    <td>{inquiryItem.phone}</td>
                                    <td>{inquiryItem.service.service_name}</td>
                                    <td>{inquiryItem.product.nama_product}</td>
                                    <td className="max-w-[150px] truncate whitespace-nowrap">{inquiryItem.detail}</td>
                                    <td>
                                        <span
                                            className={`badge badge-soft px-2 ${
                                                inquiryItem.status === 'pending'
                                                    ? 'badge-info'
                                                    : inquiryItem.status === 'progress'
                                                      ? 'badge-warning'
                                                      : inquiryItem.status === 'finished'
                                                        ? 'badge-success'
                                                        : inquiryItem.status === 'cancelled'
                                                          ? 'badge-error'
                                                          : 'badge-neutral'
                                            }`}
                                        >
                                            {inquiryItem.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex flex-nowrap items-center justify-center gap-1">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button
                                                        title="Detail"
                                                        className="btn btn-sm btn-square btn-soft btn-info m-0.5"
                                                        onClick={() => setSelectedInquiry(inquiryItem)}
                                                    >
                                                        <Info size={20} />
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogTitle>Detail Pemesanan</DialogTitle>
                                                    <DialogDescription className="max-h-[400px] overflow-y-auto">
                                                        <div className="card-body">
                                                            <h2 className="card-title">{inquiryItem.name}</h2>
                                                            <p>Email: {inquiryItem.email}</p>
                                                            <p>Telepon: {inquiryItem.phone}</p>
                                                            <p>Layanan: {inquiryItem.service.service_name}</p>
                                                            <p>Produk: {inquiryItem.product.nama_product}</p>
                                                            <span
                                                                className={`badge badge-soft px-2 ${
                                                                    inquiryItem.status === 'pending'
                                                                        ? 'badge-info'
                                                                        : inquiryItem.status === 'progress'
                                                                          ? 'badge-warning'
                                                                          : inquiryItem.status === 'finished'
                                                                            ? 'badge-success'
                                                                            : inquiryItem.status === 'cancelled'
                                                                              ? 'badge-error'
                                                                              : 'badge-neutral'
                                                                }`}
                                                            >
                                                                {inquiryItem.status}
                                                            </span>
                                                            <p className="whitespace-pre-line">{inquiryItem.detail}</p>
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
                                                href={route('inquiry.edit', { id: inquiryItem.id }) + `?page=${page}`}
                                                title="Edit Data"
                                                className="btn btn-sm btn-square btn-soft btn-warning m-0.5"
                                            >
                                                <Pencil size={20} />
                                            </Link>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button
                                                        title="Hapus Data"
                                                        className="btn btn-sm btn-square btn-soft btn-error m-0.5"
                                                        onClick={() => setSelectedInquiry(inquiryItem)}
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogTitle>Konfirmasi Hapus</DialogTitle>
                                                    <DialogDescription>
                                                        Apakah Anda yakin ingin menghapus Pemesanan <strong>{selectedInquiry?.name}</strong>?
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
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* paginasi */}
                <div className="mt-4 flex justify-center gap-2">
                    <button className="btn btn-sm" onClick={() => handlePageChange(inquiry.current_page - 1)} disabled={inquiry.current_page === 1}>
                        Prev
                    </button>

                    {[...Array(inquiry.last_page)].map((_, i) => (
                        <button
                            key={i}
                            className={`btn btn-sm ${inquiry.current_page === i + 1 ? 'btn-active' : ''}`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className="btn btn-sm"
                        onClick={() => handlePageChange(inquiry.current_page + 1)}
                        disabled={inquiry.current_page === inquiry.last_page}
                    >
                        Next
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
