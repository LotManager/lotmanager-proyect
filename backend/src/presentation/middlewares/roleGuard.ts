import { Request, Response, NextFunction } from "express";

export const roleGuard = (rolesPermitidos: ("admin" | "encargado")[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const rolNombre = req.user?.rol?.nombre;

    if (!rolNombre || !rolesPermitidos.includes(rolNombre)) {
      res.status(403).json({ error: `Acceso denegado: se requiere uno de los roles ${rolesPermitidos.join(", ")}` });
      return;
    }

    next();
  };
};