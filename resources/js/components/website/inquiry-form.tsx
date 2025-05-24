import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

type InquiryForm = {
    name: string;
    email: string;
    phone: string;
    service_id: string | null;
    product_id: string | null;
    detail: string;
    status: string;
};

type Service = {
    id: number;
    service_name: string;
};

type Product = {
    id: number;
    product_name: string;
};

export default function InquiryForm() {
    const { services, products } = usePage<{
        services: Service[];
        products: Product[];
    }>().props;

    const { data, setData, post, processing, errors, reset } = useForm<InquiryForm>({
        name: '',
        email: '',
        phone: '62',
        service_id: null,
        product_id: null,
        detail: '',
        status: 'pending',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('inquiry.store'), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nama</Label>
                    <Input
                        id="name"
                        type="text"
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Nama Perorangan / Perusahaan"
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            autoComplete="email"
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">No. Telp</Label>
                        <Input
                            id="phone"
                            type="number"
                            required
                            autoComplete="phone"
                            placeholder="no telepon"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2"
                        />
                        <InputError message={errors.phone} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="service_id">
                            Layanan <span className="text-xs text-red-600">*opsional</span>
                        </Label>
                        <select
                            id="service_id"
                            value={data.service_id || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                setData('service_id', value === '' ? null : value);
                            }}
                            className="dark:bg-base-100 w-full rounded-md border border-gray-300 p-2"
                        >
                            <option value="">-- Pilih Layanan --</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.service_name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.service_id} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="product_id">
                            Produk <span className="text-xs text-red-600">*opsional</span>
                        </Label>
                        <select
                            id="product_id"
                            value={data.product_id || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                setData('product_id', value === '' ? null : value);
                            }}
                            className="dark:bg-base-100 w-full rounded-md border border-gray-300 p-2"
                        >
                            <option value="">-- Pilih Produk --</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.product_name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.product_id} />
                    </div>
                    <p className="col-span-2 text-xs text-red-600">*Kosongkan jika tidak diperlukan!</p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="inquiry_detail">Detail Pemesanan</Label>
                    <textarea
                        id="inquiry_detail"
                        rows={5}
                        required
                        className="w-full rounded-md border border-gray-300 p-2"
                        placeholder="Deskripsikan pesanan anda!"
                        value={data.detail}
                        onChange={(e) => setData('detail', e.target.value)}
                    />
                </div>
            </div>

            <Button type="submit" className="btn btn-md mt-4 w-fit rounded-lg bg-sky-500 text-white hover:bg-sky-600" disabled={processing}>
                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                Submit
            </Button>
        </form>
    );
}
