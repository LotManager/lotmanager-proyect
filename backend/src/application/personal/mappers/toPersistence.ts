import { PersonalCreateDto } from "../dtos/personal.dto";

export function toPersistence(dto: PersonalCreateDto): any {
    return {
        nombre: dto.nombre,
        apellido: dto.apellido,
        id_usuario: dto.idusuario ?? null 
    };
}
