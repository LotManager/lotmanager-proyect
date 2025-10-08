import { EnfermedadParcialDTOType } from "application/dtos/enfermedad.dto";
import { Enfermedad } from "../../domain/entities/Enfermedad";
import { IEnfermedadRepository } from "../../domain/interfaces/IEnfermedadRepository";
import { IEnfermedadxTratamientoRepository } from "../../domain/interfaces/IEnfermedadxTratamientoRepository";
import { EnfermedadMapper } from "application/mappers/EnfermedadMapper";


export class EnfermedadService {
  constructor(private repo: IEnfermedadRepository,
    private relacionRepo: IEnfermedadxTratamientoRepository
  ) {}

  async crear(enfermedad: Enfermedad): Promise<Enfermedad> {
  const id = enfermedad.getId();

  if (id && await this.repo.exists(id)) {
    throw new Error(`Ya existe una enfermedad con ID '${id}'`);
  }

  return await this.repo.create(enfermedad.toDTO()); // ← pasás la entidad directamente
}
  async obtenerPorId(id: number): Promise<Enfermedad | null> {
    if (!id || id <= 0) {
      throw new Error("ID inválido proporcionado");
    }
    return await this.repo.findById(id);
  }

  async obtenerTodas(): Promise<Enfermedad[]> {
    return await this.repo.findAll();
  }

  async actualizarParcial(id: number, cambios: EnfermedadParcialDTOType): Promise<void> {
  const existente = await this.repo.findById(id);
  if (!existente) throw new Error(`No existe enfermedad con ID ${id}`);
  if (cambios.nombre) existente.setNombre(cambios.nombre);
  if (cambios.descripcion) existente.setDescripcion(cambios.descripcion);
  if (cambios.tipo) existente.setTipo(cambios.tipo);

  await this.repo.update(id, existente.toDTO());
}

  async eliminar(id: number): Promise<void> {
    const existe = await this.repo.exists(id);
    if (!existe) {
      throw new Error(`No se puede eliminar: enfermedad con ID ${id} no existe`);
    }
    await this.repo.delete(id);
  }
  
  async vincularTratamiento(idEnfermedad: number, idTratamiento: number, periodo: string): Promise<void> {
    const enfermedad = await this.repo.findById(idEnfermedad);
    if (!enfermedad) throw new Error("Enfermedad no encontrada");   
    enfermedad.añadirTratamiento(idTratamiento, periodo);
    await this.relacionRepo.vincular(idEnfermedad, idTratamiento, periodo);
  }

  async desvincularTratamiento(idEnfermedad: number, idTratamiento: number): Promise<void> {
    const enfermedad = await this.repo.findById(idEnfermedad);
        if (!enfermedad) throw new Error("Enfermedad no encontrada");

    const existe = await this.relacionRepo.existeRelacion(idEnfermedad, idTratamiento);
        if (!existe) throw new Error("La relación no existe");

    await this.relacionRepo.desvincular(idEnfermedad, idTratamiento);   
    }
}  