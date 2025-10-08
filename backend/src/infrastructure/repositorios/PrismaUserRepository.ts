import { PasswordHash } from "../../domain/value-objects/PasswordHash";
import prisma from "../../infrastructure/repositorios/client";
import { User } from "../../domain/entities/User";
import { Rol } from "../../domain/value-objects/Rol";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { UserUpdateInput } from "application/dtos/user.dto";

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
    const role = new Rol(data.rol.id, data.rol.nombre as "admin" | "encargado");
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

    public async updatePartial(id: number, data: UserUpdateInput): Promise<User> {
    const usuarioActual = await prisma.usuario.findUnique({
        where: { id },
        include: { rol: true }
    });

    if (!usuarioActual) {
        throw new Error(`[UsuarioRepository] No se puede actualizar: el usuario con ID ${id} no existe`);
    }

    const camposActualizados: {
        usuario?: string;
        contrasena?: string;
        id_rol?: number;
    } = {};

    if (data.usuario) {
        // Validar duplicado si el nombre cambió
        if (data.usuario !== usuarioActual.usuario) {
        const duplicado = await prisma.usuario.findFirst({ where: { usuario: data.usuario } });
        if (duplicado) {
            throw new Error(`[UsuarioRepository] El nombre de usuario '${data.usuario}' ya está registrado`);
        }
        }
        camposActualizados.usuario = data.usuario;
    }

    if (data.contrasena) {
        const hash = await PasswordHash.createFromPlain(data.contrasena);
        camposActualizados.contrasena = hash.getValue();
    }

    if (data.rol) {
        if (!data.rol.isValid()) {
        throw new Error("[UsuarioRepository] Rol inválido");
        }

        const rolExistente = await prisma.rol.findUnique({ where: { id: data.rol.getId() } });
        if (!rolExistente) {
        throw new Error(`[UsuarioRepository] El rol con ID ${data.rol.getId()} no existe en la base de datos`);
        }

        camposActualizados.id_rol = data.rol.getId();
    }

    const actualizado = await prisma.usuario.update({
        where: { id },
        data: camposActualizados,
        include: { rol: true }
    });

    return this.toDomain(actualizado);
    }

    public async cambiarContrasena(id: number, contrasenaActual: string, nuevaContrasena: string): Promise<void> {
    const usuario = await prisma.usuario.findUnique({
        where: { id },
    });

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
        data: {
        contrasena: nuevaHash.getValue(),
        },
    });

    console.log(`[UsuarioRepository] Contraseña actualizada para el usuario con ID ${id}`);
    }
}