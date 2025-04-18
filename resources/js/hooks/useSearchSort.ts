// src/hooks/useSearchSort.ts
import { useState, } from 'react';

export function useSearchSort<T>(data: T[], getKey: (item: T) => string) {
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const toggleSort = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const filtered = data
        .filter((item) => getKey(item).toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) =>
            sortOrder === 'asc' ? getKey(a).localeCompare(getKey(b)) : getKey(b).localeCompare(getKey(a))
        );

    return { search, setSearch, sortOrder, toggleSort, filtered };
}
