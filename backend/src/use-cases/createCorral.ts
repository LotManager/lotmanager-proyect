import { PrismaCorralRepository } from '../infrastructure/prisma/PrismaCorralRepository';
import { CorralSchema } from '../domain/entities/Corral';

export async function createCorralUseCase(data: unknown) {
  const parsed = CorralSchema.safeParse(data);
  if (!parsed.success) {
    throw parsed.error;
  }

  const repo = new PrismaCorralRepository();
  return await repo.create(parsed.data);
}