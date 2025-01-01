'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { ProductImage } from '@prisma/client';
cloudinary.config( process.env.CLOUDINARY_URL ?? '' );




export const deleteProduct = async ( productId: string ) => {

  const product = prisma.product.findFirst( {
    where: { id: productId },
  } );

  if ( !product ) {
    return {
      ok: false,
      message: 'Product not found'
    };
  }

  const imagesByDelete = await prisma.productImage.findMany( {
    where: { productId },
  } );

 


  try {
    const prismaTx = await prisma.$transaction( async ( tx ) => {

      if(imagesByDelete.length > 0  && process.env.CLOUDINARY_URL ){

        await deleteImages( imagesByDelete );
      }

      await prisma.product.delete( { where: { id: productId } } );


    });
    revalidatePath( '/admin/products' );
    return {
      ok: true,
      message: 'Producto eliminado correctamente',
    };
  
  } catch ( error ) {

    return {
      ok: false,
      message: 'Revisar los logs, no se pudo actualizar/crear'
    };
  }

};


const deleteImages = async ( images: ProductImage[] ) => {

  try {


    const uploadPromises = images.map( async ( image ) => {

      try {
        

        return cloudinary.uploader.destroy( image.url )
        .then( () => prisma.productImage.delete( { where: { id: image.id } } ) );



      } catch ( error ) {
        console.log( error );
        return null;
      }
    } );


    const uploadedImages = await Promise.all( uploadPromises );
    return uploadedImages;



  } catch ( error ) {

    console.log( error );
    return null;

  }


};
