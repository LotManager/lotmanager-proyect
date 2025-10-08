// src/presentation/controllers/pesaje-controller.ts
import { Request, Response } from 'express';
import { PesajeService } from '../../application/services/pesajeService';
import { PrismaPesajeRepository } from '../../infrastructure/repositorios/PrismaPesajeRepository';
import { PrismaBovinoRepository } from '../../infrastructure/repositorios/PrismaBovinoRepository';
import prisma from '../../config/db';

const service = new PesajeService(
  new PrismaPesajeRepository(),
  new PrismaBovinoRepository()
);

/* ---------- POST /api/pesajes ---------- */
export const crearPesaje = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id_bovino, fecha, peso_dado } = req.body;
    if (!id_bovino || !fecha || !peso_dado) {
      res.status(400).json({ error: 'Faltan campos' });
      return;
    }
    const creado = await service.registrar(Number(id_bovino), new Date(fecha), parseFloat(peso_dado));
    res.status(201).json(creado);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

/* ---------- GET /api/bovinos/:id/pesajes ---------- */
export const listarPesajesPorBovino = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'ID inválido' }); return; }
    const pesajes = await service.historial(id);
    res.json(pesajes);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

/* ---------- REPORTES ---------- */
export const reporteCrecimiento = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'ID inválido' }); return; }
    const gTotal = await service.gananciaTotal(id);
    const gmd    = await service.gananciaMediaDiaria(id);
    res.json({ gananciaTotalKg: gTotal, gananciaMediaDiariaKg: gmd });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export const reporteCorral = async (req: Request, res: Response): Promise<void> => {
  try {
    const idCorral = Number(req.params.id);
    if (isNaN(idCorral)) { res.status(400).json({ error: 'ID inválido' }); return; }

    // 1. Obtener todos los bovinos que EGRESARON de ese corral
    const bovinos = await prisma.bovino.findMany({
      where: { id_corral: idCorral, estado_bovino: 'EGRESADA' },
    });

    if (bovinos.length === 0) {
      res.json({ promedioGananciaKg: 0, totalBovinos: 0 });
      return;
    }

    // 2. Sumar ganancias individuales
    let gananciaTotal = 0;
    for (const b of bovinos) {
      try {
        const repo = new PrismaBovinoRepository(); // podés inyectar si querés
        const service = new PesajeService(
          new PrismaPesajeRepository(),
          repo
        );
        const g = await service.gananciaTotal(b.id);
        gananciaTotal += g;
      } catch {
        // sin pesos → no sumamos
      }
    }

    const promedio = gananciaTotal / bovinos.length;
    res.json({ promedioGananciaKg: promedio, totalBovinos: bovinos.length });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};

export const eficienciaBovino = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) { res.status(400).json({ error: 'ID inválido' }); return; }

    // función que obtiene kg de alimento del corral en una fecha
    const getConsumo = async (idCorral: number, fecha: Date) => {
      // Aquí llamarías a tu servicio/repositorio de alimentación
      // Ejemplo dummy: 10 kg por día
      return 10;
    };

    const service = new PesajeService(
      new PrismaPesajeRepository(),
      new PrismaBovinoRepository()
    );

    const r = await service.eficienciaAlimenticia(id, getConsumo);
    res.json(r);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
};