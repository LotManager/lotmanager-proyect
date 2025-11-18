export class Rol {
    private id: number;
    private nombre: "admin" | "tambero";

    constructor(id: number, nombre: "admin" | "tambero") {
        if (!["admin", "tambero"].includes(nombre)) {
            throw new Error(`Rol inválido: ${nombre}`);
        }
        this.id = id;
        this.nombre = nombre;
    }

    static fromNombre(nombre: "admin" | "tambero"): Rol {
    const mapa: Record<"admin" | "tambero", number> = {
      admin: 1,
      tambero: 2
    };
    return new Rol(mapa[nombre], nombre);
  }

  static fromId(id: number): Rol {
    const mapa: Record<number, "admin" | "tambero"> = {
    1: "admin",
    2: "tambero"
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

    public getNombre(): "admin" | "tambero" {
        return this.nombre;
    }
    public isAdmin(): boolean {
        return this.nombre === 'admin';
    }

    public toDTO(): { id: number; nombre: "admin" | "tambero" } {
        return { id: this.id, nombre: this.nombre as "admin" | "tambero" };
}
}
