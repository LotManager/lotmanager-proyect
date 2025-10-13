import { Bovino } from "../../domain/entities/Bovino";
import { IBovinoRepository } from "../../domain/interfaces/IBovinoRepository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { BovinoMapper } from "../../application/mappers/bovino.mapper"; // ✅ IMPORTAMOS EL MAPPER
import { Bovino as PrismaBovinoModel } from "@prisma/client";
import  prisma  from "../../config/db";

export class PrismaBovinoRepository implements IBovinoRepository {
  
   private toDomain(data: PrismaBovinoModel): Bovino {
    return new Bovino(
      data.id,
      data.id_raza,
      data.id_corral,
      data.caravana,
      data.estado_bovino,
      data.estado_salud,
      data.ingreso,
      data.peso_ingreso,
      data.sexo,
      data.tipo_bovino,
      data.egreso,
      data.peso_egreso
    );
  }

  async create(data: Omit<Bovino, "id">): Promise<Bovino> {
    const nuevo = await prisma.bovino.create({
      data: {
        id_raza: data.idRaza,
        id_corral: data.idCorral,
        caravana: data.caravana,
        estado_bovino: data.estadoBovino,
        estado_salud: data.estadoSalud,
        ingreso: data.ingreso,
        peso_ingreso: data.pesoIngreso,
        sexo: data.sexo,
        tipo_bovino: data.tipoBovino,
        egreso: data.egreso,
        peso_egreso: data.pesoEgreso,
      },
    });
    return BovinoMapper.toDomain(nuevo);
  }

  async findAll(): Promise<Bovino[]> {
    const data = await prisma.bovino.findMany();
    return data.map(BovinoMapper.toDomain); // ✅ Usamos el mapper
  }

  async findById(id: number): Promise<Bovino | null> {
    const data = await prisma.bovino.findUnique({ where: { id } });
    return data ? BovinoMapper.toDomain(data) : null; // ✅ Usamos el mapper
  }

  async update(id: number, data: Partial<Omit<Bovino, "id">>): Promise<Bovino> {
    const dataToUpdate = BovinoMapper.fromDomainToUpdate(data); // ✅ Usamos el mapper
    const actualizado = await prisma.bovino.update({ where: { id }, data: dataToUpdate });
    return BovinoMapper.toDomain(actualizado); // ✅ Usamos el mapper
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.bovino.delete({ where: { id } });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Bovino no encontrado");
      }
      throw error;
    }
  }
  public async findByCorral(idCorral: number): Promise<Bovino[]> {
    const data = await prisma.bovino.findMany({
      where: { id_corral: idCorral },
      orderBy: { id: "asc" },
    });
    // Reutilizamos el método toDomain para convertir cada resultado
    return data.map(d => this.toDomain(d));
  }
}
