import React from 'react';
import Navbar from '../components/mainApp/navbar';

export default function GuestLayout({ children }) {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
            {/* <Footer /> */}
        </div>
    );
}
