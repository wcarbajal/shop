'use server';

import prisma from '@/lib/prisma';


export const createUpdateCategory = async ( id: string, nombre: string ) => {


  try {
    if ( id === 'new' ) {
      console.log( `la categoria ${ nombre } fue creado` );

      const newCategory = await prisma.category.create( {
        data: {
          name: nombre,          
        }
      } );

      if ( !newCategory ) {
        return { ok: false, message: 'La Categoria no fue registrada' };
      }
      return { ok: true, message: 'La Categoria creada exitosamente' };

    } else {
      console.log( `la categoria ${ nombre }  fue actualizado` );
      const updateCategory = await prisma.category.update( {
        where: { id },
        data: {
          name: nombre,          
        }
      } );

      if ( !updateCategory ) {
        return { ok: false, message: 'La categoria no fue actualizada' };
      }
      return { ok: true, message: 'La categoria actualizada exitosamente' };
    }
  } catch ( error ) {
    console.log( error );
    return { ok: false, message: 'La categoria no creada/ actualizada ' };
  }






};
