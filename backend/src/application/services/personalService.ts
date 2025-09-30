import { PersonalCreateDto, PersonalUpdateDto } from "../personal/dtos/personal.dto";
import { Personal } from "../../domain/entities/Personal";
import { PersonalRepository } from "../../domain/interfaces/IPersonalRepository";
import { UserMapper } from "../personal/mappers/userMapper";
import { toDomain } from "../personal/mappers/toDomain";
import { toPersistence } from "../personal/mappers/toPersistence";
import { User } from "../../domain/entities/User";



export class PersonalService {
  constructor(private readonly repository: PersonalRepository) {}
    public async crear(dto: PersonalCreateDto): Promise<Personal> {
    let usuarioDb: any;
    if (dto.idusuario !== undefined) {
        usuarioDb = await this.repository.buscarPorUsuarioId(dto.idusuario);
    if (!usuarioDb) throw new Error("Usuario no encontrado");
    }
    if (!dto.nombre || !dto.apellido) {
        throw new Error("Nombre y apellido son obligatorios");
    }

    const user = usuarioDb ? UserMapper.fromPrisma(usuarioDb) : undefined;
    const personal = new Personal(0, dto.nombre, dto.apellido, user);

    if (!personal.isValid()) throw new Error("Datos inválidos");

    const persisted = await this.repository.create(toPersistence(personal));
        return toDomain(persisted);
    }
  
  
  
  
    public async buscarPorId(id: number): Promise<Personal | null> {
    if (id <= 0) throw new Error("ID inválido");
    const encontrado = await this.repository.findById(id);
    return encontrado ? toDomain(encontrado) : null;
  }

    public async findAll(): Promise<Personal[]> {
    const personals = await this.repository.findAll();
    return personals.map(toDomain);
  }

    public async eliminar(id: number): Promise<void> {
    await this.repository.delete(id);
  }



    public async actualizar(id: number, dto: PersonalUpdateDto): Promise<Personal> {
        if (id <= 0) throw new Error("ID inválido");
        const actual = await this.repository.findById(id);
        if (!actual) throw new Error("Personal no encontrado");
        const entidad = toDomain(actual);
        if (!entidad) throw new Error("Error al convertir a entidad");

        const nombre = dto.nombre ?? entidad.getNombre();
        const apellido = dto.apellido ?? entidad.getApellido();

        let user: User | undefined = entidad.getUsuario();
        if (dto.idusuario !== undefined) {
            const usuarioDb = await this.repository.buscarPorUsuarioId(dto.idusuario);
            if (!usuarioDb) throw new Error("Usuario no encontrado");
            user = UserMapper.fromPrisma(usuarioDb);
        }

        const actualizado = new Personal(id, nombre, apellido, user);
        if (!actualizado.isValid()) throw new Error("Datos inválidos");

        const persisted = await this.repository.save(id, toPersistence(actualizado));
        return toDomain(persisted);
}
}
