import React from 'react';
import Navbar from '@/components/mainApp/navbar';
import Footer from '@/components/mainApp/footer';
import { Toaster } from 'sonner';

type Props  = {
    children : React.ReactNode
}

const GuestLayout : React.FunctionComponent<Props> = ({children}) => {
    return (
        <div className='overflow-x-hidden no-scrollbar'>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster position='bottom-center' richColors />
        </div>
    );
}

export default GuestLayout;
