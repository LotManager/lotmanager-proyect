import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Crear la provincia de Buenos Aires si no existe
  const provincia = await prisma.provincia.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nombre: "Buenos Aires",
    },
  });

  // Localidades asociadas a Buenos Aires
 const localidades = [
  { id: 1, nombre: "City Bell", id_provincia: provincia.id, codigo_postal: 1896 },
  { id: 2, nombre: "La Plata", id_provincia: provincia.id, codigo_postal: 1900 },
  { id: 3, nombre: "Berisso", id_provincia: provincia.id, codigo_postal: 1923 },
  { id: 4, nombre: "Ensenada", id_provincia: provincia.id, codigo_postal: 1925 },
  { id: 5, nombre: "Villa Elisa", id_provincia: provincia.id, codigo_postal: 1894 },
];
  for (const loc of localidades) {
    await prisma.localidad.upsert({
      where: { id: loc.id },
      update: {},
      create: loc,
    });
  }

  console.log("[Setup] Provincia y localidades iniciales creadas");
}

main()
  .catch((e) => {
    console.error("Error al inicializar provincias y localidades:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());


