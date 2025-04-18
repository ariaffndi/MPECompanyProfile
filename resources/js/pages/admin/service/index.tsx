import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PlusCircle,Pencil, Trash2, Info } from 'lucide-react';
import { useState } from 'react';
import { useFlashToast } from '@/hooks/useFlashToast';
import { usePaginationParam } from '@/hooks/usePaginationParam';
import { useSearchSort } from '@/hooks/useSearchSort';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Layanan', href: '/service' }];

type Service = {
    id: number;
    service_name: string;
    service_description: string;
    service_image: string;
};

export default function Service() {
    useFlashToast();

    const { service } = usePage<{ service: Service[] }>().props;
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const { page: currentPage, setPage: setCurrentPage } = usePaginationParam();
    const { search, setSearch, sortOrder, toggleSort, filtered } = useSearchSort(service, (p) => p.service_name + ' ' + p.service_description);
    const itemsPerPage = 5;
    
    const handleDelete = () => {
        if (selectedService) {
            router.delete(route('service.destroy', selectedService.id), {
                preserveScroll: true,
                preserveState: true,
                data: { page: currentPage },
                onSuccess: () => {
                    setSelectedService(null);
                },
            });
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    const handleExportCSV = () => {
        const headers = ['No', 'Layanan', 'Deskripsi'];
        const rows = service.map((p, i) => [i + 1, p.service_name, p.service_description.replace(/\n/g, ' ')]);
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
                                    Layanan {sortOrder === 'asc' ? '↑' : '↓'}
                                </th>
                                <th>Deskripsi</th>
                                <th className="hidden sm:table-cell">Foto</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((service, index) => (
                                <tr
                                    key={service.id}
                                    className="border-base-content/5 hover:bg-base-200 border-1"
                                    onClick={() => setSelectedService(service)}
                                >
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{service.service_name}</td>
                                    <td className="whitespace-nowrapd max-w-[200px] truncate">{service.service_description}</td>
                                    <td className="hidden sm:table-cell">
                                        <img
                                            src={`/storage/${service.service_image}`}
                                            alt={service.service_name}
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
                                                        onClick={() => setSelectedService(service)}
                                                    >
                                                        <Info size={20} />
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogTitle>Detail Layanan</DialogTitle>
                                                    <DialogDescription className="max-h-[400px] overflow-y-auto">
                                                        <figure>
                                                            <img
                                                                src={`/storage/${service.service_image}`}
                                                                alt={service.service_name}
                                                                className="mx-auto aspect-square max-w-[200px] rounded-lg object-cover"
                                                            />
                                                        </figure>
                                                        <div className="card-body">
                                                            <h2 className="card-title">{service.service_name}</h2>
                                                            <p className="whitespace-pre-line">{service.service_description}</p>
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
                                                href={route('service.edit', service.id)}
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
                                                        onClick={() => setSelectedService(service)}
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
