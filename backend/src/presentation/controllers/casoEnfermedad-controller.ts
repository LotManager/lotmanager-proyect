import { Request, Response } from "express";
import { CasoEnfermedadService } from "../../application/services/casoEnfermedadService";
import { CasoEnfermedadDTO, CasoEnfermedadUpdateDTO } from "../../application/dtos/casoEnfermedad.dto";

export class CasoEnfermedadController {
  constructor(private readonly service: CasoEnfermedadService) {}

  public registrar = async (req: Request, res: Response) => {
    try {
      const dto = CasoEnfermedadDTO.parse(req.body);
      const caso = await this.service.registrarSrv(
        0,
        dto.fechaDeteccion,
        dto.enfermedadId,
        dto.tratamientoId,
        dto.bovinoId,
        dto.fechaAlta
      );
      res.status(201).json(caso);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido al registrar caso" });
      }
    }
  };

  public actualizar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const cambios = CasoEnfermedadUpdateDTO.parse(req.body);
      await this.service.actualizarSrv(id, cambios);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido al actualizar caso" });
      }
    }
  };

  public eliminar = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await this.service.eliminar(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido al eliminar caso" });
      }
    }
  };

  public obtenerPorId = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const caso = await this.service.obtenerPorId(id);
      if (!caso) return res.status(404).json({ error: "Caso no encontrado" });
      res.json(caso);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido al obtener caso" });
      }
    }
  };

  public listar = async (_req: Request, res: Response) => {
    try {
      const casos = await this.service.listar();
      res.json(casos);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Error desconocido al listar casos" });
      }
    }
  };
}