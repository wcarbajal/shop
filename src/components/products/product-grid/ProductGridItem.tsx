'use client';


import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/interfaces';
import { useState } from 'react';
import { currencyFormat } from '@/utils';

interface Props {
  product: Product;
}


export const ProductGridItem = ( { product }: Props ) => {

  const [ displayImage, setDisplayImage ] = useState( product.images[ 0 ] );
  

  return (
    <div className="rounded-md overflow-hidden fade-in border h-fit ">
      
      <Link  className="" href={ `/product/${ product.slug }` }>
        <Image
          src={ `/products/${ displayImage }` } //TODO: update to fetch images from API
          alt={ product.title }
          className="w-full h-2/5 object-cover rounded "
          width={  500 }
          height={ 500 }
          onMouseEnter={ () => setDisplayImage( product.images[1] )  }
          onMouseLeave={ () => setDisplayImage( product.images[0] ) }
        />
      </Link>

      <div className="p-4 flex flex-col gap-y-2 bg-slate-100">
        <span className="text-red-500 text-sm">{product.brand?.name}</span>
        <Link
          className="hover:text-blue-600 font-bold line-clamp-3"
          href={ `/product/${ product.slug }` }>
          { product.description }
        </Link>
        <Link
          className="hover:text-blue-600 font-bold text-red-500 text-sm"
          href={ `/product/${ product.slug }` }>
          { product.title }
        </Link>
        <span className="font-bold">{  product.descriptionMeasure }</span>
        
        <span className="font-bold">{ currencyFormat( product.price) }</span>
      </div>

    </div>
  );
};