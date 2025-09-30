import { PasswordHash } from "../value-objects/PasswordHash";
import { Rol } from "../value-objects/Rol";
import { UserDTO } from "../../application/auth/dtos/user.dto";


export class User {
    private id: number;
    private usuario: string;
    private contrasena: PasswordHash;
    private rol: Rol;

    constructor(id: number, usuario: string, contrasena: PasswordHash, rol: Rol) {
        if (usuario.trim().length === 0) throw new Error('El nombre no puede estar vacío');

        this.id = id;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.rol = rol;
    }
    
    public isValid(): boolean {
        return (
            this.usuario.trim().length > 0 &&
            PasswordHash.isValid(this.contrasena.getValue()) &&
            (!this.rol || this.rol.isValid())
        );
    }
    public async checkPassword(plain: string): Promise<boolean> {
        return await this.contrasena.compareWith(plain);
    }

    public getId(): number {
        return this.id;
    }

    public getRol(): Rol {
        return this.rol;
    }

    public getName(): string {
        return this.usuario;
    }
    public setName(usuario: string): void {
        if (usuario.trim().length === 0) throw new Error('El nombre no puede estar vacío');
        this.usuario = usuario;
    }
    
    public getPasswordHash(): string {
        return this.contrasena.getValue();
    }

    public async validarPassword(plainPassword: string): Promise<boolean> {
        return await this.contrasena.compareWith(plainPassword);
    }
    
    public toDTO(): UserDTO {
        const nombre = this.rol.getNombre();
        if (nombre !== "admin" && nombre !== "user") {
            throw new Error(`Rol inválido: ${nombre}`);
        }
        return {
            id: this.id,
            usuario: this.usuario,
            rol: nombre as "admin" | "user"
        };
    }
}
