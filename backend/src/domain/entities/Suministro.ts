export class Suministro {
  constructor(
    public id: number,
    public fecha: Date,
    public cantidadKg: number,
    public dietaId: number,
    public corralId: number
  ) {}
  // Getters
  public getId(): number {
    return this.id;
  }
  public getCantidadKg(): number {
    return this.cantidadKg;
  }
  public getDietaId(): number {
    return this.dietaId;
  }
  public getCorralId(): number {
    return this.corralId;
  }
  public getFecha(): Date {
    return this.fecha;
  }
  // Setters
  public setCantidadKg(cantidadKg: number): void {
    this.cantidadKg = cantidadKg;
  }
  public setDietaId(dietaId: number): void {
    this.dietaId = dietaId;
  }
  public setCorralId(corralId: number): void {
    this.corralId = corralId;
  }
  public setFecha(fecha: Date): void {
    this.fecha = fecha;
  }
}