import ButtonAddData from '@/components/button-add-data';
import Pagination from '@/components/pagination';
import SearchInput from '@/components/search-input';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useFilterSortPagination } from '@/hooks/useFilterSortPagination';
import { useFlashToast } from '@/hooks/useFlashToast';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Info, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Project', href: '/project' }];

type Project = {
   id: number;
   project_name: string;
   client: {
      id: number;
      client_type: string;
   };
   category: {
      id: number;
      category_name: string;
   };
   location: string;
   year: number;
   value: number;
   description: string;
   project_image: string;
};

type Paginator<T> = {
   data: T[];
   current_page: number;
   last_page: number;
   per_page: number;
   next_page_url: string | null;
   prev_page_url: string | null;
};

export default function Project() {
   const { project } = usePage<{ project: Paginator<Project> }>().props;
   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
   const { search, sortOrder, sortField, page, handlePageChange, handleSearch } = useFilterSortPagination(
      'project.index',
      project.data,
      (projectItem) => projectItem.year.toString(),
   );

   useFlashToast();

   const handleDelete = () => {
      if (selectedProject)
            router.delete(route('project.destroy', selectedProject.id), {
               preserveScroll: true,
               preserveState: true,
               data: { page: project.current_page, search, sort: sortOrder, sortField },
               onSuccess: () => {
                  setSelectedProject(null);
               },
            });
   };

   const handleExportCSV = () => {
      window.open('/export-projects', '_blank');
   };

   return (
      <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
               <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <ButtonAddData href={route('project.create')} />
                  <div className="flex flex-col justify-between gap-2 sm:flex-row">
                        <button className="btn btn-sm btn-success w-fit rounded-xl" onClick={handleExportCSV}>
                           Export CSV
                        </button>
                        <SearchInput value={search} onChange={handleSearch} />
                  </div>
               </div>

               <div className="rounded-box border-base-content/5 w-full overflow-x-auto border">
                  <table className="table-pin-rows table min-w-full text-center">
                        <thead>
                           <tr className="bg-base-300 text-base-content">
                              <th>No</th>
                              <th>Nama Project</th>
                              <th className="hidden sm:table-cell">Klien</th>
                              <th className="hidden sm:table-cell">Kategori</th>
                              <th className="hidden sm:table-cell">Lokasi</th>
                              <th>
                                    Tahun
                              </th>
                              <th className="hidden sm:table-cell">Harga</th>
                              <th className="hidden sm:table-cell">Deskripsi</th>
                              <th className="hidden sm:table-cell">Foto</th>
                              <th>Aksi</th>
                           </tr>
                        </thead>
                        <tbody>
                           {project.data.map((projectItem, index) => (
                              <tr
                                    key={projectItem.id}
                                    className="border-base-content/5 hover:bg-base-200 border-1"
                                    onClick={() => setSelectedProject(projectItem)}
                              >
                                    <td>{(project.current_page - 1) * project.per_page + index + 1}</td>
                                    <td>{projectItem.project_name}</td>
                                    <td className="hidden sm:table-cell">{projectItem.client.client_type}</td>
                                    <td className="hidden sm:table-cell">{projectItem.category.category_name}</td>
                                    <td className="hidden sm:table-cell">{projectItem.location}</td>
                                    <td>{projectItem.year}</td>
                                    <td className="hidden sm:table-cell">Rp.{projectItem.value}</td>
                                    <td className="max-w-[100px] truncate whitespace-nowrap hidden sm:table-cell">{projectItem.description}</td>
                                    <td className="hidden sm:table-cell">
                                       <img
                                          width={50}
                                          src={`/storage/${projectItem.project_image}`}
                                          alt={projectItem.project_name}
                                          className="mx-auto aspect-square rounded-lg object-cover"
                                       />
                                    </td>
                                    <td>
                                       <div className="flex flex-nowrap items-center justify-center gap-1">
                                          <Dialog>
                                                <DialogTrigger asChild>
                                                   <button
                                                      title="Detail"
                                                      className="btn btn-sm btn-square btn-soft btn-info m-0.5"
                                                      onClick={() => setSelectedProject(projectItem)}
                                                   >
                                                      <Info size={20} />
                                                   </button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                   <DialogTitle>Detail Project</DialogTitle>
                                                   <DialogDescription className="max-h-[400px] overflow-y-auto">
                                                      <figure>
                                                            <img
                                                               height={200}
                                                               src={`/storage/${projectItem.project_image}`}
                                                               alt={projectItem.project_name}
                                                               className="mx-auto aspect-video rounded-lg object-cover"
                                                            />
                                                      </figure>
                                                      <div className="card-body">
                                                            <h2 className="card-title">{projectItem.project_name}</h2>
                                                            <p>Klien: {projectItem.client.client_type}</p>
                                                            <p>Kategori: {projectItem.category.category_name}</p>
                                                            <p>Lokasi Proyek: {projectItem.location}</p>
                                                            <p>Tahun Proyek: {projectItem.year}</p>
                                                            <p>Nilai Proyek: {projectItem.value}</p>
                                                            <p className="whitespace-pre-line">{projectItem.description}</p>
                                                      </div>
                                                   </DialogDescription>
                                                   <DialogFooter>
                                                      <DialogClose asChild>
                                                            <button className="btn btn-gray m-1 w-fit rounded-lg">Kembali</button>
                                                      </DialogClose>
                                                   </DialogFooter>
                                                </DialogContent>
                                          </Dialog>
                                          <Link
                                                href={
                                                   route('project.edit', { id: projectItem.id }) +
                                                   `?page=${page}&search=${search}&sort=${sortOrder}&sortField=${sortField}`
                                                }
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
                                                      onClick={() => setSelectedProject(projectItem)}
                                                   >
                                                      <Trash2 size={20} />
                                                   </button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                   <DialogTitle>Konfirmasi Hapus</DialogTitle>
                                                   <DialogDescription>
                                                      Apakah Anda yakin ingin menghapus layanan <strong>{selectedProject?.project_name}</strong>?
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
               <Pagination currentPage={project.current_page} lastPage={project.last_page} onPageChange={handlePageChange} />
            </div>
      </AppLayout>
   );
}
