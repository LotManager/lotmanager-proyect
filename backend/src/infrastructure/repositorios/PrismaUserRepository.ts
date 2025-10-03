import { PasswordHash } from "../../domain/value-objects/PasswordHash";
import prisma from "../../infrastructure/repositorios/client";
import { User } from "../../domain/entities/User";
import { Rol } from "../../domain/value-objects/Rol";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class PrismaUserRepository implements IUserRepository {

    private toDomain(data: {
        id: number;
        usuario: string;
        contrasena: string;
        rol: {
            id: number;
            nombre: string;
        } | null;
    }): User {
    const password = PasswordHash.fromHash(data.contrasena);
    if (!data.rol) {
        throw new Error("El usuario no tiene un rol asignado");
    }
    const role = new Rol(data.rol.id, data.rol.nombre);
    return new User(data.id, data.usuario, password, role);
    }  
    
    public async findByUsername(usuario: string): Promise<User | null> {
    const data = await prisma.usuario.findFirst({
      where: { usuario },
      include: { rol: true }
    });
    
    if (!data) return null;
    
    return this.toDomain(data);
    }
  

    public async findById(id: number): Promise<User | null> {
        const data = await prisma.usuario.findUnique({
            where: { id },
            include: { rol: true }
        });

        if (!data) return null;

        return this.toDomain(data);
    }

   public async save(user: User): Promise<void> {
        if (!user.isValid()) {
            throw new Error("[UsuarioRepository] Usuario inválido: falló la validación semántica");
        }

        const rol = user.getRol();

        if (!rol || !rol.isValid()) {
            throw new Error("[UsuarioRepository] Rol inválido o no asignado");
        }

        // Validar existencia del rol en la base de datos
        const rolExistente = await prisma.rol.findUnique({ where: { id: rol.getId() } });
        if (!rolExistente) {
            throw new Error(`[UsuarioRepository] El rol con ID ${rol.getId()} no existe en la base de datos`);
        }

        // Persistencia condicional
        await prisma.usuario.upsert({
            where: { id: user.getId() },
            update: {
            usuario: user.getName(),
            contrasena: user.getPasswordHash(),
            id_rol: rol.getId(),
            },
            create: {
            id: user.getId(),
            usuario: user.getName(),
            contrasena: user.getPasswordHash(),
            id_rol: rol.getId(),
            },
        });
    }

    public async delete(id: number): Promise<void> {
        try {
            await prisma.usuario.delete({ where: { id } });
            console.log(`Usuario con ID ${id} eliminado`);
        } catch (error) {
            if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
            ) {
            throw new Error("Usuario no encontrado");
            }
            throw error;
        }
    }

    public async findAll(): Promise<User[]> {
        const users = await prisma.usuario.findMany({ include: { rol: true } });
        return users.map(this.toDomain);
    }

    public async create(user: User): Promise<User> {
        const rol = user.getRol();

        if (!rol || !rol.isValid()) {
            throw new Error("[UsuarioRepository] Rol inválido o no asignado");
        }

        // Validar existencia del rol en base de datos
        const rolExistente = await prisma.rol.findUnique({ where: { id: rol.getId() } });
        if (!rolExistente) {
            throw new Error(`[UsuarioRepository] El rol con ID ${rol.getId()} no existe en la base de datos`);
        }

        // Validar que el nombre de usuario no esté duplicado
        const usuarioExistente = await prisma.usuario.findFirst({where: { usuario: user.getName() }}); 
        if (usuarioExistente) {
            throw new Error(`[UsuarioRepository] El nombre de usuario '${user.getName()}' ya está registrado`);
        }

        // Crear el usuario
        const nuevoUsuario = await prisma.usuario.create({
            data: {
            usuario: user.getName(),
            contrasena: user.getPasswordHash(),
            id_rol: rol.getId(),
            },
            include: { rol: true },
        });

        return this.toDomain(nuevoUsuario);
        }

    
    public async exists(id: number): Promise<boolean> {
        const count = await prisma.usuario.count({ where: { id } });
    return count > 0;
}

}