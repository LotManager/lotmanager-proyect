import { RolDTO } from "application/dtos/rol.dto";

export class Rol {
    private id: number;
    private nombre: string;
    
    constructor(id: number, nombre: string) {
        if (nombre.trim().length === 0) throw new Error('El nombre del rol no puede estar vacío');
        this.id = id;
        this.nombre = nombre;
    }   
    public isValid(): boolean {
        return this.nombre.trim().length > 0;
    }
    public getId(): number {
        return this.id;
    }
    public getNombre(): string {
        return this.nombre;
    }
    public static fromId(id: number): Rol {
        const roles: Record<number, string> = {
        1: "ADMINISTRADOR",
        2: "TAMBERO",
        };

        const nombre = roles[id];
        if (!nombre) {
        throw new Error(`Rol inválido: ${id}`);
        }

        return new Rol(id, nombre);
    }
    public static fromNombre(nombre: string): Rol {
        const roles: Record<string, number> = {
            ADMINISTRADOR: 1,
            TAMBERO: 2,
        };

        const id = roles[nombre];
        if (!id) throw new Error(`Rol inválido: ${nombre}`);

        return new Rol(id, nombre);
    
    }
    public toDTO(): RolDTO {
        return {
            id: this.id,
            nombre: this.nombre
        };
    }
}