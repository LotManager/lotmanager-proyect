import { TratamientoRepository } from '../../infrastructure/repositorios/PrismaTratamientoRepository'
import {
  TratamientoCreateDtoSchema,
  TratamientoUpdateDtoSchema,
  TratamientoCreateDto,
  TratamientoUpdateDto,
  TratamientoDto,
  TratamientoConEnfermedadesDto,
} from '../dtos/tratamiento.dto'
import { TratamientoMapper } from '../mappers/TratamientoMapper'

export class TratamientoService {
  constructor(private readonly repository: TratamientoRepository) {}

  async create(data: TratamientoCreateDto): Promise<TratamientoDto> {
    const parsed = TratamientoCreateDtoSchema.parse(data)
    const tratamiento = await this.repository.create(parsed)
    return TratamientoMapper.toDto(tratamiento)
  }

  async update(id: number, data: TratamientoUpdateDto): Promise<TratamientoDto | null> {
    const parsed = TratamientoUpdateDtoSchema.parse(data)
    const updated = await this.repository.update(id, parsed)
    return updated ? TratamientoMapper.toDto(updated) : null
  }

  async getById(id: number): Promise<TratamientoDto | null> {
    const tratamiento = await this.repository.findById(id)
    return tratamiento ? TratamientoMapper.toDto(tratamiento) : null
  }

  async getAll(): Promise<TratamientoDto[]> {
    const tratamientos = await this.repository.findAll()
    return tratamientos.map(TratamientoMapper.toDto)
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id)
  }

  async getWithEnfermedades(id: number): Promise<TratamientoConEnfermedadesDto | null> {
    const tratamiento = await this.repository.findWithEnfermedades(id)
    return tratamiento ? TratamientoMapper.toDtoWithEnfermedades(tratamiento) : null
}
}