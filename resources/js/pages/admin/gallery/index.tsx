import ButtonAddData from '@/components/button-add-data';
import Pagination from '@/components/pagination';
import SearchInput from '@/components/search-input';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useFilterSortPagination } from '@/hooks/useFilterSortPagination';
import { useFlashToast } from '@/hooks/useFlashToast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Galeri', href: '/gallery' }];

type Gallery = {
    id: number;
    activity_name: string;
    activity_image: string;
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

export default function Gallery() {
    const { gallery } = usePage<{ gallery: Paginator<Gallery> }>().props;
    const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);

    const { search, sortOrder, toggleSort, filtered, page, handlePageChange, handleSearch } = useFilterSortPagination(
        'gallery.index',
        gallery.data,
        (item) => item.activity_name,
    );

    useFlashToast();

    const handleDelete = () => {
        if (selectedGallery)
            router.delete(route('gallery.destroy', selectedGallery.id), {
                preserveScroll: true,
                preserveState: true,
                data: { page: gallery.current_page },
                onSuccess: () => {
                    setSelectedGallery(null);
                },
            });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Team" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <ButtonAddData href={route('gallery.create')} />
                    <div className="flex flex-col justify-between gap-2 sm:flex-row">
                        <SearchInput value={search} onChange={handleSearch} />
                    </div>
                </div>

                <div className="rounded-box border-base-content/5 w-full overflow-x-auto border">
                    <table className="table-pin-rows table min-w-full text-center">
                        <thead>
                            <tr className="bg-base-300 text-base-content">
                                <th>No</th>
                                <th className="cursor-pointer" onClick={toggleSort}>
                                    Nama Kegiatan {sortOrder === 'asc' ? '↑' : '↓'}
                                </th>
                                <th className="">Foto</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((galleries, index) => (
                                <tr
                                    key={galleries.id}
                                    className="border-base-content/5 hover:bg-base-200 border-1"
                                    onClick={() => setSelectedGallery(galleries)}
                                >
                                    <td>{(gallery.current_page - 1) * gallery.per_page + index + 1}</td>
                                    <td>{galleries.activity_name}</td>
                                    <td className="">
                                        <img
                                            src={`/storage/${galleries.activity_image}`}
                                            alt={galleries.activity_name}
                                            className="mx-auto h-16 w-16 rounded-lg object-cover"
                                        />
                                    </td>
                                    <td>
                                        <div className="flex flex-nowrap items-center justify-center gap-1">
                                            <Link
                                                href={route('gallery.edit', { id: galleries.id }) + `?page=${page}`}
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
                                                        onClick={() => setSelectedGallery(galleries)}
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogTitle>Konfirmasi Hapus</DialogTitle>
                                                    <DialogDescription>
                                                        Apakah Anda yakin ingin menghapus produk <strong>{selectedGallery?.activity_name}</strong>?
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
                <Pagination currentPage={gallery.current_page} lastPage={gallery.last_page} onPageChange={handlePageChange} />
            </div>
        </AppLayout>
    );
}
