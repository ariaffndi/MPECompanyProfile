import ScrollReveal from '@/components/mainApp/scroll-reveal';
import { Link } from '@inertiajs/react';
import ButtonTemplate from '../button-template';


interface project {
    id: number;
    project_name: string;
    location: string;
    project_image: string;
}

interface Props {
    projects: project[];
}

const HomeProject = ({ projects }: Props) => {
   return (
       <section id="homeProject" className="flex w-full flex-col items-start gap-5 md:flex-row my-20">
           <div className="aspect-video place-self-center md:w-1/3 md:place-self-start lg:pl-5">
               <div className="flex h-full items-center justify-center text-center md:text-start">
                   <ScrollReveal direction="right">
                       <h2 className="text-3xl font-light">OUR RECENT</h2>
                       <h2 className="text-3xl font-bold">PROJECT</h2>
                       <Link href="#" className="btn text-base-200 mt-4 w-fit rounded-lg border-none bg-sky-500 shadow-lg hover:bg-sky-600">
                           Show All Project
                       </Link>
                   </ScrollReveal>
               </div>
           </div>
           <div className="grid grid-cols-1 justify-end gap-5 md:w-2/3 md:grid-cols-2">
               {projects.map((project) => (
                   <ScrollReveal direction="left" key={project.id}>
                       <div className="bg-base-100 shadow-md duration-300 ease-in hover:scale-105">
                           <figure>
                               <img loading="lazy" src={`/storage/${project.project_image}`} alt={project.project_name} title={project.project_name} className='aspect-video object-cover w-full'/>
                           </figure>
                           <div className="bg-sky-900 p-2 md:p-3 lg:p-4 text-white">
                               <h2 className="card-title text-md font-bold lg:text-xl">{project.project_name}</h2>
                               <p className="text-sm lg:text-lg">{project.location}</p>
                           </div>
                       </div>
                   </ScrollReveal>
               ))}
           </div>
       </section>
   );
};

export default HomeProject;
