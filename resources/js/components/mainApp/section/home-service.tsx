import React from 'react'
import ScrollReveal from '../scroll-reveal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { CirclePlus } from 'lucide-react';

interface service {
   id: number;
   service_name: string;
   service_description: string;
   service_image: string;
}

interface Props {
   services: service[];
}


const HomeService = ({ services }: Props) => {
   return (
      <section id="homeService" className="mb-10">
         <div className="mb-5">
               <ScrollReveal direction="up">
                  <h2 className="text-center text-3xl font-light">
                     WHAT WE <span className="text-3xl font-bold">OFFER</span>
                  </h2>
               </ScrollReveal>
         </div>
         <div className="mb-5 w-full">
               <ScrollReveal direction="up">
                  <Swiper
                     slidesPerView={4}
                     spaceBetween={0}
                     pagination={{
                           clickable: true,
                     }}
                     navigation={true}
                     modules={[Navigation]}
                     className="mySwiper"
                  >
                     {services.map((service, index) => (
                     <SwiperSlide key={`up-${index}`}>
                        <div className="relative m-8 aspect-9/16 overflow-hidden shadow-md duration-300 ease-in hover:scale-110">
                           <img
                                 loading="lazy"
                                 title={service.service_name}
                                 src={`/storage/${service.service_image}`}
                                 alt={service.service_name}
                                 className="h-full w-full object-cover"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-sky-900 to-transparent opacity-100"></div>
                           <div className="absolute bottom-5 w-full p-4 text-center text-white">
                                 <h2 className="mx-auto w-2/3 text-lg font-bold">{service.service_name}</h2>
                           </div>
                        </div>
                     </SwiperSlide>
                     ))}
                     <SwiperSlide key={`up-${services.length}`}>
                           <a href='#' className="relative m-5 flex aspect-9/16 items-center overflow-hidden shadow-md duration-300 ease-in hover:scale-110">
                              <CirclePlus size={160} className="absolute w-full text-sky-900 opacity-100" />
                              <div className="absolute inset-0 bg-sky-900 opacity-70"></div>
                              <div className="absolute bottom-5 w-full p-4 text-center text-white">
                                 <h2 className="mx-auto w-2/3 text-lg font-light">SHOW MORE</h2>
                                 <h2 className="mx-auto text-lg font-bold">WHAT WE PROVIDE</h2>
                              </div>
                           </a>
                     </SwiperSlide>
                  </Swiper>
               </ScrollReveal>
         </div>
      </section>
   );
}

export default HomeService