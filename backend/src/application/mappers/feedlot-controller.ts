import { Request, Response } from "express";
import { FeedlotService } from "../services/feedlotService";
import { PrismaFeedlotRepository } from "../../infrastructure/repositorios/PrismaFeedlotRepository";
import { PrismaLocalidadRepository } from "../../infrastructure/repositorios/PrismaLocalidadRepository";

const feedlotService = new FeedlotService(
  new PrismaFeedlotRepository(),
  new PrismaLocalidadRepository()
);

export class FeedlotController {
  public async listar(req: Request, res: Response): Promise<void> {
    const feedlots = await feedlotService.listar();
    const resultado = feedlots.map(f => ({
      id: f.getId(),
      nombre: f.getNombre(),
      localidad: {
        id: f.getLocalidad().getId(),
        nombre: f.getNombreLocalidad(),
        codigoPostal: f.getLocalidad().getCodigoPostal(),
        provincia: {
          id: f.getLocalidad().getIdProvincia(),
          nombre: f.getNombreProvincia(),
        },
      },
    }));
    res.status(200).json(resultado);
  }

  public async obtenerPorId(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id!);
    const feedlot = await feedlotService.obtenerPorId(id);
    if (!feedlot) {
      res.status(404).json({ error: "Feedlot no encontrado" });
    } else {
      res.status(200).json({
        id: feedlot.getId(),
        nombre: feedlot.getNombre(),
        localidad: {
          id: feedlot.getLocalidad().getId(),
          nombre: feedlot.getNombreLocalidad(),
          codigoPostal: feedlot.getLocalidad().getCodigoPostal(),
          provincia: {
            id: feedlot.getLocalidad().getIdProvincia(),
            nombre: feedlot.getNombreProvincia(),
          },
        },
      });
    }
  }

  public async registrar(req: Request, res: Response): Promise<void> {
    const { nombre, idLocalidad } = req.body; // ✅ id eliminado
    try {
      const nuevo = await feedlotService.registrar(nombre, idLocalidad); // ✅ sin id
      res.status(201).json({
        id: nuevo.getId(),
        nombre: nuevo.getNombre(),
        localidad: {
          id: nuevo.getLocalidad().getId(),
          nombre: nuevo.getNombreLocalidad(),
          codigoPostal: nuevo.getLocalidad().getCodigoPostal(),
          provincia: {
            id: nuevo.getLocalidad().getIdProvincia(),
            nombre: nuevo.getNombreProvincia(),
          },
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: errorMessage });
    }
  }

  public async actualizar(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id!);
    const { nombre, idLocalidad } = req.body;
    try {
      await feedlotService.actualizar(id, nombre, idLocalidad);
      res.status(204).send();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: errorMessage });
    }
  }

  public async eliminar(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id!);
    try {
      await feedlotService.eliminar(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: errorMessage });
    }
  }
}