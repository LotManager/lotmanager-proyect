export class Rol {
    private id: number;
    private nombre: "admin" | "encargado";

    constructor(id: number, nombre: "admin" | "encargado") {
        if (!["admin", "encargado"].includes(nombre)) {
            throw new Error(`Rol inválido: ${nombre}`);
        }
        this.id = id;
        this.nombre = nombre;
    }

    static fromNombre(nombre: "admin" | "encargado"): Rol {
    const mapa: Record<"admin" | "encargado", number> = {
      admin: 1,
      encargado: 2
    };
    return new Rol(mapa[nombre], nombre);
  }

  static fromId(id: number): Rol {
    const mapa: Record<number, "admin" | "encargado"> = {
    1: "admin",
    2: "encargado"
    };
    const nombre = mapa[id];
    if (!nombre) throw new Error(`Rol inválido para id: ${id}`);
    return new Rol(id, nombre);
    }

    public isValid(): boolean {
        return ["admin", "encargado"].includes(this.nombre);
    }

    public getId(): number {
        return this.id;
    }

    public getNombre(): "admin" | "encargado" {
        return this.nombre;
    }
    public isAdmin(): boolean {
        return this.nombre === 'admin';
    }

    public toDTO(): { id: number; nombre: "admin" | "encargado" } {
        return { id: this.id, nombre: this.nombre as "admin" | "encargado" };
}
}
