import ButtonAddData from '@/components/button-add-data';
import Pagination from '@/components/pagination';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useFlashToast } from '@/hooks/useFlashToast';
import { useFilterSortPagination } from '@/hooks/useFilterSortPagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import SearchInput from '@/components/search-input';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Partner', href: '/partner' }];

type Partner = {
    id: number;
    company_name: string;
    logo: string;
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

export default function Partner() {
    const { partner } = usePage<{ partner: Paginator<Partner> }>().props;
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

    const {
        search,
        sortOrder,
        toggleSort,
        filtered,
        page,
        handlePageChange,
        handleSearch,
    } = useFilterSortPagination('partner.index', partner.data, (partner) => partner.company_name);


    useFlashToast();

    const handleDelete = () => {
        if (selectedPartner)
            router.delete(route('partner.destroy', selectedPartner.id), {
                preserveScroll: true,
                preserveState: true,
                data: { page: partner.current_page },
                onSuccess: () => {
                    setSelectedPartner(null);
                },
            });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Partner" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <ButtonAddData href={route('partner.create')} />
                    <SearchInput value={search} onChange={handleSearch} />
                </div>

                <div className="rounded-box border-base-content/5 w-full overflow-x-auto border">
                    <table className="table-pin-rows table min-w-full text-center">
                        <thead>
                            <tr className="bg-base-300 text-base-content">
                                <th>No</th>
                                <th className="cursor-pointer" onClick={toggleSort}>
                                    Partner {sortOrder === 'asc' ? '↑' : '↓'}
                                </th>
                                <th className="hidden sm:table-cell">Logo</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((partnerItem, index) => (
                                <tr
                                    key={partnerItem.id}
                                    className="border-base-content/5 hover:bg-base-200 border-1"
                                    onClick={() => setSelectedPartner(partnerItem)}
                                >
                                    <td>{(partner.current_page - 1) * partner.per_page + index + 1}</td>
                                    <td>{partnerItem.company_name}</td>
                                    <td className="hidden sm:table-cell">
                                        <img
                                            src={`/storage/${partnerItem.logo}`}
                                            alt={partnerItem.company_name}
                                            className="mx-auto h-16 w-16 rounded-lg object-cover"
                                        />
                                    </td>
                                    <td>
                                        <div className="flex flex-nowrap items-center justify-center gap-1">
                                            <Link
                                                href={route('partner.edit', { id: partnerItem.id }) + `?page=${page}`}
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
                                                        onClick={() => setSelectedPartner(partnerItem)}
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogTitle>Konfirmasi Hapus</DialogTitle>
                                                    <DialogDescription>
                                                        Apakah Anda yakin ingin menghapus partner <strong>{selectedPartner?.company_name}</strong>?
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
                <Pagination currentPage={partner.current_page} lastPage={partner.last_page} onPageChange={handlePageChange} />
            </div>
        </AppLayout>
    );
}
