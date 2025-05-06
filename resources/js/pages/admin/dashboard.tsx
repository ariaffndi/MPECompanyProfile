import AnimatedNumber from '@/components/animate-number';
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

type DashboardProps = {
    productsCount: number;
    servicesCount: number;
    teamsCount: number;
    partnersCount: number;
    projectChartData: {
        year: string;
        pemerintah: number;
        swasta: number;
    }[];
};

export default function Dashboard() {
    const { productsCount, servicesCount, teamsCount, partnersCount, projectChartData } = usePage<{ props: DashboardProps }>().props;
    const { currentYear, startYear, performance } = usePage().props;

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
                    {/* Statistik Cards */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border stats relative aspect-video overflow-hidden rounded-xl border shadow">
                        <div className="stat">
                            <div className="stat-title flex gap-2">
                                <Package size={20} /> Total Produk
                            </div>
                            <div className="stat-value">
                                <AnimatedNumber value={typeof productsCount === 'number' ? productsCount : 0} />
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border stats relative aspect-video overflow-hidden rounded-xl border shadow">
                        <div className="stat">
                            <div className="stat-title flex gap-2">
                                <HandPlatter size={20} /> Total Layanan
                            </div>
                            <div className="stat-value">
                                <AnimatedNumber value={typeof servicesCount === 'number' ? servicesCount : 0} />
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border stats relative aspect-video overflow-hidden rounded-xl border shadow">
                        <div className="stat">
                            <div className="stat-title flex gap-2">
                                <Users size={20} /> Total Karyawan & Manajemen
                            </div>
                            <div className="stat-value">
                                <AnimatedNumber value={typeof teamsCount === 'number' ? teamsCount : 0} />
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border stats relative aspect-video overflow-hidden rounded-xl border shadow">
                        <div className="stat">
                            <div className="stat-title flex gap-2">
                                <Handshake size={20} /> Total Partner
                            </div>
                            <div className="stat-value">
                                <AnimatedNumber value={typeof partnersCount === 'number' ? partnersCount : 0} />
                            </div>
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
                                data={projectChartData as { year: string; pemerintah: number; swasta: number }[]}
                                margin={{
                                    left: 12,
                                    right: 12,
                                }}
                            >
                                <CartesianGrid vertical={true} />
                                <XAxis dataKey="year" tickLine={true} axisLine={true} tickMargin={12} tickFormatter={(value) => value.slice(0, 4)} />
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
                                    Tahun {Number(currentYear) - 1} mengalami {String(performance)} dari tahun{' '}
                                    {Number(currentYear) - 2}{' '} {performance === 'peningkatan' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                </div>
                                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                                    {Number(currentYear)} - {Number(startYear)}
                                </div>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
