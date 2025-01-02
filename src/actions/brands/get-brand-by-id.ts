'use server';

import prisma from '@/lib/prisma';


export const getBrandById = async( id: string ) => {


  try {

    const brand = await prisma.brands.findFirst({
      where: {
        id: id,
      }
    })


    if ( !brand ) return null;

    return {
      brand,
      
    };

    
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener la marca por Id');
  }



}