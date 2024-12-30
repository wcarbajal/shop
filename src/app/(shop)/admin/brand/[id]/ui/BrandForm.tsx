"use client";

import { useForm } from "react-hook-form";
import { Category, Product, ProductImage as ProductWithImage } from "@/interfaces";
import Image from "next/image";
import clsx from "clsx";
import { createUpdateBrand, createUpdateProduct, deleteProductImage } from "@/actions";
import { redirect, useRouter } from 'next/navigation';
import { ProductImage } from '@/components';
import { Brands, State } from '@prisma/client';
import Link from 'next/link';

interface Props {
  idBrand: string;
  nameBrand: string;
  stateBrand: State | undefined;
};


interface FormInputs {
  id: string;
  name: string;
  state: State;
}

export const BrandForm = ( { idBrand, nameBrand, stateBrand }: Props ) => {

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },

  } = useForm<FormInputs>( {
    defaultValues: {
      id: idBrand ?? "",
      name: nameBrand ?? "",

    },
  } );



  /*  const onSizeChanged = ( size: string ) => {
     const sizes = new Set( getValues( "sizes" ) );
     sizes.has( size ) ? sizes.delete( size ) : sizes.add( size );
     setValue( "sizes", Array.from( sizes ) );
   };
  */
  const onSubmit = async ( data: FormInputs ) => {
    //const formData = new FormData();

    console.log( 'data', data );
    let identificador = data.id === '' ? 'new' : data.id;
   
    const brand = await createUpdateBrand( identificador, data.name, data.state! );

    
    if ( !brand.ok ) {
      alert( 'Producto no se pudo actualizar' );
      return;
    }
    if ( brand.ok ) {
      alert( 'Marca agregada con éxito' );
    }

    window.location.replace( `/admin/brands` );


  };

  return (
    <form
      onSubmit={ handleSubmit( onSubmit ) }
      className="flex flex-col px-5 mb-16 gap-3 "
    >
      {/* Textos */ }
      <div className="w-full">

        <div className="flex flex-col mb-2">
          <span>Id: </span>
          <input
             disabled
            type="text"
            className="p-2 border rounded-md bg-gray-300"
            { ...register( "id" ) }
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Nombre: </span>
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

        <div className="flex flex-col mb-2">
          <span>Estado: </span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "state", { required: true } ) }
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>


        </div>



      </div>

      <div className="flex justify-center gap-2">

        <Link href='/admin/brands' className="btn-secondary">Regresar</Link>
        <button className="btn-primary w-32">Guardar</button>
      </div>

    </form>


  );
};
