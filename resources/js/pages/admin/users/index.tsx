import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
   {
      title: 'Users',
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
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
               <Link href={route('register')} className="btn btn-info w-fit rounded-xl">
                  Tambah Data
               </Link>

               <div className="rounded-box border-base-content/5 bg-base-100 overflow-x-auto border">
                  <table className="table">
                        {/* head */}
                        <thead className="bg-base-200 text-base-content text-center">
                           <tr>
                              <th>No</th>
                              <th>Id</th>
                              <th>Name</th>
                              <th>Email Address</th>
                           </tr>
                        </thead>
                        <tbody className="text-center">
                           {users?.map((user, index) => (
                              <tr key={user.id}>
                                 <td>{index + 1}</td>
                                 <th>{user.id}</th>
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
