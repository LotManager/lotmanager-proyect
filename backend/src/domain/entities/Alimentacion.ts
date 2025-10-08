import { Corral } from "./Corral";
import { Suministro } from "./Suministro";

export class Alimentacion {
    constructor(
        private id: number,
        private descripcion: string,
        private nombre: string,
        private corral?: Corral,
        private suministros?: Suministro[],
    ){}

    //Getters
    public getId(): number {
        return this.id;
    }
    public getDescripcion(): string {
        return this.descripcion;
    }
    public getCorral(): Corral | undefined {
        return this.corral;
    }
    public getSuministro(): Suministro[] | undefined {
        return this.suministros;
    }

    public getNombre(): string {
        return this.nombre;
    }

    //Setters
    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    public setCorral(corral: Corral): void {
        this.corral = corral;
    }
    public setSuministro(suministro: Suministro[]): void {
        this.suministros = suministro;
    }

}