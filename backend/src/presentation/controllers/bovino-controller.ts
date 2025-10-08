import { Request, Response } from 'express';
import { BovinoService } from '../../application/services/bovinoService';
import { PrismaBovinoRepository } from '../../infrastructure/repositorios/PrismaBovinoRepository';
import { Bovino, EstadoBovino, EstadoSalud, Sexo, TipoBovino } from '../../domain/entities/Bovino';

const service = new BovinoService(new PrismaBovinoRepository());

/* ---------- PUT /api/bovinos/:id ---------- */
export const actualizarBovino = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'ID inválido' }); return; }

    const {
      id_raza, id_corral, caravana, estado_bovino, estado_salud,
      ingreso, egreso, peso_ingreso, peso_egreso, sexo, tipo_bovino
    } = req.body;

    const bovino = new Bovino(
      id, Number(id_raza), Number(id_corral), Number(caravana),
      estado_bovino as EstadoBovino,
      estado_salud as EstadoSalud,
      new Date(ingreso),
      egreso ? new Date(egreso) : null,
      parseFloat(peso_ingreso),
      peso_egreso ? parseFloat(peso_egreso) : null,
      sexo as Sexo,
      tipo_bovino as TipoBovino
    );

    const actualizado = await service.actualizar(bovino);
    res.json(actualizado);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

/* ---------- DELETE /api/bovinos/:id ---------- */
export const eliminarBovino = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'ID inválido' }); return; }
    await service.eliminar(id);
    res.json({ msg: 'Bovino egresado' });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};