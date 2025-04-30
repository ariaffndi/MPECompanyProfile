import Pagination from '@/components/pagination';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useFlashToast } from '@/hooks/useFlashToast';
import { usePaginationParam } from '@/hooks/usePaginationParam';
import { useSearchSort } from '@/hooks/useSearchSort';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Info, Pencil, PlusCircle, Trash2 } from 'lucide-react';
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
   const { project, all_project } = usePage<{ project: Paginator<Project>; all_project: Project[] }>().props;
   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
   const { page, setPage } = usePaginationParam();
   const { search, setSearch, sortOrder, toggleSort } = useSearchSort(all_project, (projectItem) => projectItem.year.toString());
   const [currentSortField, setCurrentSortField] = useState<string>('year');

   useFlashToast();

   const handleDelete = () => {
      if (selectedProject)
            router.delete(route('project.destroy', selectedProject.id), {
               preserveScroll: true,
               preserveState: true,
               data: { page: project.current_page },
               onSuccess: () => {
                  setSelectedProject(null);
               },
            });
   };

   const handlePageChange = (newPage: number) => {
      setPage(newPage);
      router.get(
            route('project.index'),
            { page: newPage, sort: sortOrder, sortField: currentSortField, search },
            {
               preserveScroll: true,
               preserveState: true,
            },
      );
   };

   const handleSearch = (setSearch: string) => {
      router.get(
            route('project.index'),
            { search: setSearch },
            {
               preserveScroll: true,
               preserveState: true,
               replace: true,
            },
      );
   };

   const handleSort = (field: string) => {
      const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setCurrentSortField(field);
      toggleSort();
      router.get(
            route('project.index'),
            { search, sort: newSortOrder, sortField: field, page: 1 },
            {
               preserveScroll: true,
               preserveState: true,
               replace: true,
            },
      );
   };

   const handleExportCSV = () => {
      window.open('/export-projects', '_blank');
   };

   return (
      <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Project" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
               <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <Link href={route('project.create')} className="btn btn-sm btn-info w-fit rounded-xl">
                        <PlusCircle size={16} /> Tambah Data
                  </Link>
                  <div className="flex flex-col justify-between gap-2 sm:flex-row">
                        <button className="btn btn-sm btn-success w-fit rounded-xl" onClick={handleExportCSV}>
                           Export CSV
                        </button>
                        <label className="input input-sm w-fit rounded-xl border-1">
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
                              <th>Nama Project</th>
                              <th>Klien</th>
                              <th>Kategori</th>
                              <th>Lokasi</th>
                              <th className="cursor-pointer" onClick={() => handleSort('year')}>
                                    Tahun {sortOrder === 'asc' ? '↑' : '↓'}
                              </th>
                              <th>Harga</th>
                              <th>Deskripsi</th>
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
                                    <td>{projectItem.client.client_type}</td>
                                    <td>{projectItem.category.category_name}</td>
                                    <td>{projectItem.location}</td>
                                    <td>{projectItem.year}</td>
                                    <td>Rp.{projectItem.value}</td>
                                    <td className="max-w-[100px] truncate whitespace-nowrap">{projectItem.description}</td>
                                    <td className="hidden sm:table-cell">
                                       <img
                                          src={`/storage/${projectItem.project_image}`}
                                          alt={projectItem.project_name}
                                          className="mx-auto h-16 w-16 rounded-lg object-cover"
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
                                                               src={`/storage/${projectItem.project_image}`}
                                                               alt={projectItem.project_name}
                                                               className="mx-auto aspect-square max-w-[200px] rounded-lg object-cover"
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
                                                href={route('project.edit', { id: projectItem.id }) + `?page=${page}`}
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
