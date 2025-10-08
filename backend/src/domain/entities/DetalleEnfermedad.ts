import { EstadoSalud } from "../entities/Bovino";

export interface DetalleEnfermedad {
  id_bovino: number
  id_enfermedad: number
  id_corral: number
  fecha_inicio: Date
  fecha_fin: Date
  enfermedad?: { id: number; nombre: string }
  corral?: { id: number }
  bovino?: { id: number; estado: EstadoSalud }
}