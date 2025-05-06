import React from 'react';
import Navbar from '@/components/mainApp/navbar';
import Footer from '@/components/mainApp/footer';

type Props  = {
    children : React.ReactNode
}

const GuestLayout : React.FunctionComponent<Props> = ({children}) => {
    return (
        <div className='overflow-x-hidden no-scrollbar'>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default GuestLayout;
