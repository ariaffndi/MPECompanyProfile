import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ScrollReveal from '../scroll-reveal';

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
      <section id="homePartner" className="my-10">
            <div className="mb-5">
               <ScrollReveal direction="left">
                  <h2 className="text-center text-3xl font-light">PARTNERS &</h2>
               </ScrollReveal>
               <ScrollReveal direction="right">
                  <h2 className="text-center text-3xl font-bold">COLABORATION</h2>
               </ScrollReveal>
            </div>

            <div className="space-y-8">
               <Swiper
                  slidesPerView="auto"
                  spaceBetween={75}
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
                              loading="lazy"
                              title={partner.company_name}
                              src={`/storage/${partner.logo}`}
                              alt={partner.company_name}
                              className="mx-auto aspect-video w-[100px] object-contain grayscale transition duration-500 hover:grayscale-0 sm:w-[150px] dark:invert"
                           />
                        </SwiperSlide>
                  ))}
               </Swiper>

               <Swiper
                  slidesPerView="auto"
                  spaceBetween={75}
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
                              title={partner.company_name}
                              src={`/storage/${partner.logo}`}
                              alt={partner.company_name}
                              className="mx-auto aspect-video w-[100px] object-contain grayscale transition duration-500 hover:grayscale-0 sm:w-[150px] dark:invert"
                           />
                        </SwiperSlide>
                  ))}
               </Swiper>
            </div>
      </section>
   );
};

export default HomePartner;
