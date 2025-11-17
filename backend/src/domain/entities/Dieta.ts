import { DetalleDieta } from "./DetalleDieta";
import { Suministro } from "./Suministro";

export class Dieta {
    constructor(
        private id: number,
        private nombre: string,
        private descripcion: string,
        private detalles: DetalleDieta[]
    ){}
    // Getters
    public getId(): number {
        return this.id;
    }
    public getNombre(): string {
        return this.nombre;
    }
    public getDescripcion(): string {
        return this.descripcion;
    }
    public getDetalles(): DetalleDieta[] {
        return this.detalles;
    }
    // Setters
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    public setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }
    public setDetalles(detalles: DetalleDieta[]): void {
        this.detalles = detalles;
    }
}