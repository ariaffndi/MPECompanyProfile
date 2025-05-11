import { useEffect, useState } from 'react';
import ButtonTemplate from '../button-template';
import ScrollReveal from '../scroll-reveal';

interface Product {
    id: number;
    product_name: string;
    product_description: string;
    product_image: string;
}

interface Props {
    products: Product[];
}

const HomeProduct = ({ products }: Props) => {
    const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // Check once on mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleExpand = (id: number) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <section id="homeProduct" className="py-12">
            <ScrollReveal direction="up">
                <div className="mb-10">
                    <h2 className="text-center text-3xl font-light">
                        OUR POPULAR <span className="font-bold">PRODUCTS</span>
                    </h2>
                </div>
            </ScrollReveal>

            <ScrollReveal direction="up">
                <div className="m-6 grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => {
                        const isLongText = product.product_description.length > 120;
                        const showFull = expanded[product.id] || false;

                        return (
                            <div key={product.id} className="bg-base-300 overflow-hidden duration-300 ease-in hover:scale-105 hover:shadow-md">
                                <div className="bg-base-200 relative w-full pb-[100%]">
                                    <img
                                        src={`/storage/${product.product_image}`}
                                        alt={product.product_name}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                </div>

                                <div className="p-4 text-left break-words">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-50">{product.product_name}</h3>

                                    <div className="group mt-4 text-left">
                                        <div
                                            className={`${
                                                isMobile
                                                    ? showFull || !isLongText
                                                        ? 'max-h-[500px]'
                                                        : 'max-h-[5rem]'
                                                    : 'max-h-[5rem] group-hover:max-h-[500px]'
                                            } overflow-hidden transition-all duration-700 ease-in-out`}
                                        >
                                            <p className="text-sm text-gray-700">{product.product_description}</p>
                                        </div>

                                        {isMobile && isLongText && (
                                            <div className="mt-2">
                                                <ButtonTemplate size="btn-sm">
                                                    <button onClick={() => toggleExpand(product.id)}>{showFull ? 'Close' : 'Read More'}</button>
                                                </ButtonTemplate>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center">
                    <ButtonTemplate size="btn-md">
                        <a href="#">Show More</a>
                    </ButtonTemplate>
                </div>
            </ScrollReveal>
        </section>
    );
};

export default HomeProduct;
