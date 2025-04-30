import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useFlashToast } from '@/hooks/useFlashToast';
import { usePaginationParam } from '@/hooks/usePaginationParam';
import { useSearchSort } from '@/hooks/useSearchSort';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Info } from 'lucide-react';
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
        product_name: string;
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
    const pagination = usePaginationParam();
    const { search, setSearch, filtered } = useSearchSort(inquiry.data, (inquiryItem) => inquiryItem.name);

    useFlashToast();

    const handlePageChange = (newPage: number) => {
        pagination.setPage(newPage);
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

    const handleStatusChange = (id: number, newStatus: string) => {
        router.put(
            route('inquiry.update-status', id),
            { status: newStatus },
            {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload({ only: ['inquiry'] });
                },
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Layanan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col justify-end gap-2 sm:flex-row">
                    <label className="input input-sm w-fit rounded-xl border-1">
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

                <div className="rounded-box border-base-content/5 w-full overflow-x-auto border">
                    <table className="table-pin-rows table min-w-full text-center">
                        <thead>
                            <tr className="bg-base-300 text-base-content">
                                <th>No</th>
                                <th>Nama</th>
                                <th>Email</th>
                                <th>Telepon</th>
                                <th>Layanan</th>
                                <th>Produk</th>
                                <th>Deskripsi</th>
                                <th>
                                    <select value={filters.status || ''} onChange={(e) => handleStatusFilter(e.target.value)}>
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
                                    <td>{inquiryItem.product.product_name}</td>
                                    <td className="max-w-[150px] truncate whitespace-nowrap">{inquiryItem.detail}</td>
                                    <td>
                                        <select
                                            value={inquiryItem.status}
                                            onChange={(e) => handleStatusChange(inquiryItem.id, e.target.value)}
                                            className={`badge badge-soft cursor-pointer px-2 ${
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
                                            <option value="pending" className="badge badge-soft badge-info">
                                                Pending
                                            </option>
                                            <option value="progress" className="badge badge-soft badge-warning">
                                                Progress
                                            </option>
                                            <option value="finished" className="badge badge-soft badge-success">
                                                Finished
                                            </option>
                                            <option value="cancelled" className="badge badge-soft badge-error">
                                                Cancelled
                                            </option>
                                        </select>
                                    </td>
                                    <td>
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
                                                        <h2 className="card-title">{selectedInquiry?.name}</h2>
                                                        <p>Email: {selectedInquiry?.email}</p>
                                                        <p>Telepon: {selectedInquiry?.phone}</p>
                                                        <p>Layanan: {selectedInquiry?.service.service_name}</p>
                                                        <p>Produk: {selectedInquiry?.product.product_name}</p>
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
                                                            {selectedInquiry?.status}
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
