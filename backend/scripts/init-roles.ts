import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.rol.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, nombre: "admin" },
  });

  await prisma.rol.upsert({
    where: { id: 2 },
    update: {},
    create: { id: 2, nombre: "user" },
  });

  console.log("Roles iniciales asegurados");
}

main()
  .catch((e) => {
    console.error("Error al inicializar roles:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());