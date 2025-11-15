import { CreateDetalleEnfermedadDTO } from '../dtos/detalleEnfermedad.dto'
import { DetalleEnfermedad } from '../../domain/entities/DetalleEnfermedad'

export const mapToEntity = (dto: CreateDetalleEnfermedadDTO): DetalleEnfermedad => ({
  ...dto,
})