import ScrollReveal from '@/components/website/scroll-reveal';
import ButtonTemplate from '../../button-template';

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
        <section id="homeProject" className="my-20 flex w-full flex-col items-start gap-5 md:flex-row">
            <div className="aspect-video place-self-center md:w-1/3 md:place-self-start lg:pl-5">
                <div className="flex h-full items-center justify-center text-center md:text-start">
                    <ScrollReveal direction="right">
                        <h2 className="text-3xl font-light">OUR RECENT</h2>
                        <h2 className="text-3xl font-bold">PROJECT</h2>
                        <ButtonTemplate size="btn-md">
                            <a href="#">Show All Project</a>
                        </ButtonTemplate>
                    </ScrollReveal>
                </div>
            </div>
            <div className="grid grid-cols-1 justify-end gap-5 md:w-2/3 md:grid-cols-2">
                {projects.map((project) => (
                    <ScrollReveal direction="left" key={project.id}>
                        <div className="bg-base-100 shadow-md duration-300 ease-in hover:scale-105">
                            <figure>
                                <img
                                    loading="lazy"
                                    src={`/storage/${project.project_image}`}
                                    alt={project.project_name}
                                    title={project.project_name}
                                    className="aspect-video w-full object-cover"
                                />
                            </figure>
                            <div className="bg-sky-900 p-2 text-white md:p-3 lg:p-4">
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
