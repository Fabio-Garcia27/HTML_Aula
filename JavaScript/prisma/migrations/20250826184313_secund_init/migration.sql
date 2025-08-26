/*
  Warnings:

  - The values [Combustível,Água] on the enum `PaymanetCategoria` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."PaymanetCategoria_new" AS ENUM ('Mercado', 'Combustivel', 'Cartao_Credito', 'Faculdade', 'Energia', 'Agua', 'Boleto', 'Banco', 'IPTU', 'IPVA', 'Outros');
ALTER TABLE "public"."Gasto" ALTER COLUMN "categoria" DROP DEFAULT;
ALTER TABLE "public"."Gasto" ALTER COLUMN "categoria" TYPE "public"."PaymanetCategoria_new" USING ("categoria"::text::"public"."PaymanetCategoria_new");
ALTER TYPE "public"."PaymanetCategoria" RENAME TO "PaymanetCategoria_old";
ALTER TYPE "public"."PaymanetCategoria_new" RENAME TO "PaymanetCategoria";
DROP TYPE "public"."PaymanetCategoria_old";
ALTER TABLE "public"."Gasto" ALTER COLUMN "categoria" SET DEFAULT 'Outros';
COMMIT;
