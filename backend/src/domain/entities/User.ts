import { PasswordHash } from "../value-objects/PasswordHash";
import { Rol } from "../value-objects/Rol";
import { UserDTO } from "../../application/dtos/user.dto";


export class User {
    private id: number;
    private username: string;
    private contrasena: PasswordHash;
    private rol: Rol;
    private personaId: number;
    
    constructor(id: number, username: string, contrasena: PasswordHash, rol: Rol, personaId: number) {
        if (username.trim().length === 0) throw new Error('El nombre no puede estar vacío');

        this.id = id;
        this.username = username;
        this.contrasena = contrasena;
        this.rol = rol;
        this.personaId = personaId;
    }
    
    public isValid(): boolean {
        return (
            this.username.trim().length > 0 &&
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
        return this.username;
    }
    public setName(username: string): void {
        if (username.trim().length === 0) throw new Error('El nombre no puede estar vacío');
        this.username = username;
    }
    
    public getPasswordHash(): string {
        return this.contrasena.getValue();
    }

    public async validarPassword(plainPassword: string): Promise<boolean> {
        return await this.contrasena.compareWith(plainPassword);
    }
    
    public toDTO(): UserDTO {
        const nombre = this.rol.getNombre();
        if (nombre !== "admin" && nombre !== "encargado") {
            throw new Error(`Rol inválido: ${nombre}`);
        }
        return {
            id: this.id,
            username: this.username,
            rol: this.rol.toDTO()
        };
    }
}
