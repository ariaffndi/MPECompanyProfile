import { Company } from '@/types';
import { usePage } from '@inertiajs/react';
import React from 'react';

type AppLogoProps = React.ImgHTMLAttributes<HTMLImageElement>;

export default function AppLogoIcon(props: AppLogoProps) {
    const { company } = usePage<{ company: Company }>().props;

    return <img src={`/storage/${company.logo}`} alt="logo company" {...props} />;
}
