import prisma from "../../config/db";
import { Bovino } from "../../domain/entities/Bovino";
import { IBovinoRepository } from "../../domain/interfaces/IBovinoRepository";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Bovino as PrismaBovinoModel } from "@prisma/client";

export class PrismaBovinoRepository implements IBovinoRepository {

  private toDomain(prismaBovino: PrismaBovinoModel): Bovino {
    return new Bovino(
      prismaBovino.id,
      prismaBovino.razaId,          
      prismaBovino.corralId,        
      prismaBovino.caravana,
      prismaBovino.situacionBovino, 
      prismaBovino.estadoSalud,     
      prismaBovino.ingreso,
      prismaBovino.pesoIngreso,     
      prismaBovino.sexo,            
      prismaBovino.tipoBovino,      
      prismaBovino.egreso,
      prismaBovino.pesoEgreso        
    );
  }

  async create(data: Omit<Bovino, "id">): Promise<Bovino> {
    const nuevo = await prisma.bovino.create({
      data: {
        razaId: data.razaId,
        corralId: data.corralId,
        caravana: data.caravana,
        situacionBovino: data.situacionBovino,
        estadoSalud: data.estadoSalud,
        ingreso: data.ingreso,
        pesoIngreso: data.pesoIngreso,
        sexo: data.sexo,
        tipoBovino: data.tipoBovino,
        egreso: data.egreso,
        pesoEgreso: data.pesoEgreso,
      },
    });
    return this.toDomain(nuevo);
  }

  async findAll(): Promise<Bovino[]> {
    const data = await prisma.bovino.findMany();
    return data.map(d => this.toDomain(d));
  }

  async findById(id: number): Promise<Bovino | null> {
    const data = await prisma.bovino.findUnique({ where: { id } });
    return data ? this.toDomain(data) : null;
  }


  async update(id: number, data: Partial<Omit<Bovino, "id">>): Promise<Bovino> {
    const dataToUpdate: any = {};
    if (data.razaId !== undefined) dataToUpdate.razaId = data.razaId;
    if (data.corralId !== undefined) dataToUpdate.corralId = data.corralId;
    if (data.caravana !== undefined) dataToUpdate.caravana = data.caravana;
    if (data.situacionBovino !== undefined) dataToUpdate.situacionBovino = data.situacionBovino;
    if (data.estadoSalud !== undefined) dataToUpdate.estadoSalud = data.estadoSalud;
    if (data.ingreso !== undefined) dataToUpdate.ingreso = data.ingreso;
    if (data.pesoIngreso !== undefined) dataToUpdate.pesoIngreso = data.pesoIngreso;
    if (data.sexo !== undefined) dataToUpdate.sexo = data.sexo;
    if (data.tipoBovino !== undefined) dataToUpdate.tipoBovino = data.tipoBovino;
    if (data.egreso !== undefined) dataToUpdate.egreso = data.egreso;
    if (data.pesoEgreso !== undefined) dataToUpdate.pesoEgreso = data.pesoEgreso;
    
    try {
      const actualizado = await prisma.bovino.update({ where: { id }, data: dataToUpdate });
      return this.toDomain(actualizado);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Bovino no encontrado");
      }
      throw error;
    }
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
      where: { corralId: idCorral },
      orderBy: { id: "asc" },
    });
    return data.map(d => this.toDomain(d));
  }

  public async findAllConRelaciones(): Promise<any[]> {
    return prisma.bovino.findMany({
      include: {
        corral: { select: { numero: true } },
        pesajes: { 
          orderBy: { fecha: 'desc' },
          take: 1,
        },
      },
    });
  }
  
  public async findByCorralConRelaciones(idCorral: number): Promise<any[]> {
    return prisma.bovino.findMany({
      where: {
        corralId: idCorral, // Filtramos por ID de corral
      },
      include: {
        pesajes: { // Traemos los pesajes para calcular GMD
          orderBy: { fecha: 'desc' },
          take: 1,
        },
      },
    });
  }

}