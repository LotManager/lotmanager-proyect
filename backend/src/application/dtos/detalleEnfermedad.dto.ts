export interface CreateDetalleEnfermedadDTO {
  id_bovino: number
  id_enfermedad: number
  id_corral: number
  fecha_inicio: Date
  fecha_fin: Date
}

export interface UpdateDetalleEnfermedadDTO {
    id_bovino?: number
    id_enfermedad?: number
    id_corral?: number
    fecha_inicio?: Date
    fecha_fin?: Date
}