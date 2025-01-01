import { Brands } from '@prisma/client';


export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  categoryId: string;
  //todo: type: Type;
  gender: 'men'|'women'|'kid'|'unisex';
  brand?: Brands | undefined | null;
  measure: Measure | null;
  descriptionMeasure: string | null;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: Size;
  image: string;
}


export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}


export type Measure = 'nodefinido' |
'barra' |
'bolsa' |
'botella' |
'caja' |
'frasco' |
'galonera' |
'gramo' |
'kilogramo' |
'lata' |
'litro' |
'mililitro' |
'pack' |
'paquete' |
'tetrapack' |
'unidad' |
'vaso';
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';