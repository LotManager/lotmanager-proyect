/*
  Warnings:

  - You are about to drop the `Alimentacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetalleAlimento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DetalleEnfermedad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EnfermedadxTratamiento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Personal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rol` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `nro_serie` on the `Alimento` table. All the data in the column will be lost.
  - You are about to drop the column `vencimiento` on the `Alimento` table. All the data in the column will be lost.
  - You are about to drop the column `estado_bovino` on the `Bovino` table. All the data in the column will be lost.
  - You are about to drop the column `estado_salud` on the `Bovino` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_bovino` on the `Bovino` table. All the data in the column will be lost.
  - You are about to drop the column `capacidad_maxima` on the `Corral` table. All the data in the column will be lost.
  - You are about to drop the column `id_alimentacion` on the `Corral` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_corral` on the `Corral` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Pesaje` table. All the data in the column will be lost.
  - You are about to drop the column `peso_dado` on the `Pesaje` table. All the data in the column will be lost.
  - You are about to drop the column `cantidad` on the `Suministro` table. All the data in the column will be lost.
  - You are about to drop the column `id_alimentacion` on the `Suministro` table. All the data in the column will be lost.
  - You are about to drop the column `id_alimento` on the `Suministro` table. All the data in the column will be lost.
  - You are about to drop the column `dosis_aplicada` on the `Tratamiento` table. All the data in the column will be lost.
  - You are about to drop the column `id_rol` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `usuario` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nombre]` on the table `Provincia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `Raza` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nombre` to the `Alimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Alimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `situacionBovino` to the `Bovino` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoBovino` to the `Bovino` table without a default value. This is not possible if the table is not empty.
  - Added the required column `capacidadMaxima` to the `Corral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Corral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pesoActual` to the `Pesaje` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidadKg` to the `Suministro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corralId` to the `Suministro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dietaId` to the `Suministro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unidad` to the `Tratamiento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personaId` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rol` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Alimentacion";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DetalleAlimento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DetalleEnfermedad";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EnfermedadxTratamiento";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Personal";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Rol";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Persona" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MovimientoCorral" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_bovino" INTEGER NOT NULL,
    "id_corral_origen" INTEGER NOT NULL,
    "id_corral_destino" INTEGER NOT NULL,
    "fechaMovimiento" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "motivo" TEXT NOT NULL,
    CONSTRAINT "MovimientoCorral_id_bovino_fkey" FOREIGN KEY ("id_bovino") REFERENCES "Bovino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovimientoCorral_id_corral_origen_fkey" FOREIGN KEY ("id_corral_origen") REFERENCES "Corral" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MovimientoCorral_id_corral_destino_fkey" FOREIGN KEY ("id_corral_destino") REFERENCES "Corral" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dieta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT
);

-- CreateTable
CREATE TABLE "DetalleDieta" (
    "dietaId" INTEGER NOT NULL,
    "alimentoId" INTEGER NOT NULL,
    "proporcionKg" REAL NOT NULL,

    PRIMARY KEY ("dietaId", "alimentoId"),
    CONSTRAINT "DetalleDieta_dietaId_fkey" FOREIGN KEY ("dietaId") REFERENCES "Dieta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DetalleDieta_alimentoId_fkey" FOREIGN KEY ("alimentoId") REFERENCES "Alimento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CasoEnfermedad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_bovino" INTEGER NOT NULL,
    "id_enfermedad" INTEGER NOT NULL,
    "fecha_deteccion" DATETIME NOT NULL,
    "fecha_alta" DATETIME,
    "id_tratamiento" INTEGER NOT NULL,
    CONSTRAINT "CasoEnfermedad_id_bovino_fkey" FOREIGN KEY ("id_bovino") REFERENCES "Bovino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CasoEnfermedad_id_enfermedad_fkey" FOREIGN KEY ("id_enfermedad") REFERENCES "Enfermedad" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CasoEnfermedad_id_tratamiento_fkey" FOREIGN KEY ("id_tratamiento") REFERENCES "Tratamiento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Alimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL
);
INSERT INTO "new_Alimento" ("id") SELECT "id" FROM "Alimento";
DROP TABLE "Alimento";
ALTER TABLE "new_Alimento" RENAME TO "Alimento";
CREATE TABLE "new_Bovino" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "caravana" INTEGER NOT NULL,
    "id_raza" INTEGER NOT NULL,
    "id_corral" INTEGER NOT NULL,
    "situacionBovino" TEXT NOT NULL,
    "estadoSalud" TEXT NOT NULL DEFAULT 'SANO',
    "sexo" TEXT NOT NULL,
    "tipoBovino" TEXT NOT NULL,
    "ingreso" DATETIME NOT NULL,
    "egreso" DATETIME,
    "peso_ingreso" REAL NOT NULL,
    "peso_egreso" REAL,
    CONSTRAINT "Bovino_id_raza_fkey" FOREIGN KEY ("id_raza") REFERENCES "Raza" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bovino_id_corral_fkey" FOREIGN KEY ("id_corral") REFERENCES "Corral" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bovino" ("caravana", "egreso", "id", "id_corral", "id_raza", "ingreso", "peso_egreso", "peso_ingreso", "sexo") SELECT "caravana", "egreso", "id", "id_corral", "id_raza", "ingreso", "peso_egreso", "peso_ingreso", "sexo" FROM "Bovino";
DROP TABLE "Bovino";
ALTER TABLE "new_Bovino" RENAME TO "Bovino";
CREATE UNIQUE INDEX "Bovino_caravana_key" ON "Bovino"("caravana");
CREATE TABLE "new_Corral" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "capacidadMaxima" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "id_feedlot" INTEGER NOT NULL,
    CONSTRAINT "Corral_id_feedlot_fkey" FOREIGN KEY ("id_feedlot") REFERENCES "Feedlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Corral" ("id", "id_feedlot", "numero") SELECT "id", "id_feedlot", "numero" FROM "Corral";
DROP TABLE "Corral";
ALTER TABLE "new_Corral" RENAME TO "Corral";
CREATE UNIQUE INDEX "Corral_numero_key" ON "Corral"("numero");
CREATE TABLE "new_Enfermedad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" TEXT NOT NULL
);
INSERT INTO "new_Enfermedad" ("descripcion", "id", "nombre", "tipo") SELECT "descripcion", "id", "nombre", "tipo" FROM "Enfermedad";
DROP TABLE "Enfermedad";
ALTER TABLE "new_Enfermedad" RENAME TO "Enfermedad";
CREATE UNIQUE INDEX "Enfermedad_nombre_key" ON "Enfermedad"("nombre");
CREATE TABLE "new_Localidad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "codigo_postal" INTEGER,
    "id_provincia" INTEGER NOT NULL,
    CONSTRAINT "Localidad_id_provincia_fkey" FOREIGN KEY ("id_provincia") REFERENCES "Provincia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Localidad" ("codigo_postal", "id", "id_provincia", "nombre") SELECT "codigo_postal", "id", "id_provincia", "nombre" FROM "Localidad";
DROP TABLE "Localidad";
ALTER TABLE "new_Localidad" RENAME TO "Localidad";
CREATE TABLE "new_Pesaje" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_bovino" INTEGER NOT NULL,
    "fechaPesaje" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pesoActual" REAL NOT NULL,
    CONSTRAINT "Pesaje_id_bovino_fkey" FOREIGN KEY ("id_bovino") REFERENCES "Bovino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pesaje" ("id", "id_bovino") SELECT "id", "id_bovino" FROM "Pesaje";
DROP TABLE "Pesaje";
ALTER TABLE "new_Pesaje" RENAME TO "Pesaje";
CREATE TABLE "new_Suministro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dietaId" INTEGER NOT NULL,
    "corralId" INTEGER NOT NULL,
    "cantidadKg" REAL NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Suministro_dietaId_fkey" FOREIGN KEY ("dietaId") REFERENCES "Dieta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Suministro_corralId_fkey" FOREIGN KEY ("corralId") REFERENCES "Corral" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Suministro" ("id") SELECT "id" FROM "Suministro";
DROP TABLE "Suministro";
ALTER TABLE "new_Suministro" RENAME TO "Suministro";
CREATE TABLE "new_Tratamiento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "unidad" TEXT NOT NULL,
    "enfermedadId" INTEGER,
    CONSTRAINT "Tratamiento_enfermedadId_fkey" FOREIGN KEY ("enfermedadId") REFERENCES "Enfermedad" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Tratamiento" ("descripcion", "id", "nombre") SELECT "descripcion", "id", "nombre" FROM "Tratamiento";
DROP TABLE "Tratamiento";
ALTER TABLE "new_Tratamiento" RENAME TO "Tratamiento";
CREATE UNIQUE INDEX "Tratamiento_nombre_key" ON "Tratamiento"("nombre");
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "personaId" INTEGER NOT NULL,
    CONSTRAINT "Usuario_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Usuario" ("contrasena", "id") SELECT "contrasena", "id" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");
CREATE UNIQUE INDEX "Usuario_personaId_key" ON "Usuario"("personaId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Persona_email_key" ON "Persona"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dieta_nombre_key" ON "Dieta"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Provincia_nombre_key" ON "Provincia"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Raza_nombre_key" ON "Raza"("nombre");
