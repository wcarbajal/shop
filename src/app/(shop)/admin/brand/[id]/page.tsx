
import { getBrandById } from '@/actions/product/get-brand-by-id';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { BrandForm } from './ui/BrandForm';

interface Props {
  params: {
    id: string;
  };
}



export default async function BrandPage( { params }: Props ) {


  const { id } = params;

  const marca = await getBrandById( id );

  if (!marca && id!== 'new'  ) {
    redirect('/admin/brands');
  }



  const title = ( id === 'new' ) ? 'Nueva marca' : 'Editar marca';

  return (
    <>
      <Title title={ title } />
      
      <BrandForm idBrand={ marca?.brand.id ?? '' } nameBrand={ marca?.brand.name ?? '' } stateBrand={ marca?.brand.state ?? undefined }   />


    </>
  );
}