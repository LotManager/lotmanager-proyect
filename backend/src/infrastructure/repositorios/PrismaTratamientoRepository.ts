
import { Prisma, PrismaClient } from '@prisma/client'
import { Tratamiento } from '../../domain/entities/Tratamiento'
import { TratamientoMapper } from '../../application/mappers/TratamientoMapper'
import { TratamientoCreateDto, TratamientoUpdateDto } from '../../application/dtos/tratamiento.dto'

export class TratamientoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(dto: TratamientoCreateDto): Promise<Tratamiento> {
    const tratamiento = TratamientoMapper.fromCreateDto(dto)
    const created = await this.prisma.tratamiento.create({
      data: TratamientoMapper.toPrisma(tratamiento),
    })
    return TratamientoMapper.toEntity(created)
  }

  async findById(id: number): Promise<Tratamiento | null> {
    const found = await this.prisma.tratamiento.findUnique({ where: { id } })
    return found ? TratamientoMapper.toEntity(found) : null
  }

  async update(id: number, dto: TratamientoUpdateDto): Promise<Tratamiento | null> {
    if (Object.keys(dto).length === 0) {
      throw new Error("No se proporcionaron campos para actualizar");
    }
    const data: Prisma.TratamientoUpdateInput = {
        ...(dto.descripcion !== undefined && { descripcion: dto.descripcion }),
        ...(dto.dosisAplicada !== undefined && { dosis_aplicada: dto.dosisAplicada }),
        ...(dto.nombre !== undefined && { nombre: dto.nombre }),
    }
  

    try {
      const updated = await this.prisma.tratamiento.update({
        where: { id },
        data,
      });
      return TratamientoMapper.toEntity(updated);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return null; // registro no encontrado
      }
      throw error;
    }
}


  async delete(id: number): Promise<void> {
    await this.prisma.tratamiento.delete({ where: { id } })
  }

  async findAll(): Promise<Tratamiento[]> {
    const all = await this.prisma.tratamiento.findMany()
    return all.map(TratamientoMapper.toEntity)
  }
  
  async findWithEnfermedades(id: number): Promise<Tratamiento | null> {
  const found = await this.prisma.tratamiento.findUnique({
    where: { id },
    include: {
      enfermedadxtratamiento: {
        include: {
          enfermedad: true,
        },
      },
    },
  })

  return found ? TratamientoMapper.toEntityWithEnfermedades(found) : null
}
}