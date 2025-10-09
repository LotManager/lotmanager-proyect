import { User } from "../../domain/entities/User";
import { Rol } from "../../domain/value-objects/Rol";
import { PasswordHash } from "../../domain/value-objects/PasswordHash";

interface PrismaUser {
  id: number;
  usuario: string;
  contrasena: string;
  rol: {
    id: number;
    nombre: string;
  };
}

export class UserMapper {
  static fromPrisma(dbUser: PrismaUser): User {
    if (!dbUser || !dbUser.rol || !dbUser.contrasena) {
      throw new Error("Datos de usuario incompletos");
    }

    const rol = Rol.fromId(dbUser.rol.id); 
    const password = PasswordHash.fromHash(dbUser.contrasena); // ya hasheada

    return new User(dbUser.id, dbUser.usuario, password, rol);
  }

  static toPersistence(user: User): {
    id: number;
    usuario: string;
    contrasena: string;
    id_rol: number;
  } {
    return {
      id: user.getId(),
      usuario: user.getName(),
      contrasena: user.getPasswordHash(),
      id_rol: user.getRol().getId()
    };
  }
  static toDTO(user: User): {
    id: number;
    usuario: string;
    rol: { id: number; nombre: string };
  } {
    return {
      id: user.getId(),
      usuario: user.getName(),
      rol: user.getRol().toDTO()
    };
  }
}