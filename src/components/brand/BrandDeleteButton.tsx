'use client';

import { DeleteBrand } from '@/actions';
import { MdDeleteOutline } from "react-icons/md";

interface Props {
  brandId: string;
}

export const BrandDeleteButton = ( { brandId }: Props ) => {


  const handleDeleteBrand = async ( ) => {

    const registro = await DeleteBrand( brandId );
    if ( registro.ok ) {
      alert( 'Marca eliminada correctamente' );
    } else {
      alert( 'Error al eliminar la marca' );
    }
    window.location.reload(); // Reload the page to reflect the changes in the database.
  };


return (
  <button className="hover:text-blue-500" onClick={ () => handleDeleteBrand() }>
    <MdDeleteOutline size={ 25 } />
  </button>
);
};