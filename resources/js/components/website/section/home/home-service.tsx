import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ButtonTemplate from '../../button-template';
import ScrollReveal from '../../scroll-reveal';

interface service {
    id: number;
    service_name: string;
    service_image: string;
}

interface Props {
    services: service[];
}

const HomeService = ({ services }: Props) => {
    return (
        <section id="homeService" className="my-20">
            <div className="mb-5">
                <ScrollReveal direction="up">
                    <h2 className="text-center text-3xl font-light">
                        WHAT WE <span className="text-3xl font-bold">OFFER</span>
                    </h2>
                </ScrollReveal>
            </div>

            <div className="relative mx-auto mb-5 w-full max-w-screen">
                <ScrollReveal direction="up">
                    <div className="relative mx-auto mb-5 w-full max-w-screen">
                        <button className="btn-prev-service absolute top-1/2 left-0 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white hover:bg-black/60">
                            <ChevronLeft size={22} />
                        </button>

                        <button className="btn-next-service absolute top-1/2 right-0 z-20 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white hover:bg-black/60">
                            <ChevronRight size={22} />
                        </button>

                        <Swiper
                            spaceBetween={0}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={{
                                nextEl: '.btn-next-service',
                                prevEl: '.btn-prev-service',
                            }}
                            modules={[Navigation]}
                            className="mySwiper"
                            loop={true}
                            breakpoints={{
                                320: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                        >
                            {services.map((service) => (
                                <SwiperSlide key={`up-${service.id}`}>
                                    <div className="relative m-5 aspect-9/16 overflow-hidden shadow-md duration-300 ease-in hover:scale-105">
                                        <img
                                            loading="lazy"
                                            title={service.service_name}
                                            src={`/storage/${service.service_image}`}
                                            alt={service.service_name}
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-sky-900 to-transparent opacity-100"></div>
                                        <div className="absolute inset-0 flex items-center justify-center p-4 text-white">
                                            <h2 className="mx-2 text-xs font-bold md:text-sm lg:mx-4 lg:text-lg">{service.service_name}</h2>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </ScrollReveal>
                <div className="my-10 text-center">
                    <ButtonTemplate size="btn-md">
                        <Link href="/services#serviceService">Show More</Link>
                    </ButtonTemplate>
                </div>
            </div>
        </section>
    );
};

export default HomeService;
