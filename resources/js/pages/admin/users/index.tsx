import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/users',
    },
];

type User = {
    id: number;
    name: string;
    email: string;
};

export default function Users() {
    const { users } = usePage<{ users: User[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Link href={route('register')} className="btn btn-sm btn-info w-fit rounded-xl">
                    Tambah Admin
                </Link>

                <div className="rounded-box border-base-content/5 overflow-x-auto border">
                    <table className="table text-center">
                        {/* head */}
                        <thead className="bg-base-200 text-base-content">
                            <tr>
                                <th>No</th>
                                <th className="hidden sm:table-cell">Id</th>
                                <th>Nama</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user, index) => (
                                <tr key={user.id} className="border-base-content/5 hover:bg-base-200 border-1">
                                    <td>{index + 1}</td>
                                    <th className="hidden sm:table-cell">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
