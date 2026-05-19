/*
  Warnings:

  - Added the required column `userId` to the `Empresa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Empresa" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Convenio" (
    "id" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "concesion" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "submarca" TEXT NOT NULL,
    "modelo" INTEGER NOT NULL,
    "serie" TEXT NOT NULL,
    "placas" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Convenio_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Convenio" ADD CONSTRAINT "Convenio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
