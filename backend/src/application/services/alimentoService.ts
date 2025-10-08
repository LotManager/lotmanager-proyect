import { Alimento } from "../../domain/entities/Alimento";
import { DetalleAlimento } from "../../domain/entities/DetalleAlimento";
import { Suministro } from "../../domain/entities/Suministro";
import { IAlimentoRepository } from "../../domain/interfaces/IAlimentoRepository";
import { IDetalleAlimentoRepository } from "../../domain/interfaces/IDetalleAlimentoRepository";
import { ISuministroRepository } from "../../domain/interfaces/ISuministroRepository";
import { Alimento } from "../../domain/entities/Alimento";
import { DetalleAlimento } from "../../domain/entities/DetalleAlimento";
import { Suministro } from "../../domain/entities/Suministro";
import { IAlimentoRepository } from "domain/interfaces/IAlimentoRepository";
import { IDetalleAlimentoRepository } from "../../domain/interfaces/IDetalleAlimentoRepository";
import { ISuministroRepository } from "../../domain/interfaces/ISuministroRepository";

export class AlimentoService {
    constructor(
        private readonly alimentoRepo: IAlimentoRepository,
        private readonly detalleAlimentoRepo?: IDetalleAlimentoRepository,
        private readonly suministroRepo?: ISuministroRepository
    ) { }
    public async registrar(
        id: number,
        nroSerie: number,
        vencimiento: Date,
        idDetalleAlimento?: number,
        suministros?: Suministro[]
    ): Promise<Alimento> {
        // En este punto aceptamos idDetalleAlimento como referencia. Si quieres
        // crear el detalle inline, deberíamos recibir un objeto DetalleAlimento
        // en lugar de sólo el id.
        let detalle = undefined;
        if (idDetalleAlimento) {
            if (this.detalleAlimentoRepo) {
                const d = await this.detalleAlimentoRepo.findById(idDetalleAlimento);
                if (!d) throw new Error("DetalleAlimento no encontrado");
                detalle = d;
            } else {
                detalle = new DetalleAlimento(idDetalleAlimento, "", "", id);
            }
        }

        const alimento = new Alimento(id, nroSerie, vencimiento, detalle, suministros);
        const creado = await this.alimentoRepo.create(alimento);

        // Si se pasaron suministros y tenemos repo, crearlos vinculados al alimento creado
        if (suministros && this.suministroRepo) {
            for (const s of suministros) {
                // asegurar que el suministro referencie al alimento creado
                const toCreate = new Suministro(s.id, s.cantidad, s.idAlimentacion, creado.getId());
                await this.suministroRepo.create(toCreate);
            }
        }

        return creado;
    }
    public async actualizar(
        id: number,
        nroSerie: number,
        vencimiento: Date,
        idDetalleAlimento?: number,
        suministros?: Suministro[]
    ): Promise<void> {
        let detalle = undefined;
        if (idDetalleAlimento) {
            if (this.detalleAlimentoRepo) {
                const d = await this.detalleAlimentoRepo.findById(idDetalleAlimento);
                if (!d) throw new Error("DetalleAlimento no encontrado");
                detalle = d;
            } else {
                detalle = new DetalleAlimento(idDetalleAlimento, "", "", id);
            }
        }

        const alimento = new Alimento(id, nroSerie, vencimiento, detalle, suministros);
        await this.alimentoRepo.update(alimento);

        // manejar suministros: crear los que no tienen id, actualizar los que sí
        if (suministros && this.suministroRepo) {
            for (const s of suministros) {
                if (s.id && await this.suministroRepo.exists(s.id)) {
                    await this.suministroRepo.update(s);
                } else {
                    // asegurar relación con alimento
                    const toCreate = new Suministro(s.id, s.cantidad, s.idAlimentacion, id);
                    await this.suministroRepo.create(toCreate);
                }
            }
        }
    }
    public async eliminar(id: number): Promise<void> {
        await this.alimentoRepo.delete(id);
    }
    public async obtenerPorId(id: number): Promise<Alimento | null> {
        return await this.alimentoRepo.findById(id);
    }
    public async listar(): Promise<Alimento[]> {
        return await this.alimentoRepo.findAll();
    }
    public async existe(id: number): Promise<boolean> {
        return await this.alimentoRepo.exists(id);
    }
}