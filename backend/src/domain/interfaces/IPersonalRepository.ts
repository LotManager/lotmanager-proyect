import {PersonalCreateInput, PersonalPersisted} from "../../application/personal/types/Personaltypes";

export interface PersonalRepository {
  create(data: PersonalCreateInput): Promise<PersonalPersisted>;
  findById(id: number): Promise<PersonalPersisted | null>;
  delete(id: number): Promise<void>;
  save(id: number, data: PersonalCreateInput): Promise<PersonalPersisted>;
  buscarPorUsuarioId(userId: number): Promise<any>;
  findAll(): Promise<PersonalPersisted[]>;
}
