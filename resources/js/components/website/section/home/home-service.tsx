import { CirclePlus } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
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
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper"
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
                                    <div className="absolute bottom-2 w-full text-center text-white lg:bottom-5 lg:p-4">
                                        <h2 className="mx-2 text-xs font-bold md:text-sm lg:mx-4 lg:text-lg">{service.service_name}</h2>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        <SwiperSlide key={`up-${services.length}`}>
                            <a
                                href="#"
                                className="relative m-5 flex aspect-9/16 items-center overflow-hidden shadow-md duration-300 ease-in hover:scale-105"
                            >
                                <CirclePlus size={80} className="absolute w-full text-sky-900 opacity-100 md:scale-100 lg:scale-200" />
                                <div className="absolute inset-0 bg-sky-900 opacity-70"></div>
                                <div className="absolute bottom-2 w-full text-center text-white lg:bottom-5 lg:p-4">
                                    <h2 className="mx-2 text-xs font-light md:text-sm lg:mx-4 lg:text-lg">SHOW MORE</h2>
                                    <h2 className="mx-2 text-xs font-bold md:text-sm lg:mx-4 lg:text-lg">WHAT WE PROVIDE</h2>
                                </div>
                            </a>
                        </SwiperSlide>
                    </Swiper>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default HomeService;
