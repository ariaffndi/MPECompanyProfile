import ButtonAddData from '@/components/button-add-data';
import Pagination from '@/components/pagination';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useFlashToast } from '@/hooks/useFlashToast';
import SearchInput from '@/components/search-input';
import { useFilterSortPagination } from '@/hooks/useFilterSortPagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
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
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

    const { search, filtered, page, handlePageChange, handleSearch } = useFilterSortPagination(
        'team.index',
        team.data,
        (team) => team.name,
    );

    useFlashToast();

    const handleDelete = () => {
        if (selectedTeam)
            router.delete(route('team.destroy', selectedTeam.id), {
                preserveScroll: true,
                preserveState: true,
                data: { page: team.current_page },
                onSuccess: () => {
                    setSelectedTeam(null);
                },
            });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Team" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <ButtonAddData href={route('team.create')} />
                    <SearchInput value={search} onChange={handleSearch} />
                </div>

                <div className="rounded-box border-base-content/5 w-full overflow-x-auto border">
                    <table className="table-pin-rows table min-w-full text-center">
                        <thead>
                            <tr className="bg-base-300 text-base-content">
                                <th>No</th>
                                <th>Team</th>
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
                                    onClick={() => setSelectedTeam(teams)}
                                >
                                    <td>{(team.current_page - 1) * team.per_page + index + 1}</td>
                                    <td>{teams.name}</td>
                                    <td className="max-w-[200px] truncate whitespace-nowrap">{teams.position}</td>
                                    <td className="hidden sm:table-cell">
                                        <img src={`/storage/${teams.image}`} width={50} alt={teams.name} className="mx-auto aspect-square rounded-lg object-cover" />
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
                                                        onClick={() => setSelectedTeam(teams)}
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogTitle>Konfirmasi Hapus</DialogTitle>
                                                    <DialogDescription>
                                                        Apakah Anda yakin ingin menghapus produk <strong>{selectedTeam?.name}</strong>?
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
                <Pagination currentPage={team.current_page} lastPage={team.last_page} onPageChange={handlePageChange} />
            </div>
        </AppLayout>
    );
}
