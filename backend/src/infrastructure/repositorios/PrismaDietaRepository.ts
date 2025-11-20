import prisma from "../../config/db";
import { Dieta, DetalleDieta } from "../../domain/entities/Dieta";
import { Alimento } from "../../domain/entities/Alimento";
import { IDietaRepository } from "../../domain/interfaces/IDietaRepository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UpdateDietaDtoType } from "../../application/dtos/dieta.dto";

export class PrismaDietaRepository implements IDietaRepository {
  
  // Helper para convertir de Prisma a Dominio incluyendo los detalles
  private toDomain(data: any): Dieta {
    const detalles = data.detallesDieta?.map((d: any) => {
      // Si viene con el alimento incluido, lo mapeamos
      const alimento = d.alimento 
        ? new Alimento(d.alimento.id, d.alimento.nombre, d.alimento.tipo) 
        : undefined;
        
      return new DetalleDieta(d.dietaId, d.alimentoId, d.proporcionKg, alimento);
    }) || [];

    return new Dieta(data.id, data.nombre, data.descripcion, detalles);
  }

  async create(data: Omit<Dieta, "id">): Promise<Dieta> {
    // Prisma permite crear el padre y los hijos al mismo tiempo
    const nueva = await prisma.dieta.create({
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        detallesDieta: {
          create: data.detallesDieta.map(d => ({
            alimentoId: d.alimentoId,
            proporcionKg: d.proporcionKg
          }))
        }
      },
      include: {
        detallesDieta: {
          include: { alimento: true } // Traemos info del alimento para devolver el objeto completo
        }
      }
    });
    return this.toDomain(nueva);
  }

  async findAll(): Promise<Dieta[]> {
    const data = await prisma.dieta.findMany({
      include: {
        detallesDieta: {
          include: { alimento: true }
        }
      }
    });
    return data.map(d => this.toDomain(d));
  }

  async findById(id: number): Promise<Dieta | null> {
    const data = await prisma.dieta.findUnique({
      where: { id },
      include: {
        detallesDieta: {
          include: { alimento: true }
        }
      }
    });
    return data ? this.toDomain(data) : null;
  }

async update(id: number, data: UpdateDietaDtoType): Promise<Dieta> {
    console.log("⚡️ INICIANDO UPDATE DIETA:", id);
    console.log("📦 DATOS RECIBIDOS:", JSON.stringify(data, null, 2));

    // 1. Preparamos los datos planos
    const datosDieta: any = {};
    if (data.nombre) datosDieta.nombre = data.nombre;
    if (data.descripcion !== undefined) datosDieta.descripcion = data.descripcion;

    // 2. Ejecutamos la transacción
    await prisma.$transaction(async (tx) => {
      
      // PASO A: Actualizar datos básicos de la Dieta
      if (Object.keys(datosDieta).length > 0) {
        await tx.dieta.update({
          where: { id },
          data: datosDieta
        });
      }

      // PASO B: Gestionar los ingredientes (si vienen en la petición)
      if (data.detalles) {
        // 1. Borrar todo lo viejo
        console.log(`🗑️ Borrando ingredientes viejos de la dieta ${id}...`);
        await tx.detalleDieta.deleteMany({
          where: { dietaId: id }
        });

        // 2. Preparar los nuevos datos
        const nuevosIngredientes = data.detalles.map(d => ({
          dietaId: id, // Vinculamos explícitamente
          alimentoId: Number(d.alimentoId),
          proporcionKg: Number(d.proporcionKg)
        }));

        console.log("✨ Insertando nuevos ingredientes:", nuevosIngredientes);

        // 3. Insertar los nuevos (usando createMany que es más eficiente y directo)
        if (nuevosIngredientes.length > 0) {
          await tx.detalleDieta.createMany({
            data: nuevosIngredientes
          });
        }
      }
    });

    // 3. PASO FINAL: Leer el resultado fresco de la base de datos
    // Esto asegura que devolvemos lo que REALMENTE se guardó.
    const dietaActualizada = await prisma.dieta.findUnique({
      where: { id },
      include: {
        detallesDieta: {
          include: { alimento: true }
        }
      }
    });

    if (!dietaActualizada) throw new Error("Error crítico: La dieta desapareció después de actualizar.");

    return this.toDomain(dietaActualizada);
  }

  async delete(id: number): Promise<void> {
    // Primero borramos los detalles para evitar error de Foreign Key
    // (Aunque si tenés onDelete: Cascade en el schema, Prisma lo hace solo)
    await prisma.detalleDieta.deleteMany({ where: { dietaId: id } });
    await prisma.dieta.delete({ where: { id } });
  }
}