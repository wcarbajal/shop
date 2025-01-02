"use client";
import { useEffect, useState } from 'react';

import Link from "next/link";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

import { titleFont } from "@/config/fonts";
import { useCartStore, useUIStore } from "@/store";
import { Category } from '@prisma/client';
import { redirect } from 'next/navigation';
import { useCategoryStore } from '@/store/category/cart-category';


interface Props {
  categorias: Category[];
}

export const TopMenu = ( { categorias }: Props ) => {

  const openSideMenu = useUIStore( ( state ) => state.openSideMenu );
  const totalItemsInCart = useCartStore( ( state ) => state.getTotalItems() );

  const categoryStore = useCategoryStore( ( state ) => state.categoryName );
  const setCategoryStore = useCategoryStore( ( state ) => state.setCategory );

  const [ loaded, setLoaded ] = useState( false );

  useEffect( () => {
    setLoaded( true );
  }, [] );



  return (
    <nav className="flex sticky top-0 z-10 px-5 justify-between items-center w-full bg-white">
      {/* Logo */ }
      <div>
        <Link href="/">
          <span className={ `${ titleFont.className } antialiased font-bold` }>
            My
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */ }
      <div>
        Categorias
        <select className="mx-5 bg-slate-200 rounded-md h-8"
          value={ categoryStore }
          onChange={ ( e ) => {
            
            setCategoryStore( e.target.value );
            window.location.replace( `/category/${ e.target.value }` );

          } }>
          
          { categorias.map( ( cat ) => (
            <option key={ cat.id } value={ cat.name }>{ cat.name }</option>
          ) ) }

        </select>
      </div>
      {/*  <div className="hidden sm:block">
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Niños
        </Link>
      </div>
 */}
      {/* Search, Cart, Menu */ }
      <div className="flex items-center">
        <Link href="/search" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link href={
          ( ( totalItemsInCart === 0 ) && loaded )
            ? '/empty'
            : "/cart"
        } className="mx-2">
          <div className="relative">
            { ( loaded && totalItemsInCart > 0 ) && (
              <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white">
                { totalItemsInCart }
              </span>
            ) }
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={ openSideMenu }
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
