import { PersonalRepository } from "../../domain/interfaces/IPersonalRepository";
import { Personal } from "../../domain/entities/Personal";
import { PersonalCreateDto } from "../personal/dtos/personal.dto";
import { toDomain } from "../personal/mappers/toDomain";
import { toPersistence } from "../personal/mappers/toPersistence";

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