import prisma from '../../config/db';
import { CorralInput } from '../../domain/entities/Corral';

export class PrismaCorralRepository {
  async getAll() {
    return prisma.corral.findMany({
      include: {
        bovino: true,
        alimentacion: true,
        feedlot: true,
      },
    });
  }

  async create(data: CorralInput) {
    return prisma.corral.create({ data });
  }
}