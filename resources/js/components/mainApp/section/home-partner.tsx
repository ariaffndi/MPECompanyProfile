import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface Partner {
   id: number;
   company_name: string;
   logo: string;
}
interface Props {
   partners: Partner[];
}
const HomePartner = ({ partners }: Props) => {
   return (
      <section id='homePartner' className="mb-10">
            <div className="mb-5">
               <h2 className="text-center text-3xl font-light">PARTNERS &</h2>
               <h2 className="text-center text-3xl font-bold">COLABORATION</h2>
            </div>
            <div className="swiper-wrapper my-5">
               <Swiper
                  slidesPerView="auto"
                  spaceBetween={100}
                  loop={true}
                  speed={4000}
                  allowTouchMove={true}
                  autoplay={{
                        delay: 1,
                        disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
               >
                  {partners.map((partner) => (
                        <SwiperSlide key={partner.id} style={{ width: 'auto' }}>
                           <img
                              width={150}
                              src={`/storage/${partner.logo}`}
                              alt={partner.company_name}
                              className="mx-auto aspect-video rounded-lg border-1 object-contain"
                           />
                        </SwiperSlide>
                  ))}
               </Swiper>
            </div>
            <div className="swiper-wrapper my-5">
               <Swiper
                  slidesPerView="auto"
                  spaceBetween={100}
                  loop={true}
                  speed={4000}
                  allowTouchMove={true}
                  autoplay={{
                        delay: 1,
                        disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  dir="rtl"
               >
                  {partners.reverse().map((partner) => (
                        <SwiperSlide key={partner.id} style={{ width: 'auto' }}>
                           <img
                              width={150}
                              src={`/storage/${partner.logo}`}
                              alt={partner.company_name}
                              className="mx-auto aspect-video rounded-lg border-1 object-contain"
                           />
                        </SwiperSlide>
                  ))}
               </Swiper>
            </div>
      </section>
   );
};

export default HomePartner;
