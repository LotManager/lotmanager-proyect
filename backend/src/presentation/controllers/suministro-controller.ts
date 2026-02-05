import { SuministroService } from "../../application/services/suministroService";
import { SuministroMapper } from "../../application/mappers/suministro.mapper";
import { PrismaSuministroRepository } from "../../infrastructure/repositorios/PrismaSuministroRepository";
import { Request, Response } from "express";
import { CreateSuministroSchema, UpdateSuministroSchema, IdParamSchema } from "../../application/dtos/suministro.dto";

const service = new SuministroService(new PrismaSuministroRepository());

export class SuministroController {
  static async create(req: Request, res: Response) {
    try {
        const parsed = CreateSuministroSchema.parse(req.body);
        const suministro = await service.createSuministro(parsed);
        res.status(201).json(SuministroMapper.toDTO(suministro));
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
        const suministro = await service.findById(idNumber);
        if (!suministro) return res.status(404).json({ error: "Suministro no encontrado" });
        res.json(SuministroMapper.toDTO(suministro));
    } catch (error: unknown) {
        let message = 'Unknown error';
        if (error instanceof Error) message = error.message;
        else if (typeof error === 'string') message = error;
        res.status(400).json({ error: message });
    }
  }
    static async getAll(req: Request, res: Response) {
    try {
        const suministros = await service.findAll();
        const suministrosDto = suministros.map(SuministroMapper.toDTO);
        res.json(suministrosDto);
    } catch (error: unknown) {
        let message = 'Unknown error';
        if (error instanceof Error) message = error.message;
        else if (typeof error === 'string') message = error;
        res.status(400).json({ error: message });
    }
  }
    static async update(req: Request, res: Response) {
    try {
        const { id } = IdParamSchema.parse(req.params);
        const idNumber = Number(id);
        const dto = UpdateSuministroSchema.parse(req.body);
        const updated = await service.update({ id: idNumber, data: dto });
        if (!updated) return res.status(404).json({ error: "Suministro no encontrado" });
        res.json(SuministroMapper.toDTO(updated));
    } catch (error: unknown) {
        let message = 'Unknown error';
        if (error instanceof Error) message = error.message;
        else if (typeof error === 'string') message = error;
        res.status(400).json({ error: message });
    }
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
}