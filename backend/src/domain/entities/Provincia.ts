
export class Provincia {
  constructor(
    private readonly id: number,
    private readonly nombre: string
  ) {
    if (!Provincia.isNombreValido(nombre)) {
      throw new Error("Nombre de provincia inválido");
    }
  }

  public getId(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public static isNombreValido(nombre: string): boolean {
    return nombre.trim().length >= 2;
  }

  public isValid(): boolean {
    return Provincia.isNombreValido(this.nombre);
  }

  public equals(other: Provincia): boolean {
    return this.id === other.id;
  }
}