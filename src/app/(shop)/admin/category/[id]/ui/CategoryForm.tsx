"use client";

import { useForm } from "react-hook-form";
import { Category, Product, ProductImage as ProductWithImage } from "@/interfaces";
import Image from "next/image";
import clsx from "clsx";
import { createUpdateBrand, createUpdateCategory, createUpdateProduct, deleteProductImage } from "@/actions";
import { redirect, useRouter } from 'next/navigation';
import { ProductImage } from '@/components';
import { Brands, State } from '@prisma/client';
import Link from 'next/link';

interface Props {
  idCategory: string;
  nameCategory: string;
  
};


interface FormInputs {
  id: string;
  name: string;
  
}

export const CategoryForm = ( { idCategory, nameCategory }: Props ) => {

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },

  } = useForm<FormInputs>( {
    defaultValues: {
      id: idCategory ?? "",
      name: nameCategory ?? "",      

    },
  } );


  const onSubmit = async ( data: FormInputs ) => {
    //const formData = new FormData();

    console.log( 'data', data );
    let identificador = data.id === '' ? 'new' : data.id;
   
    const category = await createUpdateCategory( identificador, data.name );

    
    if ( !category.ok ) {
      alert( 'Categoria no se pudo actualizar' );
      return;
    }
    if ( category.ok ) {
      alert( 'Categoria agregada con éxito' );
    }

    window.location.replace( `/admin/categories` );


  };

  return (
    <form
      onSubmit={ handleSubmit( onSubmit ) }
      className="flex flex-col px-5 mb-16 gap-3 "
    >
      {/* Textos */ }
      <div className="w-full">

        <div className="flex flex-col mb-2">
          <span>Nombre de categoria: </span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "name", {
              required: {
                value: true,                
                message: "El nombre es obligatorio",
              },
              minLength: {
                value: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 30,
                message: "El nombre no debe tener más de 30 caracteres",
              },
            } ) }
          />
        </div>
        {
          errors.name && (
            <span className="text-red-500">{ errors.name.message }</span>
          )
        }

      </div>

      <div className="flex justify-center gap-2">

        <Link href='/admin/brands' className="btn-secondary">Regresar</Link>
        <button className="btn-primary w-32">Guardar</button>
      </div>

    </form>


  );
};
