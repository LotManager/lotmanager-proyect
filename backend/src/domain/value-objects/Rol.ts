export class Rol {
    private id: number;
    private nombre: string;

    constructor(id: number, nombre: string) {
        this.id = id;
        this.nombre = nombre;
    }

    static fromNombre(nombre: "admin" | "user"): Rol {
    const mapa: Record<"admin" | "user", number> = {
      admin: 1,
      user: 2
    };
    return new Rol(mapa[nombre], nombre);
  }

  static fromId(id: number): Rol {
    const mapa: Record<number, "admin" | "user"> = {
    1: "admin",
    2: "user"
    };
    const nombre = mapa[id];
    if (!nombre) throw new Error(`Rol inválido para id: ${id}`);
    return new Rol(id, nombre);
    }

    public isValid(): boolean {
        return ["admin", "user"].includes(this.nombre);
    }

    public getId(): number {
        return this.id;
    }

    public getNombre(): string {
        return this.nombre;
    }
    public isAdmin(): boolean {
        return this.nombre === 'admin';
    }

    public toDTO(): { id: number; nombre: string } {
        return { id: this.id, nombre: this.nombre };
}
}
