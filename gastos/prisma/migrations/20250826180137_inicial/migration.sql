-- CreateEnum
CREATE TYPE "public"."PaymanetCategoria" AS ENUM ('Mercado', 'Combustível', 'Cartao_Credito', 'Faculdade', 'Energia', 'Água', 'Boleto', 'Banco', 'IPTU', 'IPVA', 'Outros');

-- CreateTable
CREATE TABLE "public"."Gasto" (
    "id" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "periodo" TEXT NOT NULL,
    "categoria" "public"."PaymanetCategoria" NOT NULL DEFAULT 'Outros',
    "valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gasto_pkey" PRIMARY KEY ("id")
);
