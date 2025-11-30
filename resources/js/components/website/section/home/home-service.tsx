import { Link } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
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
            <div className="mx-auto mb-5 w-full max-w-screen">
                <ScrollReveal direction="up">
                    <Swiper
                        spaceBetween={0}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                        loop={true}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                    >
                        {services.map((service) => (
                            <SwiperSlide key={`up-${service.id}`}>
                                <div className="relative m-5 aspect-9/16 overflow-hidden shadow-md duration-300 ease-in hover:scale-105 hover:cursor-pointer">
                                <a href={route('services.show', service.id)}>
                                    <img
                                        loading="lazy"
                                        title={service.service_name}
                                        src={`/storage/${service.service_image}`}
                                        alt={service.service_name}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-sky-900 to-transparent opacity-100"></div>
                                    <div className="absolute bottom-2 w-full text-center text-white lg:bottom-5 lg:p-4">
                                        <h2 className="mx-2 text-md font-bold lg:mx-4 lg:text-lg">{service.service_name}</h2>
                                    </div>
                                </a>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="my-10 text-center">
                        <ButtonTemplate size="btn-md">
                            <Link href="/services#serviceService">Show More</Link>
                        </ButtonTemplate>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default HomeService;
