import { UserUpdateInput } from "application/dtos/user.dto";
import { User } from "../entities/User";

export interface IUserRepository {
  findById(id: number): Promise<User | null>;
  findByUsername(usuario: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<void>;
  delete(id: number): Promise<void>;
  create(user: User): Promise<User>;
  updatePartial(id: number, data: UserUpdateInput): Promise<User>;
  cambiarContrasena(id: number, contrasenaActual: string, nuevaContrasenaHash: string): Promise<void>;
}

