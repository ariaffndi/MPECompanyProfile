import ButtonTemplate from '../button-template';
import ProductCard from '../product-card';
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
                  {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                  ))}
               </div>

               <div className="mt-8 text-center">
                  <ButtonTemplate size="btn-md">
                        <a href="#">Show More</a>
                  </ButtonTemplate>
               </div>
            </ScrollReveal>
      </section>
   );
};

export default HomeProduct;
