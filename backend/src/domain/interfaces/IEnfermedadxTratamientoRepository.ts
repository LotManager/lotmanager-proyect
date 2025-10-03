export interface IEnfermedadxTratamientoRepository {
  vincular(idEnfermedad: number, idTratamiento: number, periodo: string): Promise<void>;
  desvincular(idEnfermedad: number, idTratamiento: number): Promise<void>;
  existeRelacion(idEnfermedad: number, idTratamiento: number): Promise<boolean>;
}
