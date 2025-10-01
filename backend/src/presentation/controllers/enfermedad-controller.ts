import { Request, Response } from "express";
import { EnfermedadService } from "../../application/services/enfermedadService";
import { EnfermedadDTO, EnfermedadParcialDTO } from "../../application/dtos/enfermedad.dto";
import { EnfermedadMapper } from "../../application/mappers/EnfermedadMapper";

export class EnfermedadController {
  constructor(private service: EnfermedadService) {}

  async crear(req: Request, res: Response) {
    try {
      const dto = EnfermedadDTO.parse(req.body);
      const entidad = EnfermedadMapper.fromDTO(dto);
      const creada = await this.service.crear(entidad);
      res.status(201).json(EnfermedadMapper.toDTO(creada));
    } catch (error) {
      console.error("Error al crear enfermedad:", error);
      const errorMessage = typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error);
      res.status(400).json({ error: errorMessage });
    }
  }

  async obtenerPorId(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "ID inválido" });
      }

      const enfermedad = await this.service.obtenerPorId(id);
      if (!enfermedad) return res.status(404).send("No encontrada");

      res.json(EnfermedadMapper.toDTO(enfermedad));
    } catch (error) {
      console.error("Error al obtener enfermedad:", error);
      const errorMessage = typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error);
      res.status(500).json({ error: errorMessage });
    }
  }

  async obtenerTodas(req: Request, res: Response) {
    try {
      const lista = await this.service.obtenerTodas();
      res.json(lista.map(EnfermedadMapper.toDTO));
    } catch (error) {
      console.error("Error al obtener enfermedades:", error);
      const errorMessage = typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error);
      res.status(500).json({ error: errorMessage });
    }
  }

 async actualizarParcial(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const cambios = EnfermedadParcialDTO.parse(req.body); 
    await this.service.actualizarParcial(id, cambios); 

    res.status(204).send();
  } catch (error) {
    console.error("Error al actualizar enfermedad:", error);
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as any).message
        : String(error);
    res.status(400).json({ error: errorMessage });
  }
}

  async eliminarController(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "ID inválido" });
      }

      await this.service.eliminar(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar enfermedad:", error);
    const errorMessage = typeof error === "object" && error !== null && "message" in error ? (error as any).message : String(error);
      res.status(400).json({ error: errorMessage });
    }
  }

  async vincularTratamientoController(req: Request, res: Response) {
    try {
        const idEnfermedad = Number(req.params.id);
        const { idTratamiento, periodo } = req.body;

        if (isNaN(idEnfermedad) || idEnfermedad <= 0 || isNaN(idTratamiento) || idTratamiento <= 0) {
        return res.status(400).json({ error: "IDs inválidos" });
        }

        if (!periodo || typeof periodo !== "string") {
        return res.status(400).json({ error: "Periodo inválido" });
        }

        await this.service.vincularTratamiento(idEnfermedad, idTratamiento, periodo);
        res.status(204).send();
    } catch (error) {
        console.error("Error al vincular tratamiento:", error);
        const errorMessage = typeof error === "object" && error !== null && "message" in error
        ? (error as any).message
        : String(error);
        res.status(400).json({ error: errorMessage });
    }
  }
  async desvincularTratamientoController(req: Request, res: Response) {
  try {
    const idEnfermedad = Number(req.params.id);
    const idTratamiento = Number(req.params.idTratamiento);

    if (isNaN(idEnfermedad) || idEnfermedad <= 0 || isNaN(idTratamiento) || idTratamiento <= 0) {
      return res.status(400).json({ error: "IDs inválidos" });
    }

    await this.service.desvincularTratamiento(idEnfermedad, idTratamiento);
    res.status(204).send();
  } catch (error) {
    console.error("Error al desvincular tratamiento:", error);
    const errorMessage = typeof error === "object" && error !== null && "message" in error
      ? (error as any).message
      : String(error);
    res.status(400).json({ error: errorMessage });
  }
}
}
