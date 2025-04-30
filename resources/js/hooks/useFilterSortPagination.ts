// custom hook yang digunakan untuk fitur filter,sort dan paginasi
import { useSearchSort } from './useSearchSort';
import { usePaginationParam } from './usePaginationParam';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export function useFilterSortPagination<T>(
    routeName: string,
    data: T[],
    searchKey: (item: T) => string,
    extraQuery: Record<string, any> = {}
) {
    const pagination = usePaginationParam();
    const { search, setSearch, sortOrder, toggleSort, filtered } = useSearchSort<T>(data, searchKey);

    const [sortField, setSortField] = useState<string>('year');

    const handlePageChange = (newPage: number) => {
        pagination.setPage(newPage);
        router.get(
            route(routeName),
            {
                ...extraQuery,
                page: newPage,
                search,
                sort: sortOrder,
                sortField,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };
    


    const handleSearch = (value: string) => {
        setSearch(value);
        router.get(
            route(routeName),
            {
                ...extraQuery,
                page: 1,
                search: value,
                sort: sortOrder,
                sortField,
            },
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            }
        );
    };
    

    return {
        search,
        setSearch,
        sortOrder,
        toggleSort,
        filtered,
        page: pagination.page,
        setPage: pagination.setPage,
        handlePageChange,
        handleSearch,
        sortField,
        setSortField,
    };
}
