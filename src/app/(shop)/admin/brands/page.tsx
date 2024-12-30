export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedBrands } from "@/actions";
import { Pagination, Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoAddCircleOutline, IoCardOutline } from "react-icons/io5";

export default async function BrandsPage() {

  const { ok, brands = [] } = await getPaginatedBrands();

  if ( !ok ) {
    redirect( "/auth/login" );
  }

  return (
    <>
      <Title title="Todas las marcas" />

      <div className="flex justify-center mb-5">
        <Link href="/admin/brand/new" className="flex items-center p-5 h-10 rounded-md bg-gray-200 hover:bg-gray-400">
          <IoAddCircleOutline size={ 24 } className="mr-2" />
          <span>
            Crear marca
          </span>

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
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado
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
            { brands.map( ( brand ) => (
              <tr
                key={ brand.id }
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  { brand.id.split( "-" ).at( -1 ) }
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  { brand.name }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  { brand.state }
                </td>


                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link href={ `/admin/brand/${ brand.id }` } className="hover:underline">
                    Ver marca
                  </Link>
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
