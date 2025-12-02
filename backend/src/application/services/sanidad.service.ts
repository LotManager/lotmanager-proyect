import prisma from "../../config/db";
import { EstadoSalud } from "@prisma/client";
import { z } from "zod";

// DTO para crear un caso
export const CreateCasoDto = z.object({
  bovinoId: z.number(),
  enfermedadId: z.number(),
  tratamientoId: z.number(),
  fechaDeteccion: z.string().datetime().optional(),
});

// Enfermedad (Configuración)
export const CreateEnfermedadDto = z.object({
  nombre: z.string().min(1),
  tipo: z.enum(["RESPIRATORIA", "DIGESTIVA", "SISTEMA_NERVIOSO", "OJOS", "PARASITARIA", "INTOXICACION", "OTRA"]), 
  descripcion: z.string().optional(),
});

// Tratamiento (Configuración)
export const CreateTratamientoDto = z.object({
  nombre: z.string().min(1),
  unidad: z.enum(["ML", "MG", "G", "TABLETA", "UNIDAD"]),
  descripcion: z.string().optional(),
});

export type CreateCasoDtoType = z.infer<typeof CreateCasoDto>;
export type CreateEnfermedadDtoType = z.infer<typeof CreateEnfermedadDto>;
export type CreateTratamientoDtoType = z.infer<typeof CreateTratamientoDto>;

export class SanidadService {
  
  // --- OPERACIONES ---

  async registrarCaso(data: CreateCasoDtoType) {
    return prisma.$transaction(async (tx) => {
      // 1. Crear el registro del caso clínico
      const nuevoCaso = await tx.casoEnfermedad.create({
        data: {
          bovinoId: data.bovinoId,
          enfermedadId: data.enfermedadId,
          tratamientoId: data.tratamientoId,
          fechaDeteccion: data.fechaDeteccion ? new Date(data.fechaDeteccion) : new Date(),
        }
      });

      // 2. Actualizar el estado del animal a ENFERMO
      await tx.bovino.update({
        where: { id: data.bovinoId },
        data: { estadoSalud: EstadoSalud.ENFERMO }
      });

      return nuevoCaso;
    });
  }

  async darAlta(casoId: number) {
    return prisma.$transaction(async (tx) => {
      // 1. Cerrar el caso con fecha de alta
      const casoCerrado = await tx.casoEnfermedad.update({
        where: { id: casoId },
        data: { fechaAlta: new Date() },
        include: { bovino: true }
      });

      // 2. Devolver el animal a estado SANO
      // (Ojo: Solo si no tiene otros casos abiertos, pero simplifiquemos por ahora)
      await tx.bovino.update({
        where: { id: casoCerrado.bovinoId },
        data: { estadoSalud: EstadoSalud.SANO }
      });

      return casoCerrado;
    });
  }

  // --- LISTAS AUXILIARES PARA EL FRONTEND ---

  async getEnfermedades() {
    return prisma.enfermedad.findMany();
  }

  async getTratamientos() {
    return prisma.tratamiento.findMany();
  }
  
  // Obtener casos activos (animales enfermos ahora mismo)
  async getCasosActivos() {
      return prisma.casoEnfermedad.findMany({
          where: { fechaAlta: null },
          include: { 
              bovino: true,
              enfermedad: true,
              tratamiento: true
          }
      })
  }

  async crearEnfermedad(data: CreateEnfermedadDtoType) {
    return prisma.enfermedad.create({ data });
  }

  async eliminarEnfermedad(id: number) {
    // Opcional: Verificar si está en uso antes de borrar
    return prisma.enfermedad.delete({ where: { id } });
  }

  // --- Tratamientos ---
  async crearTratamiento(data: CreateTratamientoDtoType) {
    return prisma.tratamiento.create({ data });
  }

  async eliminarTratamiento(id: number) {
    return prisma.tratamiento.delete({ where: { id } });
  }
}