'use server';

import prisma from '@/lib/prisma';




export const DeleteBrand = async ( brandId: string ) => {


  try {

    const productByBrand = await prisma.product.findMany( { where: { brandId } } );

    if ( productByBrand.length > 0 ) {
      return {
        ok: false,
        message: 'No se puede eliminar la marca porque hay productos asociados',
      };
    }

    const brandDelete = await prisma.brands.delete( { where: { id: brandId } } );

    if ( !brandDelete ) {
      return {
        ok: false,
        message: 'Marca no encontrada',
      };

    }

    return {
      ok: true,
      message: 'Marca eliminada correctamente',
    };
  } catch ( error ) {
    console.error( error );
    throw new Error( 'Error deleting brand' );
  }
};