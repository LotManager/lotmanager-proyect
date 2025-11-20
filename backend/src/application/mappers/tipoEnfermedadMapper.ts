// src/application/mappers/TipoEnfermedadMapper.ts
import { TipoEnfermedad as DominioTipo } from '../../domain/enums/TipoEnfermedad';
import { $Enums } from '@prisma/client';

export class TipoEnfermedadMapper {
  static toPrisma(tipo: DominioTipo): $Enums.TipoEnfermedad {
    return tipo as unknown as $Enums.TipoEnfermedad;
  }

  static fromPrisma(tipo: $Enums.TipoEnfermedad): DominioTipo {
    return tipo as unknown as DominioTipo;
  }
}