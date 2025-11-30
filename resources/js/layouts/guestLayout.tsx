import Navbar from '@/components/website/navbar';
import Footer from '@/components/website/footer';
import React from 'react';
import { Toaster } from 'sonner';
import { Head } from '@inertiajs/react';
import WhatsAppFloatingButton from '@/components/website/whatsapp-floating-button';
import { usePage } from '@inertiajs/react';



type Props = {
    children: React.ReactNode;
};

const GuestLayout: React.FunctionComponent<Props> = ({ children }) => {
    const { company } = usePage().props as any;

    return (
        <div className="no-scrollbar overflow-x-hidden">
            <Navbar />
            <Head>
                <script type="application/ld+json">
                    {`
                    {
                      "@context":"https://schema.org",
                      "@type":"Organization",
                      "name":"Mitra Prima Enviro",
                      "url":"https://web.mitraprimaenviro.com",
                      "logo":"https://web.mitraprimaenviro.com/logo.png",
                      "description":"Perusahaan konsultan lingkungan dan pengolahan air limbah (IPAL).",
                      "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "ID",
                        "addressLocality": "Surabaya"
                      }
                    }
                    `}
                </script>
            </Head>
            <main>{children}</main>
            <WhatsAppFloatingButton
                phone={company?.whatsapp ?? '62800000000'}
                message="Halo, saya ingin bertanya mengenai produk dan layanan PT. Mitra Prima Enviro."
                targetId="heroSection"
            />
            <Footer />
            <Toaster position="bottom-center" richColors />
        </div>
    );
};

export default GuestLayout;
