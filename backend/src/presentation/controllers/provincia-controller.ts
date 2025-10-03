import { Request, Response } from "express";
import { ProvinciaService } from "../../application/services/provinciaService";
import { PrismaProvinciaRepository } from "../../infrastructure/repositorios/PrismaProvinciaRepository";


const provinciaService = new ProvinciaService(new PrismaProvinciaRepository());

export class ProvinciaController {
  public async listar(req: Request, res: Response): Promise<void> {
    console.log("Entro al metodo listar");
    const provincias = await provinciaService.listar();
    res.status(200).json(provincias);
    console.log(provincias);
  }

  public async obtenerPorId(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id!);
    const provincia = await provinciaService.obtenerPorId(id);
    if (!provincia) {
      res.status(404).json({ error: "Provincia no encontrada" });
    } else {
      res.status(200).json(provincia);
    }
  }

  public async registrar(req: Request, res: Response): Promise<void> {
    const { id, nombre } = req.body;
    try {
      const nueva = await provinciaService.registrar(id, nombre);
      res.status(201).json(nueva);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      res.status(400).json({ error: errorMessage });
    }
  }

  public async actualizar(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id!);
    const { nombre } = req.body;
    try {
      await provinciaService.actualizar(id, nombre);
      res.status(204).send();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage === "Provincia no encontrada") {
        res.status(404).json({ error: errorMessage });
      } else {
        res.status(400).json({ error: errorMessage });
      }
    }
  }

  public async eliminar(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id!);
    try {
      await provinciaService.eliminar(id);
      res.status(204).send();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage === "Provincia no encontrada") {
        res.status(404).json({ error: errorMessage });
      } else {
        res.status(400).json({ error: errorMessage });
      }
    }
  }
}
