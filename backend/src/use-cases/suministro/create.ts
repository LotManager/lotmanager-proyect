import { CreateSuministroDto } from "../../application/suministro/dtos/createSuministro.dto"
import { SuministroRepository } from "../../infrastructure/repositorios/suministro.repository"

export const createSuministro = async (input: unknown) => {
  const parsed = CreateSuministroDto.parse(input)
  return await SuministroRepository.create(parsed)
}