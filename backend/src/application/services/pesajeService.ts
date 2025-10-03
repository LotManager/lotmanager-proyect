import { Pesaje } from '../../domain/entities/Pesaje';
import { IPesajeRepository } from 'domain/interfaces/IPesajeRepository';
import { IBovinoRepository } from 'domain/interfaces/IBovinoRepository';

export class PesajeService {
  constructor(
    private readonly pesajeRepo: IPesajeRepository,
    private readonly bovinoRepo: IBovinoRepository
  ) {}

  async registrar(
    idBovino: number,
    fecha: Date,
    pesoDado: number
  ): Promise<Pesaje> {
    // 1. Verificar que el bovino exista
    const bovino = await this.bovinoRepo.findById(idBovino);
    if (!bovino) throw new Error('Bovino no encontrado');

    // 2. Crear entidad
    const pesaje = new Pesaje(null, idBovino, fecha, pesoDado);

    // 3. Persistir
    return this.pesajeRepo.save(pesaje);
  }

  async historial(idBovino: number): Promise<Pesaje[]> {
    return this.pesajeRepo.findByBovinoId(idBovino);
  }
}