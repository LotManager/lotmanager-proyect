import { TipoCorralEnum } from "../enums/TipoCorralEnum";
// import { Alimentacion } from "./Alimentacion";
// import { Bovino } from "./Bovino";
// import { Feedlot } from "./Feedlot";

export class Corral {
    constructor(
        private id: number,
        private cantMaxAnimales: number,
        private numero: number,
        private tipo: TipoCorralEnum,
        // private alimentacion: Alimentacion,
        // private feedlot: Feedlot,
        // private bovinos: Bovino[]
    ) {}

    //Getters
    public getId(): number {
        return this.id;
    }
    public getCantMaxAnimales(): number {
        return this.cantMaxAnimales;
    }
    public getNumero(): number {
        return this.numero;
    }
    public getTipo(): TipoCorralEnum {
        return this.tipo;
    }
    // public getAlimentacion(): Alimentacion {
    //     return this.alimentacion;
    // }
    // public getFeedlot(): Feedlot {
    //     return this.feedlot;
    // }
    // public getBovinos(): Bovino[] {
    //     return this.bovinos;
    // }
    //Setters
    public setCantMaxAnimales(cantMaxAnimales: number): void {
        this.cantMaxAnimales = cantMaxAnimales;
    }   
    public setNumero(numero: number): void {
        this.numero = numero;
    }
    public setTipo(tipo: TipoCorralEnum): void {
        this.tipo = tipo;
    }   
    // public setAlimentacion(alimentacion: Alimentacion): void {
    //     this.alimentacion = alimentacion;
    // }   
    // public setFeedlot(feedlot: Feedlot): void {
    //     this.feedlot = feedlot;
    // }   
    // public setBovinos(bovinos: Bovino[]): void {
    //     this.bovinos = bovinos;
    // }
}