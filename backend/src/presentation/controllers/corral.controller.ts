// src/controllers/corral.controller.ts
import { Request, Response } from 'express';
import { getAllCorralesUseCase } from '../../use-cases/getAllCorrales';
import { createCorralUseCase } from '../../use-cases/createCorral';

export async function getAllCorralesController(req: Request, res: Response) {
  try {
    const corrales = await getAllCorralesUseCase();
    res.json(corrales);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener corrales' });
  }
}

export async function createCorralController(req: Request, res: Response) {
  try {
    const nuevoCorral = await createCorralUseCase(req.body);
    res.status(201).json(nuevoCorral);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(400).json({ error: 'Error desconocido al crear corral' });
    }
  }
}