import { PersonalResponseDto } from "application/dtos/personal.dto";
import { User} from "./User";

export class Personal {
    constructor(
        private id: number,
        private nombre: string,
        private apellido: string,
        private email: string,
        private usuario: User | null 
    ) {}
    public getId(): number {
        return this.id;
    }
    public getNombre(): string {
        return this.nombre;
    }
    public getApellido(): string {
        return this.apellido;
    }
    public getUsuario(): User | null {
        return this.usuario;
    }

    public getMail(): string {
        return this.email;
    }

    public hasUsuario(): boolean {
        return !!this.usuario;
    }
    public isValid(): boolean {
        return this.nombre.trim().length > 0 && this.apellido.trim().length > 0;
    }
    
    
    toDTO(): PersonalResponseDto {
    return {
        id: this.id,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
    }
}
}