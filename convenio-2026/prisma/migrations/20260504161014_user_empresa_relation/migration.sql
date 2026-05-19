-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "representante" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_name_key" ON "Empresa"("name");
