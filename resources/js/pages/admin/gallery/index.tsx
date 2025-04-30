import Pagination from '@/components/pagination';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useFlashToast } from '@/hooks/useFlashToast';
import { usePaginationParam } from '@/hooks/usePaginationParam';
import { useSearchSort } from '@/hooks/useSearchSort';
import { useFilterSortPagination } from '@/hooks/useFilterSortPagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import SearchInput from '@/components/search-input';

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
    // const { page, setPage } = usePaginationParam();

    const {
        search,
        setSearch,
        sortOrder,
        toggleSort,
        filtered,
        page,
        handlePageChange,
        handleSearch,
    } = useFilterSortPagination('gallery.index', gallery.data, (item) => item.activity_name);

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

    // const handlePageChange = (newPage: number) => {
    //     setPage(newPage);
    //     router.get(
    //         route('gallery.index'),
    //         { page: newPage },
    //         {
    //             preserveScroll: true,
    //             preserveState: true,
    //         },
    //     );
    // };

    // const handleSearch = (setSearch: string) => {
    //     router.get(
    //         route('gallery.index'),
    //         { search: setSearch },
    //         {
    //             preserveScroll: true,
    //             preserveState: true,
    //             replace: true,
    //         },
    //     );
    // };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Team" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <Link href={route('gallery.create')} className="btn btn-sm btn-info w-fit rounded-xl">
                        <PlusCircle size={16} /> Tambah Data
                    </Link>
                    <div className="flex flex-col justify-between gap-2 sm:flex-row">
                        {/* <label className="input input-sm w-fit rounded-xl border-1">
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
                        </label> */}
                        <SearchInput value={search} onChange={handleSearch}/>
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
                                <th className="hidden sm:table-cell">Foto</th>
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
                                    <td className="hidden sm:table-cell">
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
