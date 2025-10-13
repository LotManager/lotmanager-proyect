import { ICorralRepository } from "../../domain/interfaces/ICorralRepository"
import { Corral } from "../../domain/entities/Corral"
import { CreateCorralDtoType } from "../../application/dtos/CreateCorralDto"
import { UpdateCorralDtoType } from '../../application/dtos/CreateCorralDto';

export class CorralService {
  constructor(private readonly repo: ICorralRepository) {}

  async listar(): Promise<Corral[]> {
    return this.repo.findAll()
  }

  async obtenerPorId(id: number): Promise<Corral | null> {
    return this.repo.findById(id)
  }

  async registrar(dto: CreateCorralDtoType): Promise<Corral> {
    const nuevo = new Corral(
      0,
      dto.capacidadMaxima,
      dto.numero,
      dto.tipoCorral,
      dto.idAlimentacion,
      dto.idFeedlot
    )
    return this.repo.create(nuevo)
  }

async actualizar(id: number, dto: UpdateCorralDtoType): Promise<Corral> {
    // Primero, obtenemos el corral existente para tener todos sus datos
    const corralExistente = await this.repo.findById(id);

    if (!corralExistente) {
        throw new Error("Corral no encontrado");
    }

    // Fusionamos los datos existentes con los nuevos datos del DTO.
    // Los campos que vengan en 'dto' sobreescribirán los de 'corralExistente'.
    const datosActualizados = {
        ...corralExistente,
        ...dto,
    };

    // Creamos una nueva instancia de la entidad con los datos completos y fusionados
    const corralParaGuardar = new Corral(
        id,
        datosActualizados.capacidadMaxima,
        datosActualizados.numero,
        datosActualizados.tipoCorral,
        datosActualizados.idAlimentacion,
        datosActualizados.idFeedlot
    );

    // Enviamos el objeto completo y actualizado al repositorio para ser guardado
    return this.repo.update(corralParaGuardar);
}

  async eliminar(id: number): Promise<void> {
    await this.repo.delete(id)
  }
}