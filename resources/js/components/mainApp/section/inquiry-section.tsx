import ScrollReveal from '@/components/mainApp/scroll-reveal';
import { usePage } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import InquiryForm from '../inquiry-form';
import InquirySlider from '../inquiry-slider';

type Service = {
    id: number;
    service_name: string;
    service_image: string;
};

type Product = {
    id: number;
    product_name: string;
    product_image: string;
};

type MergedItem = (Service & { type: 'service' }) | (Product & { type: 'product' });

export default function InquirySection() {
    const { mergedData } = usePage<{ mergedData: MergedItem[] }>().props;
    return (
        <section id="homeProject" className="mt-20 flex w-full flex-col md:mt-15 lg:mt-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <ScrollReveal direction="right">
                    <h2 className="mb-10 text-center text-3xl font-light">
                        FORM PERMINTAAN <span className="font-bold">PENAWARAN</span>
                    </h2>
                    <InquiryForm />
                </ScrollReveal>
                <ScrollReveal direction="left">
                    <InquirySlider mergedData={mergedData} />
                </ScrollReveal>
            </div>
        </section>
    );
}
