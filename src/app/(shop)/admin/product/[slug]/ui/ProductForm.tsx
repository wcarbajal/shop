"use client";

import { useForm } from "react-hook-form";
import { Category, Product, ProductImage as ProductWithImage } from "@/interfaces";
import Image from "next/image";
import clsx from "clsx";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import { useRouter } from 'next/navigation';
import { ProductImage } from '@/components';
import { Brands, Measure } from '@prisma/client';
import Link from 'next/link';

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[]; };
  categories: Category[];
  brands: Brands[];
}

const sizes = [ "XS", "S", "M", "L", "XL", "XXL" ];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  brandId: string; //todo: brand field
  descriptionMeasure: string ; //todo: descriptionMeasure field
  measure: Measure; //todo: measure field

  sizes: string[];
  tags: string;
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;



  images?: FileList;
}

export const ProductForm = ( { product, categories, brands }: Props ) => {

  const router = useRouter();
  console.log( { product } );

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>( {
    defaultValues: {
      title: product.title ?? '',
      slug: product.slug ?? '',
      description: product.description ?? '',
      price: product.price ?? 0,
      inStock: product.inStock ?? 0,
      brandId: product.brand?.id ?? '',
      descriptionMeasure: product.descriptionMeasure ?? '',
      measure: product.measure ?? 'nodefinido',
      sizes: product.sizes ?? [],
      tags: product.tags?.join(", ") ?? '',
      gender: product.gender ?? 'unisex',
      categoryId: product.categoryId ?? '',
      images: undefined,
    },
  } );

  console.log( watch() );

  watch( "brandId" );

  const onSizeChanged = ( size: string ) => {
    const sizes = new Set( getValues( "sizes" ) );
    sizes.has( size ) ? sizes.delete( size ) : sizes.add( size );
    setValue( "sizes", Array.from( sizes ) );
  };

  const onSubmit = async ( data: FormInputs ) => {
    const formData = new FormData();

    const { images, ...productToSave } = data;

    if ( product.id ) {
      formData.append( "id", product.id ?? "" );
    }

    formData.append( "title", productToSave.title );
    formData.append( "slug", productToSave.slug );
    formData.append( "description", productToSave.description );
    formData.append( "price", productToSave.price.toString() );
    formData.append( "inStock", productToSave.inStock.toString() );
    formData.append( "sizes", productToSave.sizes.toString() );
    formData.append( "tags", productToSave.tags );
    formData.append( "categoryId", productToSave.categoryId );
    formData.append( "gender", productToSave.gender );
    formData.append( "brandId", productToSave.brandId );
    formData.append( "descriptionMeasure", productToSave.descriptionMeasure );
    formData.append( "measure", productToSave.measure );

    if ( images ) {
      for ( let i = 0; i < images.length; i++ ) {
        formData.append( 'images', images[ i ] );
      }
    }



    const { ok, product: updatedProduct } = await createUpdateProduct( formData );

    if ( !ok ) {
      alert( 'Producto no se pudo actualizar' );
      return;
    }

    router.replace( `/admin/product/${ updatedProduct?.slug }` );


  };

  return (
    <form
      onSubmit={ handleSubmit( onSubmit ) }
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */ }
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "title", {
              required: {
                value: true,
                message: "El título es obligatorio",
              },
              minLength: {
                value: 3,
                message: "El título debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 50,
                message: "El título no debe tener más de 50 caracteres",
              },
            } ) }
          />
        </div>
        {
          errors.title && (
            <span className="text-md text-red-500">{errors.title.message}</span>
          )
        }

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "slug", { 
              required: {
                value: true,
                message: "El slug es obligatorio",
              },
              minLength: {
                value: 3,
                message: "El slug debe tener al menos 3 caracteres",
              },
              maxLength: {
                value: 50,
                message: "El slug no debe tener más de 50 caracteres",
              },
            
            } ) }
          />
        </div>

        {
          errors.slug && (
            <span className="text-md text-red-500">{errors.slug.message}</span>
          )
        }

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={ 5 }
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "description", { required: true } ) }
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Marca</span>
          <select

            className="p-2 border rounded-md bg-gray-200"
            { ...register( "brandId", { required: true } ) }

          >
            <option value="">[Seleccione]</option>
            {
              brands.map( marca => (
                <option key={ marca.id } value={ marca.id }>
                  { marca.name }
                </option>
              ) )
            }

          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Medida</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "measure", { required: true } ) }

          >
            <option value="">[Seleccione]</option>
            <option value="barra" >Barra </option>
            <option value="bolsa" >Bolsa </option>
            <option value="botella" >Botella </option>
            <option value="caja" >Caja </option>
            <option value="frasco" >Frasco </option>
            <option value="galonera" >Galonera </option>
            <option value="gramo" >Gramo </option>
            <option value="kilogramo">Kilogramo </option>
            <option value="lata" >lata </option>
            <option value="litro" >litro </option>
            <option value="mililitro" >mililitro </option>
            <option value="pack" >pack </option>
            <option value="paquete" >paquete </option>
            <option value="tetrapack" >tetrapack </option>
            <option value="unidad" >unidad </option>
            <option value="vaso" >vaso </option>
            <option value="nodefinido" >No denifnido </option>
          </select>
        </div>
        <div className="flex flex-col mb-2">
          <span>Detalle de medida</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "descriptionMeasure", { required: true } ) }
          />
        </div>
        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            min="0" step="0.10"
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "price", { required: true, min: 0 } ) }
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "tags", { required: true } ) }
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "gender", { required: true } ) }
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "categoryId", { required: true } ) }
          >
            <option value="">[Seleccione]</option>
            { categories.map( ( category ) => (
              <option key={ category.id } value={ category.id }>
                { category.name }
              </option>
            ) ) }
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */ }
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Inventario</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            { ...register( "inStock", { required: true, min: 0 } ) }
          />
        </div>

        {/* As checkboxes */ }
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            { sizes.map( ( size ) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={ size }
                onClick={ () => onSizeChanged( size ) }
                className={ clsx(
                  "p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center",
                  {
                    "bg-blue-500 text-white": getValues( "sizes" ).includes( size ),
                  }
                ) }
              >
                <span>{ size }</span>
              </div>
            ) ) }
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              { ...register( 'images' ) }
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            { product.ProductImage?.map( ( image ) => (
              <div key={ image.id }>
                <ProductImage
                  alt={ product.title ?? "" }
                  src={ image.url }
                  width={ 300 }
                  height={ 300 }
                  className="rounded-t shadow-md"
                />

                <button
                  type="button"
                  onClick={ () => deleteProductImage( image.id, image.url ) }
                  className="btn-danger w-full rounded-b-xl"
                >
                  Eliminar
                </button>
              </div>
            ) ) }
          </div>
        </div>
      </div>
    </form>
  );
};
