import { Product } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';

interface Props {
  products: Product[];
}


export const ProductGrid = ( { products }: Props ) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5 mb-10 auto-rows-auto ">
      {
        products.map( product => (
          <ProductGridItem 
            key={ product.slug }
            product={ product }
          />
        ) )
      }

    </div>
  );
};