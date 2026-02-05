import { PersonalCreateDto, PersonalUpdateDto } from "../dtos/personal.dto";
import { Personal } from "../../domain/entities/Personal";
import { PersonalRepository } from "../../domain/interfaces/IPersonalRepository";
import { UserMapper } from "../mappers/userMapper";
import { User } from "../../domain/entities/User";
import { PersonalMapper } from "../../application/mappers/personalMapper";



export class PersonalService {
  constructor(private readonly repository: PersonalRepository) {}
    public async crear(dto: PersonalCreateDto): Promise<Personal> {
    let usuarioDb: any;
    if (dto.id_usuario !== undefined) {
        usuarioDb = await this.repository.buscarPorUsuarioId(dto.id_usuario);
    if (!usuarioDb) throw new Error("Usuario no encontrado"); 
    }
    if (!dto.nombre || !dto.apellido) {
        throw new Error("Nombre y apellido son obligatorios");
    }

    const user = usuarioDb ? UserMapper.toDomain(usuarioDb) : undefined;
    const personal = new Personal(0, dto.nombre, dto.apellido, dto.email, user || null);

    if (!personal.isValid()) throw new Error("Datos inválidos");

    const persisted = await this.repository.create(PersonalMapper.toPrisma(personal));
    return PersonalMapper.toDomain(persisted);
    }
  
  
  
  
    public async buscarPorId(id: number): Promise<Personal | null> {
    if (id <= 0) throw new Error("ID inválido");
    const encontrado = await this.repository.findById(id);
    return encontrado ? PersonalMapper.toDomain(encontrado) : null;
  }

    public async findAll(): Promise<Personal[]> {
    const personals = await this.repository.findAll();
    return personals.map(PersonalMapper.toDomain);
  }

    public async eliminar(id: number): Promise<void> {
    await this.repository.delete(id);
  }



    public async actualizar(id: number, dto: PersonalUpdateDto): Promise<Personal> {
      if (id <= 0) throw new Error("ID inválido");

      const actual = await this.repository.findById(id);
      if (!actual) throw new Error("Personal no encontrado");

      const entidad = PersonalMapper.toDomain(actual);
      if (!entidad) throw new Error("Error al convertir a entidad");

      const nombre = dto.nombre ?? entidad.getNombre();
      const apellido = dto.apellido ?? entidad.getApellido();
      const email = dto.email ?? entidad.getMail();

      let user: User | null = entidad.getUsuario();
      if (dto.id_usuario !== undefined) {
        const usuarioDb = await this.repository.buscarPorUsuarioId(dto.id_usuario);
        if (!usuarioDb) throw new Error("Usuario no encontrado");
        user = UserMapper.toDomain(usuarioDb);
      }

      const actualizado = new Personal(id, nombre, apellido, email, user);
      if (!actualizado.isValid()) throw new Error("Datos inválidos");

      const persisted = await this.repository.save(id, PersonalMapper.toPrisma(actualizado));
      return PersonalMapper.toDomain(persisted);
    }
}
