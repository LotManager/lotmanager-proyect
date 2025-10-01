import { TipoEnfermedad } from "../../domain/enums/TipoEnfermedad";

export interface EnfermedadPersisted {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: TipoEnfermedad;
}
