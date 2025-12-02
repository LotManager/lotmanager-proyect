import { Request, Response, NextFunction } from "express";
import { Security } from "../../application/helper/security";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 1. Leer el token de la cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No autorizado: Token no encontrado" });
  }

  // 2. Verificar token
  const decoded = Security.verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "No autorizado: Token inválido o expirado" });
  }

  // 3. Guardar datos del usuario en la request para usarlos luego
  (req as any).user = decoded;

  next(); // Pasa al siguiente controlador
};