import { Request, Response, NextFunction } from "express";

/**
 * Middleware para restringir el acceso según el rol del usuario.
 * @param allowedRoles Array de roles permitidos (ej: ["ADMINISTRADOR", "ENCARGADO"])
 */
export const checkRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Obtenemos el usuario que el authMiddleware dejó en la request
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ message: "No autorizado: Usuario no identificado" });
    }

    // 2. Verificamos si el rol del usuario está en la lista de permitidos
    if (allowedRoles.includes(user.rol)) {
      next(); // ✅ Tiene permiso, pase.
    } else {
      res.status(403).json({ 
        message: "Prohibido: No tienes permisos suficientes para realizar esta acción." 
      }); // ⛔ No tiene permiso.
    }
  };
};