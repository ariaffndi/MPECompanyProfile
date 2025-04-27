import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useFlashToast } from '@/hooks/useFlashToast';
import { usePaginationParam } from '@/hooks/usePaginationParam';
import { useSearchSort } from '@/hooks/useSearchSort';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Team', href: '/team' }];

type Team = {
    id: number;
    name: string;
    position: string;
    image: string;
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

export default function Team() {
    const { team } = usePage<{ team: Paginator<Team> }>().props;
    const [selectedProduct, setSelectedProduct] = useState<Team | null>(null);
    const { page, setPage } = usePaginationParam();

    const { search, setSearch, sortOrder, toggleSort, filtered } = useSearchSort(team.data, (teams) => teams.name);

    useFlashToast();

    const handleDelete = () => {
        if (selectedProduct)
            router.delete(route('team.destroy', selectedProduct.id), {
                preserveScroll: true,
                preserveState: true,
                data: { page: team.current_page },
                onSuccess: () => {
                    setSelectedProduct(null);
                },
            });
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        router.get(
            route('team.index'),
            { page: newPage },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const handleSearch = (setSearch: string) => {
        router.get(
            route('team.index'),
            { search: setSearch },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleExportCSV = () => {
        const headers = ['No', 'Nama', 'Foto Team'];
        const rows = team.data.map((team, i) => [i + 1, team.name, team.position.replace(/\n/g, ' ')]);
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
            <Head title="Team" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <Link href={route('team.create')} className="btn btn-sm btn-info w-fit rounded-xl">
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
                                    Team {sortOrder === 'asc' ? '↑' : '↓'}
                                </th>
                                <th>Posisi</th>
                                <th className="hidden sm:table-cell">Foto</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((teams, index) => (
                                <tr
                                    key={teams.id}
                                    className="border-base-content/5 hover:bg-base-200 border-1"
                                    onClick={() => setSelectedProduct(teams)}
                                >
                                    <td>{(team.current_page - 1) * team.per_page + index + 1}</td>
                                    <td>{teams.name}</td>
                                    <td className="max-w-[200px] truncate whitespace-nowrap">{teams.position}</td>
                                    <td className="hidden sm:table-cell">
                                        <img src={`/storage/${teams.image}`} alt={teams.name} className="mx-auto h-16 w-16 rounded-lg object-cover" />
                                    </td>
                                    <td>
                                        <div className="flex flex-nowrap items-center justify-center gap-1">
                                            <Link
                                                href={route('team.edit', { id: teams.id }) + `?page=${page}`}
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
                                                        onClick={() => setSelectedProduct(teams)}
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogTitle>Konfirmasi Hapus</DialogTitle>
                                                    <DialogDescription>
                                                        Apakah Anda yakin ingin menghapus produk <strong>{selectedProduct?.name}</strong>?
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
                    <button className="btn btn-sm" onClick={() => handlePageChange(team.current_page - 1)} disabled={team.current_page === 1}>
                        Prev
                    </button>

                    {[...Array(team.last_page)].map((_, i) => (
                        <button
                            key={i}
                            className={`btn btn-sm ${team.current_page === i + 1 ? 'btn-active' : ''}`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className="btn btn-sm"
                        onClick={() => handlePageChange(team.current_page + 1)}
                        disabled={team.current_page === team.last_page}
                    >
                        Next
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}
