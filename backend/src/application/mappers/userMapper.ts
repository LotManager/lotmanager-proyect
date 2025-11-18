import { User } from "../../domain/entities/User";
import { Rol } from "../../domain/value-objects/Rol";
import { PasswordHash } from "../../domain/value-objects/PasswordHash";
import { Prisma } from "@prisma/client";
import { UserDTO } from "../../application/dtos/user.dto";
import { TipoRol } from "@prisma/client";


type UsuarioWithRol = Prisma.UsuarioGetPayload<undefined>;

export class UserMapper {
  
  static toDomain(data: UsuarioWithRol): User {
    const password = PasswordHash.fromHash(data.contrasena);
    const rol = Rol.fromNombre(mapTipoRolToNombre(data.rol));

    return new User(data.id, data.username, password, rol, data.personaId);
  }

  static toPrisma(user: User): Prisma.UsuarioUncheckedCreateInput {
    return {
      id: user.getId(),
      username: user.getName(),
      contrasena: user.getPasswordHash(),
      rol: mapNombreToTipoRol(user.getRol().getNombre()),
      personaId: user.getPersonaId()
    };
  }

  static toDTO(user: User): UserDTO {
    const nombre = user.getRol().getNombre();
    if (nombre !== "admin" && nombre !== "tambero") {
      throw new Error(`Rol inválido: ${nombre}`);
    }

    return {
      id: user.getId(),
      username: user.getName(),
      rol: user.getRol().toDTO()
    };
  }
  
}
export function mapTipoRolToNombre(rol: TipoRol): "admin" | "tambero" {
  switch (rol) {
    case TipoRol.ADMINISTRADOR:
      return "admin";
    case TipoRol.TAMBERO:
      return "tambero";
    default:
      throw new Error(`Rol desconocido: ${rol}`);
  }
}
export function mapNombreToTipoRol(nombre: "admin" | "tambero"): TipoRol {
  switch (nombre) {
    case "admin":
      return TipoRol.ADMINISTRADOR;
    case "tambero":
      return TipoRol.TAMBERO;
    default:
      throw new Error(`Nombre de rol inválido: ${nombre}`);
  }
}