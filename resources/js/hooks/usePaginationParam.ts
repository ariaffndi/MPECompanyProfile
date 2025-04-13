// usePaginationParam.ts
import { router, usePage } from '@inertiajs/react';

export function usePaginationParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const page = parseInt(urlParams.get('page') || '1');

    const setPage = (newPage: number) => {
        urlParams.set('page', newPage.toString());
        router.get(window.location.pathname + '?' + urlParams.toString(), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return { page, setPage };
}
