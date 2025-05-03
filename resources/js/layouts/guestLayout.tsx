import React from 'react';
import Navbar from '../components/mainApp/navbar';

type Props  = {
    children : React.ReactNode
}

const GuestLayout : React.FunctionComponent<Props> = ({children}) => {
    return (
        <div>
            <Navbar />
            <main>{children}</main>
        </div>
    );
}

export default GuestLayout;
