import ScrollReveal from '../../scroll-reveal';

interface Gallery {
    id: number;
    activity_name: string;
    activity_image: string;
}

interface Props {
    gallery: Gallery[];
}

const AboutGallery = ({ gallery }: Props) => {
    return (
        <section id="aboutGallery" className="my-20">
            <ScrollReveal direction="up">
                {gallery.length > 0 && (
                    <div className="mb-10">
                        <img loading='lazy' src={`/storage/${gallery[0].activity_image}`} alt={gallery[0].activity_name}  title={gallery[0].activity_name} className="aspect-video w-full object-cover" />
                    </div>
                )}
                <div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {gallery?.slice(1).map((gallery, index) => (
                        <div className="" key={index}>
                                <img src={`/storage/${gallery.activity_image}`} alt={gallery.activity_name} title={gallery.activity_name} className="aspect-video w-full object-cover" />
                        </div>
                    ))}
                </div>
            </ScrollReveal>
        </section>
    );
};

export default AboutGallery;
