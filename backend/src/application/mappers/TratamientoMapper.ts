import { Tratamiento } from '../../domain/entities/Tratamiento'
import { Enfermedad } from '../../domain/entities/Enfermedad'
import { TipoEnfermedad } from '../../domain/enums/TipoEnfermedad'
import {
  TratamientoDto,
  TratamientoCreateDto,
  TratamientoConEnfermedadesDto,
} from '../dtos/tratamiento.dto'
import { Prisma } from '@prisma/client'

type TratamientoWithEnfermedadesPrisma = Prisma.TratamientoGetPayload<{
  include: {
    enfermedadxtratamiento: {
      include: {
        enfermedad: true
      }
    }
  }
}>

export class TratamientoMapper {
  static toEntity(prismaModel: Prisma.TratamientoUncheckedCreateInput): Tratamiento {
    return new Tratamiento(
      prismaModel.id ?? 0,
      prismaModel.descripcion,
      prismaModel.dosis_aplicada,
      prismaModel.nombre
    )
  }

  static fromCreateDto(dto: TratamientoCreateDto): Tratamiento {
    return new Tratamiento(0, dto.descripcion, dto.dosisAplicada, dto.nombre)
  }

  static toPrisma(entity: Tratamiento): Prisma.TratamientoUncheckedCreateInput {
    return {
      id: entity.getId(),
      descripcion: entity.getDescripcion(),
      dosis_aplicada: entity.getDosisAplicada(),
      nombre: entity.getNombre(),
    }
  }

  static toDto(entity: Tratamiento): TratamientoDto {
    return {
      id: entity.getId(),
      descripcion: entity.getDescripcion(),
      dosisAplicada: entity.getDosisAplicada(),
      nombre: entity.getNombre(),
    }
  }

  static toEntityWithEnfermedades(model: TratamientoWithEnfermedadesPrisma): Tratamiento {
  const enfermedades = model.enfermedadxtratamiento.map(rel => 
    new Enfermedad(
      rel.enfermedad.id,
      rel.enfermedad.nombre,
      rel.enfermedad.descripcion,
      rel.enfermedad.tipo as TipoEnfermedad
    )
  )

  return new Tratamiento(
    model.id,
    model.descripcion,
    model.dosis_aplicada,
    model.nombre,
    enfermedades
  )
}
  static toDtoWithEnfermedades(entity: Tratamiento): TratamientoConEnfermedadesDto {
  return {
    id: entity.getId(),
    descripcion: entity.getDescripcion(),
    dosisAplicada: entity.getDosisAplicada(),
    nombre: entity.getNombre(),
    enfermedades: entity.getEnfermedades().map(enfermedad => ({
      id: enfermedad.getId(),
      nombre: enfermedad.getNombre(),
      descripcion: enfermedad.getDescripcion(),
      tipo: enfermedad.getTipo(),
    })),
  }
}  
}
