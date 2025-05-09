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
   const reversedPartners = partners.slice().reverse();

   return (
      <section id="homePartner" className="mb-10">
            <div className="mb-5">
               <h2 className="text-center text-3xl font-light">PARTNERS &</h2>
               <h2 className="text-center text-3xl font-bold">COLABORATION</h2>
            </div>

            <div className="space-y-8">
               <Swiper
                  slidesPerView="auto"
                  spaceBetween={100}
                  loop={true}
                  speed={10000}
                  allowTouchMove={true}
                  autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
               >
                  {[...partners, ...partners].map((partner, index) => (
                        <SwiperSlide key={`up-${index}`} style={{ width: 'auto' }}>
                           <img
                              width={150}
                              src={`/storage/${partner.logo}`}
                              alt={partner.company_name}
                              className="mx-auto aspect-video object-contain grayscale transition duration-500 hover:grayscale-0 dark:invert"
                           />
                        </SwiperSlide>
                  ))}
               </Swiper>

               <Swiper
                  slidesPerView="auto"
                  spaceBetween={100}
                  loop={true}
                  speed={10000}
                  allowTouchMove={true}
                  autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  dir="rtl"
               >
                  {[...reversedPartners, ...reversedPartners].map((partner, index) => (
                        <SwiperSlide key={`down-${index}`} style={{ width: 'auto' }}>
                           <img
                              width={150}
                              src={`/storage/${partner.logo}`}
                              alt={partner.company_name}
                              className="mx-auto aspect-video object-contain grayscale transition duration-500 hover:grayscale-0 dark:invert"
                           />
                        </SwiperSlide>
                  ))}
               </Swiper>
            </div>
      </section>
   );
};

export default HomePartner;
