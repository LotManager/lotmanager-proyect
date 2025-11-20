import { Request, Response } from "express";
import { 
  SanidadService, 
  CreateCasoDto, 
  CreateEnfermedadDto, 
  CreateTratamientoDto 
} from "../../application/services/sanidad.service";

const service = new SanidadService();

export class SanidadController {
  static async registrarCaso(req: Request, res: Response) {
    const parsed = CreateCasoDto.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });
    
    try {
      const resultado = await service.registrarCaso(parsed.data);
      res.json(resultado);
    } catch (e: any) { res.status(500).json({ message: e.message }); }
  }

  static async darAlta(req: Request, res: Response) {
    try {
      const resultado = await service.darAlta(Number(req.params.id));
      res.json(resultado);
    } catch (e: any) { res.status(500).json({ message: e.message }); }
  }

  static async getAuxiliares(req: Request, res: Response) {
    try {
      const [enfermedades, tratamientos] = await Promise.all([
        service.getEnfermedades(),
        service.getTratamientos()
      ]);
      res.json({ enfermedades, tratamientos });
    } catch (e) { res.status(500).json({ message: "Error al cargar listas" }); }
  }
  
  static async getCasosActivos(req: Request, res: Response) {
      try {
          const casos = await service.getCasosActivos();
          res.json(casos);
      } catch(e) { res.status(500).json({ message: "Error" }); }
  }

  static async crearEnfermedad(req: Request, res: Response) {
    const parsed = CreateEnfermedadDto.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });
    try {
      const data = await service.crearEnfermedad(parsed.data);
      res.status(201).json(data);
    } catch (e: any) { res.status(500).json({ message: e.message }); }
  }

  static async eliminarEnfermedad(req: Request, res: Response) {
    try {
      await service.eliminarEnfermedad(Number(req.params.id));
      res.status(204).send();
    } catch (e: any) { res.status(500).json({ message: e.message }); }
  }

  static async crearTratamiento(req: Request, res: Response) {
    const parsed = CreateTratamientoDto.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues });
    try {
      const data = await service.crearTratamiento(parsed.data);
      res.status(201).json(data);
    } catch (e: any) { res.status(500).json({ message: e.message }); }
  }

  static async eliminarTratamiento(req: Request, res: Response) {
    try {
      await service.eliminarTratamiento(Number(req.params.id));
      res.status(204).send();
    } catch (e: any) { res.status(500).json({ message: e.message }); }
  }
}

