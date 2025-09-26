import { Rol } from "../value-objects/Rol.js";

export interface Personal {
    id: number;
    nombre: string;
    apellido: string;
    usuario?: {
        id: number;
        nombre: string;
        rol: Rol;
    };
}

