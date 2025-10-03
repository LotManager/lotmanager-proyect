import { Request, Response } from "express";
import { PersonalService } from "../../application/services/personalService";
import { personalCreateSchema } from "../../application/personal/schemas/personalCreateSchema";
import { personalResponseSchema } from "../../application/personal/schemas/personalResponseSchema";
import { personalUpdateSchema } from "../../application/personal/schemas/personalUpdateSchema";
import { PersonalUpdateDto } from "../../application/dtos/personal.dto";


export class PersonalController {
  constructor(private readonly service: PersonalService) {}

  async crear(req: Request, res: Response) {
    try {
      const dto = personalCreateSchema.parse(req.body);
      const creado = await this.service.crear(dto);
      const response = creado.toDTO();
      personalResponseSchema.parse(response); // validación extra opcional
      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async actualizar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const dto: PersonalUpdateDto = personalUpdateSchema.parse(req.body);
      const actualizado = await this.service.actualizar(id, dto);
      const response = actualizado.toDTO();
      personalResponseSchema.parse(response);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async eliminar(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await this.service.eliminar(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async obtenerPorId(req: Request, res: Response) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: "ID es requerido" });
      }
      const id = Number(req.params.id);
      const personal = await this.service.buscarPorId(id);
      if (!personal) {
        return res.status(404).json({ error: "Personal no encontrado" });
      }
      const response = personal.toDTO();
      personalResponseSchema.parse(response);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }
  async obtenerTodos(req: Request, res: Response) {
  try {
    const resultado = await this.service.findAll();
    res.json(resultado);
  } catch (error) {
    console.error("Error al obtener todos los personales:", error);
    res.status(500).send("Error interno");
  }
}
}
