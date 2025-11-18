import { PasswordHash } from "../../domain/value-objects/PasswordHash";
import prisma from "../../infrastructure/repositorios/client";
import { User } from "../../domain/entities/User";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserUpdateInput } from "application/dtos/user.dto";
import { UserMapper } from "../../application/mappers/userMapper";
import { Prisma } from "@prisma/client";
import { mapNombreToTipoRol } from "../../application/mappers/userMapper";



export class PrismaUserRepository implements IUserRepository {

  public async findByUsername(username: string): Promise<User | null> {
    const data = await prisma.usuario.findFirst({ where: { username } });
    return data ? UserMapper.toDomain(data) : null;
  }

  public async findById(id: number): Promise<User | null> {
    const data = await prisma.usuario.findUnique({ where: { id } });
    return data ? UserMapper.toDomain(data) : null;
  }

  public async save(user: User): Promise<void> {
    if (!user.isValid()) {
      throw new Error("[UsuarioRepository] Usuario inválido: falló la validación semántica");
    }

    const data = UserMapper.toPrisma(user);

    await prisma.usuario.upsert({
      where: { id: user.getId() },
      update: data,
      create: data,
    });
  }

  public async delete(id: number): Promise<void> {
    try {
      await prisma.usuario.delete({ where: { id } });
      console.log(`Usuario con ID ${id} eliminado`);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
        throw new Error("Usuario no encontrado");
      }
      throw error;
    }
  }

  public async findAll(): Promise<User[]> {
    const users = await prisma.usuario.findMany();
    return users.map(UserMapper.toDomain);
  }

  public async create(user: User): Promise<User> {
    if (!user.getRol().isValid()) {
      throw new Error("[UsuarioRepository] Rol inválido o no asignado");
    }

    const existente = await prisma.usuario.findFirst({ where: { username: user.getName() } });
    if (existente) {
      throw new Error(`[UsuarioRepository] El nombre de usuario '${user.getName()}' ya está registrado`);
    }

    const data = UserMapper.toPrisma(user);

    const nuevoUsuario = await prisma.usuario.create({ data });
    return UserMapper.toDomain(nuevoUsuario);
  }

  public async exists(id: number): Promise<boolean> {
    const count = await prisma.usuario.count({ where: { id } });
    return count > 0;
  }

  public async updatePartial(id: number, data: UserUpdateInput): Promise<User> {
  const usuarioActual = await prisma.usuario.findUnique({ where: { id } });
  if (!usuarioActual) {
    throw new Error(`[UsuarioRepository] No se puede actualizar: el usuario con ID ${id} no existe`);
  }

  const camposActualizados: Prisma.UsuarioUpdateInput = {};

  if (data.username && data.username !== usuarioActual.username) {
    const duplicado = await prisma.usuario.findFirst({ where: { username: data.username } });
    if (duplicado) {
      throw new Error(`[UsuarioRepository] El nombre de usuario '${data.username}' ya está registrado`);
    }
    camposActualizados.username = data.username;
  }

  if (data.contrasena) {
    const hash = await PasswordHash.createFromPlain(data.contrasena);
    camposActualizados.contrasena = hash.getValue();
  }

  if (data.rol) {
    if (!data.rol.isValid()) {
      throw new Error("[UsuarioRepository] Rol inválido");
    }

    camposActualizados.rol = {
      set: mapNombreToTipoRol(data.rol.getNombre())
    };
  }

  const actualizado = await prisma.usuario.update({
    where: { id },
    data: camposActualizados,
  });


    return UserMapper.toDomain(actualizado);
  }

  public async cambiarContrasena(id: number, contrasenaActual: string, nuevaContrasena: string): Promise<void> {
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) {
      throw new Error(`[UsuarioRepository] Usuario con ID ${id} no encontrado`);
    }

    const passwordHash = PasswordHash.fromHash(usuario.contrasena);
    const esValida = await passwordHash.compareWith(contrasenaActual);
    if (!esValida) {
      throw new Error("[UsuarioRepository] La contraseña actual es incorrecta");
    }

    const nuevaHash = await PasswordHash.createFromPlain(nuevaContrasena);
    await prisma.usuario.update({
      where: { id },
      data: { contrasena: nuevaHash.getValue() },
    });

    console.log(`[UsuarioRepository] Contraseña actualizada para el usuario con ID ${id}`);
  }
}