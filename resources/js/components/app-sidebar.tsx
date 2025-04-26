import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, LayoutGrid, UserRoundCog, Building, Package, HandPlatter, Handshake, Hammer, NotebookPen  } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },

    {
        title: 'Perusahaan',
        href: '/admin/perusahaan',
        icon: Building,
    },
    {
        title: 'Admin',
        href: '/admin/users',
        icon: UserRoundCog,
    },
    {
        title: 'Produk',
        href: '/admin/product',
        icon: Package,
    },
    {
        title: 'Layanan',
        href: '/admin/service',
        icon: HandPlatter,
    },
    {
        title: 'Partner',
        href: '/admin/partner',
        icon: Handshake,
    },
    {
        title: 'Project',
        href: '/admin/project',
        icon: Hammer,
    },
    {
        title: 'Pemesanan',
        href: '/admin/inquiry',
        icon: NotebookPen,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Website',
        href: '/',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
