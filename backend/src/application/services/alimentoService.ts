import { Alimento } from "domain/entities/Alimento";
import { IAlimentoRepository } from "domain/interfaces/IAlimentoRepository";
//import { IDetalleAlimentoRepository } from "domain/interfaces/IDetalleAlimentoRepository";
//import { DetalleAlimento } from "domain/entities/DetalleAlimento";
//import { Suministro } from "domain/entities/Suministro";
//import { ISuministroRepository } from "domain/interfaces/ISuministroRepository";

export class AlimentoService {
    constructor(
        private readonly alimentoRepo: IAlimentoRepository,
        //private readonly detalleAlimentoRepo: IDetalleAlimentoRepository,
        //private readonly suministroRepo: ISuministroRepository
    ) { }
    // public async registrar(
    //     nroSerie: string,
    //     vencimiento: Date,
    //     //idDetalleAlimento: number
    // ): Promise<void> { //CAMBIAR PORQUE NO TENGO LA INTERFAZ DE DETALLE ALIMENTO 
    //     //const detalleAlimento = await this.detalleAlimentoRepo.findById(idDetalleAlimento);
    //     //if (!detalleAlimento) {
    //     //    throw new Error("Detalle de Alimento no encontrado");
    //     //}
    //     const alimento = new Alimento(id, nroSerie, vencimiento/*, detalleAlimento*/);
    //     return await this.alimentoRepo.create(alimento);
    // }
    public async actualizar(
        id: number, // PUEDE QUE SE ELIMINE
        nroSerie: string,
        vencimiento: Date,
        //idDetalleAlimento: number,
        //suministros: Suministro[]
    ): Promise<void> { //CAMBIAR PORQUE NO TENGO LA INTERFAZ DE DETALLE ALIMENTO 
        //const detalleAlimento = await this.detalleAlimentoRepo.findById(idDetalleAlimento);
        //if (!detalleAlimento) {
        //    throw new Error("Detalle de Alimento no encontrado");
        //}
        const alimento = new Alimento(id, nroSerie, vencimiento/*, detalleAlimento, suministros*/);
        await this.alimentoRepo.update(alimento);
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