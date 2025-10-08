import { DetalleAlimento } from "./DetalleAlimento";
import { Suministro } from "./Suministro";

export class Alimento {
    constructor(
        private id: number,
        private nroSerie: string,
        private vencimiento: Date,
        private detalleAlimento?: DetalleAlimento,
        private suministros?: Suministro[],
    ){}
    //Getters
    public getId(): number {
        return this.id;
    }
    public getNroSerie(): string {
        return this.nroSerie;
    }
    public getVencimiento(): Date {
        return this.vencimiento;
    }
    public getDetalleAlimento(): DetalleAlimento | undefined {
        return this.detalleAlimento;
    }
    public getSuministro(): Suministro[] | undefined {
        return this.suministros;
    }
    //Setters
    public setNroSerie(nroSerie: string): void {
        this.nroSerie = nroSerie;
    }
    public setVencimiento(vencimiento: Date): void {
        this.vencimiento = vencimiento;
    }
    public setDetalleAlimento(detalleAlimento: DetalleAlimento): void {
        this.detalleAlimento = detalleAlimento;
    }
    public setSuministro(suministro: Suministro[]): void {
        this.suministros = suministro;
    }
}