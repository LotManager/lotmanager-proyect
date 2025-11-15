import { Request, Response, NextFunction } from "express";
import { tokenService } from "../../application/auth/services/tokenService";
import { AuthPayload } from "../../application/auth/types/AuthPayload";

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.["access_token"] || req.headers?.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token de acceso no encontrado" });
    return;
  }

  try {
    const payload = tokenService.verifyAccessToken(token) as AuthPayload | null;
    console.log("[AUTH] Payload verificado:");
    if (!payload) {
      throw new Error("Token inválido o expirado");
    }
    
    req.user = payload;
    next();
  } catch (error) {
    logAuthError(error);
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};

function logAuthError(error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`[AUTH] Fallo de autenticación: ${message}`);
}