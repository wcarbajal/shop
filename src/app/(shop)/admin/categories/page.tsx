
// https://tailwindcomponents.com/component/hoverable-table

import { getCategories, getPaginatedBrands } from "@/actions";
import { BrandDeleteButton, Pagination, Title } from "@/components";

export const revalidate = 0;

import Link from "next/link";
import { redirect } from "next/navigation";
import { TbEdit } from "react-icons/tb";


export default async function CategoriesPage() {

  const categoryList = await getCategories();

  if ( !categoryList ) {
    console.error('Error al obtener las categoruas:');
    redirect( "/auth/login" );
  }

  if (categoryList.length === 0) {
    return <div>No se encontraron Categoruas. Por favor, agregue algunas.</div>;
  }

  

  return (
    <>
      <Title title="Todas las categorias" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/category/new" className="btn-primary">
          Nueva categorias
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre de Categoria
              </th>
              
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            { categoryList.map( ( category ) => (
              <tr
                key={ category.id }
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  { category.id.split( "-" ).at( -1 ) }
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  { category.name }
                </td>
                


                <td className="text-sm text-gray-900 font-light px-6 w-32">
                  <div className="flex gap-2 ">
                    <Link href={ `/admin/category/${ category.id }` } className="hover:text-blue-500">
                      <TbEdit size={ 25 } />
                    </Link>

                    <BrandDeleteButton brandId={ category.id }  />
                  </div>
                </td>
              </tr>
            ) ) }


          </tbody>
        </table>

        <Pagination totalPages={ 1 } />
      </div>
    </>
  );
}
