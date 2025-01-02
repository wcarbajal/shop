import { getPaginatedProductsCategoryWithImages, getPaginatedProductsWithImages } from '@/actions';
import { PageProductNotFound, Pagination, ProductGrid, Title } from '@/components';
import { Category } from '@prisma/client';
import { redirect } from 'next/navigation';





interface Props {
  params: {
    category: string;
  },
  searchParams: {
    page?: string;
  };
}


export default async function CategoryByPage( { params, searchParams }: Props ) {
  const { category } = params;


  const page = searchParams.page ? parseInt( searchParams.page ) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsCategoryWithImages( {
    page,
    category: category,
  } );
  console.log(products);
  const isExist = products.length === 0 ? true : false;

  





  return (
    <>
      <Title
        title={ `${ category }` }
        subtitle="Todos los productos"
        className="mb-2"
      />
      {
        isExist
          ? ( <span> No hay productos en esta categoría </span> )
          : ( <>
            <ProductGrid
              products={ products }
            />

            <Pagination totalPages={ totalPages } />
          </> )

      }


    </>
  );
}

