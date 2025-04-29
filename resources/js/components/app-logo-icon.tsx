import { usePage } from '@inertiajs/react';
import { Perusahaan } from '@/types';
import React from 'react';

type AppLogoProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function AppLogoIcon(props: AppLogoProps) {
    const { perusahaan } = usePage<{ perusahaan: Perusahaan }>().props;

    return (
        <img
            src={`/storage/${perusahaan.logo_perusahaan}`}
            alt="logo perusahaan"
            {...props} 
        />
    );
}
