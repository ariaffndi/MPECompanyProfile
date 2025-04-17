import AppLogoIcon from './app-logo-icon';
import { usePage } from '@inertiajs/react';
import { Perusahaan } from '@/types';

export default function AppLogo() {
    const { perusahaan } = usePage<{ perusahaan: Perusahaan }>().props;
    return (
        <div className="flex items-center">
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">{perusahaan.nama_perusahaan}</span>
            </div>
        </div>
    );
}
