import { Request, Response } from "express";
import { LocalidadService } from "../../application/services/localidadService.js";
import { PrismaLocalidadRepository } from "../../infrastructure/repositorios/PrismaLocalidadRepository.js";
import { PrismaProvinciaRepository } from "../../infrastructure/repositorios/PrismaProvinciaRepository.js";

const localidadService = new LocalidadService(
  new PrismaLocalidadRepository(),
  new PrismaProvinciaRepository()
);

export class LocalidadController {
  public async listar(req: Request, res: Response): Promise<void> {
    const localidades = await localidadService.listar();
    const resultado = localidades.map(loc => ({
      id: loc.getId(),
      nombre: loc.getNombre(),
      codigoPostal: loc.getCodigoPostal(),
      provincia: {
        id: loc.getIdProvincia(),
        nombre: loc.getNombreProvincia(),
      },
    }));
    res.status(200).json(resultado);
  }

  public async obtenerPorId(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id!);
    const localidad = await localidadService.obtenerPorId(id);
    if (!localidad) {
      res.status(404).json({ error: "Localidad no encontrada" });
    } else {
      res.status(200).json({
        id: localidad.getId(),
        nombre: localidad.getNombre(),
        codigoPostal: localidad.getCodigoPostal(),
        provincia: {
          id: localidad.getIdProvincia(),
          nombre: localidad.getNombreProvincia(),
        },
      });
    }
  }

  public async registrar(req: Request, res: Response): Promise<void> {
    const { id, nombre, codigoPostal, idProvincia } = req.body;
    try {
      const nueva = await localidadService.registrar(id, codigoPostal, nombre, idProvincia);
      res.status(201).json({
        id: nueva.getId(),
        nombre: nueva.getNombre(),
        codigoPostal: nueva.getCodigoPostal(),
        provincia: {
          id: nueva.getIdProvincia(),
          nombre: nueva.getNombreProvincia(),
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: errorMessage });
    }
  }

  public async actualizar(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id!);
    const { nombre, codigoPostal, idProvincia } = req.body;
    try {
      await localidadService.actualizar(id, codigoPostal, nombre, idProvincia);
      res.status(204).send();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: errorMessage });
    }
  }

  public async eliminar(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id!);
    try {
      await localidadService.eliminar(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: errorMessage });
    }
  }
}