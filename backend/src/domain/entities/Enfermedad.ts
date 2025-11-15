import { TipoEnfermedad } from "../enums/TipoEnfermedad";

export class Enfermedad {
    constructor(
        private id: number,
        private nombre: string,
        private descripcion: string,
        private tipo: TipoEnfermedad,
        private tratamientos?: { idTratamiento: number; periodo: string }[]
    ) {}

    getTratamientos() {
        return this.tratamientos ?? [];
    }
    
    getId(): number {
        return this.id;
    }
    getNombre(): string {
        return this.nombre;
    }   
    getDescripcion(): string {
        return this.descripcion;
    }
    getTipo(): TipoEnfermedad {
        return this.tipo;
    }

    setId(id: number): void {
        this.id = id;
    }
    setNombre(nombre: string): void {
        this.nombre = nombre;
    }
    setDescripcion(descripcion: string): void {
        this.descripcion = descripcion;
    }
    setTipo(tipo: TipoEnfermedad): void {
        if (!Object.values(TipoEnfermedad).includes(tipo)) {
            const valores = Object.values(TipoEnfermedad).join(", ");
            throw new Error(`Tipo de enfermedad inválido: ${tipo}. Valores permitidos: ${valores}`);
        }
        this.tipo = tipo;
    }

    añadirTratamiento(idTratamiento: number, periodo: string): void {
        if (!this.tratamientos) this.tratamientos = [];
            this.tratamientos.push({ idTratamiento, periodo });
    }   

    public toDTO(): { nombre: string; descripcion: string; tipo: TipoEnfermedad } {
    return {
        nombre: this.nombre,
        descripcion: this.descripcion,
        tipo: this.tipo
};
}


}
