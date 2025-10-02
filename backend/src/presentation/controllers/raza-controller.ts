import { Request, Response } from 'express';
import { PrismaRazaRepository } from '../../infrastructure/repositorios/PrismaRazaRepository';

const repo = new PrismaRazaRepository();

export const listarRazas = async (_: Request, res: Response): Promise<void> => {
  const razas = await repo.findAll();
  res.json(razas);
};