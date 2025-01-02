
import { getBrandById } from '@/actions/brands/get-brand-by-id';
import { Title } from '@/components';
import { redirect } from 'next/navigation';

import { getCategoryById } from '@/actions';
import { CategoryForm } from './ui/CategoryForm';

interface Props {
  params: {
    id: string;
  };
}



export default async function BrandPage( { params }: Props ) {


  const { id } = params;

  const category = await getCategoryById( id );

  if (!category && id!== 'new'  ) {
    redirect('/admin/categories');
  }



  const title = ( id === 'new' ) ? 'Nueva categoria' : 'Editar categoria';

  return (
    <>
      <Title title={ title } />
      
      <CategoryForm idCategory={ category?.category.id ?? ''} nameCategory={ category?.category.name ?? ''} />


    </>
  );
}