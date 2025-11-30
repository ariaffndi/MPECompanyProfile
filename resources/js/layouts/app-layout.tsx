import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Head } from '@inertiajs/react';


interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
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
        <Toaster richColors position="top-right" />
    </AppLayoutTemplate>
);
