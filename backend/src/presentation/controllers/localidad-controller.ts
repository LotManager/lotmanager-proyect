import { Request, Response } from "express";
import { LocalidadService } from "../../application/services/localidadService";
import { PrismaLocalidadRepository } from "../../infrastructure/repositorios/PrismaLocalidadRepository";
import { PrismaProvinciaRepository } from "../../infrastructure/repositorios/PrismaProvinciaRepository";

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
      const nueva = await localidadService.registrarSrv(id, codigoPostal, nombre, idProvincia);
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

  if (isNaN(id) || id <= 0) {
    res.status(400).json({ error: "ID de localidad inválido" });
    return;
  }

  const cambios: {
    nombre?: string;
    codigoPostal?: number;
    idProvincia?: number;
  } = {};

  if (nombre !== undefined) {
    if (typeof nombre !== "string" || nombre.trim().length < 2) {
      res.status(400).json({ error: "Nombre inválido (mínimo 2 caracteres)" });
      return;
    }
    cambios.nombre = nombre.trim();
  }

  if (codigoPostal !== undefined) {
    const codigoPostalNum = parseInt(codigoPostal);
    if (isNaN(codigoPostalNum) || codigoPostalNum <= 0 || codigoPostalNum >= 99999) {
      res.status(400).json({ error: "Código postal inválido" });
      return;
    }
    cambios.codigoPostal = codigoPostalNum;
  }

  if (idProvincia !== undefined) {
    const idProvinciaNum = parseInt(idProvincia);
    if (isNaN(idProvinciaNum) || idProvinciaNum <= 0) {
      res.status(400).json({ error: "idProvincia inválido" });
      return;
    }
    cambios.idProvincia = idProvinciaNum;
  }

  if (Object.keys(cambios).length === 0) {
    res.status(400).json({ error: "No se especificaron campos para actualizar" });
    return;
  }

  try {
    await localidadService.actualizarSrv(id, cambios);
    console.log("Localidad Actualizada correctamente")
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