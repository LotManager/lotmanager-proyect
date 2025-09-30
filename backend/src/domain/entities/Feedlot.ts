import { Localidad } from "./Localidad";

export class Feedlot {
  constructor(
    private  id: number,
    private  nombre: string,
    private  localidad: Localidad
  ) {
    if (!Feedlot.isNombreValido(nombre)) {
      throw new Error("Nombre de feedlot inválido");
    }
  }

  public getId(): number {
    return this.id;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getLocalidad(): Localidad {
    return this.localidad;
  }

  public getIdLocalidad(): number {
    return this.localidad.getId();
  }

  public getNombreLocalidad(): string {
    return this.localidad.getNombre();
  }

  public getNombreProvincia(): string {
    return this.localidad.getNombreProvincia();
  }

  public static isNombreValido(nombre: string): boolean {
    return nombre.trim().length >= 2;
  }

  public isValid(): boolean {
    return Feedlot.isNombreValido(this.nombre);
  }

  public equals(other: Feedlot): boolean {
    return this.id === other.id;
  }
}