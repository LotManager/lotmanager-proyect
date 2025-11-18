import { DietaMapper } from "application/mappers/dieta.mapper";
import { DietaService } from "application/services/dietaService";
import { PrismaDietaRepository } from "infrastructure/repositorios/PrismaDietaRepository";
import { Request, Response } from "express";
import { CreateDietaSchema, UpdateDietaSchema, IdParamSchema } from "application/dtos/dieta.dto";
import { CreateDetalleDietaSchema, UpdateDetalleDietaSchema } from "application/dtos/detalle-dieta.dto";

const service = new DietaService(new PrismaDietaRepository());

export class DietaController {
  static async create(req: Request, res: Response) {
    try {
      const parsed = CreateDietaSchema.parse(req.body);
      const dieta = await service.createDieta(parsed);
      res.status(201).json(DietaMapper.toResponseDTO(dieta));
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) message = error.message;
      else if (typeof error === 'string') message = error;
      res.status(400).json({ error: message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = IdParamSchema.parse(req.params);
      const idNumber = Number(id);
      const dieta = await service.findById(idNumber);
      if (!dieta) return res.status(404).json({ error: "Dieta no encontrada" });
      res.json(DietaMapper.toResponseWithDetallesDTO(dieta));
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) message = error.message;
      else if (typeof error === 'string') message = error;
      res.status(400).json({ error: message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const dietas = await service.findAll();
      const dietasDto = dietas.map(DietaMapper.toResponseWithDetallesDTO);
      res.json(dietasDto);
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) message = error.message;
      else if (typeof error === 'string') message = error;
      res.status(400).json({ error: message });
    }
  }

  static async update(req: Request, res: Response) {
    const { id } = IdParamSchema.parse(req.params);
    const idNumber = Number(id);
    const dto = UpdateDietaSchema.parse(req.body);

    const updated = await service.updateDieta({ id: idNumber, data: dto });
    if (!updated) return res.status(404).json({ message: "Dieta no encontrada" });

    const response = DietaMapper.toResponseDTO(updated);
    return res.json(response);
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = IdParamSchema.parse(req.params);
      const idNumber = Number(id);
      await service.delete(idNumber);
      res.status(204).send();
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) message = error.message;
      else if (typeof error === 'string') message = error;
      res.status(400).json({ error: message });
    }
  }

  // Detalles
  static async addDetalle(req: Request, res: Response) {
    try {
      const { id } = IdParamSchema.parse(req.params);
      const dietaId = Number(id);
      const body = CreateDetalleDietaSchema.omit({ dietaId: true }).parse(req.body);
      const result = await service.addDetalle(dietaId, { ...body, dietaId });
      return res.status(201).json(DietaMapper.toResponseWithDetallesDTO(result));
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) message = error.message;
      else if (typeof error === 'string') message = error;
      return res.status(400).json({ error: message });
    }
  }

  static async updateDetalle(req: Request, res: Response) {
    try {
      const { id } = IdParamSchema.parse({ id: req.params.id });
      const dietaId = Number(id);
      const alimentoId = Number(req.params.alimentoId);
      const body = UpdateDetalleDietaSchema.parse(req.body);
      if (typeof body.proporcionKg !== 'number') {
        return res.status(400).json({ error: 'proporcionKg es obligatoria para actualizar' });
      }
      await service.updateDetalle(dietaId, alimentoId, body.proporcionKg);
      return res.status(204).send();
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) message = error.message;
      else if (typeof error === 'string') message = error;
      return res.status(400).json({ error: message });
    }
  }

  static async removeDetalle(req: Request, res: Response) {
    try {
      const { id } = IdParamSchema.parse({ id: req.params.id });
      const dietaId = Number(id);
      const alimentoId = Number(req.params.alimentoId);
      await service.removeDetalle(dietaId, alimentoId);
      return res.status(204).send();
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) message = error.message;
      else if (typeof error === 'string') message = error;
      return res.status(400).json({ error: message });
    }
  }
}
