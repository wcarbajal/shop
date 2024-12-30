-- CreateEnum
CREATE TYPE "Measure" AS ENUM ('nodefinido', 'barra', 'bolsa', 'botella', 'caja', 'frasco', 'galonera', 'gramo', 'kilogramo', 'lata', 'litro', 'mililitro', 'pack', 'paquete', 'tetrapack', 'unidad', 'vaso');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "brandId" TEXT,
ADD COLUMN     "descriptionMeasure" TEXT,
ADD COLUMN     "measure" "Measure" DEFAULT 'nodefinido';

-- CreateTable
CREATE TABLE "Brands" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Brands_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brands_name_key" ON "Brands"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
