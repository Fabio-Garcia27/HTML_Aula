/*
  Warnings:

  - You are about to alter the column `valor` on the `Gasto` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "public"."Gasto" ALTER COLUMN "valor" SET DATA TYPE DECIMAL(10,2);
