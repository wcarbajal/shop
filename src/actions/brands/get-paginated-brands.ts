'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';



export const getPaginatedBrands = async() => {

  const session = await auth();

  if ( session?.user.role !== 'admin'  ) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }

  const brands = await prisma.brands.findMany({
    orderBy: {
      name: 'asc'
    },    
  })

  return {
    ok: true,
    brands: brands,
  }


}