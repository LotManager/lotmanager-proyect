import { User } from "../../domain/entities/User";
import { Rol } from "../../domain/value-objects/Rol";
import { PasswordHash } from "../../domain/value-objects/PasswordHash";

export class UserMapper {
  static fromPrisma(dbUser: any): User {
    if (!dbUser || !dbUser.rol) {
      throw new Error("Datos de usuario incompletos");
    }

    const rol = new Rol(dbUser.rol.id, dbUser.rol.nombre);
    const password = PasswordHash.fromHash(dbUser.contrasena); // asumimos que ya está hasheada

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
 
}