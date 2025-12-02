import { IMovimientoCorralRepository } from "../../domain/interfaces/IMovimientoCorralRepository";
import { IBovinoRepository } from "../../domain/interfaces/IBovinoRepository";
// ✅ 1. Importamos la interfaz de Corral
import { ICorralRepository } from "../../domain/interfaces/ICorralRepository"; 
import { CreateMovimientoCorralDtoType } from "../dtos/movimientoCorral.dto";
import { MovimientoCorral } from "../../domain/entities/MovimientoCorral";
// Importamos los Enums de Prisma para comparar
import { TipoCorral, EstadoSalud } from "@prisma/client";

export class MovimientoCorralService {
  constructor(
    private readonly movimientoRepo: IMovimientoCorralRepository,
    private readonly bovinoRepo: IBovinoRepository,
    // ✅ 2. Inyectamos el repositorio de Corrales
    private readonly corralRepo: ICorralRepository 
  ) {}

  async registrarMovimiento(dto: CreateMovimientoCorralDtoType): Promise<MovimientoCorral> {
    // 1. Validar que el bovino existe
    const bovino = await this.bovinoRepo.findById(dto.bovinoId);
    if (!bovino) throw new Error("Bovino no encontrado");

    // 2. Validar origen
    if (bovino.corralId !== dto.corralOrigenId) {
      throw new Error(`El bovino no se encuentra en el corral de origen indicado.`);
    }

    // ✅ 3. CONSULTAR EL CORRAL DE DESTINO
    const corralDestino = await this.corralRepo.findById(dto.corralDestinoId);
    if (!corralDestino) throw new Error("Corral de destino no encontrado");

    // 4. Preparar datos del movimiento
    const dataMovimiento: any = { ...dto };
    dataMovimiento.fecha = dto.fecha ? new Date(dto.fecha) : new Date();

    // 5. Crear el registro de movimiento
    const nuevoMovimiento = await this.movimientoRepo.create(dataMovimiento);

    // ✅ 6. LÓGICA INTELIGENTE DE ACTUALIZACIÓN
    const dataToUpdate: any = {
      corralId: dto.corralDestinoId,
    };

    // REGLA DE NEGOCIO: Si va a enfermería, se enferma. si va a engorde, se sana.
    if (corralDestino.tipo === TipoCorral.ENFERMA) {
      dataToUpdate.estadoSalud = EstadoSalud.ENFERMO;
    }
    else if (corralDestino.tipo === TipoCorral.ENGORDE) {
      dataToUpdate.estadoSalud = EstadoSalud.SANO;
    }

    await this.bovinoRepo.update(dto.bovinoId, dataToUpdate);

    return nuevoMovimiento;
  }

  async historialPorBovino(bovinoId: number): Promise<MovimientoCorral[]> {
    return this.movimientoRepo.findByBovino(bovinoId);
  }
}