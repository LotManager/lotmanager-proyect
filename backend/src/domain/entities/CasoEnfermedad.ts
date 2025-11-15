import { Enfermedad } from "./Enfermedad";
import { Tratamiento } from "./Tratamiento";
import { Bovino } from "./Bovino";

export class CasoEnfermedad {
  constructor(
    private id: number,
    private bovinoId: number,
    private enfermedadId: number,
    private tratamientoId: number,
    private fechaDeteccion: Date,
    private fechaAlta?: Date,
    private enfermedad?: Enfermedad,
    private tratamiento?: Tratamiento,
    private bovino?: Bovino
  ) {}

  // Getters
  getId(): number {
    return this.id;
  }

  getBovinoId(): number {
    return this.bovinoId;
  }

  getEnfermedadId(): number {
    return this.enfermedadId;
  }

  getTratamientoId(): number {
    return this.tratamientoId;
  }

  getFechaDeteccion(): Date {
    return this.fechaDeteccion;
  }

  getFechaAlta(): Date | undefined {
    return this.fechaAlta;
  }

  getEnfermedad(): Enfermedad | undefined {
    return this.enfermedad;
  }

  getTratamiento(): Tratamiento | undefined {
    return this.tratamiento;
  }

  getBovino(): Bovino | undefined {
    return this.bovino;
  }

  // Setters
  setFechaAlta(fecha: Date): void {
    this.fechaAlta = fecha;
  }

  setEnfermedad(enfermedad: Enfermedad): void {
    this.enfermedad = enfermedad;
  }

  setTratamiento(tratamiento: Tratamiento): void {
    this.tratamiento = tratamiento;
  }

  setBovino(bovino: Bovino): void {
    this.bovino = bovino;
  }

  // DTO para persistencia
  toDTO(): {
    id?: number;
    bovinoId: number;
    enfermedadId: number;
    tratamientoId: number;
    fechaDeteccion: Date;
    fechaAlta?: Date;
  } {
    return {
      id: this.id,
      bovinoId: this.bovinoId,
      enfermedadId: this.enfermedadId,
      tratamientoId: this.tratamientoId,
      fechaDeteccion: this.fechaDeteccion,
      fechaAlta: this.fechaAlta,
    };
  }
}