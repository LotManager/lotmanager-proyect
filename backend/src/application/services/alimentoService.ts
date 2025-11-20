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
        return this.alimentoRepository.findAll();
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

    const alimento = await this.alimentoRepository.findById(id);
    if (!alimento) return null;

    if (nombre !== undefined) alimento.setNombre(nombre);
    if (tipo !== undefined) alimento.setTipo(tipo as any); // tu enum acá

    await this.alimentoRepository.update(alimento);

    return alimento;
    }
    async deleteAlimento(id: number): Promise<void> {
        return this.alimentoRepository.delete(id);
    }
    async alimentoExists(id: number): Promise<boolean> {
        return this.alimentoRepository.exists(id);
    }
    getTipos(): string[] {
        return [TipoAlimento.GRANO, TipoAlimento.FORRAJE, TipoAlimento.SUPLEMENTO];
    }
}