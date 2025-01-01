"use server";

import prisma from "@/lib/prisma";


interface PaginationOptions {
  page?: number;
  take?: number;
  category?: string;
}

export const getPaginatedProductsCategoryWithImages = async ({
  page = 1,
  take = 12,
  category,
}: PaginationOptions) => {
  
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
//0. Obtener Id de categoría
    const categoryId = await prisma.category.findFirst({
      where: {
        name: category,
      },
      select: {
        id: true,
      },
    });
    console.log("category", category);
    console.log("categoryId",  categoryId?.id);

    if (!categoryId) {
      throw new Error("Category not found");
    }
    // 1. Obtener los productos
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
        brand: true
      },
      //! Por categoria
      where: {
        categoryId: categoryId.id
      },
    });

    console.log("products", products);

    // 2. Obtener el total de páginas
    // todo:
    const totalCount = await prisma.product.count({
      where: {
        categoryId: categoryId.id
      },
    });
    
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo cargar los productos - ts");
  }
};
