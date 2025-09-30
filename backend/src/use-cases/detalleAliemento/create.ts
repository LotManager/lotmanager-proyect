import { CreateDetalleAlimentoDto } from "../../application/detalleAlimento/dtos/createDetalleAlimento.dto"
import { DetalleAlimentoRepository } from "../../infrastructure/repositorios/detalleAlimento.repository"

export const createDetalleAlimento = async (input: unknown) => {
  const parsed = CreateDetalleAlimentoDto.parse(input)
  return await DetalleAlimentoRepository.create(parsed)
}