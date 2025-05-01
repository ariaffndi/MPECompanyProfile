import ButtonAddData from '@/components/button-add-data';
import Pagination from '@/components/pagination';
import SearchInput from '@/components/search-input';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useFilterSortPagination } from '@/hooks/useFilterSortPagination';
import { useFlashToast } from '@/hooks/useFlashToast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Info, Pencil, Trash2 } from 'lucide-react';
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

    const { search,filtered, page, handlePageChange, handleSearch } = useFilterSortPagination(
        'service.index',
        service.data,
        (service) => service.service_name,
    );

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Layanan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <ButtonAddData href={route('service.create')} />
                    <SearchInput value={search} onChange={handleSearch} />
                </div>

                <div className="rounded-box border-base-content/5 w-full overflow-x-auto border">
                    <table className="table-pin-rows table min-w-full text-center">
                        <thead>
                            <tr className="bg-base-300 text-base-content">
                                <th>No</th>
                                <th>Layanan</th>
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
                <Pagination currentPage={service.current_page} lastPage={service.last_page} onPageChange={handlePageChange} />
            </div>
        </AppLayout>
    );
}
