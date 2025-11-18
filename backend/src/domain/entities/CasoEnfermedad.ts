import { Enfermedad } from "./Enfermedad";
import { Tratamiento } from "./Tratamiento";
import { Bovino } from "./Bovino";

export class CasoEnfermedad {
  constructor(
    private id: number,
    private fechaDeteccion: Date,
    private fechaAlta?: Date,
    private enfermedadId?: number,
    private tratamientoId?: number,
    private bovinoId?: number
  ) {}

  // Getters
  getId(): number {
    return this.id;
  }

  getFechaDeteccion(): Date {
    return this.fechaDeteccion;
  }

  getFechaAlta(): Date | undefined {
    return this.fechaAlta;
  }

  getEnfermedadId(): number | undefined {
    return this.enfermedadId;
  }

  getTratamientoId(): number | undefined {
    return this.tratamientoId;
  }

  getBovinoId(): number | undefined {
    return this.bovinoId;
  }

  // Setters
  setFechaAlta(fecha: Date): void {
    this.fechaAlta = fecha;
  }

  setEnfermedadId(id: number): void {
    this.enfermedadId = id;
  }

  setTratamientoId(id: number): void {
    this.tratamientoId = id;
  }

  setBovinoId(id: number): void {
    this.bovinoId = id;
  }
}