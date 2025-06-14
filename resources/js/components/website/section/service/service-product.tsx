import ProductCard from '../../product-card';
import ScrollReveal from '../../scroll-reveal';
import ButtonTemplate from '../../button-template';
import { Link } from '@inertiajs/react';

interface Product {
    id: number;
    product_name: string;
    product_description: string;
    product_image: string;
}

interface Props {
    products: Product[];
}

const ServiceProduct = ({ products }: Props) => {
    return (
        <section id="serviceProduct" className="scroll-mt-30 my-20">
            <ScrollReveal direction="up">
                <div className="my-10">
                    <h2 className="text-center text-3xl font-light">OUR PRODUCTS</h2>
                    <h2 className="text-center text-3xl font-bold">YOUR ADVANTAGE</h2>
                </div>
            </ScrollReveal>

            <ScrollReveal direction="up">
                <div className="m-6 grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    <div className="flex h-full items-center justify-center text-center">
                        <div>
                            <h2 className="text-3xl font-light">NEED A MORE CUSTOMIZED</h2>
                            <h2 className="text-3xl font-bold">PRODUCT SOLUTION?</h2>
                            <ButtonTemplate size="btn-md">
                                <Link href="/contact#contactMessage">Lets Talk</Link>
                            </ButtonTemplate>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default ServiceProduct;
