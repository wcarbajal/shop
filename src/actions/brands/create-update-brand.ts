'use server';

import prisma from '@/lib/prisma';
import { State } from '@prisma/client';

export const createUpdateBrand = async ( id: string, nombre: string, estado: State ) => {


  try {
    if ( id === 'new' ) {
      console.log( `la marca ${ nombre } con estado ${ estado } fue creado` );

      const newBrand = await prisma.brands.create( {
        data: {
          name: nombre,
          state: estado
        }
      } );

      if ( !newBrand ) {
        return { ok: false, message: 'Marca no fue registrada' };
      }
      return { ok: true, message: 'Marca creada exitosamente' };

    } else {
      console.log( `la marca ${ nombre } con estado ${ estado } fue actualizado` );
      const updatedBrand = await prisma.brands.update( {
        where: { id },
        data: {
          name: nombre,
          state: estado
        }
      } );

      if ( !updatedBrand ) {
        return { ok: false, message: 'Marca no fue actualizada' };
      }
      return { ok: true, message: 'Marca actualizada exitosamente' };
    }
  } catch ( error ) {
    console.log( error );
    return { ok: false, message: 'Marca no creada/ actualizada ' };
  }






};
