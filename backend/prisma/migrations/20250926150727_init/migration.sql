-- CreateTable
CREATE TABLE "Feedlot" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "id_localidad" INTEGER NOT NULL,
    CONSTRAINT "Feedlot_id_localidad_fkey" FOREIGN KEY ("id_localidad") REFERENCES "Localidad" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Localidad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo_postal" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "id_provincia" INTEGER NOT NULL,
    CONSTRAINT "Localidad_id_provincia_fkey" FOREIGN KEY ("id_provincia") REFERENCES "Provincia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Provincia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Raza" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_rol" INTEGER NOT NULL,
    "usuario" TEXT NOT NULL,
    "contrasena" TEXT NOT NULL,
    CONSTRAINT "Usuario_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "Rol" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Personal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "id_usuario" INTEGER,
    CONSTRAINT "Personal_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Alimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nro_serie" INTEGER NOT NULL,
    "vencimiento" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DetalleAlimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "id_alimento" INTEGER NOT NULL,
    CONSTRAINT "DetalleAlimento_id_alimento_fkey" FOREIGN KEY ("id_alimento") REFERENCES "Alimento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Alimentacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Suministro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cantidad" REAL NOT NULL,
    "id_alimentacion" INTEGER NOT NULL,
    "id_alimento" INTEGER NOT NULL,
    CONSTRAINT "Suministro_id_alimentacion_fkey" FOREIGN KEY ("id_alimentacion") REFERENCES "Alimentacion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Suministro_id_alimento_fkey" FOREIGN KEY ("id_alimento") REFERENCES "Alimento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Enfermedad" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "tipo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tratamiento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descripcion" TEXT NOT NULL,
    "dosis_aplicada" TEXT NOT NULL,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EnfermedadxTratamiento" (
    "id_tratamiento" INTEGER NOT NULL,
    "id_enfermedad" INTEGER NOT NULL,
    "periodo_aplicado" TEXT NOT NULL,

    PRIMARY KEY ("id_tratamiento", "id_enfermedad"),
    CONSTRAINT "EnfermedadxTratamiento_id_tratamiento_fkey" FOREIGN KEY ("id_tratamiento") REFERENCES "Tratamiento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EnfermedadxTratamiento_id_enfermedad_fkey" FOREIGN KEY ("id_enfermedad") REFERENCES "Enfermedad" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pesaje" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_bovino" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL,
    "peso_dado" REAL NOT NULL,
    CONSTRAINT "Pesaje_id_bovino_fkey" FOREIGN KEY ("id_bovino") REFERENCES "Bovino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bovino" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_raza" INTEGER NOT NULL,
    "id_corral" INTEGER NOT NULL,
    "caravana" INTEGER NOT NULL,
    "estado_bovino" TEXT NOT NULL,
    "estado_salud" TEXT NOT NULL DEFAULT 'SANO',
    "ingreso" DATETIME NOT NULL,
    "egreso" DATETIME,
    "peso_ingreso" REAL NOT NULL,
    "peso_egreso" REAL,
    "sexo" TEXT NOT NULL,
    "tipo_bovino" TEXT NOT NULL,
    CONSTRAINT "Bovino_id_raza_fkey" FOREIGN KEY ("id_raza") REFERENCES "Raza" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Bovino_id_corral_fkey" FOREIGN KEY ("id_corral") REFERENCES "Corral" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DetalleEnfermedad" (
    "id_bovino" INTEGER NOT NULL,
    "id_enfermedad" INTEGER NOT NULL,
    "id_corral" INTEGER NOT NULL,
    "fecha_inicio" DATETIME NOT NULL,
    "fecha_fin" DATETIME NOT NULL,

    PRIMARY KEY ("id_bovino", "id_enfermedad"),
    CONSTRAINT "DetalleEnfermedad_id_enfermedad_fkey" FOREIGN KEY ("id_enfermedad") REFERENCES "Enfermedad" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DetalleEnfermedad_id_corral_fkey" FOREIGN KEY ("id_corral") REFERENCES "Corral" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DetalleEnfermedad_id_bovino_fkey" FOREIGN KEY ("id_bovino") REFERENCES "Bovino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Corral" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "capacidad_maxima" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,
    "tipo_corral" TEXT NOT NULL,
    "id_alimentacion" INTEGER,
    "id_feedlot" INTEGER NOT NULL,
    CONSTRAINT "Corral_id_alimentacion_fkey" FOREIGN KEY ("id_alimentacion") REFERENCES "Alimentacion" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Corral_id_feedlot_fkey" FOREIGN KEY ("id_feedlot") REFERENCES "Feedlot" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);
