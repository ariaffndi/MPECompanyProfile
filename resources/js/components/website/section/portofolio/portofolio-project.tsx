import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Project {
    id: number;
    project_name: string;
    location: string;
    value: number;
    project_image: string;
    category: {
        category_name: string;
    };
}

interface Category {
    category_name: string;
}

interface Props {
    projects: Project[];
}

const PortofolioProject = ({ projects }: Props) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selected, setSelected] = useState<string>('best');

    useEffect(() => {
        // Extract unique categories from projects
        const uniqueCategories = Array.from(new Set(projects.map((p) => p.category?.category_name)))
            .filter(Boolean)
            .map((name) => ({ category_name: name! }));
        setCategories([{ category_name: 'best' }, ...uniqueCategories]);
    }, [projects]);

    const filtered = projects
        .filter((p) => {
            if (selected === 'best') return true;
            return p.category?.category_name === selected;
        })
        .sort((a, b) => b.value - a.value)
        .slice(0, 17);


    return (
        <section id="portofolioProject" className="scroll-mt-32 my-20">
            <div className="mb-8 flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                    <button
                        key={cat.category_name}
                        className={`btn my-2 w-40 rounded-full border-none px-4 py-2 transition ${selected === cat.category_name ? 'bg-sky-500 text-white' : 'bg-sky-100 text-sky-600'}`}
                        onClick={() => setSelected(cat.category_name)}
                    >
                        {cat.category_name === 'best' ? 'Best Project' : cat.category_name}
                    </button>
                ))}
            </div>

            <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="wait">
                    {filtered.map((project) => (
                        <motion.a
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="group relative cursor-pointer overflow-hidden shadow-lg transition duration-300 ease-in hover:scale-105"
                            href={route('portofolio.show', project.id)}
                        >
                            <img
                                loading="lazy"
                                src={`/storage/${project.project_image}`}
                                alt={project.project_name}
                                title={project.project_name}
                                className="aspect-video w-full object-cover"
                            />
                            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/100 to-transparent p-4 text-center">
                                <h3 className="text-md font-bold text-white lg:text-lg">{project.project_name}</h3>
                                <p className="text-xs text-white lg:text-sm">{project.location}</p>
                            </div>
                        </motion.a>
                    ))}
                    <div className="flex h-full items-center justify-center text-center">
                        <div>
                            <h2 className="text-2xl font-light lg:text-3xl">AND SO MUCH MORE</h2>
                            <h2 className="text-2xl font-bold lg:text-3xl">TO EXPLORE</h2>
                        </div>
                    </div>
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default PortofolioProject;
