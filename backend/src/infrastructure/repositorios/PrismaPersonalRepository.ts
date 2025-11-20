import { PrismaClient } from "@prisma/client";
import { PersonalRepository } from "../../domain/interfaces/IPersonalRepository";
import { PersonalCreateDto } from "../../application/dtos/personal.dto";
import { mapToPersonalPersisted } from "../../application/mappers/mapToPersonalPersisted";
import { PersonalPersisted } from "../../application/types/Personaltypes";


const prisma = new PrismaClient();




export class PrismaPersonalRepository implements PersonalRepository {
  async create(data: PersonalCreateDto): Promise<PersonalPersisted> {
  if (data.id_usuario) {
    const usuario = await prisma.usuario.findUnique({ where: { id: data.id_usuario } });
    if (!usuario) throw new Error("El usuario asociado no existe");
  }

  const creado = await prisma.persona.create({
    data: {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      usuario: data.id_usuario
        ? { connect: { id: data.id_usuario } }
        : undefined
    },
    include: {
      usuario: true
    }
  });

  return mapToPersonalPersisted(creado);
}

  async findById(id: number): Promise<PersonalPersisted | null> {
    const encontrado = await prisma.persona.findUnique({
      where: { id },
      include: {
        usuario: true
      }
    });

    if (!encontrado) return null;

    return mapToPersonalPersisted(encontrado);
  }

  async save(id: number, data: PersonalCreateDto): Promise<PersonalPersisted> {
    const actualizado = await prisma.persona.update({
      where: { id },
      data: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
      },
      include: {
        usuario: true
      }
    });

    return mapToPersonalPersisted(actualizado);
  }

  async delete(id: number): Promise<void> {
    await prisma.persona.delete({ where: { id } });
  }

  async buscarPorUsuarioId(id: number): Promise<any> {
    return prisma.usuario.findUnique({
      where: { id }
    });
  }
  async findAll(): Promise<PersonalPersisted[]> {
    const personals = await prisma.persona.findMany({
  include: {
    usuario: {
      select: {
        id: true,
        username: true,
        contrasena: true,
        personaId: true,
        id_rol: true // ✅ esto es lo que te falta
      }
    }
  }
});
    return personals.map(mapToPersonalPersisted);
  }
}