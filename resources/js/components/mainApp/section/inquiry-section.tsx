import InputError from '@/components/input-error';
import ScrollReveal from '@/components/mainApp/scroll-reveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { Autoplay, EffectCreative } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type InquiryForm = {
    name: string;
    email: string;
    phone: number;
    service_id: number;
    product_id: number;
    detail: string;
    status: string;
};

type Service = {
    id: number;
    service_name: string;
};

type Product = {
    id: number;
    product_name: string;
};

export default function InquirySection() {
    const { data, setData, post, processing, errors, reset } = useForm<InquiryForm>({
        name: '',
        email: '',
        phone: 0,
        service_id: 0,
        product_id: 0,
        detail: '',
        status: 'pending',
    });
    const { services, products } = usePage<{
        services: Service[];
        products: Product[];
    }>().props;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('inquiry.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <section id="homeProject" className="mt-20 flex w-full flex-col md:mt-15 lg:mt-10">
            <div className="mb-10 w-full">
                <h2 className="text-center text-3xl font-light">
                    FORM PERMINTAAN <span className="font-bold">PENAWARAN</span>
                </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <ScrollReveal direction="right">
                    <div>
                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nama</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Nama Perorangan / Perusahaan"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            autoComplete="email"
                                            placeholder="email@example.com"
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone">No. Telp </Label>
                                        <Input id="phone" type="number" required tabIndex={2} autoComplete="phone" placeholder="no telepon" />
                                        <InputError message="" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="w grid gap-2">
                                        <Label htmlFor="service">
                                            Layanan <span className="text-xs font-light text-red-600">*opsional</span>
                                        </Label>
                                        <select
                                            id="service_id"
                                            value=""
                                            required
                                            onChange={(e) => setData('service_id', parseInt(e.target.value))}
                                            className="w-full rounded-md border border-gray-300 p-2"
                                        >
                                            <option value="">-- Pilih Layanan --</option>
                                            {services.map((service: Service) => (
                                                <option key={service.id} value={service.id}>
                                                    {service.service_name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.service_id} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="service">
                                            Layanan <span className="text-xs font-light text-red-600">*opsional</span>
                                        </Label>

                                        <select
                                            id="service_id"
                                            value=""
                                            required
                                            onChange={(e) => setData('service_id', parseInt(e.target.value))}
                                            className="w-full rounded-md border border-gray-300 p-2"
                                        >
                                            <option value="">-- Pilih Produk --</option>
                                            {products.map((product: Product) => (
                                                <option key={product.id} value={product.id}>
                                                    {product.product_name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.service_id} />
                                    </div>
                                    <p className="text-xs font-light text-red-600">*Kosongkan jika tidak diperlukan!</p>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="inquiry detail">Detail Pemesanan</Label>
                                    <textarea
                                        id="inquiry_detail"
                                        rows={5}
                                        className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                                        required
                                        placeholder="Deskripsikan pesanan anda!"
                                    />
                                </div>
                            </div>
                        </form>
                        <Button
                            type="submit"
                            className="btn btn-md my-4 w-fit rounded-lg border-none bg-sky-500 text-white shadow-none hover:bg-sky-600"
                            tabIndex={4}
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Submit
                        </Button>
                    </div>
                </ScrollReveal>
                <ScrollReveal direction="left">
                    <div className="">
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
                            <SwiperSlide>Slide 1</SwiperSlide>
                            <SwiperSlide>Slide 2</SwiperSlide>
                            <SwiperSlide>Slide 3</SwiperSlide>
                            <SwiperSlide>Slide 4</SwiperSlide>
                            <SwiperSlide>Slide 5</SwiperSlide>
                            <SwiperSlide>Slide 6</SwiperSlide>
                            <SwiperSlide>Slide 7</SwiperSlide>
                            <SwiperSlide>Slide 8</SwiperSlide>
                            <SwiperSlide>Slide 9</SwiperSlide>
                        </Swiper>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
