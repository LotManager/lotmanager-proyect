import { Provincia } from "./Provincia";

export class Localidad {  
  constructor(
    private  id: number,
    private  codigoPostal: number,
    private  nombre: string,
    private  provincia: Provincia
) {
    if (!Localidad.isNombreValido(nombre)) {
      throw new Error("Nombre de localidad inválido");
    }
    if (!Localidad.isCodigoPostalValido(codigoPostal)) {
      throw new Error("Código postal inválido");
    }
  }

  public getId(): number {
    return this.id;
  }

  public getCodigoPostal(): number {
    return this.codigoPostal;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getNombreProvincia(): string {
    return this.provincia.getNombre();
}
  public getProvincia(): Provincia {
  return this.provincia;
}

  public getIdProvincia(): number {
    return this.provincia.getId();
  }

  public static isNombreValido(nombre: string): boolean {
    return nombre.trim().length >= 2;
  }

  public static isCodigoPostalValido(codigo: number): boolean {
    return codigo > 0 && codigo < 99999;
  }

  public isValid(): boolean {
    return (
      Localidad.isNombreValido(this.nombre) &&
      Localidad.isCodigoPostalValido(this.codigoPostal)
    );
  }

  public equals(other: Localidad): boolean {
    return this.id === other.id;
  }
}