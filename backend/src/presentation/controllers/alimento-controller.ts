import { AlimentoMapper } from "../../application/mappers/alimento.mapper";
import { AlimentoService } from "../../application/services/alimentoService";
import { PrismaAlimentoRepository } from "../../infrastructure/repositorios/PrismaAlimentoRepository";
import { Request, Response } from "express";
import { CreateAlimentoSchema, UpdateAlimentoSchema, IdParamSchema, AlimentoQuerySchema } from "../../application/dtos/alimento.dto";

const service = new AlimentoService(new PrismaAlimentoRepository());

export class AlimentoController {
  static async create(req: Request, res: Response) {
    try {
      const parsed = CreateAlimentoSchema.parse(req.body);
      const alimento = await service.createAlimento(parsed);
      res.status(201).json(AlimentoMapper.toResponseDTO(alimento));
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      }
      res.status(400).json({ error: message });
    }
  }
  static async getById(req: Request, res: Response) {
    try {
      const { id } = IdParamSchema.parse(req.params);
      const alimento = await service.getAlimentoById(id);
      if (!alimento) {
        return res.status(404).json({ error: "Alimento no encontrado" });
      }
      res.json(AlimentoMapper.toResponseDTO(alimento));
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      }
      res.status(400).json({ error: message });
    }
  }
  static async getAll(req: Request, res: Response) {
    try {
      const { tipo, nombre } = AlimentoQuerySchema.parse(req.query);
      const alimentos = await service.getAllAlimentos({ tipo: tipo as any, nombre });
      const alimentosDto = alimentos.map(AlimentoMapper.toResponseDTO);
      res.json(alimentosDto);
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      }
      res.status(400).json({ error: message });
    }
  }
  static async getTipos(_req: Request, res: Response) {
    try {
      const tipos = service.getTipos();
      res.json(tipos);
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      }
      res.status(400).json({ error: message });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const parsed = UpdateAlimentoSchema.parse(req.body);
      const { id } = IdParamSchema.parse(req.params);
      const alimento = await service.updateAlimento({ id, ...parsed });
      if (!alimento) {
        return res.status(404).json({ error: "Alimento no encontrado" });
      }
      res.json(AlimentoMapper.toResponseDTO(alimento));
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      }
      res.status(400).json({ error: message });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const { id } = IdParamSchema.parse(req.params);
      await service.deleteAlimento(id);
      res.status(204).send();
    } catch (error: unknown) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === 'string') {
        message = error;
      }
      res.status(400).json({ error: message });
    }
  }
}