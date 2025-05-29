import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ButtonTemplate from '../../button-template';
import ScrollReveal from '../../scroll-reveal';

interface service {
    id: number;
    service_name: string;
    service_image: string;
    service_description: string;
}

interface Props {
    services: service[];
}

const ServiceService = ({ services }: Props) => {
    return (
        <section id="serviceService" className="my-20">
            <div className="mb-5">
                <ScrollReveal direction="up">
                    <h2 className="text-center text-3xl font-light">INNOVATIVE SERVICE</h2>
                    <h2 className="text-center text-3xl font-bold">FOR YOUR SUCCESS</h2>
                </ScrollReveal>
            </div>
            <ScrollReveal direction="up">
                <div className="my-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                        <div key={service.id} className="card h-full">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className="card bg-base-100 h-full shadow-sm transition duration-300 ease-in hover:scale-105 hover:cursor-pointer">
                                        <figure className="px-5 pt-5">
                                            <img
                                                loading="lazy"
                                                className="aspect-video w-full object-cover"
                                                src={`/storage/${service.service_image}`}
                                                alt={service.service_name}
                                            />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title">{service.service_name}</h2>
                                            <p className="truncate">{service.service_description}</p>
                                        </div>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogTitle>Service Details</DialogTitle>
                                    <DialogDescription className="max-h-[400px] overflow-y-auto">
                                        <figure>
                                            <img
                                                src={`/storage/${service.service_image}`}
                                                alt={service.service_name}
                                                className="mx-auto aspect-square max-w-[200px] rounded-lg object-cover"
                                            />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title">{service.service_name}</h2>
                                            <p className="whitespace-pre-line">{service.service_description}</p>
                                        </div>
                                    </DialogDescription>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <button className="btn btn-gray m-1 w-fit rounded-lg">Back</button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    ))}

                    <div className="flex h-full items-center justify-center text-center">
                        <div>
                            <h2 className="text-3xl font-light">DO YOU HAVE A</h2>
                            <h2 className="text-3xl font-bold">DIFFERENT PLAN?</h2>
                            <ButtonTemplate size="btn-md">
                                <a href="#">Lets Talk</a>
                            </ButtonTemplate>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default ServiceService;
