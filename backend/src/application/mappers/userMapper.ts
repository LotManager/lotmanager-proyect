import { User } from "../../domain/entities/User";
import { Rol } from "../../domain/value-objects/Rol";
import { PasswordHash } from "../../domain/value-objects/PasswordHash";
import { Prisma, Usuario } from "@prisma/client";
import { UserDTO } from "../../application/dtos/user.dto";



export class UserMapper {
  
  static toDomain(prismaUser: Usuario): User {
  return new User(
    prismaUser.id,
    prismaUser.username,
    PasswordHash.fromHash(prismaUser.contrasena),
    Rol.fromId(prismaUser.id_rol),
    prismaUser.personaId ?? null
  );
}

  static toPrisma(user: User): Prisma.UsuarioCreateInput {
    return {
      username: user.getName(),
      contrasena: user.getPasswordHash(),
      rol: {
        connect: { id: user.getRol().getId() },
      },
      persona: user.getPersonaId() !== null
        ? { connect: { id: user.getPersonaId()! } }
        : undefined
    };
  }


  static toDTO(user: User): UserDTO {
    return {
      id: user.getId(),
      username: user.getName(),
      rol: user.getRol().toDTO(),
      personaId: user.getPersonaId()
    };
  }
  
}
