'use server';

import prisma from '@/lib/prisma';


export const getCategoryById = async( id: string ) => {


  try {

    const category = await prisma.category.findFirst({
      where: {
        id: id,
      }
    })


    if ( !category ) return null;

    return {
      category,
      
    };

    
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener la marca por Id');
  }



}