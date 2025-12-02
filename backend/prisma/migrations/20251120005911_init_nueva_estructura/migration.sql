-- CreateTable
CREATE TABLE "Provincia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Localidad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "codigo_postal" INTEGER,
    "id_provincia" INTEGER NOT NULL,
    CONSTRAINT "Localidad_id_provincia_fkey" FOREIGN KEY ("id_provincia") REFERENCES "Provincia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Feedlot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "id_localidad" INTEGER NOT NULL,
    CONSTRAINT "Feedlot_id_localidad_fkey" FOREIGN KEY ("id_localidad") REFERENCES "Localidad" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Persona" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "personaId" INTEGER NOT NULL,
    CONSTRAINT "Usuario_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "Persona" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Corral" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" INTEGER NOT NULL,
    "capacidadMaxima" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "id_feedlot" INTEGER NOT NULL,
    CONSTRAINT "Corral_id_feedlot_fkey" FOREIGN KEY ("id_feedlot") REFERENCES "Feedlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Raza" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Bovino" (
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

-- CreateTable
CREATE TABLE "Pesaje" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_bovino" INTEGER NOT NULL,
    "fechaPesaje" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pesoActual" REAL NOT NULL,
    CONSTRAINT "Pesaje_id_bovino_fkey" FOREIGN KEY ("id_bovino") REFERENCES "Bovino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
CREATE TABLE "Alimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL
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
CREATE TABLE "Suministro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dietaId" INTEGER NOT NULL,
    "corralId" INTEGER NOT NULL,
    "cantidadKg" REAL NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Suministro_dietaId_fkey" FOREIGN KEY ("dietaId") REFERENCES "Dieta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Suministro_corralId_fkey" FOREIGN KEY ("corralId") REFERENCES "Corral" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Enfermedad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "tipo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tratamiento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "unidad" TEXT NOT NULL
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

-- CreateIndex
CREATE UNIQUE INDEX "Provincia_nombre_key" ON "Provincia"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Persona_email_key" ON "Persona"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_personaId_key" ON "Usuario"("personaId");

-- CreateIndex
CREATE UNIQUE INDEX "Corral_numero_key" ON "Corral"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Raza_nombre_key" ON "Raza"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Bovino_caravana_key" ON "Bovino"("caravana");

-- CreateIndex
CREATE UNIQUE INDEX "Dieta_nombre_key" ON "Dieta"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Enfermedad_nombre_key" ON "Enfermedad"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Tratamiento_nombre_key" ON "Tratamiento"("nombre");
