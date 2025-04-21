import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useFlashToast } from '@/hooks/useFlashToast';
import { usePaginationParam } from '@/hooks/usePaginationParam';
import { useSearchSort } from '@/hooks/useSearchSort';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Info, Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Layanan', href: '/service' }];

type Service = {
    id: number;
    service_name: string;
    service_description: string;
    service_image: string;
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

export default function Service() {
    const { service } = usePage<{ service: Paginator<Service> }>().props;
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const { page, setPage } = usePaginationParam();

    const { search, setSearch, sortOrder, toggleSort, filtered } = useSearchSort(service.data, (serviceItem) => serviceItem.service_name);

    useFlashToast();

    const handleDelete = () => {
        if (selectedService)
            router.delete(route('service.destroy', selectedService.id), {
                preserveScroll: true,
                preserveState: true,
                data: { page: service.current_page },
                onSuccess: () => {
                    setSelectedService(null);
                },
            });
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        router.get(
            route('service.index'),
            { page: newPage },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const handleSearch = (setSearch: string) => {
        router.get(
            route('service.index'),
            { search: setSearch },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleExportCSV = () => {
        const headers = ['No', 'Layanan', 'Deskripsi'];
        const rows = service.data.map((serviceItem, i) => [i + 1, serviceItem.service_name, serviceItem.service_description.replace(/\n/g, ' ')]);
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
                    <Link href={route('service.create')} className="btn btn-sm btn-info w-fit rounded-xl">
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
                                    Layanan {sortOrder === 'asc' ? '↑' : '↓'}
                                </th>
                                <th>Deskripsi</th>
                                <th className="hidden sm:table-cell">Foto</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((serviceItem, index) => (
                                <tr
                                    key={serviceItem.id}
                                    className="border-base-content/5 hover:bg-base-200 border-1"
                                    onClick={() => setSelectedService(serviceItem)}
                                >
                                    <td>{(service.current_page - 1) * service.per_page + index + 1}</td>
                                    <td>{serviceItem.service_name}</td>
                                    <td className="max-w-[200px] truncate whitespace-nowrap">{serviceItem.service_description}</td>
                                    <td className="hidden sm:table-cell">
                                        <img
                                            src={`/storage/${serviceItem.service_image}`}
                                            alt={serviceItem.service_name}
                                            className="mx-auto h-16 w-16 rounded-lg object-cover"
                                        />
                                    </td>
                                    <td>
                                        <div className="flex flex-nowrap items-center justify-center gap-1">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <button
                                                        title="Detail"
                                                        className="btn btn-sm btn-square btn-soft btn-info m-0.5"
                                                        onClick={() => setSelectedService(serviceItem)}
                                                    >
                                                        <Info size={20} />
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogTitle>Detail Layanan</DialogTitle>
                                                    <DialogDescription className="max-h-[400px] overflow-y-auto">
                                                        <figure>
                                                            <img
                                                                src={`/storage/${serviceItem.service_image}`}
                                                                alt={serviceItem.service_name}
                                                                className="mx-auto aspect-square max-w-[200px] rounded-lg object-cover"
                                                            />
                                                        </figure>
                                                        <div className="card-body">
                                                            <h2 className="card-title">{serviceItem.service_name}</h2>
                                                            <p className="whitespace-pre-line">{serviceItem.service_description}</p>
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
                                                href={route('service.edit', { id: serviceItem.id }) + `?page=${page}`}
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
                                                        onClick={() => setSelectedService(serviceItem)}
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogTitle>Konfirmasi Hapus</DialogTitle>
                                                    <DialogDescription>
                                                        Apakah Anda yakin ingin menghapus layanan <strong>{selectedService?.service_name}</strong>?
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
                    <button className="btn btn-sm" onClick={() => handlePageChange(service.current_page - 1)} disabled={service.current_page === 1}>
                        Prev
                    </button>

                    {[...Array(service.last_page)].map((_, i) => (
                        <button
                            key={i}
                            className={`btn btn-sm ${service.current_page === i + 1 ? 'btn-active' : ''}`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className="btn btn-sm"
                        onClick={() => handlePageChange(service.current_page + 1)}
                        disabled={service.current_page === service.last_page}
                    >
                        Next
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
