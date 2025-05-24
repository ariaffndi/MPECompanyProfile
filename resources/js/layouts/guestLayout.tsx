import Navbar from '@/components/website/navbar';
import Footer from '@/components/website/footer';
import React from 'react';
import { Toaster } from 'sonner';

type Props = {
    children: React.ReactNode;
};

const GuestLayout: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <div className="no-scrollbar overflow-x-hidden">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster position="bottom-center" richColors />
        </div>
    );
};

export default GuestLayout;
