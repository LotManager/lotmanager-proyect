import { Prisma } from "@prisma/client";
import { CasoEnfermedad } from "../../domain/entities/Sanidad";
import { ICasoEnfermedadRepository } from "../../domain/interfaces/ISanidadRepository";

export class CasoEnfermedadService {
  constructor(private readonly casoRepo: ICasoEnfermedadRepository) {}

  public async registrarSrv(
    id: number,
    fechaDeteccion: Date,
    enfermedadId: number,
    tratamientoId: number,
    bovinoId: number,
    fechaAlta?: Date
  ): Promise<CasoEnfermedad> {
    const caso = new CasoEnfermedad(
      id,
      fechaDeteccion,
      fechaAlta,
      enfermedadId,
      tratamientoId,
      bovinoId
    );
    return await this.casoRepo.create(caso);
  }

  public async actualizarSrv(
    id: number,
    cambios: {
      fechaDeteccion?: Date;
      fechaAlta?: Date;
      enfermedadId?: number;
      tratamientoId?: number;
      bovinoId?: number;
    }
  ): Promise<void> {
    const actual = await this.casoRepo.findById(id);
    if (!actual) throw new Error("Caso no encontrado");

    const actualizado = new CasoEnfermedad(
      id,
      cambios.fechaDeteccion ?? actual.getFechaDeteccion(),
      cambios.fechaAlta ?? actual.getFechaAlta(),
      cambios.enfermedadId ?? actual.getEnfermedadId(),
      cambios.tratamientoId ?? actual.getTratamientoId(),
      cambios.bovinoId ?? actual.getBovinoId()
    );

    await this.casoRepo.update(actualizado);
  }

  public async eliminar(id: number): Promise<void> {
    try {
        await this.casoRepo.delete(id);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
            throw new Error("El caso no existe o ya fue eliminado");
        }
        throw error;
    }
  }

  public async obtenerPorId(id: number): Promise<CasoEnfermedad | null> {
    return await this.casoRepo.findById(id);
  }

  public async listar(): Promise<CasoEnfermedad[]> {
    return await this.casoRepo.findAll();
  }

  public async existe(id: number): Promise<boolean> {
    return await this.casoRepo.exists(id);
  }
}