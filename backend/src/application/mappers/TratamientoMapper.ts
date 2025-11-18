import { Tratamiento } from '../../domain/entities/Tratamiento'
import {
  TratamientoDto,
  TratamientoCreateDto,
  TratamientoUpdateDto,
} from '../dtos/tratamiento.dto'
import { Prisma } from '@prisma/client'


export class TratamientoMapper {
  static toEntity(prismaModel: Prisma.TratamientoUncheckedCreateInput): Tratamiento {
    return new Tratamiento(
      prismaModel.id ?? 0,
      prismaModel.descripcion ?? 'Sin Descripcion',
      prismaModel.nombre,
      prismaModel.unidad
    )
  }

  static fromCreateDto(dto: TratamientoCreateDto): Tratamiento {
    return new Tratamiento(0, dto.descripcion, dto.nombre, dto.unidad)
  }

  static toPrisma(entity: Tratamiento): Prisma.TratamientoUncheckedCreateInput {
    return {
      descripcion: entity.getDescripcion(),
      unidad:  entity.getUnidad(),  
      nombre: entity.getNombre(),
    }
  }

  static toDto(entity: Tratamiento): TratamientoDto {
    return {
      id: entity.getId(),
      descripcion: entity.getDescripcion(),
      unidad: entity.getUnidad(),
      nombre: entity.getNombre(),
    }
  }

 
  
  static toUpdatePrisma(entity: Tratamiento): Prisma.TratamientoUpdateInput {
    return {
      descripcion: entity.getDescripcion(),
      unidad: entity.getUnidad(),
      nombre: entity.getNombre()
    };
  }

  static toPartialPrisma(dto: TratamientoUpdateDto): Prisma.TratamientoUpdateInput {
    const update: Prisma.TratamientoUpdateInput = {}
    if (dto.descripcion) update.descripcion = dto.descripcion
    if (dto.nombre) update.nombre = dto.nombre
    if (dto.unidad) update.unidad = dto.unidad
  return update
}
}