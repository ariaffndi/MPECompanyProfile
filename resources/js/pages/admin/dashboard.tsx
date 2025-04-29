'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { HandPlatter, Handshake, Package, TrendingDown, TrendingUp, Users } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
];

interface DashboardProps {
    productsCount: number;
    servicesCount: number;
    teamsCount: number;
    partnersCount: number;
    chartData: {
        year: string;
        pemerintah: number;
        swasta: number;
    }[];
}

export default function Dashboard() {
    const { productsCount, servicesCount, teamsCount, partnersCount, chartData } = usePage<{ props: DashboardProps }>().props;



    const chartConfig = {
        pemerintah: {
            label: 'Pemerintah  ',
            color: 'hsl(var(--chart-1))',
        },
        swasta: {
            label: 'Swasta',
            color: 'hsl(var(--chart-2))',
        },
    } satisfies ChartConfig;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border stats relative aspect-video overflow-hidden rounded-xl border shadow">
                        <div className="stat">
                            <div className="stat-title flex gap-2">
                                <Package size={20} /> Total Produk
                            </div>
                            <div className="stat-value">{productsCount}</div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border stats relative aspect-video overflow-hidden rounded-xl border shadow">
                        <div className="stat">
                            <div className="stat-title flex gap-2">
                                <HandPlatter size={20} /> Total Layanan
                            </div>
                            <div className="stat-value">{servicesCount}</div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border stats relative aspect-video overflow-hidden rounded-xl border shadow">
                        <div className="stat">
                            <div className="stat-title flex gap-2">
                                <Users size={20} /> Total Karyawan
                            </div>
                            <div className="stat-value">{teamsCount}</div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border stats relative aspect-video overflow-hidden rounded-xl border shadow">
                        <div className="stat">
                            <div className="stat-title flex gap-2">
                                <Handshake size={20} /> Total Partner
                            </div>
                            <div className="stat-value">{partnersCount}</div>
                        </div>
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Project</CardTitle>
                        <CardDescription>Menunjukkan total proyek selesai selama 6 tahun terakhir</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="h-[280px] w-full">
                            <AreaChart
                                accessibilityLayer
                                data={chartData}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 4)} />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                                <Area
                                    dataKey="swasta"
                                    type="natural"
                                    fill="var(--color-swasta)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-swasta)"
                                    stackId="a"
                                />
                                <Area
                                    dataKey="pemerintah"
                                    type="natural"
                                    fill="var(--color-pemerintah)"
                                    fillOpacity={0.4}
                                    stroke="var(--color-pemerintah)"
                                    stackId="a"
                                />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                    <CardFooter>
                        <div className="flex w-full items-start gap-2 text-sm">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 leading-none font-medium">
                                    Tahun 2024 Mengalami peningkatan / penurunan dari tahun 2023 <TrendingUp className="h-4 w-4" />{' '}
                                    <TrendingDown className="h-4 w-4" />
                                </div>
                                <div className="text-muted-foreground flex items-center gap-2 leading-none">2020 - 2025</div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
