import { useEffect, useState } from 'react';
import ButtonTemplate from './button-template';

interface Product {
    id: number;
    product_name: string;
    product_description: string;
    product_image: string;
}

interface Props {
    product: Product;
}

const ProductCard = ({ product }: Props) => {
    const [isMobile, setIsMobile] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleExpand = () => setExpanded((prev) => !prev);
    const isLongText = product.product_description.length > 120;

    return (
        <a href={route('products.show', product.id)} className="bg-base-300 overflow-hidden duration-300 ease-in hover:scale-105 hover:shadow-md">
            <div className="bg-base-200 relative w-full pb-[100%]">
                <img src={`/storage/${product.product_image}`} alt={product.product_name} className="absolute inset-0 h-full w-full object-cover hover:cursor-pointer" />
            </div>

            <div className="p-4 text-left break-words">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-50">{product.product_name}</h3>

                <div className="group mt-4 text-left">
                    <div
                        className={`${
                            isMobile ? (expanded || !isLongText ? 'max-h-[500px]' : 'max-h-[5rem]') : 'max-h-[5rem] group-hover:max-h-[500px]'
                        } overflow-hidden transition-all duration-700 ease-in-out`}
                    >
                        <p className="text-sm text-gray-700">{product.product_description}</p>
                    </div>

                    {isMobile && isLongText && (
                        <div className="mt-2">
                            <ButtonTemplate size="btn-sm">
                                <button onClick={toggleExpand}>{expanded ? 'Close' : 'Read More'}</button>
                            </ButtonTemplate>
                        </div>
                    )}
                </div>
            </div>
        </a>
    );
};
export default ProductCard;
