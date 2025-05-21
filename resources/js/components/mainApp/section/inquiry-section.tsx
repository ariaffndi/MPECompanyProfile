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
    service_image: string;
};

type Product = {
    id: number;
    product_name: string;
    product_image: string;
};

type MergedItem = (Service & { type: 'service' }) | (Product & { type: 'product' });


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
    const { services, products, mergedData } = usePage<{
        services: Service[];
        products: Product[];
        mergedData: MergedItem[];
    }>().props;

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('inquiry.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };
    console.log('mergedData:', mergedData);

    return (
        <section id="homeProject" className="mt-20 flex w-full flex-col md:mt-15 lg:mt-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <ScrollReveal direction="right">
                    <h2 className="mb-10 text-center text-3xl font-light">
                        FORM PERMINTAAN <span className="font-bold">PENAWARAN</span>
                    </h2>
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
                                        <Input
                                            id="phone"
                                            type="number"
                                            required
                                            tabIndex={2}
                                            autoComplete="phone"
                                            placeholder="no telepon"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', parseInt(e.target.value))}
                                        />

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
                                            id="product_id"
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
                                        value={data.detail}
                                        onChange={(e) => setData('detail', e.target.value)}
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
                            {mergedData.map((item) => (
                                <SwiperSlide key={`${item.type}-${item.id}`}>
                                    <div className="relative flex flex-col items-center justify-center">
                                        <img
                                            src={`/storage/${item.type === 'service' ? item.service_image : item.product_image}`}
                                            alt={item.type === 'service' ? item.service_name : item.product_name}
                                            className="aspect-square w-full object-cover shadow-lg"
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
                </ScrollReveal>
            </div>
        </section>
    );
}

