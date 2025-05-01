import ButtonAddData from '@/components/button-add-data';
import Pagination from '@/components/pagination';
import SearchInput from '@/components/search-input';
import { useFilterSortPagination } from '@/hooks/useFilterSortPagination';
import { useFlashToast } from '@/hooks/useFlashToast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Admin', href: '/users' }];

type User = {
    id: number;
    name: string;
    email: string;
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

export default function User() {
    const { user } = usePage<{ user: Paginator<User> }>().props;
    const { search,  filtered, handlePageChange, handleSearch } = useFilterSortPagination(
        'user.index',
        user.data,
        (user) => user.name,
    );

    useFlashToast();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Layanan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <ButtonAddData href={route('register')} />
                    <SearchInput value={search} onChange={handleSearch} />
                </div>

                <div className="rounded-box border-base-content/5 w-full overflow-x-auto border">
                    <table className="table-pin-rows table min-w-full text-center">
                        <thead>
                            <tr className="bg-base-300 text-base-content">
                                <th>No</th>
                                <th>Nama</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((userItem, index) => (
                                <tr key={userItem.id} className="border-base-content/5 hover:bg-base-200 border-1">
                                    <td>{(user.current_page - 1) * user.per_page + index + 1}</td>
                                    <td>{userItem.name}</td>
                                    <td>{userItem.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* paginasi */}
                <Pagination currentPage={user.current_page} lastPage={user.last_page} onPageChange={handlePageChange} />
            </div>
        </AppLayout>
    );
}
