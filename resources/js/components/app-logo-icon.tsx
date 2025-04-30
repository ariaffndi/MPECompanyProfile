import { Company } from '@/types';
import { usePage } from '@inertiajs/react';
import React from 'react';

type AppLogoProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function AppLogoIcon(props: AppLogoProps) {
    const { perusahaan } = usePage<{ perusahaan: Company }>().props;

    return <img src={`/storage/${perusahaan.logo}`} alt="logo perusahaan" {...props} />;
}
