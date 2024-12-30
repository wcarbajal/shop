-- CreateEnum
CREATE TYPE "State" AS ENUM ('activo', 'inactivo');

-- AlterTable
ALTER TABLE "Brands" ADD COLUMN     "state" "State";
