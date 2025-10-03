import { PrismaClient } from "@prisma/client";
import { PersonalRepository } from "../../domain/interfaces/IPersonalRepository";
import { PersonalCreateInput, PersonalPersisted } from "../../application/personal/types/Personaltypes";
import { mapToPersonalPersisted } from "../../application/mappers/mapToPersonalPersisted";


const prisma = new PrismaClient();




export class PrismaPersonalRepository implements PersonalRepository {
  async create(data: PersonalCreateInput): Promise<PersonalPersisted> {
    const creado = await prisma.personal.create({
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        id_usuario: data.id_usuario ?? null
      },
      include: {
        usuario: {
          include: { rol: true }
        }
      }
    });

    return mapToPersonalPersisted(creado);
  }

  async findById(id: number): Promise<PersonalPersisted | null> {
    const encontrado = await prisma.personal.findUnique({
      where: { id },
      include: {
        usuario: {
          include: { rol: true }
        }
      }
    });

    if (!encontrado) return null;

    return mapToPersonalPersisted(encontrado);
  }

  async save(id: number, data: PersonalCreateInput): Promise<PersonalPersisted> {
    const actualizado = await prisma.personal.update({
      where: { id },
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        id_usuario: data.id_usuario ?? null
      },
      include: {
        usuario: {
          include: { rol: true }
        }
      }
    });

    return mapToPersonalPersisted(actualizado);
  }

  async delete(id: number): Promise<void> {
    await prisma.personal.delete({ where: { id } });
  }

  async buscarPorUsuarioId(id: number): Promise<any> {
    return prisma.usuario.findUnique({
      where: { id },
      include: { rol: true }
    });
  }
  async findAll(): Promise<PersonalPersisted[]> {
    const personals = await prisma.personal.findMany({
      include: {
        usuario: {
          include: { rol: true }
        }
      }
    });
    return personals.map(mapToPersonalPersisted);
  }
}