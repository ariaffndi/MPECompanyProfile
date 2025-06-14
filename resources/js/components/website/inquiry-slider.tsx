import 'swiper/css';
import 'swiper/css/effect-creative';
import { Autoplay, EffectCreative } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type MergeItem = {
    id: number;
    type: 'service' | 'product';
    service_name?: string;
    service_image?: string;
    product_name?: string;
    product_image?: string;
};

const InquirySlider = ({mergedData}:{ mergedData : MergeItem[]}) => {
    return (
        <div className="w-full lg:max-w-lg lg:mt-20 md:mt-15 mt-10 mx-auto">
            <Swiper
                grabCursor={true}
                effect={'creative'}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: [0, 0, -400],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }}
                modules={[EffectCreative, Autoplay]}
                className="mySwiper"
            >
                {mergedData.map((item) => (
                    <SwiperSlide key={`${item.type}-${item.id}`}>
                        <div className="relative flex flex-col items-center justify-center">
                            <img
                                src={`/storage/${item.type === 'service' ? item.service_image : item.product_image}`}
                                alt={item.type === 'service' ? item.service_name : item.product_name}
                                className="aspect-square w-full object-cover shadow-lg md:aspect-video lg:aspect-square"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-sky-900 to-transparent opacity-100"></div>
                            <div className="absolute bottom-2 w-full text-center text-white lg:bottom-5 lg:p-4">
                                <h2 className="mx-2 text-xs font-bold md:text-sm lg:mx-4 lg:text-xl">
                                    {item.type === 'service' ? item.service_name : item.product_name}
                                </h2>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default InquirySlider;
