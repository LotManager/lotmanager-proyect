// src/usecases/corral/getAllCorrales.ts
import { PrismaCorralRepository } from '../infrastructure/prisma/PrismaCorralRepository';

export async function getAllCorralesUseCase() {
  const repo = new PrismaCorralRepository();
  const corrales = await repo.getAll();
  return corrales;
}