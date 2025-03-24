import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Instagram, Mail, Phone, MessageCircle, Facebook } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
   {
      title: 'Perusahaan',
      href: '/perusahaan',
   },
];

export default function Dashboard() {
   return (
       <AppLayout breadcrumbs={breadcrumbs}>
           <Head title="Perusahaan" />
           <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
               <Link href='' className="btn btn-sm btn-info w-fit rounded-xl">
                   Edit Data
               </Link>
               <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                   <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex aspect-video flex-col overflow-hidden rounded-xl border">
                       <div className="flex w-full flex-1 items-center p-4">
                           <p className="text-3xl font-bold">PT. Mitra Prima Enviro</p>
                       </div>
                       <div className="flex w-full flex-1 p-4">
                           <p>Alamat Perusahaan Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, laudantium?</p>
                       </div>
                   </div>

                   <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex aspect-video flex-col justify-between overflow-hidden rounded-xl">
                       <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                           <div className="flex w-full flex-1 items-center gap-2">
                               <div>
                                   <Mail size={20} />
                               </div>
                               <div>
                                   <p className="text-md">admin@mitraprimaenviro.com</p>
                               </div>
                           </div>
                       </div>
                       <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                           <div className="flex w-full flex-1 items-center gap-2">
                               <div>
                                   <Phone size={20} />
                               </div>
                               <div>
                                   <p className="text-md">(031) 5924526</p>
                               </div>
                           </div>
                       </div>
                       <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                           <div className="flex w-full flex-1 items-center gap-2">
                               <div>
                                   <MessageCircle size={20} />
                               </div>
                               <div>
                                   <p className="text-md">+62 812-5942-9377</p>
                               </div>
                           </div>
                       </div>
                       <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                           <div className="flex w-full flex-1 items-center gap-2">
                               <div>
                                   <Instagram size={20} />
                               </div>
                               <div>
                                   <p className="text-md">@mitraprimaenviro</p>
                               </div>
                           </div>
                       </div>
                       <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex w-full flex-col overflow-hidden rounded-xl border p-1.5">
                           <div className="flex w-full flex-1 items-center gap-2">
                               <div>
                                   <Facebook size={20} />
                               </div>
                               <div>
                                   <p className="text-md">PT. Mitra Prima Enviro</p>
                               </div>
                           </div>
                       </div>
                   </div>
                   <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                       <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                   </div>
               </div>
               <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-4">
                   <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nihil nam provident, corrupti libero magnam quam sequi velit, saepe eos itaque aut quia eligendi laudantium, fuga odit reiciendis laborum ea officia! Doloribus eius quaerat dolores maxime culpa, voluptas ipsam cumque obcaecati repellendus ea laboriosam quis eos, laudantium excepturi! Vitae perspiciatis ratione sequi maxime consequatur incidunt facilis quidem architecto tempora blanditiis, magni dicta, quod fuga odio ea molestias? Alias aut similique hic incidunt, tempora temporibus reiciendis omnis. Unde odit debitis amet eius soluta praesentium temporibus aspernatur! Dolor adipisci saepe sapiente eligendi dolore cupiditate quas ea. Ut quasi natus odit ducimus modi.
                     <br /><br />
                     Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic ad, cum exercitationem dolor nesciunt unde nostrum at quo, dolores, reiciendis suscipit deserunt distinctio ab cupiditate sit optio. Reprehenderit eius nemo laborum recusandae, beatae, dolore adipisci tempore repudiandae voluptate consequuntur minima vel nesciunt possimus illo dolorem vero odit delectus ducimus illum!
                   </p>
               </div>
           </div>
       </AppLayout>
   );
}
