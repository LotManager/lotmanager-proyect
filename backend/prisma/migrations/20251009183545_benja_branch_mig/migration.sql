-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DetalleAlimento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "id_alimento" INTEGER NOT NULL,
    CONSTRAINT "DetalleAlimento_id_alimento_fkey" FOREIGN KEY ("id_alimento") REFERENCES "Alimento" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DetalleAlimento" ("id", "id_alimento", "nombre", "tipo") SELECT "id", "id_alimento", "nombre", "tipo" FROM "DetalleAlimento";
DROP TABLE "DetalleAlimento";
ALTER TABLE "new_DetalleAlimento" RENAME TO "DetalleAlimento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
