import { TipoAlimento } from "@prisma/client";

export class Alimento{
    constructor(
        private id: number,
        private nombre: string,
        private tipo: TipoAlimento
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
    // Setters
    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    public setTipo(tipo: TipoAlimento): void {
        this.tipo = tipo;
    }
}