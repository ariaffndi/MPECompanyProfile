import { usePage } from '@inertiajs/react';

import { Perusahaan } from '@/types';

export default function AppLogoIcon() {
    const { perusahaan } = usePage<{ perusahaan: Perusahaan }>().props;

    return <img src={`/storage/${perusahaan.logo_perusahaan}`} alt="logo perusahaan" />;
}
