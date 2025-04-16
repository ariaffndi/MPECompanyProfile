import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react'; //tambah info jika pakai icon
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
    // const { service } = usePage<{ service: Service[] }>().props;
    //     // const [selectedService, setselectedService] = useState<Service | null>(null);
    //     // const { page: currentPage, setPage: setCurrentPage } = usePaginationParam();
    //     // const { search, setSearch, sortOrder, toggleSort, filtered } = useSearchSort(service, (p) => p.service_name + ' ' + p.service_description);
        // const itemsPerPage = 4;
        
    useFlashToast();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produk" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"></div>
        </AppLayout>
    );
}
