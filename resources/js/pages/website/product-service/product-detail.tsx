import ButtonTemplate from '@/components/website/button-template';
import ScrollReveal from '@/components/website/scroll-reveal';
import ContactUs from '@/components/website/section/contact-us';
import ServiceConsultation from '@/components/website/section/service/service-consultation';
import GuestLayout from '@/layouts/guestLayout';
import SectionLayout from '@/layouts/section-layout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';


interface Product {
    id: number;
    product_name: string;
    product_image: string;
    product_description: string;
    product_specification: string;
}

type Company = {
    email: string;
    phone: string;
    whatsapp: string;
};
interface Props {
    product: Product;
}


const ProductDetail = ({ product }: Props) => {
    const { company } = usePage<{ company: Company }>().props;
    const PRICE = 1500000; // harga hardcode (Rp)
    const [qty, setQty] = useState(1);
    const totalPrice = PRICE * qty;

    return (
        <>
            <Head title="Product"></Head>
            <GuestLayout>
                <div className="bg-base-200" id="heroSection">
                    <ScrollReveal direction="up">
                        <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(/storage/${product.product_image})` }}>
                            <div className="absolute inset-0 bg-black/40"></div>
                            <div className="relative z-10 flex h-full flex-col justify-center px-8 pb-12 text-white">
                                <ScrollReveal direction="right">
                                    <div className="mb-4 text-sm font-light tracking-wide uppercase opacity-75">
                                        Product / <span className="font-bold">{product.product_name}</span>
                                    </div>
                                    <h2 className="text-5xl font-bold">{product.product_name}</h2>
                                </ScrollReveal>
                            </div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="left">
                        <ScrollReveal direction="left">
                            <div className="relative z-20 mx-4 -mt-24 grid grid-cols-1 rounded-lg bg-white p-8 shadow-lg md:mx-12 md:grid-cols-2">
                                <div className="order-1 md:order-1">
                                    <ScrollReveal direction="right">
                                        <h2 className="text-center text-3xl font-light text-gray-500">ABOUT</h2>
                                        <h2 className="text-center text-3xl font-bold text-gray-800">OUR PRODUCT</h2>
                                    </ScrollReveal>
                                </div>
                                <div className="order-2 mt-4 md:order-2 md:mt-0">
                                    <ScrollReveal direction="left">
                                        <p className="text-gray-800">{product.product_description}</p>
                                    </ScrollReveal>
                                </div>
                            </div>
                        </ScrollReveal>
                    </ScrollReveal>
                </div>

                <SectionLayout>
                    <section className="mb-20 flex w-full flex-col items-start gap-10 lg:flex-row">
                        <div className="flex w-full justify-center lg:w-1/2">
                            <ScrollReveal direction="right">
                                <img
                                    loading="lazy"
                                    src={`/storage/${product.product_image}`}
                                    alt={product.product_name}
                                    className="w-full max-w-md object-cover shadow-xl lg:aspect-square"
                                />
                            </ScrollReveal>
                        </div>

                        <div className="flex w-full flex-col justify-center lg:w-1/2">
                            <ScrollReveal direction="left">
                                <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-50">Specification</h2>

                                <ul className="my-6 list-disc pl-5 leading-relaxed text-gray-700 dark:text-gray-50">
                                    {product.product_specification
                                        .split('.')
                                        .map((item, index) => item.trim() && <li key={index}>{item.trim()}.</li>)}
                                </ul>

                                {/* Harga */}
                                <div className="mb-4">
                                    <p className="text-sm text-gray-500">Harga</p>
                                    <p className="text-2xl font-bold text-gray-800">Rp {PRICE.toLocaleString('id-ID')}</p>
                                </div>

                                {/* Counter */}
                                <div className="mb-6 flex items-center gap-4">
                                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-10 w-10 rounded-lg border text-lg">
                                        −
                                    </button>

                                    <span className="text-lg font-semibold">{qty}</span>

                                    <button onClick={() => setQty(qty + 1)} className="h-10 w-10 rounded-lg border text-lg">
                                        +
                                    </button>

                                    <span className="ml-4 text-sm text-gray-600">
                                        Total: <strong>Rp {totalPrice.toLocaleString('id-ID')}</strong>
                                    </span>
                                </div>

                                {/* WhatsApp */}
                                <a
                                    href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                                        `Halo, saya ingin memesan produk ${product.product_name}
Jumlah: ${qty}
Harga satuan: Rp ${PRICE.toLocaleString('id-ID')}
Total: Rp ${totalPrice.toLocaleString('id-ID')}`,
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ButtonTemplate size="btn-md">Pesan Sekarang</ButtonTemplate>
                                </a>
                            </ScrollReveal>
                        </div>
                    </section>
                    <ServiceConsultation />
                    <ContactUs />
                </SectionLayout>
            </GuestLayout>
        </>
    );
};

export default ProductDetail;
