import { DetalleDieta } from "./DetalleDieta";
import { TipoAlimento } from "domain/enums/TipoAlimento";

export class Alimento{
    constructor(
        private id: number,
        private nombre: string,
        private tipo: TipoAlimento,
        private detalleDieta: DetalleDieta[]
    ){}

    // Getters
    public getId(): number {
        return this.id;
    }
    public getNombre(): string {
        return this.nombre;
    }
    public getTipo(): TipoAlimento {
        return this.tipo;
    }
    public getDetalleDieta(): DetalleDieta[] {
        return this.detalleDieta;
    }
    // Setters
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    public setTipo(tipo: string): void {
        this.tipo = tipo;
    }
    public setDetalleDieta(detalleDieta: DetalleDieta[]): void {
        this.detalleDieta = detalleDieta;
    }
}