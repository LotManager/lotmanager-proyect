import { PersonalRepository } from "../../domain/interfaces/IPersonalRepository.js";
import { Personal } from "../../domain/entities/Personal.js";
import { PersonalCreateDto } from "../personal/dtos/personal.dto.js";
import { toDomain } from "../personal/mappers/toDomain.js";
import { toPersistence } from "../personal/mappers/toPersistence.js";

export class PersonalService {
  constructor(private readonly repo: PersonalRepository) {}

    async registrar(dto: PersonalCreateDto): Promise<Personal> {
        const persistible = toPersistence(dto);
        const creado = await this.repo.create(persistible);
    return toDomain(creado);
  }

    async obtenerPorId(id: number): Promise<Personal | null> {
        const encontrado = await this.repo.findById(id);
    return encontrado ? toDomain(encontrado) : null;
  }

    async eliminar(id: number): Promise<void> {
        if (!id || id <= 0) {
            throw new Error("ID inválido");
        }  
    await this.repo.delete(id);
    }
  }