import { Request, Response } from 'express';
import { Pesaje } from 'domain/entities/Pesaje';
import { PrismaPesajeRepository } from 'infrastructure/repositorios/PrismaPesajeRepository';

const repo = new PrismaPesajeRepository();

/* ---------- POST /api/pesajes ---------- */
export const crearPesaje = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_bovino, fecha, peso_dado } = req.body;
    if (!id_bovino || !fecha || !peso_dado) {
      res.status(400).json({ error: 'Faltan campos' });
      return;
    }

    const nuevo = new Pesaje(null, Number(id_bovino), new Date(fecha), parseFloat(peso_dado));
    const guardado = await repo.save(nuevo);
    res.status(201).json(guardado);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error interno' });
  }
};

/* ---------- GET /api/bovinos/:id/pesajes ---------- */
export const listarPesajesPorBovino = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }
    const pesajes = await repo.findByBovinoId(id);
    res.json(pesajes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error interno' });
  }
};