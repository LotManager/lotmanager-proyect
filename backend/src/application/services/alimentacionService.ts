import { Alimentacion } from "../../domain/entities/Alimentacion";
import { IAlimentacionRepository } from "../../domain/interfaces/IAlimentacionRepository";
import { ICorralRepository } from "../../domain/interfaces/ICorralRepository";
import { ISuministroRepository } from "../../domain/interfaces/ISuministroRepository";
import { Corral } from "../../domain/entities/Corral";
import { Suministro } from "../../domain/entities/Suministro";

export class AlimentacionService {
  constructor(
    private readonly repo: IAlimentacionRepository,
    private readonly corralRepo?: ICorralRepository,
    private readonly suministroRepo?: ISuministroRepository
  ) {}

  public async registrar(
    id: number,
    descripcion: string,
    corrales?: Corral[],
    suministros?: Suministro[]
  ): Promise<Alimentacion> {
    // Si se pasaron corrales y hay repo, validarlos y obtener las entidades completas.
    let corralesEntity: Corral[] | undefined = undefined;
    if (Array.isArray(corrales) && corrales.length > 0 && this.corralRepo) {
      corralesEntity = [];
      for (const c of corrales) {
        const found = await this.corralRepo.findById(c.id);
        if (!found) throw new Error(`Corral no encontrado: ${c.id}`);
        corralesEntity.push(found);
      }
    }

  // Por compatibilidad, usar `descripcion` también como `nombre` si no se provee otro valor.
  const nombre = (descripcion ?? "").toString().slice(0, 100);
  const alimentacion = new Alimentacion(id, descripcion, nombre, corralesEntity, suministros);
    const creado = await this.repo.create(alimentacion);

    if (suministros && this.suministroRepo) {
      for (const s of suministros) {
        const toCreate = new Suministro(s.id, s.cantidad, s.idAlimentacion ?? creado.getId(), s.idAlimento);
        await this.suministroRepo.create(toCreate);
      }
    }

    return creado;
  }

  public async actualizar(id: number, descripcion: string, corrales?: Corral[], suministros?: Suministro[]): Promise<void> {
    let corralesEntity: Corral[] | undefined = undefined;
    if (Array.isArray(corrales) && corrales.length > 0 && this.corralRepo) {
      corralesEntity = [];
      for (const c of corrales) {
        const found = await this.corralRepo.findById(c.id);
        if (!found) throw new Error(`Corral no encontrado: ${c.id}`);
        corralesEntity.push(found);
      }
    }
  const nombre = (descripcion ?? "").toString().slice(0, 100);
  const alimentacion = new Alimentacion(id, descripcion, nombre, corralesEntity, suministros);
    await this.repo.update(alimentacion);

    if (suministros && this.suministroRepo) {
      for (const s of suministros) {
        if (s.id && await this.suministroRepo.exists(s.id)) {
          await this.suministroRepo.update(s);
        } else {
          const toCreate = new Suministro(s.id, s.cantidad, s.idAlimentacion ?? id, s.idAlimento);
          await this.suministroRepo.create(toCreate);
        }
      }
    }
  }

  public async eliminar(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  public async obtenerPorId(id: number): Promise<Alimentacion | null> {
    return await this.repo.findById(id);
  }

  public async listar(): Promise<Alimentacion[]> {
    return await this.repo.findAll();
  }

  public async existe(id: number): Promise<boolean> {
    return await this.repo.exists(id);
  }
}
