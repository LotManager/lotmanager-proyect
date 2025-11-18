import { Personal } from "../../domain/entities/Personal";
import { UserMapper } from "../mappers/userMapper";
import { PersonalResponseDto } from "../dtos/personal.dto";
import { Prisma } from "@prisma/client";

type PersonalWithUsuario = Prisma.PersonaGetPayload<{ include: { usuario: true } }>;

export class PersonalMapper {
  static toDomain(data: PersonalWithUsuario): Personal {
    const usuario = data.usuario ? UserMapper.toDomain(data.usuario) : undefined;

    return new Personal(
        data.id,
        data.nombre,
        data.apellido,
        data.email,
        usuario || null
    );
  }

  static toDTO(personal: Personal): PersonalResponseDto {
    return {
      id: personal.getId(),
      nombre: personal.getNombre(),
      apellido: personal.getApellido(),
      email: personal.getMail(),
      };
  }

  static toPrisma(personal: Personal): Prisma.PersonaUncheckedCreateInput {
    return {
      id: personal.getId(),
      nombre: personal.getNombre(),
      apellido: personal.getApellido(),
      email: personal.getMail(),
      usuario: personal.hasUsuario()
        ? { create: UserMapper.toPrisma(personal.getUsuario()!) }
        : undefined
    };
  }
}