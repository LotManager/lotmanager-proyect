//import { corral } from "./Corral";
//import { suministro } from "./Suministro";

export class Alimentacion {
    constructor(
        private id: number,
        private descripcion: string,
        //private readonly corral: corral,
        //private readonly suministro: Suministro[]
    ){}

    //Getters
    public getId(): number {
        return this.id;
    }
    public getDescripcion(): string {
        return this.descripcion;
    }
    //public getCorral(): corral {
    //    return this.corral;
    //}
    //public getSuministro(): Suministro[] {
    //    return this.Suministro;
    //}

    //Setters
    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }

    //public setCorral(corral: corral): void {
    //    this.corral = corral;
    //}
    //public setSuministro(suministro: Suministro[]): void {
    //    this.Suministro = suministro;
    //}

    
}