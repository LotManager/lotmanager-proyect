import {PersonalCreateDto} from "../../application/dtos/personal.dto";
import {PersonalPersisted} from "../../application/types/Personaltypes";

export interface PersonalRepository {
  create(data: PersonalCreateDto): Promise<PersonalPersisted>;
  findById(id: number): Promise<PersonalPersisted | null>;
  delete(id: number): Promise<void>;
  save(id: number, data: PersonalCreateDto): Promise<PersonalPersisted>;
  buscarPorUsuarioId(userId: number): Promise<any>;
  findAll(): Promise<PersonalPersisted[]>;
}
