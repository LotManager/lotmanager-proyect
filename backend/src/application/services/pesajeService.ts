import { IPesajeRepository } from "../../domain/interfaces/IPesajeRepository";
import { CreatePesajeDtoType } from "../dtos/pesaje.dto";
import { Pesaje } from "../../domain/entities/Pesaje";

export class PesajeService {
  constructor(private readonly repo: IPesajeRepository) {}

  async registrar(dto: CreatePesajeDtoType): Promise<Pesaje> {
    const dataParaCrear: any = { ...dto };
    // Si viene fecha la usamos, sino usamos la actual
    dataParaCrear.fecha = dto.fecha ? new Date(dto.fecha) : new Date();
    
    return this.repo.create(dataParaCrear);
  }

  async historial(bovinoId: number): Promise<Pesaje[]> {
    return this.repo.findByBovino(bovinoId);
  }
}